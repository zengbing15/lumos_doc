---
id: cells
title: Cells
---
A Cell is the most basic structure that represents a single piece of data in Nervos. The data contained in a Cell can take many forms, including CKBytes, tokens, code like JavaScript code, or even serialized data like JSON strings.

## Data Structure

**Example**

```
{
  "capacity": "0x19995d0ccf",
  "lock": {
    "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
    "args": "0x0a486fb8f6fe60f76f001d6372da41be91172259",
    "hash_type": "type"
  },
  "type": null
}
```

**Description**

| Field              | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `capacity`         | <ul><li>The amount of CKB tokens stored in the cell.</li><li>The size limit on how much information the cell can store.</li></ul>The basic unit for `capacity` is `shannon`. A bigger unit `CKByte`, or just `CKB` is also used. 1 CKB equals `10**8` shannons. 1 CKB also means the cell that can store 1 byte of information. |
| `data`             | State data stored in this cell.<br/>The following data can be stored in the `data` field:<ul><li>Script code as explained in [Script](https://docs.nervos.org/docs/reference/script).</li><li>Token amount for User Defined Token cells.</li><li>The latest game states for an on-chain fantasy game.</li></ul>**Note**: The `data` field can be empty. The total bytes used by a cell (including data) must be less than or equal to the capacity of the cell. |
| `lock`&nbsp;script | The ownership of a cell.<br/>When a specified cell is used as an input cell in a transaction, the `lock script` included in the cell is executed for signature verification. If the `lock script` fails in the verification, the transaction will be rejected. |
| `type`&nbsp;script | The script to be executed to validate the structure of both input cells and output cells included in a transaction.<br/>`type` script is typically used to validate a DApp logic, such as creating UDTs. |

For more information about the cell model, see [Cell Data Structure](https://docs.nervos.org/docs/reference/cell) and [CKB RFC](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#42-cell).
