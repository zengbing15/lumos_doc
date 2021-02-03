---
id: commonscripts
title: Common Scripts
---
The common scripts on Nervos CKB are integrated in the `@ckb-lumos/common-scripts` package. 

common, dao and sudt.

The `common` script supports common transaction tasks such as to `transfer` capacity from `fromInfos` to an address. The `common` script uses locktime pool cells first by default. The `common` script also provides APIs to integrate new customized lock scripts. `pw-lock` shows how to integrate customized scripts.

The `DAO` type script

`sudt`  The `SUDT` type script

| Script Name                   | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| anyone_can_pay                | The `ANYONE_CAN_PAY` type script                             |
|                               |                                                              |
|                               |                                                              |
| from_info                     | Lumos is designed to be able to treat multiple different wallets as a single unit |
| helper                        |                                                              |
| index                         |                                                              |
| locktime_pool                 | The `locktime_pool`script includes `secp256k1_blake160_multisig` cells with locktime in lock `args` (the`args` total length is 28 bytes, the last 8 bytes is a `since` format locktime in BigUInt64LE encode) and `DAO` step2 cells. |
| secp256k1_blake160            | The `secp256k1_blake` lock script                            |
| `secp256k1_blake160_multisig` | The `secp256k1_blake160_multisig` lock script                |
|                               |                                                              |

## Examples

### Use the `common` Script

The `secp256k1_blake160`, `secp256k1_blake160_multisig` and `locktime_pool` script are similar to the`common` script.

The following example shows show how to use the `common` script to transfer capacity to another address:

```javascript
const { common } = require('@ckb-lumos/common-scripts');
const { sealTransaction } = require("@ckb-lumos/helpers")
const { Indexer } = require("@ckb-lumos/indexer")

// We can use Indexer module as cell provider
const indexer = new Indexer("http://127.0.0.1:8114", "./indexer-data");

const tipHeader = {
  compact_target: '0x20010000',
  dao: '0x49bfb20771031d556c8480d47f2a290059f0ac7e383b6509006f4a772ed50200',
  epoch: '0xa0006002b18',
  hash: '0x432451e23c26f45eaceeedcc261764d6485ea5c9a204ac55ad755bb8dec9a079',
  nonce: '0x8199548f8a5ac7a0f0caef1620f37b79',
  number: '0x1aef6',
  parent_hash: '0x63594a64108f19f6aed53d0dca9ab4075aac4379cb80b2097b0deac8fc16fd3b',
  proposals_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
  timestamp: '0x172f6b9a4cf',
  transactions_root: '0x282dbadcd49f3e229d997875f37f4e4f19cb4f04fcf762e9639145aaa667b6f8',
  uncles_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
  version: '0x0'
}

const fromInfos = [
  "ckb1qyqwyxfa75whssgkq9ukkdd30d8c7txct0gq5f9mxs",
  {
    R: 0,
    M: 1,
    publicKeyHashes: ["0x36c329ed630d6ce750712a477543672adab57f4c"],
  },
]

let txSkeleton = TransactionSkeleton({ cellProvider: indexer })

// If using secp256k1_blake160_multisig lock script, put MultisigScript to `fromInfos` for generate signing messages.
// By default, `common.transfer` will use cells with locktime firstly. `tipHeader` is required when you want to spent cells with locktime.
txSkeleton = await common.transfer(
  txSkeleton,
  fromInfos,
  "ckb1qyqrdsefa43s6m882pcj53m4gdnj4k440axqdt9rtd",
  BigInt(3500 * 10 ** 8),
  tipHeader,
)

// Or you want to use cells without locktime firstly.
txSkeleton = await common.transfer(
  txSkeleton,
  fromInfos,
  "ckb1qyqrdsefa43s6m882pcj53m4gdnj4k440axqdt9rtd",
  BigInt(3500 * 10 ** 8),
  tipHeader,
  { useLocktimeCellsFirst: false }
)

// When you want to pay fee for transaction, just call `payFee`.
txSkeleton = await common.payFee(
  txSkeleton,
  fromInfos,
  BigInt(1*10**8),
  tipHeader,
)

// `prepareSigningEntries` will generate message for signing.
// Signing messages will fill in `txSkeleton.signingEntries`.
txSkeleton = await common.prepareSigningEntries(
  txSkeleton
)

// Then you can sign messages in order and get contents.
// NOTE: lumos not provided tools for generate signatures now.
// Call `sealTransaction` to get a transaction.
const tx = sealTransaction(txSkeleton, contents)

// Then you can send tx to a CKB node via RPC `send_transaction`.
```

### Use the `dao` Script

The following example shows how to use the `dao` script:

```javascript
const { dao } = require("@ckb-lumos/common-scripts")

let txSkeleton = TransactionSkeleton({ cellProvider: indexer })

// First, deposit capacity to dao.
txSkeleton = await dao.deposit(
  txSkeleton,
  "ckb1qyqrdsefa43s6m882pcj53m4gdnj4k440axqdt9rtd", // will gather inputs from this address.
  "ckb1qyqwyxfa75whssgkq9ukkdd30d8c7txct0gq5f9mxs", // will generate a dao cell with lock of this address.
  BigInt(1000*10**8),
)

// Using `listDaoCells` to list all deposited cells.
const daoDepositedCells = await dao.listDaoCells(
  indexer,
  "ckb1qyqwyxfa75whssgkq9ukkdd30d8c7txct0gq5f9mxs",
  "deposit",
)

// Or using `CellCollector`
const daoDepositedCellCollector = new dao.CellCollector(
  "ckb1qyqwyxfa75whssgkq9ukkdd30d8c7txct0gq5f9mxs",
  indexer,
  "deposit",
)

for await (const inputCell of daoDepositedCellCollector.collect()) {
  console.log(inputCell)
}

// And pick one to withdraw.
// `fromInfo` only required for multisig script.
txSkeleton = await dao.withdraw(
  txSkeleton,
  daoDepositedCells[0],
)

// Then if want to unlock dao withdrew cells, just use `common.transfer`.
```

### Use the `sudt` Script

The following script shows how to use the `sudt` script:

```javascript
const { sudt } = require("@ckb-lumos/common-scripts")
let txSkeleton = TransactionSkeleton({ cellProvider: indexer })

// issue an sudt token, will use the second param address to generate sudt token(it's lock hash).
txSkeleton = await sudt.issueToken(
  txSkeleton,
  "ckb1qyqrdsefa43s6m882pcj53m4gdnj4k440axqdt9rtd",
  10000n,
);

// and transfer sUDT
const sudtToken = "0x1f2615a8dde4e28ca736ff763c2078aff990043f4cbf09eb4b3a58a140a0862d"
txSkeleton = await sudt.transfer(
  txSkeleton,
  ["ckb1qyqrdsefa43s6m882pcj53m4gdnj4k440axqdt9rtd"],
  sudtToken,
  "ckb1qyqwyxfa75whssgkq9ukkdd30d8c7txct0gq5f9mxs",
  1000n,
  "ckb1qyqrdsefa43s6m882pcj53m4gdnj4k440axqdt9rtd",
);
```
