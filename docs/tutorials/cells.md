---
id: cells
title: Cells
---
Cells are the primary state units in CKB, within them users can include arbitrary states. A cell has the following fields:

- `capacity` 

  - `capacity` represents the amount of CKB tokens stored in the cell.
  - `capacity` is also the size limit on how much information the cell can store.

  The basic unit for capacity is `shannon`, a bigger unit `CKByte`, or just `CKB` is also used. 1 CKB equals `10**8` shannons, 1 CKB also means the cell can store 1 byte of information. See below for how to calculate the total information size of a cell. 

- `data`: State data stored in this cell. It could be empty, however the total bytes used by a cell (including data), must be less than or equal to its capacity. `data`  is just a series of unformatted binary data. Depending on each DApp, anything could be stored in the cell `data` field:

  - Script code as explained in [Script](https://docs.nervos.org/docs/reference/script).
  - Token amount for User Defined Token cells.
  - Latest game stats for an on-chain fantasy game.

- `lock script`: `lock script` represents the ownership of a cell. When a specified cell is used as an input cell in a transaction, the `lock script` included in the cell is executed for signature verification. If the `lock script` fails in the verification, the transaction will be rejected.

- `type script`: `type script` is executed to validate cell structure of both input cells and output cells included in a transaction. Due to this nature, `type script` is typically used to validate DApp logic, such as creating UDTs.

For more information about the cell model, see [Cell Data Structure](https://docs.nervos.org/docs/reference/cell).

