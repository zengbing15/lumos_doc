---
id: querytransactions
title: Query on Transactions
---
> Transactions are the most fundamental entities for a DApp to interact with Nervos CKB. For more information about CKB transactions, see [Transaction](https://docs.nervos.org/docs/reference/transaction#docsNav) and [CKB RFC](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md#transaction).

Lumos provides the [TransactionCollector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/indexer/lib/index.js#L479) class to support querying on transactions according to specific query options.

## Environment

The following examples are verified on Ubuntu 20.04.2. Steps on the other platforms are similar and can be adjusted accordingly.

## Examples

### Query Transactions by a Lock Script

The following example creates a new TransactionCollector to collect transactions for a specific lock script and returns the result with status.

Example: <u>hellolumos/src/querytransactions.ts/getTxbyLock()</u>

```typescript title="hellolumos/src/querytransactions.ts"
import {INDEXER} from "./index";
import { Script, Transaction } from "@ckb-lumos/base";
import { TransactionCollector } from "@ckb-lumos/indexer";

export async function getTxbyLock (
  lockScript: Script,
) {
  console.log("Get transactions by lock script:");
  const txCollector = new TransactionCollector(INDEXER,{lock:lockScript});
  const txs:Transaction[]= [];
  for await (const txWithStatus of txCollector.collect()) {
    
    const tx = txWithStatus.transaction; 
    const txStatus=txWithStatus.tx_status.status;
    txs.push(tx);
    //console.log(txStatus);
  }
  return txs;
}

```

Try the `getTxbyLock` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>

```shell
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, querytransactions }=require(".");
The server is started.
> const alice = accounts.ALICE;
> const script={
  code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
  hash_type: "type",
  args: alice.ARGS,
 };
> await querytransactions.getTxbyLock(script);
Get transactions by lock script:
[
  {
    cell_deps: [],
    hash: '0x84a1ff885e82f1d48813968994f63eae22df5baf65519240fc74811ba3b31e92',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object] ],
    outputs_data: [ '0x' ],
    version: '0x0',
    witnesses: [
      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'
    ]
  },
  {
    cell_deps: [],
    hash: '0xbdc50e04c88978fe53debe989863855b2e3e4be02dd989c6f8771a2b263ef213',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object] ],
    outputs_data: [ '0x' ],
    version: '0x0',
    witnesses: [
      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'
    ]
  },
...
```
</p>
</details>

### Query Transactions between Given Block Numbers

The following example fetches the transactions between `[fromBlock, toBlock]`. Both `fromBlock` and `toBlock` are included in the queryOptions.

Example: <u>hellolumos/src/querytransactions.ts/getTxbetweenBlocks()</u>

```typescript title="hellolumos/src/querytransactions.ts"
export async function getTxbetweenBlocks (
    lockScript: Script,
    fromBlock: string,
    toBlock: string
  )  {
    const txCollector = new TransactionCollector(INDEXER,{lock:lockScript,fromBlock:fromBlock,toBlock:toBlock});
    console.log("Get transactions between given blocks:");
    for await (const txWithStatus of txCollector.collect()) {
        console.log(txWithStatus);
    }
}
```
Try the `getTxbetweenBlocks` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>

```shell
> const from="0x801";
> const to="0x804";
> await querytransactions.getTxbetweenBlocks(script,from,to);
Get transactions between given blocks:
{
  transaction: {
    cell_deps: [],
    hash: '0x5457bae99ab4cea79c78d4b239a92b5e30580cd1dda6637a7a661991704020cd',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object] ],
    outputs_data: [ '0x' ],
    version: '0x0',
    witnesses: [
      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'
    ]
  },
  tx_status: {
    block_hash: '0x0c6c197f43b4a27b6c881a2f01d9c4ba8abf2244e2284afa0f1b737979500fbe',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [],
    hash: '0xb2bf608b9e0499fb8679af8b4126c4921fadfdb6efa0a5375e3aaa0676fc65ae',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object] ],
    outputs_data: [ '0x' ],
    version: '0x0',
    witnesses: [
      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'
    ]
  },
  tx_status: {
    block_hash: '0x40c9b99ebb5da3888efb6fbc63fd13b4425a1b81b2a4271fb99a3ba29de9a55c',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [],
    hash: '0x59dd00d1444d346b71b8a0c94ea0d418b8a4c85d86040485c145a8a60725cad0',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object] ],
    outputs_data: [ '0x' ],
    version: '0x0',
    witnesses: [
      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'
    ]
  },
  tx_status: {
    block_hash: '0xd0c09a6615b30f685dd0b0e627021f89e0f35e9b59c575001d8a11f63436b76c',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [ [Object] ],
    hash: '0xe332fb6efba38e16b8fd20a4f47d5fffcf8fcac0c863b0eb30ef75067847936d',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object], [Object] ],
    outputs_data: [ '0x', '0x' ],
    version: '0x0',
    witnesses: [
      '0x5500000010000000550000005500000041000000709026a75b82aca580d758c62eceaa9982b81057146a6c0205db3ee7b5581e3201d3ccd5845ea6d25b9b977f98f7c1c74efe4c38292b654d03fa2d037fa0777b01'
    ]
  },
  tx_status: {
    block_hash: '0xd0c09a6615b30f685dd0b0e627021f89e0f35e9b59c575001d8a11f63436b76c',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [],
    hash: '0xea8f658e6ea08c38f58f6a0af3530396aba0e51e1064db8626ecd38976625c34',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object] ],
    outputs_data: [ '0x' ],
    version: '0x0',
    witnesses: [
      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'
    ]
  },
  tx_status: {
    block_hash: '0xbae60c9c4f54d6f6a970fb76c2fdd226a83dd8724cff082157da559ce6cf507f',
    status: 'committed'
  }
}
```
</p>
</details>

### Skip Transactions

The <var>skip</var> query option represents the number of transactions being skipped.

Example: <u>hellolumos/src/querytransactions.ts/getTxandSkip()</u>

```typescript title="hellolumos/src/querytransactions.ts"
export async function getTxandSkip (
    lockScript: Script,
    skip: number
  )  {
    const txCollector = new TransactionCollector(INDEXER,{lock:lockScript,skip:skip});
    console.log("Get transactions and skip the first", skip, "trasactions");
    for await (const txWithStatus of txCollector.collect()) {
        console.log(txWithStatus);
    }
}
```

### Order Transactions by Block Number

The following example creates a new TransactionCollector and uses the TransactionCollector to collect transactions in order of block numbers for a specific lock script. If the order is not specified, the default order is "asc" for the returned result.

Example: <u>hellolumos/src/querytransactions.ts/getTxandOrder()</u>

```typescript title="hellolumos/src/querytransactions.ts"
export async function getTxandOrder (
    lockScript: Script,
    order: "asc"|"desc"
  )  {
    const txCollector = new TransactionCollector(INDEXER,{lock:lockScript,order:order});
    console.log("Get transactions in order of", order);
    for await (const txWithStatus of txCollector.collect()) {
        console.log(txWithStatus);
    }
}
```

### Prefix Search on <var>args</var>

The default value of <var>argsLen</var> is -1 for the query on a full slice of the args of a lock script.

You can specify <var>argsLen</var> with a value other than the default value to enable the prefix search on the args of a lock script.

> It is recommended to specify an explicit length for the <var>argsLen</var> parameter. For example, the length is **20** in normal scenarios and **28** in the multisig scenario for the lock script. When the length is not certain, the <var>argsLen</var> parameter can be set as `any`. But there is performance lost when using `any` rather than an explicit length.

Example: <u>hellolumos/src/querytransactions.ts/prefixSearch()</u>

```typescript title="hellolumos/src/querytransactions.ts"
export async function prefixSearch  (
    lockScript: Script,
    argslen : number
  )  {
    const txCollector = new TransactionCollector(INDEXER,{lock:lockScript,argsLen:argslen});
    console.log("Prefix Search");
    for await (const txWithStatus of txCollector.collect()) {
        console.log(txWithStatus);
    }
}
```

### Fine Grained Query for Transactions

Fine Grained Query for Transactions can be achieved by using [ScriptWrapper](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/base/index.d.ts#L351) with customized options like <var>ioType</var>, <var>argsLen</var>.

The value for the <var>ioType</var> field is among `input | output | both`.

Example: <u>hellolumos/src/querytransactions.ts/fineGrainedQuery()</u>

```typescript title="hellolumos/src/querytransactions.ts"
import { ScriptWrapper} from "@ckb-lumos/base";

export async function fineGrainedQuery  (
    lockScript: Script,
    typescript : Script,
    argslen: number,
    iotype:"output"|"input"|"both"
    ) {
    const type:ScriptWrapper = {
      script:typescript,
      ioType:iotype,
      argsLen: argslen
    }
    const txCollector = new TransactionCollector(INDEXER,{lock:lockScript,type:type});
    console.log("Fine Grained Query");
    for await (const txWithStatus of txCollector.collect()) {
        console.log(txWithStatus);
    }
}
```

Try the `fineGrainedQuery` function in the Node.js REPL mode:


```shell

```
### Get Transaction Status and Block Hash

> A transaction can be in one of the following status:
>
> - A **pending** result means the node is aware of the transaction but the transaction is not confirmed yet.
>
> - A **proposed** result means the node sees a transaction included in a block candidate that is not yet mined.
>
> - A **committed** result means that the block involving the transaction has been mined and is officially on chain.

The following example uses the get_transaction function to get the transaction information (status, block_hash) for a specific transaction hash.

Example: <u>hellolumos/src/querytransactions.ts/getTXStatus()</u>

```typescript title="hellolumos/src/querytransactions.ts"
import { RPC } from "@ckb-lumos/RPC";
const rpc = new RPC("http://127.0.0.1:8114");

export async function getTXStatus  (
  txHash: string
)   {
  const txWithStatus = await rpc.get_transaction(txHash);
  
  const status = txWithStatus?.tx_status.status;
  const blockhash = txWithStatus?.tx_status.block_hash;
  console.log("The transaction status is",status);
  console.log("The block hash for the transaction is",blockhash);
}
```

