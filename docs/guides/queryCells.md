---
id: querycells
title: Query on Cells
---

> Cells are the primary state units in CKB and are assets owned by users. A cell is the most basic structure that represents a single piece of data in Nervos. The data contained in a cell can take many forms, including CKBytes, tokens, code like JavaScript code, or even serialized data like JSON strings. For more information about the cell model, see [Nervos Docs: Cell](https://docs.nervos.org/docs/reference/cell) and [CKB RFC: CKB Cell](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#42-cell).

Querying on cells are the fundamental functions for a DApp to respond to user queries and transaction requests. Lumos provides functions for the queries on cells with specific query options.

The following example is a cell retrieved by Lumos query functions:

:::note

Lumos enriches the cell structure defined in [CKB RFC: Cell](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#42-cell) with some customized fields (`out_point`, `block_hash` and `block_number`). 

:::

```typescript
{
  cell_output: {
    capacity: '0x2ecbd7d7dc',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0x0db73acbbbb04bb1b52153d30ef7486b191b5e376dcc6bc1439b3a6ed2a451d8',
    index: '0x0'
  },
  block_hash: '0x353b8153561400ed623ef295edb7488025ff517a119770cf0c9dca886f193c5a',
  block_number: '0x16',
  data: '0x'
}
```

<!--The [Indexer.collector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/indexer/lib/index.js#L242) function of the `@ckb-lumos/indexer` package can be used to collect cells by specific query options (<var>lock</var>, <var>type</var>, <var>argsLen</var>, <var>data</var>, <var>fromBlock</var>, <var>toBlock</var>, <var>skip</var>) and return the cells as the result.--><!--The [Indexer.collector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/sql-indexer/lib/index.js#L571) function of the `@ckb-lumos/sql-indexer` package can be used to collect cells by specific query options (<var>lock</var>, <var>type</var>, <var>argsLen</var>, <var>data</var>) and return the cells as the result.--><!--The [CellCollector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/indexer/lib/index.js#L324) class of the `@ckb-lumos/indexer` package supports query on cells with specific query options (<var>lock</var>, <var>type</var>, <var>argsLen</var>, <var>data</var>, <var>fromBlock</var>, <var>toBlock</var>, <var>order</var>, <var>skip</var>) and returns the cells as the result.--><!--The [CellCollector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/sql-indexer/lib/index.js#L622) class of the `@ckb-lumos/sql-indexer` package supports query on cells with specific query options (<var>lock</var>, <var>type</var>, <var>argsLen</var>, <var>data</var>, <var>fromBlock</var>, <var>toBlock</var>, <var>skip</var>, <var>order</var>) and returns the cells as the result.--><!--The CellCollector class of each common script (smart contract), for example, [anyone_can_pay.CellCollector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/common-scripts/src/anyone_can_pay.ts#L37), [dao.CellCollector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/common-scripts/src/dao.ts#L39), [locktime_pool.CellCollector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/common-scripts/src/locktime_pool.ts#L57), also supports the query on cells with specific query options.--><!--For UTXO based blockchains, pending transactions require a certain amount of period before the transactions are accepted by the blockchain. During this period, new cells created by the pending transaction are not available for new transactions.<br/>The `@ckb-lumos/transaction-manager` package deals with this problem. The transaction manager wraps an indexer instance, and makes sure the cells that are created in pending transactions, are also exposed and available for new transactions.-->

## Query Options

Lumos supports query options on cells, including <var>lock</var>, <var>type</var>, <var>argsLen</var>, <var>data</var>, <var>fromBlock</var>, <var>toBlock</var>, <var>skip</var> and <var>order</var>.

- <var>lock</var>: A lock script or a ScriptWrapper of a lock script.

- <var>type</var>: A type script or a ScriptWrapper of a type script.

  <!--The [ScriptWrapper](https://nervosnetwork.github.io/lumos/interfaces/base.scriptwrapper.html) interface combines <var>argsLen</var> and <var>ioType</var> with a lock or type script to enable fine-grained queries.-->

  For more information about [ScriptWrapper](https://nervosnetwork.github.io/lumos/interfaces/base.scriptwrapper.html), see [Fine-grained Query for Cells](../guides/querycells#fine-grained-query-for-cells).

- <var>argsLen</var>: The lock or type args length. The default value of <var>argsLen</var> is -1 for the query on a full slice of the args.

- <var>data</var>: The cell data field.

- <var>fromBlock</var>: The starting block number that the query returns.

- <var>toBlock</var>: The ending block number that the query returns.

- <var>skip</var>: The number of cells being skipped for the Lumos indexer.

- <var>order</var>: The query result can be returned in order of block numbers. The default value is <var>asc</var> (ascending) for the returned result.

## Prerequisites

The following prerequisites apply for the examples of this guide:

- The development environment is set up. For more information, see [Set Up the Development Environment](http://localhost:3000/lumos_doc/docs/preparation/setupsystem).
- The Lumos packages are installed. For more information, see [Install Lumos Packages](../guides/installlumos).

## Environment

The following examples are verified on Ubuntu 20.04.2. Steps on the other platforms can be adjusted accordingly.

## Examples

### Query Cells by a Lock Script

The following example collects the cells for a specific lock script.

Example:

```typescript title="hellolumos/src/querycells.ts/findCellsbyLock" {5}
import { INDEXER } from "./index";
import { Cell, Script } from "@ckb-lumos/base";

export const findCellsbyLock = async (lockScript: Script): Promise<Cell[]> => {
  const collector = INDEXER.collector({ lock: lockScript });
  const cells: Cell[] = [];
  console.log("Find the cells by lock script:");
  for await (const cell of collector.collect()) {
    cells.push(cell);
  }
  return cells;
};
```

The `INDEXER` of the example is a RockDB backed indexer that is initialized and started in the <var>hellolumos/src/index.ts</var> file. For more information about setting up the Lumos indexer, see [Set Up the RocksDB Backed Indexer](../guides/indexer#set-up-the-rocksdb-backed-indexer).

Try the `findCellsbyLock` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>



```shell {1,2,5,7-13}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, querycells } = require(".");
The server is started.
> const alice = accounts.ALICE;
> const script = {
 code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
 hash_type: "type",
 args: alice.ARGS,
 };
> await querycells.findCellsbyLock(script);
Find the cells by lock script:
[
  {
    cell_output: { capacity: '0x12479ca35838', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0xf8c0964b90a4cb6e148e13d28ff945e83577ed1aa0bba3304068f418951d9ad9',
      index: '0x0'
    },
    block_hash: '0x06cb6adb0737838fb3982ff98084efd643ee426e167ab5dd96688008a19371f3',
    block_number: '0x14',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x12479c398188', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x65d86b9695fcbd376c245ad5566ea6c65c7fa8c61e485293e55c2dc236866c68',
      index: '0x0'
    },
    block_hash: '0x72bf246cae9d776f8db37ba27c80b1c65e56063ddc9663ca690033bc6647edce',
    block_number: '0x15',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x12479bcfab3f', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0xfea673fcbff06b7a85a6aea80f9ca7e5f6d8ff2750070b49c1afce3d518c7789',
      index: '0x0'
    },
    block_hash: '0x42cb31ce51f37d85cc52b369135148f13fa22d1c89bc501c6acd536d3a7b676f',
    block_number: '0x16',
    data: '0x'
  },
  ...
]
```

</p>
</details>

### Query Cells by Specific Lock and Type Script

The following example collects the cells for a specific lock script and a type script, and returns the cells as the result.

Example:

```typescript title="hellolumos/src/querycells.ts/findCellsbyLockandType" {8}
import { INDEXER } from "./index";
import { Cell, Script } from "@ckb-lumos/base";

export async function findCellsbyLockandType(
  lockScript: Script,
  typeScript: Script
): Promise<Cell[]> {
  const collector = INDEXER.collector({ lock: lockScript, type: typeScript });
  const cells: Cell[] = [];
  console.log("Find the cells by Lock and Type script");
  for await (const cell of collector.collect()) {
    cells.push(cell);
  }
  return cells;
}
```

Try the `findCellsbyLockandType` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>


```shell {1-2,5,7-15,18}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, querycells, CONFIG } = require(".");
The server is started.
> const alice = accounts.ALICE;
> const { parseAddress } = require("@ckb-lumos/helpers");
> const script = parseAddress(alice.ADDRESS);
> const template = CONFIG.SCRIPTS["DAO"];
> const typescript = {
 code_hash: template.CODE_HASH,
 hash_type: template.HASH_TYPE,
 args: "0x",
 };
# The example finds the DAO cells that Alice owns.
# For more information about DAO operations, see Build Transactions.
> await querycells.findCellsbyLockandType(script, typescript);
Find the cells by Lock and Type script
[
  {
    cell_output: { capacity: '0x4a817c800', lock: [Object], type: [Object] },
    out_point: {
      tx_hash: '0x6d9a12180755791eaf61d070d8d5112513cfd671d14434bec5b57c91fef17ee8',
      index: '0x0'
    },
    block_hash: '0x23b5e3299f50305f76ad55789e1958a9e26b2145cc9eef464cd14006b8c01304',
    block_number: '0x77b',
    data: '0x2b07000000000000'
  }
]
```

</p>
</details>

### Query Cells between Given Block Numbers

The following example fetches the cells between [<var>fromblock</var>, <var>toblock</var>]. 

Example:

```typescript title="hellolumos/src/querycells.ts/findCellsBetweenBlocks" {9}
import { INDEXER } from "./index";
import { Cell, Script } from "@ckb-lumos/base";

export async function findCellsBetweenBlocks(
  lockScript: Script,
  fromBlock: string,
  toBlock: string
): Promise<Cell[]> {
  const collector = INDEXER.collector({ lock: lockScript, fromBlock, toBlock });
  const cells: Cell[] = [];
  console.log("Find cells from block", fromBlock, "to block", toBlock);
  for await (const cell of collector.collect()) {
    cells.push(cell);
    // console.log(cell);
  }
  return cells;
}
```

Try the `findCellsBetweenBlocks` function in the Node.js REPL mode:


<details><summary>CLICK ME</summary>
<p>



```shell {1,2,5,7-12}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, querycells } = require(".");
The server is started.
> const alice = accounts.ALICE;
> const { parseAddress } = require("@ckb-lumos/helpers");
> const script = parseAddress(alice.ADDRESS);
> const from = "0x11";
> const to = "0x15";
> await querycells.findCellsBetweenBlocks(script, from, to);
Find cells from block 0x11 to block 0x15
[
  {
    cell_output: { capacity: '0x2ecbd7e568', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0xa4e46a4d656c849ecee9b80fb2490967b0a89a6fd767acddc59ddd7d1013d1a9',
      index: '0x0'
    },
    block_hash: '0xe87b33e3b499ede1390cf12ec1f2df772762fa7cc981c55fe3753a01fcc52d14',
    block_number: '0x11',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x2ecbd7e2b3', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x8e4eded5087d8341e739885d4dd39b78661fde80c711a42b4aeee856de4d5d1c',
      index: '0x0'
    },
    block_hash: '0xf410bc8b58e5edcc0f6f9277a3d4c1ada599884b7395ad2a57f65643051c5752',
    block_number: '0x12',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x2ecbd7dffd', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x4b4e37eda430c4c288398b518e00a93eae0fa979f65dc4f874feb2f4c8b5ae0b',
      index: '0x0'
    },
    block_hash: '0xb8166998d66f21d8b2b46c30a935a66c9f13ed6fb0dafa43679d6b781046f1eb',
    block_number: '0x13',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x2ecbd7dd47', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0xc5e1990313383e57bbd7954808731c35666fe73b58a8c2c6bd5531a59af95e22',
      index: '0x0'
    },
    block_hash: '0xb0b006d8b1df2bbd67a0effabc9a018874f45eed06f9e299b169e2f17ef62b20',
    block_number: '0x14',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x2ecbd7da92', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0xeb37d08d17356435bc52dedcea5780b282ab40979ed0321cde12c91b9325ac86',
      index: '0x0'
    },
    block_hash: '0x6a6c07981e60d3a0e021c14c61d0962947724a616c64ff64a6e583f4e3409c5d',
    block_number: '0x15',
    data: '0x'
  }
]
```

</p>
</details>

### Skip Cells

The `skip` parameter represents the number of cells being skipped for the Lumos indexer. 

Example:

```typescript title="hellolumos/src/querycells.ts/findCellsandSkip" {8}
import { INDEXER } from "./index";
import { Cell, Script } from "@ckb-lumos/base";

export async function findCellsandSkip(
  lockScript: Script,
  skip: number
): Promise<Cell[]> {
  const collector = INDEXER.collector({ lock: lockScript, skip: skip });
  const cells: Cell[] = [];
  console.log("Find Cells and Skip the first", skip, "cells:");
  for await (const cell of collector.collect()) {
    cells.push(cell);
    console.log(cell);
  }
  return cells;
}
```

Try the `findCellsandSkip` function in the Node.js REPL mode: 


<details><summary>CLICK ME</summary>
<p>


The example skips the first 10 cells and get the result from the 11<sup>th.</sup> cell.

```shell {1,2,5,7-10}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, querycells } = require(".");
The server is started.
> const alice = accounts.ALICE;
> const { parseAddress } = require("@ckb-lumos/helpers");
> const script = parseAddress(alice.ADDRESS);
> await querycells.findCellsandSkip(script1, 10);
Find Cells and Skip the first 10 cells:
{
  cell_output: {
    capacity: '0x2ecbd7d7dc',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0x0db73acbbbb04bb1b52153d30ef7486b191b5e376dcc6bc1439b3a6ed2a451d8',
    index: '0x0'
  },
  block_hash: '0x353b8153561400ed623ef295edb7488025ff517a119770cf0c9dca886f193c5a',
  block_number: '0x16',
  data: '0x'
}
{
  cell_output: {
    capacity: '0x2ecbd7d526',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0x90085bb7d249ef4794bcb2d4114b62e4b94e24b02282fd2985ab5ebe36ff8769',
    index: '0x0'
  },
  block_hash: '0x406d16483b941b38bf95bd9e5188f719807007f16293b86c15ae5e6e5f63a717',
  block_number: '0x17',
  data: '0x'
}
...
```

</p>
</details>

### Prefix Search on <var>args</var>

To enable prefix search on args of lock scripts or type scripts, a value can be specified for <var>argsLen</var> instead of the default value of **-1**. The default value is used for a query on the full slice of args of a lock script or a type script.

The lock script args length is **20** in normal scenarios and **28** in the multisig scenario. When the length is uncertain, the <var>argsLen</var> parameter can be set as `any`. 

:::info

It is recommended to specify an explicit length for the <var>argsLen</var> parameter in a prefix search, that has better performance than using `any`.

:::

Example:

```typescript title="hellolumos/src/querycells.ts/findCellsbyPrefix" {8}
import { INDEXER } from "./index";
import { Cell, Script } from "@ckb-lumos/base";

export async function findCellsbyPrefix(
  lockScript: Script,
  argslen: number
): Promise<Cell[]> {
  const collector = INDEXER.collector({ lock: lockScript, argsLen: argslen });
  const cells: Cell[] = [];
  console.log("Find Cells by prefix of args");
  for await (const cell of collector.collect()) {
    cells.push(cell);
  }
  return cells;
}
```

Try the `findCellsbyPrefix` function in the Node.js REPL mode: 


<details><summary>CLICK ME</summary>
<p>



```shell {1,2,5,8-13}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { querycells } = require(".");
The server is started.
# Truncate the lock args of Bob's account by removing the last 11 bytes and run prefix search on the truncated lock args.
> const script = {
 code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
 hash_type: "type",
 args: "0xecbe30bcf5c6b2f2d8",
 };
> await querycells.findCellsbyPrefix(script, 20);
Find Cells by prefix of args
[
  {
    cell_output: { capacity: '0x4a817c800', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x22cc789bdaa8e021caa303cf20cfa4063b46a17abd62b31aa2cf712844f984cb',
      index: '0x0'
    },
    block_hash: '0x6d60ae47167a78fbcf254c81b1d6356aceef2feeb4e039fed693c274a83faac1',
    block_number: '0xf',
    data: '0x'
  }
  ...
]
```

</p>
</details>

### Fine-grained Query for Cells

Fine-grained query can query on cells at the granularity of a lock or type script, and the args length of the lock or type script by using [ScriptWrapper](https://nervosnetwork.github.io/lumos/interfaces/base.scriptwrapper.html). 

The query gets the cells with a specific lock or type script, and specific args length of the script. The  <var>argsLen</var> config in the ScriptWrapper takes priority over the <var>argsLen</var> config outside of the ScriptWrapper. If <var>argsLen</var> is not specified in the ScriptWrapper, the <var>argsLen</var> config outside of the ScriptWrapper or the default value -1 will be used.

:::note

<var>ioType</var> is inapplicable in the fine-grained query for cells.

:::

The following example is the fine-grained query for cells on a ScriptWrapper that wraps a lock script and a lock args length. 

Example:

```typescript title="hellolumos/src/querycells.ts/finegrainedSearch()" {8-11}
import { INDEXER } from "./index";
import { Cell, Script, ScriptWrapper } from "@ckb-lumos/base";

export async function finegrainedSearch(
  lockScript: Script,
  argslen: number,
): Promise<Cell[]> {
  const lock: ScriptWrapper = {
    script: lockScript,
    argsLen: argslen,
  };
  const collector = INDEXER.collector({ lock: lock });
  const cells: Cell[] = [];
  console.log("Fine-Grained Query:");
  for await (const cell of collector.collect()) {
    cells.push(cell);
  }
  return cells;
}
```

Try the `finegrainedSearch` function in Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>



```shell {1,2,5,7-14}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, querycells } = require(".");
The server is started.
> const bob = accounts.BOB;
> const script = {
 code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
 hash_type: "type",
 args: bob.ARGS,
 };
> const argslen = 20;
> await querycells.finegrainedSearch(script, argslen);
# The result shows the cells with Bob's lock script and the lock args length is 20 bytes.
Fine-Grained Query:
[
  {
    cell_output: { capacity: '0x4a817c800', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x22cc789bdaa8e021caa303cf20cfa4063b46a17abd62b31aa2cf712844f984cb',
      index: '0x0'
    },
    block_hash: '0x6d60ae47167a78fbcf254c81b1d6356aceef2feeb4e039fed693c274a83faac1',
    block_number: '0xf',
    data: '0x'
  }
  ...
]
```

</p>
</details>

### Order Cells by Block Number

The following example creates a new [CellCollector](https://nervosnetwork.github.io/lumos/classes/indexer.cellcollector.html) and uses the CellCollector to collect cells in order of block numbers for a specific lock script.

Example:

```typescript title="hellolumos/src/querycells.ts/findCellsandOrder" {11}
import { INDEXER } from "./index";
import { Cell, Script } from "@ckb-lumos/base";
import { CellCollector } from "@ckb-lumos/indexer";

export async function findCellsandOrder(
  lockScript: Script,
  order: "asc" | "desc"
): Promise<Cell[]> {
  const collector = new CellCollector(INDEXER, {
    lock: lockScript,
    order: order,
  });
  const cells: Cell[] = [];
  console.log("Find Cells in", order, "order of block numbers:");
  for await (const cell of collector.collect()) {
    cells.push(cell);
  }
  return cells;
}
```

Try the `findCellsandOrder` function in Node.js REPL mode: 

<details><summary>CLICK ME</summary>
<p>
The following example gets the live cells for Alice and returns the result in descending order of block numbers.


```shell {1,2,5,7-10}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, querycells } = require(".");
The server is started.
> const alice = accounts.ALICE;
> const { parseAddress } = require("@ckb-lumos/helpers");
> const script = parseAddress(alice.ADDRESS);
> await querycells.findCellsandOrder(script, "desc");
Find Cells in desc order of block numbers:
[
  ...
  {
    cell_output: { capacity: '0x2ecbd7d526', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x90085bb7d249ef4794bcb2d4114b62e4b94e24b02282fd2985ab5ebe36ff8769',
      index: '0x0'
    },
    block_hash: '0x406d16483b941b38bf95bd9e5188f719807007f16293b86c15ae5e6e5f63a717',
    block_number: '0x17',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x2ecbd7d7dc', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x0db73acbbbb04bb1b52153d30ef7486b191b5e376dcc6bc1439b3a6ed2a451d8',
      index: '0x0'
    },
    block_hash: '0x353b8153561400ed623ef295edb7488025ff517a119770cf0c9dca886f193c5a',
    block_number: '0x16',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x2ecbd7da92', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0xeb37d08d17356435bc52dedcea5780b282ab40979ed0321cde12c91b9325ac86',
      index: '0x0'
    },
    block_hash: '0x6a6c07981e60d3a0e021c14c61d0962947724a616c64ff64a6e583f4e3409c5d',
    block_number: '0x15',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x2ecbd7dd47', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0xc5e1990313383e57bbd7954808731c35666fe73b58a8c2c6bd5531a59af95e22',
      index: '0x0'
    },
    block_hash: '0xb0b006d8b1df2bbd67a0effabc9a018874f45eed06f9e299b169e2f17ef62b20',
    block_number: '0x14',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x2ecbd7dffd', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x4b4e37eda430c4c288398b518e00a93eae0fa979f65dc4f874feb2f4c8b5ae0b',
      index: '0x0'
    },
    block_hash: '0xb8166998d66f21d8b2b46c30a935a66c9f13ed6fb0dafa43679d6b781046f1eb',
    block_number: '0x13',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x2ecbd7e2b3', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x8e4eded5087d8341e739885d4dd39b78661fde80c711a42b4aeee856de4d5d1c',
      index: '0x0'
    },
    block_hash: '0xf410bc8b58e5edcc0f6f9277a3d4c1ada599884b7395ad2a57f65643051c5752',
    block_number: '0x12',
    data: '0x'
  },
  ...
]
```

</p>
</details>

### Fetch Cells in Locktime Pool

Lumos provides the `locktimepool` module for the cells with a lock period. Now the `locktimepool` module supports DAO withdrawn cells and Multisig cells. 

The following example collects all the **withdrawn** cells and **Multisig** cells that with a lock period for an account and returns the collected cells as the result. 

Example:

```typescript title="hellolumos/src/querycells.ts/locktimePoolCells" {4}
import { locktimePool } from "@ckb-lumos/common-scripts";

export async function locktimePoolCells(frominfo: string): Promise<Cell[]> {
  const collector = new locktimePool.CellCollector(frominfo, INDEXER);
  const cells: Cell[] = [];
  for await (const cell of collector.collect()) {
    cells.push(cell);
    console.log(cell);
  }
  return cells;
}
```

For more information, see the [Transfer CKB with Locktime Pool](../guides/buildtransactions#transfer-ckb-with-locktime-pool) example.