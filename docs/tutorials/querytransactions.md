---
id: querytransactions
title: Query on Transactions
---
> Transactions are the most fundamental entities for a DApp to interact with Nervos CKB. For more information about CKB transactions, see [Nervos Docs: Transaction](https://docs.nervos.org/docs/reference/transaction) and [CKB RFC: Data Structures](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md#transaction).

Lumos provides functions to support querying on transactions for specific query options.

## Query Options

Lumos supports to query on transactions for the options including <var>lock</var>, <var>type</var>, <var>argsLen</var>, <var>fromBlock</var>, <var>toBlock</var>, <var>skip</var> and <var>order</var>.

- <var>lock</var>: A lock script or a ScriptWrapper of a lock script.

- <var>type</var>: A type script or a ScriptWrapper of a type script.

  <!--The [ScriptWrapper](https://nervosnetwork.github.io/lumos/interfaces/base.scriptwrapper.html) interface combines <var>argsLen</var> and <var>ioType</var> with a lock or type script to enable fine-grained queries.-->

  For more information about [ScriptWrapper](https://nervosnetwork.github.io/lumos/interfaces/base.scriptwrapper.html), see [Fine-grained Query for Transactions](../tutorials/querytransactions#fine-grained-query-for-transactions).

- <var>argsLen</var>: The lock or type args length. The default value of <var>argsLen</var> is -1 for the query on a full slice of the args.

- <var>fromBlock</var>: The starting block number that the query returns.

- <var>toBlock</var>: The ending block number that the query returns.

- <var>skip</var>: The number of transactions being skipped for the Lumos indexer.

- <var>order</var>: The query result can be returned in order of block numbers. The default value is <var>asc</var> (ascending) for the returned result.

## Prerequisites

The following prerequisites apply for the examples in this guide:

- The development environment is set up. For more information, see [Set Up the Development Environment](http://localhost:3000/lumos_doc/docs/preparation/setupsystem).
- The CKB node is installed and started on DEV chain. For more information, see [Install a CKB Node](http://localhost:3000/lumos_doc/docs/preparation/installckb).
- The Lumos packages (`@ckb-lumos/base`, `@ckb-lumos/indexer`, `@ckb-lumos/helpers`, `@ckb-lumos/config-manager`, `@ckb-lumos/rpc`) are installed.

## Environment

The following examples are verified on Ubuntu 20.04.2. Steps on the other platforms can be adjusted accordingly.

## Examples

### Query Transactions by a Lock Script

The following example creates a new [TransactionCollector](https://nervosnetwork.github.io/lumos/classes/indexer.transactioncollector.html) to collect transactions for a specific lock script and returns the transactions with status.

Example:

```typescript title="hellolumos/src/querytransactions.ts/getTxsbyLock" {7}
import { INDEXER } from "./index";
import { Script, Transaction } from "@ckb-lumos/base";
import { TransactionCollector } from "@ckb-lumos/indexer";

export async function getTxsbyLock(lockScript: Script) {
  console.log("Get transactions by lock script:");
  const txCollector = new TransactionCollector(INDEXER, { lock: lockScript });
  const txs: Transaction[] = [];
  for await (const txWithStatus of txCollector.collect()) {
    //@ts-ignore
    const tx = txWithStatus.transaction;
    //@ts-ignore
    const txStatus = txWithStatus.tx_status.status;
    txs.push(tx);
    //console.log(txStatus);
  }
  return txs;
}
```

Try the `getTxsbyLock` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>

```shell {1,2,5,7-10}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, querytransactions } = require(".");
The server is started.
> const bob = accounts.BOB;
> const { parseAddress } = require("@ckb-lumos/helpers");
> const script = parseAddress(bob.ADDRESS);
> await querytransactions.getTxsbyLock(script);
Get transactions by lock script:
[
  {
    cell_deps: [ [Object] ],
    hash: '0x32a717c2af9160b800805796c68803213060df782834486c72cfbacbb0868d62',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object], [Object] ],
    outputs_data: [ '0x', '0x' ],
    version: '0x0',
    witnesses: [
      '0x55000000100000005500000055000000410000003056c419901742aeb36c95e0b3d17449f086ac9a551b7cce1fd67b61de2ff9c05a4730738de3a3c06cf0405276226508b8423cb29e187e58895fae0cfd2fe75d01'
    ]
  },
  {
    cell_deps: [ [Object] ],
    hash: '0x144ae79bc6064ae99e51b7105f4b61328dd4293d68d132b7a04d86409952ae2e',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object], [Object] ],
    outputs_data: [ '0x', '0x' ],
    version: '0x0',
    witnesses: [
      '0x550000001000000055000000550000004100000047441d4fea439fd06577eafadfe15c58e0a3aa13cbd13851d622b99c08e59b05354706bafeb411b1d244f022229ffd559a10a5b1cd545a699bdea824da420bf000'
    ]
  },
  {
    cell_deps: [ [Object] ],
    hash: '0x10104ec6857fd99b818e7b401216268c067ce7fbc536b77c86f3565c108e958e',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object], [Object] ],
    outputs_data: [ '0x', '0x' ],
    version: '0x0',
    witnesses: [
      '0x5500000010000000550000005500000041000000ec0fa41cca9234b12b7451e3894219c32af0a493d93bf1ec38d9fcccc5297c8a3598a427b4124e30329a3b4b80e885e89006d6b3abf65f385eccf19676977f4e00'
    ]
  }
]
```
</p>
</details>

### Query Transactions between Given Block Numbers

The following example fetches the transactions between [<var>fromBlock</var>, <var>toBlock</var>].

Example:

```typescript title="hellolumos/src/querytransactions.ts/getTxsbetweenBlocks" {10-14}
import { INDEXER } from "./index";
import { Script } from "@ckb-lumos/base";
import { TransactionCollector } from "@ckb-lumos/indexer";

export async function getTxsbetweenBlocks(
  lockScript: Script,
  fromBlock: string,
  toBlock: string
) {
  const txCollector = new TransactionCollector(INDEXER, {
    lock: lockScript,
    fromBlock,
    toBlock,
  });
  console.log("Get transactions between given blocks:");
  for await (const txWithStatus of txCollector.collect()) {
    console.log(txWithStatus);
  }
}
```
Try the `getTxsbetweenBlocks` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>

```shell {1,2,5,7-12}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, querytransactions } = require(".");
The server is started.
> const alice = accounts.ALICE;
> const { parseAddress } = require("@ckb-lumos/helpers");
> const script = parseAddress(alice.ADDRESS);
> const from = "0x801";
> const to = "0x804";
> await querytransactions.getTxsbetweenBlocks(script, from, to);
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

Example:

```typescript title="hellolumos/src/querytransactions.ts/getTxsandSkip" {6}
import { INDEXER } from "./index";
import { Script } from "@ckb-lumos/base";
import { TransactionCollector } from "@ckb-lumos/indexer";

export async function getTxsandSkip(lock: Script, skip: number) {
  const txCollector = new TransactionCollector(INDEXER, { lock, skip });
  console.log("Get transactions and skip the first", skip, "trasactions");
  for await (const txWithStatus of txCollector.collect()) {
    console.log(txWithStatus);
  }
}
```

### Order Transactions by Block Number

The following example creates a new [TransactionCollector](https://nervosnetwork.github.io/lumos/classes/indexer.transactioncollector.html) and uses the TransactionCollector to collect transactions in order of block numbers for a specific lock script. If the order is not specified, the default order is "asc" (ascending) for the returned result.

Example:

```typescript title="hellolumos/src/querytransactions.ts/getTxsandOrder" {6}
import { INDEXER } from "./index";
import { Script } from "@ckb-lumos/base";
import { TransactionCollector } from "@ckb-lumos/indexer";

export async function getTxsandOrder(lock: Script, order: "asc" | "desc") {
  const txCollector = new TransactionCollector(INDEXER, { lock, order });
  console.log("Get transactions in order of", order);
  for await (const txWithStatus of txCollector.collect()) {
    console.log(txWithStatus);
  }
}
```

### Prefix Search on <var>args</var>

To enable prefix search on the args of a lock script or a type script, <var>argsLen</var> can be assigned with a value other than the default value -1.

The lock script args length is **20** in normal scenarios and **28** in the multisig scenario. When the length is not certain, the <var>argsLen</var> parameter can be set as `any`. 

:::info

It is recommended to specify an explicit length for the <var>argsLen</var> parameter in a prefix search, that has better performance than using `any` for <var>argsLen</var>.

:::

Example:

```typescript title="hellolumos/src/querytransactions.ts/findTXsbyPrefix" {6}
import { INDEXER } from "./index";
import { Script } from "@ckb-lumos/base";
import { TransactionCollector } from "@ckb-lumos/indexer";

export async function findTXsbyPrefix(lock: Script, argsLen: number) {
  const txCollector = new TransactionCollector(INDEXER, { lock, argsLen });
  console.log("Prefix Search");
  for await (const txWithStatus of txCollector.collect()) {
    console.log(txWithStatus);
  }
}
```

### Fine-grained Query for Transactions

<!--Fine-grained query for transactions can be achieved by using [ScriptWrapper](https://nervosnetwork.github.io/lumos/interfaces/base.scriptwrapper.html) that combines <var>ioType</var>, <var>argsLen</var> with <var>script</var> (a lock script or a type script).--><!--The <var>ioType</var> option means the cell type that can be `input`, `output` or `both`.--><!--<var>argsLen</var> is the length of the script args in the ScriptWrapper. If <var>argsLen</var> is not specified, the <var>argsLen</var> config outside of the ScriptWrapper or the default value -1 will be used.-->

Fine-grained query can query on transactions at the granularity of a cell type, a lock or type script, and the args length of the lock or type script by using [ScriptWrapper](https://nervosnetwork.github.io/lumos/interfaces/base.scriptwrapper.html).

The query gets the transactions containing the cells in <var>ioType</var> ( `input` or `output` or `both`) and with a specific lock or type script, and the args length of the script is <var>argsLen</var>. The <var>argsLen</var> config in the ScriptWrapper takes priority over the <var>argsLen</var> config outside of the ScriptWrapper. If <var>argsLen</var> is not specified in the ScriptWrapper, the <var>argsLen</var> config outside of the ScriptWrapper or the default value -1 will be used.

The following example is the fine-grained query for transactions on a ScriptWrapper that wraps a lock script, a lock args length and a cell type.

Example:

```typescript title="hellolumos/src/querytransactions.ts/finegrainedSearch" {10-14}
import { INDEXER } from "./index";
import { Script, ScriptWrapper } from "@ckb-lumos/base";
import { TransactionCollector } from "@ckb-lumos/indexer";

export async function finegrainedSearch(
  lockScript: Script,
  argslen: number,
  iotype: "output" | "input" | "both"
) {
  const lock: ScriptWrapper = {
    script: lockScript,
    ioType: iotype,
    argsLen: argslen,
  };
  const txCollector = new TransactionCollector(INDEXER, {
    lock,
  });
  console.log("Fine Grained Query");
  for await (const txWithStatus of txCollector.collect()) {
    console.log(txWithStatus);
  }
}
```

Try the `finegrainedSearch` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>


```shell {1,2,5,7-10}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, querytransactions } = require(".");
The server is started.
> const bob = accounts.BOB;
> const { parseAddress } = require("@ckb-lumos/helpers");
> const script = parseAddress(bob.ADDRESS);
> await querytransactions.finegrainedSearch(script, 20, "output");
//The result shows the transactions that produced output cells with Bob's lock script.
//Bob received CKB capacity in these transactions.
Fine Grained Query
{
  transaction: {
    cell_deps: [ [Object] ],
    hash: '0x32a717c2af9160b800805796c68803213060df782834486c72cfbacbb0868d62',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object], [Object] ],
    outputs_data: [ '0x', '0x' ],
    version: '0x0',
    witnesses: [
      '0x55000000100000005500000055000000410000003056c419901742aeb36c95e0b3d17449f086ac9a551b7cce1fd67b61de2ff9c05a4730738de3a3c06cf0405276226508b8423cb29e187e58895fae0cfd2fe75d01'
    ]
  },
  tx_status: {
    block_hash: '0xc21b34b009d5e355357eb55d9ee3456c6a90632434cff8dc515b2f0a207f854c',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [ [Object] ],
    hash: '0x144ae79bc6064ae99e51b7105f4b61328dd4293d68d132b7a04d86409952ae2e',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object], [Object] ],
    outputs_data: [ '0x', '0x' ],
    version: '0x0',
    witnesses: [
      '0x550000001000000055000000550000004100000047441d4fea439fd06577eafadfe15c58e0a3aa13cbd13851d622b99c08e59b05354706bafeb411b1d244f022229ffd559a10a5b1cd545a699bdea824da420bf000'
    ]
  },
  tx_status: {
    block_hash: '0x2d70e178be2447f784d9c8c1c52630d10b3b3b23575896e61ff15983a7e5ba59',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [ [Object] ],
    hash: '0x10104ec6857fd99b818e7b401216268c067ce7fbc536b77c86f3565c108e958e',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object], [Object] ],
    outputs_data: [ '0x', '0x' ],
    version: '0x0',
    witnesses: [
      '0x5500000010000000550000005500000041000000ec0fa41cca9234b12b7451e3894219c32af0a493d93bf1ec38d9fcccc5297c8a3598a427b4124e30329a3b4b80e885e89006d6b3abf65f385eccf19676977f4e00'
    ]
  },
  tx_status: {
    block_hash: '0x64623c86af1df458caac8a1433e50ae7ffc228aaa1975d60ed03dfe3ec4ca3fc',
    status: 'committed'
  }
}
```

</p>
</details>

### Get Transaction Status and Block Hash

A transaction can be in one of the following status:

- A **pending** result means the transaction is in the pool, and not proposed yet.
- A **proposed** result means the transaction is in the pool, and can be committed in the next block.
- A **committed** result means that the block involving the transaction has been mined and is officially on chain.

The following example uses the [get_transaction](https://nervosnetwork.github.io/lumos/classes/rpc.rpc-2.html#get_transaction) function of the `@ckb-lumos/rpc` package to get the transaction information for a specific transaction hash.

Example: 

```typescript title="hellolumos/src/querytransactions.ts/getTxsbyHash" {5}
import { RPC } from "@ckb-lumos/RPC";
const rpc = new RPC("http://127.0.0.1:8114");

export async function getTxsbyHash(txHash: string) {
  const txWithStatus = await rpc.get_transaction(txHash);

  const status = txWithStatus?.tx_status.status;
  const blockHash = txWithStatus?.tx_status.block_hash;
  console.log("The transaction status is", status);
  console.log("The block hash for the transaction is", blockHash);
}
```

Try the `getTxsbyHash` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>


```shell {1,2,5,7}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { querytransactions } = require(".");
The server is started.
> await querytransactions.getTxsbyHash("0x10104ec6857fd99b818e7b401216268c067ce7fbc536b77c86f3565c108e958e");
The transaction status is committed
The block hash for the transaction is 0x64623c86af1df458caac8a1433e50ae7ffc228aaa1975d60ed03dfe3ec4ca3fc
```

</p>
</details>