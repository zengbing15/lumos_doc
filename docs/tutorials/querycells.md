---
id: querycells
title: Query on Cells
---

> Cells are the primary state units in CKB and assets owned by users. A cell is the most basic structure that represents a single piece of data in Nervos. The data contained in a cell can take many forms, including CKBytes, tokens, code like JavaScript code, or even serialized data like JSON strings. For more information about the cell model, see [Nervos Docs: Cell](https://docs.nervos.org/docs/reference/cell) and [CKB RFC: CKB Cell](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#42-cell).

Querying on cells are the fundamental functions for a DApp to respond to user queries and transaction requests. Lumos provides functions for the queries on cells with specific query options.

The following example is a cell retrieved by Lumos query functions:

:::note

Lumos enriches the cell structure defined in [CKB RFC: Cell](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#42-cell) with some customized fields (`out_point`, `block_hash` and `block_number`). 

:::

```typescript
{
  cell_output: {
    capacity: '0x124788a824a4',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0x86a613998a501777f2c3d808f235a8767d28d56868678dd17b53797f280b8b61',
    index: '0x0'
  },
  block_hash: '0xd75069d050a530f8e670235bbcf6054e14326f81b37e5220bb3fc3513ef7e97c',
  block_number: '0x45',
  data: '0x'
}
```

<!--The [Indexer.collector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/indexer/lib/index.js#L242) function of the `@ckb-lumos/indexer` package can be used to collect cells by specific query options (<var>lock</var>, <var>type</var>, <var>argsLen</var>, <var>data</var>, <var>fromBlock</var>, <var>toBlock</var>, <var>skip</var>) and return the cells as the result.--><!--The [Indexer.collector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/sql-indexer/lib/index.js#L571) function of the `@ckb-lumos/sql-indexer` package can be used to collect cells by specific query options (<var>lock</var>, <var>type</var>, <var>argsLen</var>, <var>data</var>) and return the cells as the result.--><!--The [CellCollector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/indexer/lib/index.js#L324) class of the `@ckb-lumos/indexer` package supports query on cells with specific query options (<var>lock</var>, <var>type</var>, <var>argsLen</var>, <var>data</var>, <var>fromBlock</var>, <var>toBlock</var>, <var>order</var>, <var>skip</var>) and returns the cells as the result.--><!--The [CellCollector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/sql-indexer/lib/index.js#L622) class of the `@ckb-lumos/sql-indexer` package supports query on cells with specific query options (<var>lock</var>, <var>type</var>, <var>argsLen</var>, <var>data</var>, <var>fromBlock</var>, <var>toBlock</var>, <var>skip</var>, <var>order</var>) and returns the cells as the result.--><!--The CellCollector class of each common script (smart contract), for example, [anyone_can_pay.CellCollector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/common-scripts/src/anyone_can_pay.ts#L37), [dao.CellCollector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/common-scripts/src/dao.ts#L39), [locktime_pool.CellCollector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/common-scripts/src/locktime_pool.ts#L57), also supports the query on cells with specific query options.--><!--For UTXO based blockchains, pending transactions require a certain amount of period before the transactions are accepted by the blockchain. During this period, new cells created by the pending transaction are not available for new transactions.<br/>The `@ckb-lumos/transaction-manager` package deals with this problem. The transaction manager wraps an indexer instance, and makes sure the cells that are created in pending transactions, are also exposed and available for new transactions.-->

## Query Options

Lumos supports to query on cells for the options including <var>lock</var>, <var>type</var>, <var>argsLen</var>, <var>data</var>, <var>fromBlock</var>, <var>toBlock</var>, <var>skip</var> and <var>order</var>.

- <var>lock</var>: A lock script or a ScriptWrapper of a lock script.

- <var>type</var>: A type script or a ScriptWrapper of a type script.

  <!--The [ScriptWrapper](https://nervosnetwork.github.io/lumos/interfaces/base.scriptwrapper.html) interface combines <var>argsLen</var> and <var>ioType</var> with a lock or type script to enable fine-grained queries.-->

  For more information about [ScriptWrapper](https://nervosnetwork.github.io/lumos/interfaces/base.scriptwrapper.html), see [Fine-grained Query for Cells](../tutorials/querycells#fine-grained-query-for-cells).

- <var>argsLen</var>: The lock or type args length. The default value of <var>argsLen</var> is -1 for the query on a full slice of the args.

- <var>data</var>: The cell data field.

- <var>fromBlock</var>: The starting block number that the query returns.

- <var>toBlock</var>: The ending block number that the query returns.

- <var>skip</var>: The number of cells being skipped for the Lumos indexer.

- <var>order</var>: The query result can be returned in order of block numbers. The default value is <var>asc</var> (ascending) for the returned result.

## Prerequisites

The following prerequisites apply for the examples of this guide:

- The development environment is set up. For more information, see [Set Up the Development Environment](http://localhost:3000/lumos_doc/docs/preparation/setupsystem).
- The CKB node is installed and started. For more information, see [Install a CKB Node](http://localhost:3000/lumos_doc/docs/preparation/installckb).
- The Lumos packages (`@ckb-lumos/base`, `@ckb-lumos/indexer`, `@ckb-lumos/helpers`, `@ckb-lumos/common-scripts`) are installed.

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

The `INDEXER` of the example is a RockDB backed indexer that is initialized and started in the <var>hellolumos/src/index.ts</var> file. For more information about setting up the Lumos indexer, see [Set Up the RocksDB Backed Indexer](../tutorials/indexer#set-up-the-rocksdb-backed-indexer).

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
    cell_output: { capacity: '0x1247953509b2', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0xe8655b071e3eeb94d73c2307295bbe88431e74d9091bd8ec081404a9ac485251',
      index: '0x0'
    },
    block_hash: '0x4feda2b0950c3137d4a2128cbe7b25f9dd255c3468007a6b10118f2fccd855bb',
    block_number: '0x26',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x124794cb65db', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0xd99327f73c6278589d59cde617982a08e3fabadefa18bbae14eab30fa89b9fb1',
      index: '0x0'
    },
    block_hash: '0xe8016c14a198a2b9f7acd4964ec876527ff55082d6e3a210e7b73c6316f86690',
    block_number: '0x27',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x12479461c26d', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x0b2ac03c909402057eabf4202ae3ee8fc65f9f6182837db2599c53d2cc8051ba',
      index: '0x0'
    },
    block_hash: '0x19bb281bc4e53a76cce55a10b99abf82bc528b6eb37e72c9bd62cd520109a1a8',
    block_number: '0x28',
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


```shell {1-2,5,7-19}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, querycells, CONFIG } = require(".");
The server is started.
> const alice = accounts.ALICE;
> const script = {
 code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
 hash_type: "type",
 args: alice.ARGS,
 };
> const template = CONFIG.SCRIPTS["DAO"];
> const typescript = {
 code_hash: template.CODE_HASH,
 hash_type: template.HASH_TYPE,
 args: "0x",
 };
> await querycells.findCellsbyLockandType(script, typescript);
Find the cells by Lock and Type script
[
  {
    cell_output: { capacity: '0x4a817c800', lock: [Object], type: [Object] },
    out_point: {
      tx_hash: '0x313378dc3ce2d5c3f3efd546bc9595b54907844c20a72adae15cb9e970ce90df',
      index: '0x0'
    },
    block_hash: '0x657bef9f9d300bfd884065992f243770b9fa7dc8aafa304c98e210d2e02d1248',
    block_number: '0x12c',
    data: '0x6a00000000000000'
  },
  {
    cell_output: { capacity: '0x4a817c800', lock: [Object], type: [Object] },
    out_point: {
      tx_hash: '0xbc708146e8fea53a4629d37fbd345f7e9dca79225d90bb1f73e7077ade93da19',
      index: '0x0'
    },
    block_hash: '0xfc4a10116dbfb591796dcbf19e95c26ac647e7c2e41fc1b327a19c7ddd1eb938',
    block_number: '0x135',
    data: '0x1a01000000000000'
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



```shell {1,2,5,7-15}
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
> const from = "0x81";
> const to = "0x83";
> await querycells.findCellsBetweenBlocks(script, from, to);
Find cells from block 0x81 to block 0x84
[
  {
    cell_output: { capacity: '0x12476faec3ef', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x4f6efa5ee4a116940d2dfe549c1e2ddac9ae02268d68d5e300fade7e8466072d',
      index: '0x0'
    },
    block_hash: '0x6a8d2e35b024128c06cbf5ba551b6c7de576566fce12e61c646052e622f701d7',
    block_number: '0x81',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x12476fa0d2a2', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0xede91f58056a467cf5114a258ebc7a96a581e8e0a23fde083f84f833a6f0503c',
      index: '0x0'
    },
    block_hash: '0xaefdfe2473ce86d137cbb9d2e7cf4f1f3600663bb18aa6e4d30518c6b3870be5',
    block_number: '0x82',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x12476edbf23a', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x73c528726d7ca1cad5af6d7debdf962814f49994ef8ad686d071d8aac96e394c',
      index: '0x0'
    },
    block_hash: '0x721d22c925d98b0260d9b6a647fdb6e93010f816f1158c14971a73c0cb073b60',
    block_number: '0x83',
    data: '0x'
  },
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


The example skips the first 20 cells and get the result from the 21st. cell by using the `findCellsandSkip` function.

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
> await querycells.findCellsandSkip(script, 20);
{
  cell_output: {
    capacity: '0x1247656167b4',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0xdcd898c29a2d9dcbaca6c5112bb681d55acb5a557aaf2cbaa1ea2fe561ba3b36',
    index: '0x0'
  },
  block_hash: '0x8030e31e760905f4e2c220f45b653ed73d0bdea5962bd34ca96bc3ea50cbc725',
  block_number: '0x9a',
  data: '0x'
}
{
  cell_output: {
    capacity: '0x124764f7f310',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0x0913fd98eb1a56c9b7a460cf46f6c447d0a5048c5f2ad955c3ae7c74d3d55bbf',
    index: '0x0'
  },
  block_hash: '0x19b16cd024c8d3ae06a5cd20db7f86a04b0b3160d499145d8fdee659c959f70d',
  block_number: '0x9b',
  data: '0x'
}
...
```

</p>
</details>

### Prefix Search on <var>args</var>

To enable the prefix search on the args of a lock script or a type script, <var>argsLen</var> can be assigned with a value other than the default value **-1**. The default value is for the query on a full slice of the args of a lock script.

The lock script args length is **20** in normal scenarios and **28** in the multisig scenario. When the length is not certain, the <var>argsLen</var> parameter can be set as `any`. 

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
//Truncate the lock args of Bob's account by removing the last 11 bytes and run prefix search on the truncated lock args.
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
      tx_hash: '0x32a717c2af9160b800805796c68803213060df782834486c72cfbacbb0868d62',
      index: '0x0'
    },
    block_hash: '0xc21b34b009d5e355357eb55d9ee3456c6a90632434cff8dc515b2f0a207f854c',
    block_number: '0x15',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x4a817c800', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x144ae79bc6064ae99e51b7105f4b61328dd4293d68d132b7a04d86409952ae2e',
      index: '0x0'
    },
    block_hash: '0x2d70e178be2447f784d9c8c1c52630d10b3b3b23575896e61ff15983a7e5ba59',
    block_number: '0xc9',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x4a817c800', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x10104ec6857fd99b818e7b401216268c067ce7fbc536b77c86f3565c108e958e',
      index: '0x0'
    },
    block_hash: '0x64623c86af1df458caac8a1433e50ae7ffc228aaa1975d60ed03dfe3ec4ca3fc',
    block_number: '0xea',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x4a817c800', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x9a501e405653219aa8022132158820231aa5ecaff91c970b18d10fbad5ccc178',
      index: '0x0'
    },
    block_hash: '0x988d92ae87a58126c6213642d363cc8102a3016ab50f486dfa44d6b03ab48e51',
    block_number: '0xf2',
    data: '0x'
  }
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
//The result shows the cells with Bob's lock script and the lock args length is 20 bytes.
Fine-Grained Query:
[
  {
    cell_output: { capacity: '0x1247953509b2', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0xe8655b071e3eeb94d73c2307295bbe88431e74d9091bd8ec081404a9ac485251',
      index: '0x0'
    },
    block_hash: '0x4feda2b0950c3137d4a2128cbe7b25f9dd255c3468007a6b10118f2fccd855bb',
    block_number: '0x26',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x124794cb65db', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0xd99327f73c6278589d59cde617982a08e3fabadefa18bbae14eab30fa89b9fb1',
      index: '0x0'
    },
    block_hash: '0xe8016c14a198a2b9f7acd4964ec876527ff55082d6e3a210e7b73c6316f86690',
    block_number: '0x27',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x12479461c26d', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x0b2ac03c909402057eabf4202ae3ee8fc65f9f6182837db2599c53d2cc8051ba',
      index: '0x0'
    },
    block_hash: '0x19bb281bc4e53a76cce55a10b99abf82bc528b6eb37e72c9bd62cd520109a1a8',
    block_number: '0x28',
    data: '0x'
  },
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
  {
    cell_output: { capacity: '0x124462255f12', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0x53d845d810109d6ee4e94df96565100a4126c6fa671db1d237f60eca4a8d2105',
      index: '0x0'
    },
    block_hash: '0x0301f7aa0c2902383e15662008f9886aa4cd628c4948ba737d13894e7334ea54',
    block_number: '0x805',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x1244628be0aa', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0xea8f658e6ea08c38f58f6a0af3530396aba0e51e1064db8626ecd38976625c34',
      index: '0x0'
    },
    block_hash: '0xbae60c9c4f54d6f6a970fb76c2fdd226a83dd8724cff082157da559ce6cf507f',
    block_number: '0x804',
    data: '0x'
  },
  {
    cell_output: { capacity: '0x1242ecee4f71', lock: [Object], type: undefined },
    out_point: {
      tx_hash: '0xe332fb6efba38e16b8fd20a4f47d5fffcf8fcac0c863b0eb30ef75067847936d',
      index: '0x1'
    },
    block_hash: '0xd0c09a6615b30f685dd0b0e627021f89e0f35e9b59c575001d8a11f63436b76c',
    block_number: '0x803',
    data: '0x'
  },
...
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

For more information, see the [Transfer CKB with Locktime Pool](../tutorials/buildtransactions#transfer-ckb-with-locktime-pool) example.