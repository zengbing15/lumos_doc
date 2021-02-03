---
id: cells
title: Cells
---
A Cell is the most basic structure needed to represent a single piece of data in Nervos. The data contained in a Cell can take many forms, including CKBytes or tokens, code like Javascript, or even serialized data like JSON strings. 

| Field       | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| capacity    | <ul><li>The amount of CKB tokens stored in the cell. </li><li>The size limit on how much information the cell can store.</li></ul>The basic unit for `capacity` is `shannon`. A bigger unit `CKByte`, or just `CKB` is also used. 1 CKB equals `10**8` shannons. 1 CKB also means the cell that can store 1 byte of information. |
| data        | State data stored in this cell.<br/>Note: The `data` field can be empty. The total bytes used by a cell (including data) must be less than or equal to the capacity of the cell. <br/>Depending on each DApp, the following value can be stored in the `data` field:<ul><li>Script code as explained in [Script](https://docs.nervos.org/docs/reference/script). </li><li>Token amount for User Defined Token cells.</li><li>Latest game stats for an on-chain fantasy game.</li></ul> |
| lock script | The ownership of a cell.<br/>When a specified cell is used as an input cell in a transaction, the `lock script` included in the cell is executed for signature verification. If the `lock script` fails in the verification, the transaction will be rejected. |
| type script | The script to be executed to validate the structure of both input cells and output cells included in a transaction.<br/>`type script` is typically used to validate DApp logic, such as creating UDTs. |

For more information about the cell model, see [Cell Data Structure](https://docs.nervos.org/docs/reference/cell) and [CKB RFC](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#42-cell).

## Operations

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

### Skip Cells

```javascript
cellCollector = new CellCollector(indexer, {
  lock: {
    code_hash: 
      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
    hash_type: "type",
    args: "0xa528f2b9a51118b193178db4cf2f3db92e7df323",
  },
  skip: 100,
});

for await (const tx of cellCollector.collect()) {
  console.log(tx);
}
```

The `skip` field represents the number of cells being skipped, which in the above code snippet means it would skip the first 100 cells and return from the 101st. cell.

### Order Cells by Block Number by Setting the `order` Field

```javascript
cellCollector = new CellCollector(indexer, {
  lock: {
    code_hash: 
      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
    hash_type: "type",
    args: "0xa528f2b9a51118b193178db4cf2f3db92e7df323",
  },
  fromBlock: "0x253b40", // "0x" + 2440000n.toString(16)
  toBlock: "0x253f28", // "0x" + 2441000n.toString(16)
  order: "desc", // default option is "asc"
  skip: 300,
});

for await (const cell of cellCollector.collect()) {
  console.log(cell);
}
```

### Prefix Search on `args`

The default `argsLen` is -1, which means you pass the full slice of original args, and you can specify it when the `args` field is the prefix of original args.

```javascript
cellCollector = new CellCollector(indexer, {
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

for await (const cell of cellCollector.collect()) {
  console.log(cell);
}
```

We recommend to specify explicit length for the `argsLen` field. For example, the length is 20 in normal scenario and 28 in multisig scenario for lock script.  When the length is not certain, the `argsLen` field can be set as `any`. But there is performance lost when use `any` rather than explicitly specified length.

```javascript
cellCollector = new CellCollector(indexer, {
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

for await (const cell of cellCollector.collect()) {
  console.log(cell);
}
```

### Fine Grained Query for Cells

Fine grained query for cells can be achieved by using `ScriptWrapper` with customized options like `argsLen`:

```javascript
cellCollector = new CellCollector(indexer, {
  lock: {
    script: {
      code_hash: 
        "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
      hash_type: "type",
      args: "0xe60f7f88c94ef365d540afc1574c46bb017765", // trucate the last byte of original args: 0xe60f7f88c94ef365d540afc1574c46bb017765a2
    },
    argsLen: 20, 
  },
  type: {
    script: {
      code_hash: "0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e",
      hash_type: "type",
      args: "0x",
    },
    // when the `argsLen` is not setted here, it will use the outside `argsLen` config, which in this case is -1 by default
  }
});

for await (const cell of cellCollector.collect()) {
  console.log(cell);
}
```

### 

