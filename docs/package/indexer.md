---
id: indexer
title: Lumos Indexer
---
The `@ckb-lumos/indexer` package implements a CKB cell indexer that fulfills the [`Index-Query-Assemble`](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern. <!--The DApps built with Lumos must have a configured and running indexer.-->

**Stability and Performance**

The Lumos indexer is based on a [Rust based native indexer](https://github.com/quake/ckb-indexer) for stability and performance.

**Source**

The indexer consumes from the following sources:

* Direct access of CKB's data dir via RocksDB's readonly or secondary mode;
* Consistent queries of CKB's RPC.

**Database**

The indexer supports to store the indexed data in either of the following storage options:

* A local RocksDB directory
* A remote SQL database. The supported databases now include the latest stable versions of PostgreSQL and MySQL. 

**Note**: This package contains the RocksDB backed indexer. A [separate package](sqlindexer) , the `@ckb-lumos/sql-indexer` package contains the SQL backed indexer using the same interface. 

## Examples

### Start Indexer

```javascript
const { Indexer, CellCollector, TransactionCollector } = require("@ckb-lumos/indexer");
const indexer = new Indexer("http://127.0.0.1:8114", "/tmp/indexed-data");
indexer.startForever();
```

### Query Existing Cells

To query existing cells, create a CellCollector:

```javascript
cellCollector = new CellCollector(indexer, {
  lock: {
    code_hash:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    hash_type: "data",
    args: "0x62e907b15cbf27d5425399ebf6f0fb50ebb88f18",
  },
});

for await (const cell of cellCollector.collect()) {
  console.log(cell);
}
```

### Specify `lock` and `type` Script

```javascript
cellCollector = new CellCollector(indexer, {
    lock: {
        args: "0x92aad3bbab20f225cff28ec1d856c6ab63284c7a",
        code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        hash_type: "type"
    },
    type: {
        args: "0x",
        code_hash: "0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e",
        hash_type: "type"
    }
})

for await (const cell of cellCollector.collect()) {
  console.log(cell);
}
```

### Query Cells between Given block_numbers

```javascript
cellCollector = new CellCollector(indexer, {
  lock: {
    code_hash: 
      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
    hash_type: "type",
    args: "0xa528f2b9a51118b193178db4cf2f3db92e7df323",
  },
  fromBlock: "0x225510", // "0x" + 2250000n.toString(16)
  toBlock: "0x225ce0", // "0x" + 2252000n.toString(16)
});

for await (const cell of cellCollector.collect()) {
  console.log(cell);
}
```
It will fetch cells between `[fromBlock, toBlock]`, which means both `fromBlock` and `toBlock` are included in query range.

### EventEmitter

Event-driven pattern is also supported besides the above polling pattern. After subscribing for certain `lock|type` script, it will emit a `changed` event when a block containing the subscribed script is indexed or rollbacked. 

The principle of the design is unreliable notification queue, so developers are supposed to pull from the data sources via `CellCollector|TransactionCollector`, to find out what might happened: cell consumed, new cell generated, new transaction generated, or a chain fork happened, etc; and take the next step accordingly.

```javascript
eventEmitter = indexer.subscribe({
  lock: {
    code_hash:
      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
    hash_type: "type",
    args: "0xa528f2b9a51118b193178db4cf2f3db92e7df323",
  },
});

eventEmitter.on("changed",  () => {
  console.log("States changed with the script, please pull the data sources from the indexer to find out what happend");
})

```

Other query options like `fromBlock|argsLen|data` are also supported.

```javascript
eventEmitter = indexer.subscribe({
  lock: {
    code_hash:
      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
    hash_type: "type",
    // the args bytes length is 18, truncate the last 2 bytes.
    args: "0xa528f2b9a51118b193178db4cf2f3db92e7d",
  },
  // default value is -1
  argsLen: 20,
  // default value is "any"
  data: "0x",
  // default value is 0
  fromBlock: 0x3e8, // "0x" + 1000n.toString(16)
});
```

Listen to median time change when blocks changed.

```javascript
const medianTimeEmitter = indexer.subscribeMedianTime();
medianTimeEmitter.on("changed", (medianTime) => {
  console.log(medianTime);
});
```

## Electron note

One design goal of Lumos, is that even though we might leverage native Rust code to speed things up, you don't need to have Rust installed in your machine to use the framework. However, this goal hits a slight roadblock since electron have its own module versions.

There are 2 paths to work around this issue:

First, we do provide pre-built binaries linked with electron's node version. Use the following command to install npm dependencies in your Electron app:

```bash
$ LUMOS_NODE_RUNTIME=electron npm i
```

This will make sure that pre-built binaries compiled for Electron will be downloaded.

Second, you can also follow the [steps](https://neon-bindings.com/docs/electron-apps) in Neon's documentation to rebuild the binaries. Note this path would require Rust being installed on your system for now.

Note this issue is actually caused since we are still leveraging the old native node module solution. We are also evaluating other solutions, such as [N-API](https://medium.com/@atulanand94/beginners-guide-to-writing-nodejs-addons-using-c-and-n-api-node-addon-api-9b3b718a9a7f), which is based on a stable API, so there is no need to recompile everything for a different Node.js version. We do hope that in later versions, we can convert to N-API so there is not need to deal with inconsistent module versions.
