---
id: indexer
title: Lumos Indexer
---
<!--The `@ckb-lumos/indexer` package implements a CKB cell indexer that fulfills the [`Index-Query-Assemble`](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern.--> <!--The DApps built with Lumos must have a configured and running indexer.-->

Lumos is designed based on the [`Index-Query-Assemble`](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern. The Lumos indexer polls blocks from a CKB node, indexes them and stores the indexed data in a local database to provide optimal query.

Dapps built with Lumos must have an indexer configured and running.

Lumos provides two types of indexer:

- A RocksDB backed indexer: The RocksDB backed indexer is contained in the  `@ckb-lumos/indexer` package.
- A SQL backed indexer: A separate package, the `@ckb-lumos/sql-indexer` package contains the SQL backed indexer. The SQL backed indexer is using the same interface as the RocksDB backed indexer. Now Lumos supports the SQL databases of the latest stable versions of PostgreSQL and MySQL.

**Note**:  The usage for the SQL backed indexer is not fully verified. It is still in the experimental stage.

<!--The Lumos indexer is based on the CKB indexer (a [Rust based native indexer](https://github.com/quake/ckb-indexer)) for stability and performance.-->

<!-- Source-->

<!--The indexer consumes from the following sources:-->

<!--Direct access of CKB's data dir via RocksDB's readonly or secondary mode;-->

<!--Consistent queries of CKB's RPC.-->

## Examples

### Use the RocksDB Backed Indexer

```javascript
const { Indexer, CellCollector, TransactionCollector } = require("@ckb-lumos/indexer");
const indexer = new Indexer("http://127.0.0.1:8114", "/tmp/indexed-data");
indexer.startForever();
```

### Use the SQL Backed Indexer

**Step 1. Create a PostgreSQL instance.**

```
$ docker run --name postgres -e POSTGRES_USER=user -e POSTGRES_DB=lumos -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
```

**Step 2. Clone the Lumos repository to initialize the SQL database.**

```
$ cd $TOP
$ git clone --recursive https://github.com/nervosnetwork/lumos
$ cd lumos && git checkout v0.14.2-rc6
$ yarn
$ cd packages/sql-indexer
$ cat << EOF > knexfile.js
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'lumos',
      user:     'user',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
EOF
$ npx knex migrate:up
```

**Step 3. Start the SQL Indexer.**

```
const { Indexer, CellCollector, TransactionCollector } = require("@ckb-lumos/sql-indexer");
const indexer = new Indexer("http://127.0.0.1:5432", "/tmp/indexed-data");
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


