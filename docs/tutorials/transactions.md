---
id: transactions
title: Managing Transactions
---
The goal and core functionality of a DApp built with Lumos is to build transactions in response to user requests.

A transaction includes the following fields:

- `deps`: Dependent cell set, provides read-only cells required by transaction verification. These must be references to living cells.
- `inputs`: Cell references and proofs. Cell references point to live cells that are transferred or updated in the transaction. Proofs (e.g., signature) prove that the transaction creator has the permission to transfer or update the referenced cells.
- `outputs`: New cells created in this state transition.

For more information about CKB transactions, see [Transaction](https://docs.nervos.org/docs/reference/transaction#docsNav) and [CKB RFC](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#44-transaction).

## Operations

### Query Transactions

To query transactions related to a lock script:

```javascript
txCollector = new TransactionCollector(indexer, {
  lock: {
    code_hash:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    hash_type: "data",
    args: "0x62e907b15cbf27d5425399ebf6f0fb50ebb88f18",
  },
});

for await (const tx of txCollector.collect()) {
  console.log(tx);
}
```

### Query Transactions between Given Block Numbers

```javascript
txCollector = new TransactionCollector(indexer, {
  lock: {
    code_hash: 
      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
    hash_type: "type",
    args: "0xa528f2b9a51118b193178db4cf2f3db92e7df323",
  },
  fromBlock: "0x0", // "0x" + 0n.toString(16) 
  toBlock: "0x7d0" , // "0x" + 2000n.toString(16)
});

for await (const tx of txCollector.collect()) {
  console.log(tx);
}
```

It will fetch transactions between `[fromBlock, toBlock]`, which means both `fromBlock` and `toBlock` are included in query range.

### Skip Transactions

```javascript
txCollector = new TransactionCollector(indexer, {
  lock: {
    code_hash: 
      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
    hash_type: "type",
    args: "0xa528f2b9a51118b193178db4cf2f3db92e7df323",
  },
  skip: 100,
});

for await (const tx of txCollector.collect()) {
  console.log(tx);
}
```

The `skip` field represents the number of transactions being skipped, which in the above code snippet means it would skip the first 100 transactions and return from the 101st one.

### Order Transactions by Block Number

```javascript
txCollector = new TransactionCollector(indexer, {
  lock: {
    code_hash: 
      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
    hash_type: "type",
    args: "0xa528f2b9a51118b193178db4cf2f3db92e7df323",
  },
  fromBlock: "0x4e20", // "0x" + 20000n.toString(16)
  toBlock: "0x5208", // "0x" + 21000n.toString(16)
  order: "desc", // default option is "asc"
  skip: 10,
});

for await (const tx of txCollector.collect()) {
  console.log(tx);
}
```

### Prefix Search on `args`

The default `argsLen` is -1, which means you pass the full slice of original args, and you can specify it when the `args` field is the prefix of original args.

```javascript
txCollector = new TransactionCollector(indexer, {
  lock: {
    code_hash: 
      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
    hash_type: "type",
    args: "0xa528f2b9a51118b193178db4cf2f3db92e7df3", // truncate the last byte of orignal args: 0xa528f2b9a51118b193178db4cf2f3db92e7df323
  },
  argsLen: 20, // default option is -1
  fromBlock: "0x253b40", // "0x" + 2440000n.toString(16)
  toBlock: "0x253f28", // "0x" + 2441000n.toString(16)
  order: "desc", // default option is "asc"
  skip: 300,
});

for await (const tx of txCollector.collect()) {
  console.log(tx);
}
```

We recommend to specify explicit length for the `argsLen` field. For example, the length is 20 in normal scenario and 28 in multisig scenario for lock script.  When the length is not certain, the `argsLen` field can be set as `any`. But there is performance lost when use `any` rather than explicitly specified length.

```javascript
txCollector = new TransactionCollector(indexer, {
  lock: {
    code_hash: 
      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
    hash_type: "type",
    args: "0xa528f2b9a51118b193178db4cf2f3db92e7d", // truncate the last two bytes of original args: 0xa528f2b9a51118b193178db4cf2f3db92e7df323
  },
  argsLen: "any",
  fromBlock: "0x253b40", // "0x" + 2440000n.toString(16)
  toBlock: "0x253f28", // "0x" + 2441000n.toString(16)
  order: "desc", // default option is "asc"
  skip: 300,
});

for await (const tx of txCollector.collect()) {
  console.log(tx);
}
```

### Fine Grained Query for Transactions

Fine Grained Query for Transactions can be achieved by using `ScriptWrapper` with customized options like `ioType`, `argsLen`:

```javascript
txCollector = new TransactionCollector(indexer, {
  lock: {
    script: {
      code_hash: 
        "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
      hash_type: "type",
      args: "0xe60f7f88c94ef365d540afc1574c46bb017765", // trucate the last byte of original args: 0xe60f7f88c94ef365d540afc1574c46bb017765a2
    },
    ioType: "both",
    argsLen: 20, // when the `argsLen` is not setted here, it will use the outside `argsLen` config
  },
  type: {
    script: {
      code_hash: "0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e",
      hash_type: "type",
      args: "0x",
    },
    ioType: "input",
  }
});

for await (const tx of txCollector.collect()) {
  console.log(tx);
}
```

The `ioType` field is among `input | output | both`.
