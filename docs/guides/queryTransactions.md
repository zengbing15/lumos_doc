---
id: querytransactions
title: Query on Transactions
---
> Transactions are the most fundamental entities for a DApp to interact with Nervos CKB. For more information about CKB transactions, see [Nervos Docs: Transaction](https://docs.nervos.org/docs/reference/transaction) and [CKB RFC: Data Structures](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md#transaction).

Lumos supports querying on transactions for specific query options.

## Query Options

Lumos supports to query on transactions for the options including <var>lock</var>, <var>type</var>, <var>argsLen</var>, <var>fromBlock</var>, <var>toBlock</var>, <var>skip</var> and <var>order</var>.

- <var>lock</var>: A lock script or a ScriptWrapper of a lock script.

- <var>type</var>: A type script or a ScriptWrapper of a type script.

  <!--The [ScriptWrapper](https://nervosnetwork.github.io/lumos/interfaces/base.scriptwrapper.html) interface combines <var>argsLen</var> and <var>ioType</var> with a lock or type script to enable fine-grained queries.-->

  For more information about [ScriptWrapper](https://nervosnetwork.github.io/lumos/interfaces/base.scriptwrapper.html), see [Fine-grained Query for Transactions](../guides/querytransactions#fine-grained-query-for-transactions).

- <var>argsLen</var>: The lock or type args length. The default value of <var>argsLen</var> is -1 for the query on a full slice of the args.

- <var>fromBlock</var>: The starting block number that the query returns.

- <var>toBlock</var>: The ending block number that the query returns.

- <var>skip</var>: The number of transactions being skipped for the Lumos indexer.

- <var>order</var>: The query result can be returned in order of block numbers. The default value is <var>asc</var> (ascending) for the returned result.

## Prerequisites

The following prerequisites apply for the examples in this guide:

- The development environment is set up. For more information, see [Set Up the Development Environment](http://localhost:3000/lumos_doc/docs/preparation/setupsystem).
- The Lumos packages are installed. For more information, see [Install Lumos Packages](../guides/installlumos).

## Environment

The following examples are verified on Ubuntu 20.04.2. Steps on the other platforms can be adjusted accordingly.

## Examples

### Query Transactions by a Lock Script

The following example creates a new [TransactionCollector](https://nervosnetwork.github.io/lumos/classes/indexer.transactioncollector.html) to collect transactions for a specific lock script and returns the transactions with status.

Example:

```typescript title="hellolumos/src/querytransactions.ts/getTXsbyLock" {7}
import { INDEXER } from "./index";
import { Script, Transaction } from "@ckb-lumos/base";
import { TransactionCollector } from "@ckb-lumos/indexer";

export async function getTXsbyLock(lockScript: Script) {
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

Try the `getTXsbyLock` function in the Node.js REPL mode:

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
> await querytransactions.getTXsbyLock(script);
Get transactions by lock script:
[
  {
    cell_deps: [ [Object] ],
    hash: '0x22cc789bdaa8e021caa303cf20cfa4063b46a17abd62b31aa2cf712844f984cb',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object], [Object] ],
    outputs_data: [ '0x', '0x' ],
    version: '0x0',
    witnesses: [
      '0x5500000010000000550000005500000041000000ac5500c3bb4487dbb7b034cd0fb4faec9a29645076d00c041e2a16bfb45c4e0c68d6470c1bd0afb9d0a1d973210896a27bbaef3f23864ac6a716b6291fb226be00'                                                                                    
    ]
  },
  {
    cell_deps: [ [Object] ],
    hash: '0x46e6e4fd23263aa8983f73962faca0bd9d40463c2e42bbcd190249e3ec6bd5f8',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object], [Object] ],
    outputs_data: [ '0x', '0x' ],
    version: '0x0',
    witnesses: [
      '0x550000001000000055000000550000004100000071222e2b88f03b643fce53e81ff281b31a0a4a11f3eb31793064586d94ad66b578e148340c980460a63fb2d31fe7e320e59c20e921fc2aa40b8b01840763b05601'
    ]
  },
  {
    cell_deps: [ [Object] ],
    hash: '0x1f279591dca01710f1e5f71480ffe9039887212ade07b025b84a3d0b19f9a2bb',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object], [Object] ],
    outputs_data: [ '0x', '0x' ],
    version: '0x0',
    witnesses: [
      '0x5500000010000000550000005500000041000000189e5d1d8df5b92dea79828ec074de83c03635d5a3f9e800736d576b074b03ca7c2553bff3b4f5fa38c8663dc6b976b0cd96127364bcdd2a49d454ce657b3ea801'
    ]
  }
]
```
</p>
</details>

### Query Transactions between Given Block Numbers

The following example fetches the transactions between [<var>fromBlock</var>, <var>toBlock</var>].

Example:

```typescript title="hellolumos/src/querytransactions.ts/getTXsbetweenBlocks" {10-14}
import { INDEXER } from "./index";
import { Script } from "@ckb-lumos/base";
import { TransactionCollector } from "@ckb-lumos/indexer";

export async function getTXsbetweenBlocks(
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
Try the `getTXsbetweenBlocks` function in the Node.js REPL mode:

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
> const from = "0x11";
> const to = "0x15";
> await querytransactions.getTXsbetweenBlocks(script, from, to);
Get transactions between given blocks:
{
  transaction: {
    cell_deps: [],
    hash: '0xa4e46a4d656c849ecee9b80fb2490967b0a89a6fd767acddc59ddd7d1013d1a9',
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
    block_hash: '0xe87b33e3b499ede1390cf12ec1f2df772762fa7cc981c55fe3753a01fcc52d14',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [],
    hash: '0x8e4eded5087d8341e739885d4dd39b78661fde80c711a42b4aeee856de4d5d1c',
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
    block_hash: '0xf410bc8b58e5edcc0f6f9277a3d4c1ada599884b7395ad2a57f65643051c5752',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [],
    hash: '0x4b4e37eda430c4c288398b518e00a93eae0fa979f65dc4f874feb2f4c8b5ae0b',
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
    block_hash: '0xb8166998d66f21d8b2b46c30a935a66c9f13ed6fb0dafa43679d6b781046f1eb',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [],
    hash: '0xc5e1990313383e57bbd7954808731c35666fe73b58a8c2c6bd5531a59af95e22',
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
    block_hash: '0xb0b006d8b1df2bbd67a0effabc9a018874f45eed06f9e299b169e2f17ef62b20',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [],
    hash: '0xeb37d08d17356435bc52dedcea5780b282ab40979ed0321cde12c91b9325ac86',
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
    block_hash: '0x6a6c07981e60d3a0e021c14c61d0962947724a616c64ff64a6e583f4e3409c5d',
    status: 'committed'
  }
}
```
</p>
</details>

### Skip Transactions

The <var>skip</var> query option represents the number of transactions being skipped.

Example:

```typescript title="hellolumos/src/querytransactions.ts/getTXsandSkip" {6}
import { INDEXER } from "./index";
import { Script } from "@ckb-lumos/base";
import { TransactionCollector } from "@ckb-lumos/indexer";

export async function getTXsandSkip(lock: Script, skip: number) {
  const txCollector = new TransactionCollector(INDEXER, { lock, skip });
  console.log("Get transactions and skip the first", skip, "trasactions");
  for await (const txWithStatus of txCollector.collect()) {
    console.log(txWithStatus);
  }
}
```

Try the `getTXsandSkip` function in the Node.js REPL mode:

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
> await querytransactions.getTXsandSkip(script, 2);
Get transactions and skip the first 2 trasactions
{
  transaction: {
    cell_deps: [ [Object] ],
    hash: '0x1f279591dca01710f1e5f71480ffe9039887212ade07b025b84a3d0b19f9a2bb',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object], [Object] ],
    outputs_data: [ '0x', '0x' ],
    version: '0x0',
    witnesses: [
      '0x5500000010000000550000005500000041000000189e5d1d8df5b92dea79828ec074de83c03635d5a3f9e800736d576b074b03ca7c2553bff3b4f5fa38c8663dc6b976b0cd96127364bcdd2a49d454ce657b3ea801'
    ]
  },
  tx_status: {
    block_hash: '0x29acfca00bb07d94791c0f14685d40820ac198b771c894e45755bb55018fa6ea',
    status: 'committed'
  }
}
```

</p>
</details>

### Order Transactions by Block Number

The following example creates a new [TransactionCollector](https://nervosnetwork.github.io/lumos/classes/indexer.transactioncollector.html) and uses the TransactionCollector to collect transactions in order of block numbers for a specific lock script. If the order is not specified, the default order is "asc" (ascending) for the returned result.

Example:

```typescript title="hellolumos/src/querytransactions.ts/getTXsandOrder" {6}
import { INDEXER } from "./index";
import { Script } from "@ckb-lumos/base";
import { TransactionCollector } from "@ckb-lumos/indexer";

export async function getTXsandOrder(lock: Script, order: "asc" | "desc") {
  const txCollector = new TransactionCollector(INDEXER, { lock, order });
  console.log("Get transactions in order of", order);
  for await (const txWithStatus of txCollector.collect()) {
    console.log(txWithStatus);
  }
}
```

### Prefix Search on <var>args</var>

To enable prefix search on args of lock scripts or type scripts, a value can be specified for <var>argsLen</var> instead of the default value of **-1**. The default value is used for a query on the full slice of args of a lock script or a type script.

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


```shell {1,2,5,7-10,68}
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
# The result shows the transactions that produced output cells with Bob's lock script.
# Bob received CKB capacity in these transactions.
Fine Grained Query
{
  transaction: {
    cell_deps: [ [Object] ],
    hash: '0x22cc789bdaa8e021caa303cf20cfa4063b46a17abd62b31aa2cf712844f984cb',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object], [Object] ],
    outputs_data: [ '0x', '0x' ],
    version: '0x0',
    witnesses: [
      '0x5500000010000000550000005500000041000000ac5500c3bb4487dbb7b034cd0fb4faec9a29645076d00c041e2a16bfb45c4e0c68d6470c1bd0afb9d0a1d973210896a27bbaef3f23864ac6a716b6291fb226be00'                                                                                    
    ]
  },
  tx_status: {
    block_hash: '0x6d60ae47167a78fbcf254c81b1d6356aceef2feeb4e039fed693c274a83faac1',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [ [Object] ],
    hash: '0x46e6e4fd23263aa8983f73962faca0bd9d40463c2e42bbcd190249e3ec6bd5f8',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object], [Object] ],
    outputs_data: [ '0x', '0x' ],
    version: '0x0',
    witnesses: [
      '0x550000001000000055000000550000004100000071222e2b88f03b643fce53e81ff281b31a0a4a11f3eb31793064586d94ad66b578e148340c980460a63fb2d31fe7e320e59c20e921fc2aa40b8b01840763b05601'                                                                                    
    ]
  },
  tx_status: {
    block_hash: '0x63539ac9bc533bfb16e00cfaf736ebc041442fd3c3c6e8796b53cbdec0fb7af4',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [ [Object] ],
    hash: '0x1f279591dca01710f1e5f71480ffe9039887212ade07b025b84a3d0b19f9a2bb',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object], [Object] ],
    outputs_data: [ '0x', '0x' ],
    version: '0x0',
    witnesses: [
      '0x5500000010000000550000005500000041000000189e5d1d8df5b92dea79828ec074de83c03635d5a3f9e800736d576b074b03ca7c2553bff3b4f5fa38c8663dc6b976b0cd96127364bcdd2a49d454ce657b3ea801'
    ]
  },
  tx_status: {
    block_hash: '0x29acfca00bb07d94791c0f14685d40820ac198b771c894e45755bb55018fa6ea',
    status: 'committed'
  }
}
> await querytransactions.finegrainedSearch(script, 20, "input");
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

```typescript title="hellolumos/src/querytransactions.ts/getTXbyHash" {5}
import { RPC } from "@ckb-lumos/RPC";
const rpc = new RPC("http://127.0.0.1:8114");

export async function getTXbyHash(txHash: string) {
  const txWithStatus = await rpc.get_transaction(txHash);

  const status = txWithStatus?.tx_status.status;
  const blockHash = txWithStatus?.tx_status.block_hash;
  console.log("The transaction status is", status);
  console.log("The block hash for the transaction is", blockHash);
}
```

Try the `getTXbyHash` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>


```shell {1,2,5,7}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { querytransactions } = require(".");
The server is started.
> await querytransactions.getTXbyHash("0x46e6e4fd23263aa8983f73962faca0bd9d40463c2e42bbcd190249e3ec6bd5f8");
The transaction status is committed
The block hash for the transaction is 0x63539ac9bc533bfb16e00cfaf736ebc041442fd3c3c6e8796b53cbdec0fb7af4
```

</p>
</details>