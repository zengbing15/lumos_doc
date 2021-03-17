---
id: querytransactions
title: Query on Transactions
---
Transactions are the most fundamental entities for interacting with Nervos CKB. 

## Data Structure

A transaction includes the following fields:

- `deps`: Dependent cell set, provides read-only cells required by transaction verification. These must be references to living cells.
- `inputs`: Cell references and proofs. Cell references point to live cells that are transferred or updated in the transaction. Proofs (e.g., signature) prove that the transaction creator has the permission to transfer or update the referenced cells.
- `outputs`: New cells created in this state transition.

For more information about CKB transactions, see [Transaction](https://docs.nervos.org/docs/reference/transaction#docsNav) and [CKB RFC](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#44-transaction).

### A Transaction Example

```
{
  "version": "0x0",
  "cell_deps": [
    {
      "out_point": {
        "tx_hash": "0xbd864a269201d7052d4eb3f753f49f7c68b8edc386afc8bb6ef3e15a05facca2",
        "index": "0x0"
      },
      "dep_type": "dep_group"
    }
  ],
  "header_deps": [
    "0xaa1124da6a230435298d83a12dd6c13f7d58caf7853f39cea8aad992ef88a422"
  ],
  "inputs": [
    {
      "previous_output": {
        "tx_hash": "0x8389eba3ae414fb6a3019aa47583e9be36d096c55ab2e00ec49bdb012c24844d",
        "index": "0x1"
      },
      "since": "0x0"
    }
  ],
  "outputs": [
    {
      "capacity": "0x746a528800",
      "lock": {
        "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        "args": "0x56008385085341a6ed68decfabb3ba1f3eea7b68",
        "hash_type": "type"
      },
      "type": null
    },
    {
      "capacity": "0x1561d9307e88",
      "lock": {
        "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        "args": "0x886d23a7858f12ebf924baaacd774a5e2cf81132",
        "hash_type": "type"
      },
      "type": null
    }
  ],
  "outputs_data": [
    "0x",
    "0x"
  ],
  "witnesses": ["0x55000000100000005500000055000000410000004a975e08ff99fa0001
    42ff3b86a836b43884b5b46f91b149f7cc5300e8607e633b7a29c94dc01c6616a12f62e74a1
    415f57fcc5a00e41ac2d7034e90edf4fdf800"
  ]
}
```

## Examples

### Query Transactions Related to a Lock Script

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