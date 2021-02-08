---
id: sudt
title: SUDT
---

Simple User Defined Tokens (Simple UDT or SUDT) provides a way for DApp developers to issue custom tokens on Nervos CKB. The simple part in Simple UDT means we are defining a minimal standard that contains what’s absolutely needed, more sophisticated actions are left to CKB’s flexibility to achieve.

For more information about SUDT, see [RFC: Simple UDT Draft Spec](https://talk.nervos.org/t/rfc-simple-udt-draft-spec/4333).

## Data Structure

A SUDT cell contains the following fields:

```
data:
    amount: uint128
type:
    code_hash: simple_udt type script
    args: owner lock script hash (...)
lock:
    <user_defined>
```

## Get SUDT Balance

```javascript
import { getConfig } from "@ckb-lumos/config-manager";
import { Cell, utils } from "@ckb-lumos/base";

const { lockScript, sudtArgs } = params;

  const collector = indexer.collector({
    lock: lockScript,
    type: {
      args: sudtArgs,
      code_hash: getConfig().SCRIPTS["SUDT"].CODE_HASH,
      hash_type: getConfig().SCRIPTS["SUDT"].HASH_TYPE,
    },
  });

  const cells: Cell[] = [];
  for await (const cell of collector.collect()) {
    cells.push(cell);
  }
  let sum = BigInt(0);
  return cells
    .map((cell) => utils.readBigUInt128LE(cell.data))
    .reduce((sum, amount) => (sum = sum += amount));
```

## Issue SUDT

```javascript
import {sudt, common} from "@ckb-lumos/common-scripts";
const { sender, amount, txFee } = params;

  let txSkeleton = TransactionSkeleton({
    cellProvider: indexer,
  });

  txSkeleton = await sudt.issueToken(txSkeleton, sender, BigInt(amount));
  txSkeleton = await common.payFee(txSkeleton, [sender], BigInt(txFee));
  txSkeleton = await common.prepareSigningEntries(txSkeleton);

  return txSkeleton;
```

## Transfer SUDT

```javascript
  const { sender, recipient, udtHash, amount, txFee } = params;

  let txSkeleton = TransactionSkeleton({
    // @ts-ignore
    cellProvider: indexer,
  });

  txSkeleton = await sudt.transfer(
    txSkeleton,
    [sender],
    udtHash,
    recipient,
    BigInt(amount)
  );

  txSkeleton = await common.payFee(txSkeleton, [sender], BigInt(txFee));
  txSkeleton = await common.prepareSigningEntries(txSkeleton);

  return txSkeleton;
```

