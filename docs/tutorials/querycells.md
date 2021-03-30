---
id: querycells
title: Query on Cells
---

> A Cell is the most basic structure that represents a single piece of data in Nervos. The data contained in a cell can take many forms, including CKBytes, tokens, code like JavaScript code, or even serialized data like JSON strings. For more information about the cell model, see [Cell Data Structure](https://docs.nervos.org/docs/reference/cell) and [CKB RFC](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#42-cell).

Querying on cells are the fundamental functions for a DApp to respond to user queries and transaction requests. Lumos provides the `collector` function in the Lumos indexer and the transaction manager modules, and the `CellCollector` class in the modules of common scripts to support queries fulfilling specific query options.

## Environment

The following examples are verified on Ubuntu 20.04.2. Steps on the other platforms can be adjusted accordingly.

## Examples

### Query Cells by a Lock Script

The [Indexer.collector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/indexer/lib/index.js#L242) function of the @ckb-lumos/indexer package can be used to collect cells by specific query options (<var>lock</var>, <var>type</var>, <var>argsLeng</var>, <var>data</var>, <var>fromBlock</var>, <var>toBlock</var>, <var>skip</var>) and returns the cells as the result.

The following example collects the cells for a specific lock script by using the `Indexer.collector` function.

Example: <u>hellolumos/src/querycells.ts/findCellsbylock()</u>

```typescript title="hellolumos/src/querycells.ts"
import {INDEXER} from "./index";
import { Cell, Script } from "@ckb-lumos/base";

export const findCellsbylock = async (
    lockScript: Script,
  ): Promise<Cell[]> => {
 
  const collector = INDEXER.collector({ lock:lockScript});
  const cells: Cell[] = [];
  console.log("Find the cells by lock script:");
  for await (const cell of collector.collect()) {
      cells.push(cell);
    }
    return cells;
  };
```

Try the `findCellsbylock` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>



```shell
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, querycells }=require(".");
The server is started.
> const alice = accounts.ALICE;
> const script={
 code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
 hash_type: "type",
 args: alice.ARGS,
 };
> await querycells.findCellsbylock(script);
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
```

</p>
</details>

### Query Cells by Specific Lock and Type Script

The following example collects the cells for a specific lock script and type script, and returns the cells as the result.

Example: <u>hellolumos/src/querycells.ts/findCellsbyLockandType()</u>

```typescript title="hellolumos/src/querycells.ts"
export async function findCellsbyLockandType(
  lockScript: Script,
  typeScript: Script
): Promise<Cell[]>  {

const collector = INDEXER.collector({ lock:lockScript, type:typeScript});
const cells: Cell[] = [];
console.log("Find the cells by Lock and Type script");
for await (const cell of collector.collect()) {
    cells.push(cell);
 }
return cells;
};
```

Try the `findCellsbyLockandType` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>


```shell
//Leverage the configurations for DAO script from the config manager defined in the hellolumos/src/index.ts file.
> const { CONFIG }=require(".");
> const template = CONFIG.SCRIPTS["DAO"];
> const typescript={
 code_hash: template.CODE_HASH,
 hash_type: template.HASH_TYPE,
 args: "0x",
 };
> await querycells.findCellsbyLockandType(script,typescript);
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

The following example fetches the cells between `[fromblock, toblock]`. Both `fromBlock` and `toBlock` are included in the query options.

Example: <u>hellolumos/src/querycells.ts/findCellsfromto()</u>

```typescript title="hellolumos/src/querycells.ts"
export async function findCellsfromto (
  lockScript: Script,
  fromblock: string,
  toblock: string
): Promise<Cell[]> {

const collector = INDEXER.collector({ lock:lockScript, fromBlock:fromblock,toBlock:toblock});
const cells: Cell[] = [];
console.log("Find cells from block",fromblock,"to block", toblock);
for await (const cell of collector.collect()) {
    cells.push(cell);
    console.log(cell);
 }
return cells;
}
```

Try the `findCellsfromto` function in the Node.js REPL mode:


<details><summary>CLICK ME</summary>
<p>



```shell
> const from = "0x81";
> const to = "0x83";
> await querycells.findCellsfromto(script,from,to);
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

Example: <u>hellolumos/src/querycells.ts/findCellsandSkip()</u>

```typescript title="hellolumos/src/querycells.ts"
export async function findCellsandSkip(
  lockScript: Script,
  skip: number
): Promise<Cell[]> {

const collector = INDEXER.collector({ lock:lockScript, skip:skip});
const cells: Cell[] = [];
console.log("Find Cells and Skip the first",skip, "cells:");
for await (const cell of collector.collect()) {
    cells.push(cell);
    console.log(cell);
 }
return cells;
};
```

The following example skips the first 100 cells and returns the result from the 101st. cell.


```shell
> await querycells.findCellsandSkip(script,100);
...
```

### Prefix Search on <var>args</var>

The default value of <var>argsLen</var> is -1 for the query on a full slice of the args of a lock script.

You can specify <var>argsLen</var> with a value other than the default value to enable the prefix search on the args of a lock script.

:::info

It is recommended to specify an explicit length for the <var>argsLen</var> parameter. For example, the length is **20** in normal scenarios and **28** in the multisig scenario for the lock script.  When the length is not certain, the <var>argsLen</var> parameter can be set as `any`. But there is performance lost when using `any` rather than an explicit length.

:::

Example: <u>hellolumos/src/querycells.ts/findCellsbyPrefix()</u>

```typescript title="hellolumos/src/querycells.ts"
export async function findCellsbyPrefix(
  lockScript: Script,
  argslen:number
): Promise<Cell[]>  {

const collector = INDEXER.collector({ lock:lockScript,argsLen:argslen});
const cells: Cell[] = [];
console.log("Find Cells by prefix of args");
for await (const cell of collector.collect()) {
    cells.push(cell);
 }
return cells;
};
```

### Fine Grained Query for Cells

Fine grained query for cells can be achieved by using [ScriptWrapper](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/base/index.d.ts#L351) with customized options like <var>ioType</var>, <var>argsLen</var>.

The value for the <var>ioType</var> field is among `input | output | both`.

If the <var>argsLen</var>is not specified in the function, the outside <var>argsLen</var>config or the default value -1 will be used.

Example: <u>hellolumos/src/querycells.ts/finegrainedsearch()</u>

```typescript title="hellolumos/src/querycells.ts"
import { ScriptWrapper } from "@ckb-lumos/base";
export async function finegrainedsearch(
  lockScript: Script,
  typeScript: Script,
  argslen: number
): Promise<Cell[]> {
const lock:ScriptWrapper = {
  script:lockScript,
  argsLen: argslen
}
const collector = INDEXER.collector({ lock:lock,type:typeScript});
const cells: Cell[] = [];
console.log("Fine-Grained Query:");
for await (const cell of collector.collect()) {
    cells.push(cell);
 }
return cells;
};
```

Try the `finegrainedsearch` function in Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>



```shell
> const { CONFIG }=require(".");
> const template = CONFIG.SCRIPTS["DAO"];
> const typescript={
   code_hash: template.CODE_HASH,
   hash_type: template.HASH_TYPE,
   args: "0x",
   };
> const argslen = 20;
> await querycells.finegrainedsearch(script,typescript,argslen);
...
```

</p>
</details>

### Order Cells by Block Number

The [CellCollector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/indexer/lib/index.js#L324) class of the @ckb-lumos/indexer package supports query on cells  by specific query options (<var>lock</var>, <var>type</var>, <var>argsLeng</var>, <var>data</var>, <var>fromBlock</var>, <var>toBlock</var>, <var>skip</var>, <var>order</var>) and returns the cells as the result.

The following example creates a new [CellCollector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/indexer/lib/index.js#L324) and uses the CellCollector to collect cells in order of block numbers for a specific lock script. If the order is not specified, the default order is "asc" for the returned result.

Example: <u>hellolumos/src/querycells.ts/findCellsinOrderofBlockNum()</u>

```typescript title="hellolumos/src/querycells.ts"
import { CellCollector } from "@ckb-lumos/indexer";

export async function findCellsinOrderofBlockNum (
  lockScript: Script,
  order:"asc"|"desc"
): Promise<Cell[]> {
    
const collector = new CellCollector(INDEXER, { lock:lockScript, order:order});
const cells: Cell[] = [];
console.log("Find Cells in descending", order, "order of block numbers:");
for await (const cell of collector.collect()) {
    cells.push(cell);
 }
return cells;
};
```

The following example gets the live cells for Alice and returns the result in descending order of block numbers.

<details><summary>CLICK ME</summary>
<p>



```shell
> const { accounts, querycells }=require(".");
> const alice = accounts.ALICE;
> const script={
 code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
 hash_type: "type",
 args: alice.ARGS,
 };
> await querycells.findCellsinOrderofBlockNum(script,"desc");
Find Cells in descending desc order of block numbers:
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

### Get the Cell Minimal Capacity

A CKB cell has three fields and itself all take up capacity. The cell must have the capacity that is equal or more than the total size of information stored in the cell. For more information, see [Cell](https://nervosnetwork.github.io/docs-new/docs/reference/cell).

For example, the minimum CKB capacity requirement is 61 CKB (6100000000n) for a common transaction, and 102 CKB (10200000000n) for a DAO deposit transaction.

The [minimalCellCapacity](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/helpers/src/index.ts#L44) function of the @ckb-lumos/helpers package can be used to get the minimal capacity for a cell.

Example: <u>hellolumos/src/querycells.ts/getminimalCellCapacity()</u>

```typescript title="hellolumos/src/querycells.ts"
import { minimalCellCapacity } from "@ckb-lumos/helpers";

export async function getminimalCellCapacity(
 fullcell:Cell
) {
  console.log("The full cell is", fullcell);
  const result = minimalCellCapacity(fullcell);
  console.log("The minimal cell capacity is",result);
};
```

Try the `getminimalCellCapacity` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>

```shell
> const depositcell ={
  cell_output: {
    capacity: '0x4a817c800',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: {
      code_hash: '0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e',
      hash_type: 'type',
      args: '0x'
    }
  },
  out_point: {
    tx_hash: '0xa48a3a34bf2c1b660722cab0df7be13a85222d282966e185fde785647b5a7944',
    index: '0x0'
  },
  block_hash: '0x1a59e0832a7123a1b134496e799c0257023c2cec29a38b0ad76c7447931ed25e',
  block_number: '0x76e',
  data: '0x0000000000000000'
}
The minimal cell capacity is 10200000000n
```
</p>
</details>

### Get the Balance of an Account

The following example uses the `Indexer.collector` function to collect live cells for a specific lock script and then calculates the total capacity as the balance of the account. 

Example: <u>hellolumos/src/querycells.ts/getBalancebyLock()</u>

```typescript title="hellolumos/src/querycells.ts"
export async function getBalancebyLock (
  lockScript:Script
)  {
  let balance = BigInt(0);
  const collector = INDEXER.collector({ lock:lockScript});
  const cells: Cell[] = [];
 
  for await (const cell of collector.collect()) {
      cells.push(cell);
   }
  balance = cells
   .map((cell) =>
     BigInt(
       cell.cell_output.capacity
     )
   )
   .reduce((balance, capacity) => (balance = balance += capacity));
  console.log("The balance of the account is", balance);
}
```

Try the `getBalancebyLock` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>

```shell
> await querycells.getBalancebyLock(script);
The balance of the account is 41027155650775568n
```
</p>
</details>

### Get the Balance by Using the HD Cache Manager

To be updated...

```typescript title="/mydapp/src/managekey.ts"
export async function getBalancebyHDCache(
 m:string
)  {
  
  const cacheManager = CacheManager.fromMnemonic(INDEXER,m,getDefaultInfos(CONFIG)); 
  cacheManager.startForever();
  // const masterPubkey = cacheManager.getMasterPublicKeyInfo();
  // const nextReceivingPubkey = cacheManager.getNextReceivingPublicKeyInfo();
  // const nextChangePubkey = cacheManager.getNextChangePublicKeyInfo();
  // console.log("Get HD Wallet Balance");
  // const cellCollector = new CellCollector(cacheManager);
   //@ts-ignore
   await cacheManager.cache.loop();
   const balance = await getBalance(new CellCollector(cacheManager))
  //const balance = await getBalance(cellCollector);
  console.log("The HD wallet balance is", balance);
}
```

### Get Uncommitted Cells

There is one problem with UTXO based blockchains: pending transactions require a certain amount of period before the transactions are accepted by the blockchain. During this period, new cells created by the pending transaction are not available for new transactions. 

The `@ckb-lumos/transaction-manager` package deals with this problem. The transaction manager wraps an indexer instance, and makes sure the cells that are created in pending transactions, are also exposed and available for new transactions. 

You can get uncommitted outputs by the `collector` of the transaction manager.

Example: <u>hellolumos/src/querycells.ts/getUncommittedCells()</u>

```typescript title="hellolumos/src/querycells.ts"
import TransactionManager = require ("@ckb-lumos/transaction-manager");
export async function getUncommittedCells(
  lockScript:Script
): Promise<Cell[]>  {
  const transactionmanager = new TransactionManager(INDEXER);
  transactionmanager.start();

  const cells:Cell[] = [];
  console.log("Get uncommitted cells");
  const collector = transactionmanager.collector( {lock:lockScript});
  for await (const cell of collector.collect()) {
    cells.push(cell);
  }
  return cells;
}
```

### Fetch Cells in locktimepool

Lumos provides the `locktimepool` module for the cells with a lock period. Now the `locktimepool` module supports DAO withdrawn cells and Multisig cells. 

The following example uses the [locktimepool.Cellcollector](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/common-scripts/src/locktime_pool.ts#L57) class to collect all the withdrawn cells and Multisig cells of an account and returns the collected cells as the result. 

```typescript title="hellolumos/src/querycells.ts"
import {locktimePool} from "@ckb-lumos/common-scripts";

export async function locktimepoolCells(
  frominfo: string,
):Promise<Cell[]> {
  const collector = new locktimePool.CellCollector(frominfo,INDEXER);
  const cells: Cell[] = [];
  for await (const cell of collector.collect()) { 
      cells.push(cell);
      console.log(cell); }
   return cells;
}
```

Try the `locktimepoolCells` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>


```shell
> await querycells.locktimepoolCells(alice.ADDRESS);
{
  cell_output: {
    capacity: '0x4a818dbb9',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: {
      code_hash: '0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e',
      hash_type: 'type',
      args: '0x'
    }
  },
  out_point: {
    tx_hash: '0x74104fe19b92c48ea8dbc16180740f6274ec9135e8aaea9c6a9d01ba2d76b08d',
    index: '0x0'
  },
  block_hash: '0x3cb8bd2b527265a3f9a9ee067c4659a756681e3f065e13a99498b11a34338a6a',
  block_number: '0x772',
  data: '0x6e07000000000000',
  since: '0x20000a0002000172',
  depositBlockHash: '0x1a59e0832a7123a1b134496e799c0257023c2cec29a38b0ad76c7447931ed25e',
  withdrawBlockHash: '0x3cb8bd2b527265a3f9a9ee067c4659a756681e3f065e13a99498b11a34338a6a',
  sinceValidationInfo: undefined
}
```

</p>
</details>

