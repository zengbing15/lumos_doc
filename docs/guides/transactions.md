---
id: transactions
title: Transactions
---
Transactions are the most fundamental entities for interacting with Nervos CKB. 

## Data Structure

**Example**

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
  "witnesses": [
    "0x55000000100000005500000055000000410000004a975e08ff99fa000142ff3b86a836b43884b5b46f91b149f7cc5300e8607e633b7a29c94dc01c6616a12f62e74a1415f57fcc5a00e41ac2d7034e90edf4fdf800"
  ]
}
```

**Description**

| Field          | Type                             | Description                                                  |
| -------------- | -------------------------------- | ------------------------------------------------------------ |
| `version`      | uint32                           | Dependent cell set, provides read-only cells required by transaction verification. These must be references to living cells. |
| `cell_deps`    | [`CellDep`]                      | **An array of `outpoint` pointing to the cells that are dependencies of this transaction.** Only live cells can be listed here. The cells listed are read-only. |
| `header_deps`  | [`H256(hash)`]                   | **An array of `H256` hashes pointing to block headers that are dependencies of this transaction.** Notice maturity rules apply here: a transaction can only reference a header that is at least 4 epochs old. |
| `inputs`       | [`CellInput`]                    | **An array of referenced cell inputs.** See below for explanations of underlying data structure |
| `outputs`      | [`Cells`], see above for details | **An array of cells that are used as outputs**, i.e. the newly generated cells. These are the cells may be used as inputs for other transactions. Each of the Cell has the same structure to [the Cell section](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md#cell) above. |
| `outputs_data` | [`Bytes`]                        | **An array of cell data for each cell output.** The actual data are kept separated from outputs for the ease of CKB script handling and for the possibility of future optimizations. |
| `witnesses`    | [`Bytes`]                        | **Witnesses provided by transaction creator to make the execution of corresponding lock script success**. One example here, is that signatures might be include here to make sure a signature verification lock script passes. |

For more information about CKB transactions, see [Transaction](https://docs.nervos.org/docs/reference/transaction#docsNav) and [CKB RFC](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md#transaction).
