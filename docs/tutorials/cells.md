---
id: cells
title: Query on Cells
---
A Cell is the most basic structure that represents a single piece of data in Nervos. The data contained in a Cell can take many forms, including CKBytes, tokens, code like JavaScript code, or even serialized data like JSON strings.

## Data Structure

A cell includes the following fields:

- `capacity`

  - The amount of CKB tokens stored in the cell. 
  - The size limit on how much information the cell can store.

  The basic unit for `capacity` is `shannon`. A bigger unit `CKByte`, or just `CKB` is also used. 1 CKB equals `10**8` shannons. 1 CKB also means the cell that can store 1 byte of information.

- `data`: State data stored in this cell.

  **Note**: The `data` field can be empty. The total bytes used by a cell (including data) must be less than or equal to the capacity of the cell. 

  The following data can be stored in the `data` field:
  - Script code as explained in [Script](https://docs.nervos.org/docs/reference/script). 
  - Token amount for User Defined Token cells.
  - The latest game states for an on-chain fantasy game.

- `lock` script: The ownership of a cell.

  When a specified cell is used as an input cell in a transaction, the `lock script` included in the cell is executed for signature verification. If the `lock script` fails in the verification, the transaction will be rejected.

- `type` script: The script to be executed to validate the structure of both input cells and output cells included in a transaction.

  `type` script is typically used to validate a DApp logic, such as creating UDTs.

For more information about the cell model, see [Cell Data Structure](https://docs.nervos.org/docs/reference/cell) and [CKB RFC](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#42-cell).

**A Cell Example**

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

## Examples

### Query Existing Cells

To query existing cells:

```typescript title="mydapp/src/querycells.ts"
import { Indexer } from "@ckb-lumos/indexer";
const CKB_RPC = "http://127.0.0.1:8114";
export const INDEXER = new Indexer(CKB_RPC, "./indexed-data");
INDEXER.startForever();

import {CellCollector} from "@ckb-lumos/indexer";
import { Cell, Script } from "@ckb-lumos/base";

const findCells = async (
    lockScript: Script,
  ): Promise<Cell[]> => {
 
  const collector = INDEXER.collector({ lock:lockscript});
  const cells: Cell[] = [];
  
  for await (const cell of collector.collect()) {
      cells.push(cell);
      console.log(cell);
  }
  return cells;
};
const lockscript:Script = {
  code_hash:
    "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
  hash_type: "type",
  args: "0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e",
};
const cells = findCells(lockscript);
```

<details><summary>CLICK ME</summary>
<p>

```shell
{
  cell_output: {
    capacity: '0x12479ff21b3f',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0x84a1ff885e82f1d48813968994f63eae22df5baf65519240fc74811ba3b31e92',
    index: '0x0'
  },
  block_hash: '0x4e23ef8268abd4f58b93a060d5f97ad0c039384ec031d073cb680f916b5ec201',
  block_number: '0xc',
  data: '0x'
}
{
  cell_output: {
    capacity: '0x12479f884149',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0xbdc50e04c88978fe53debe989863855b2e3e4be02dd989c6f8771a2b263ef213',
    index: '0x0'
  },
  block_hash: '0xce5cffcdf54b5583bd9a8773893d62004c0462fdd3eeb7d69473027a054795b6',
  block_number: '0xd',
  data: '0x'
}
...
```
</p>
</details>

### Specify `lock` and `type` Script

```typescript title="mydapp/src/querycells.ts"
import { env } from "process";
import { initializeConfig, getConfig } from "@ckb-lumos/config-manager";
env.LUMOS_CONFIG_FILE = env.LUMOS_CONFIG_FILE || "./config.json";
initializeConfig();

const findCellsbyLockandType = async (
  lockScript: Script,
  typescript: Script
): Promise<Cell[]> => {

const collector = INDEXER.collector({ lock:lockscript, type:typescript});
const cells: Cell[] = [];

for await (const cell of collector.collect()) {
    cells.push(cell);
    console.log(cell);
 }
return cells;
};

const config = undefined || getConfig();
const template = config.SCRIPTS["DAO"]!;
// The example uses the type script of DAO script 
const DAOlockscript:Script = {
    code_hash: template.CODE_HASH,
    hash_type: template.HASH_TYPE,
    args: "0x"
};

const cellsByLockandType = findCellsbyLockandType(lockscript,DAOlockscript);
```

<details><summary>CLICK ME</summary>
<p>

```shell
{
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
    tx_hash: '0x4a08e1609cd2f85ba33b4edf3c40ced779150925796ccea1441cad2b0a95395c',
    index: '0x0'
  },
  block_hash: '0x37f53dd6884eec2fa93b8fded335f28a3ac63fe9ed3a60226e03138968d30d3c',
  block_number: '0xc0',
  data: '0x0000000000000000'
}
```
</p>
</details>

### Query Cells between Given Block Numbers

The example fetches cells between `[fromBlock, toBlock]`, which means both `fromBlock` and `toBlock` are included in query range.

```typescript title="mydapp/src/querycells.ts"
export const findCellsfromto = async (
  lockscript: Script,
  fromblock: string,
  toblock: string
): Promise<Cell[]> => {

const collector = INDEXER.collector({ lock:lockscript, fromBlock:fromblock,toBlock:toblock});
const cells: Cell[] = [];

for await (const cell of collector.collect()) {
    cells.push(cell);
    console.log(cell);
 }
return cells;
};
const fromblock = "0xc5";
const toblock = "0xca";
const cellfromto = findCellsfromto(lockscript,fromblock,toblock);
```

<details><summary>CLICK ME</summary>
<p>

```shell
{
  cell_output: {
    capacity: '0x124753ac3f16',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0xfb54d9d8c756ffb30809fe58979e5c33e5ec3692bcff0f1275464e3114bae878',
    index: '0x0'
  },
  block_hash: '0xd6c6ae5575d56ae8071a0b2e481bc1383112de5016a0c429bd56068dff992af9',
  block_number: '0xc5',
  data: '0x'
}
{
  cell_output: {
    capacity: '0x12475342dbea',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0xb912f892f80865c219c012eb260c85160524f76a429763fc2b048ab255e4724d',
    index: '0x0'
  },
  block_hash: '0x7f8d1ae67583735bbc51ea6eca160d41f3bafb0f1b2616eae3652c11e7b2a090',
  block_number: '0xc6',
  data: '0x'
}
{
  cell_output: {
    capacity: '0x124752d97925',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0x56040bcd0038dc641d7300f48a6ab153132dcc41e5ef26295cf4c617200210aa',
    index: '0x0'
  },
  block_hash: '0xca60ac493084b8ad60f8b2f151e71239a18da3fa5cb395aed413131eccdd7649',
  block_number: '0xc7',
  data: '0x'
}
{
  cell_output: {
    capacity: '0x1247527016c8',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0x1e25fd8c3388bfb62f6c3574d0021011de5d65bada46eddb91a891b9d014d56b',
    index: '0x0'
  },
  block_hash: '0xeda7a3d8a378716e593957d75f7326d7bc18ce8e28bd1a170efee528f5ab1420',
  block_number: '0xc8',
  data: '0x'
}
{
  cell_output: {
    capacity: '0x12475243bdd5',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0x07e97a111b22acf098de480e56f62f2743228925d210515ec980da00fb252a44',
    index: '0x0'
  },
  block_hash: '0xd93ef577437495d9b0df7ccf7a46dbc25387271049778e1a2fc77293352593a7',
  block_number: '0xc9',
  data: '0x'
}
{
  cell_output: {
    capacity: '0x1247519d5348',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0x304c04fc343bd2cb888a0287a767f8892d911e015455fdc612dc00c5e164003b',
    index: '0x0'
  },
  block_hash: '0xf232d7691ed12319a0e5a17f94df0b30613ab9f0839aecc7eb2a3363827cb835',
  block_number: '0xca',
  data: '0x'
}
```
</p>
</details>

### Skip Cells

The `skip` parameter represents the number of cells being skipped. This example skips the first 100 cells and returns from the 101st. cell.

```typescript title="mydapp/src/querycells.ts"
export const findCellsandSkip = async (
  lockscript: Script,
  skip: number
): Promise<Cell[]> => {

const collector = INDEXER.collector({ lock:lockscript, skip:skip});
const cells: Cell[] = [];
console.log("Find Cells and Skip the first",skip, "cells:");
for await (const cell of collector.collect()) {
    cells.push(cell);
    console.log(cell);
 }
return cells;
};
```

<details><summary>CLICK ME</summary>
<p>

```shell
{
  cell_output: {
    capacity: '0x1247764673d9',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0x42e7fe683d99fdde2f48e23543a5ea6453c55a610e5a175cca179f6cc93eee75',
    index: '0x0'
  },
  block_hash: '0x23c24f4ba585ac82a08718a484dca94182448f78d76a512e2857e625661692f1',
  block_number: '0x71',
  data: '0x'
}
{
  cell_output: {
    capacity: '0x124775dcee8b',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0xafec483ef638525db4436d42760d3193c192155f59184b9cbabf9748c45f33e4',
    index: '0x0'
  },
  block_hash: '0xc989e6048c6225a1222f8ab05bb49e10f0f0e183413908c1de2bb09aba110099',
  block_number: '0x72',
  data: '0x'
}
...
```
</p>
</details>

### Order Cells by Block Number

To order cells by block number:

```typescript title="mydapp/src/querycells.ts"
export const findCellsinOrderofBlockNum = async (
  lockscript: Script,
  fromblock: string,
  toblock: string,
  order:"asc"|"desc"
): Promise<Cell[]> => {

const collector = INDEXER.collector({ lock:lockscript, fromBlock:fromblock,toBlock:toblock, order:order});
const cells: Cell[] = [];
console.log("Find Cells in descending", order, "order of block numbers:");
for await (const cell of collector.collect()) {
    cells.push(cell);
    console.log(cell);
 }
return cells;
};
```

### Prefix Search on `args`

The default `argsLen` is -1, which means you pass the full slice of original args, and you can specify it when the `args` field is the prefix of original args.

**Note**: It is recommended to specify explicit length for the `argsLen` parameter. For example, the length is 20 in normal scenarios and 28 in the multisig scenario for lock script.  When the length is not certain, the `argsLen` parameter can be set as `any`. But there is performance lost when using `any` rather than explicitly specified length.

```typescript title="mydapp/src/querycells.ts"
export const findCellsbyPrefix = async (
  lockscript: Script,
  argslen:number
): Promise<Cell[]> => {

const collector = INDEXER.collector({ lock:lockscript,argsLen:argslen});
const cells: Cell[] = [];
console.log("Find Cells by prefix of args");
for await (const cell of collector.collect()) {
    cells.push(cell);
    console.log(cell);
 }
return cells;
};
```

### Fine Grained Query for Cells

Fine grained query for cells can be achieved by using `ScriptWrapper` with customized options like `argsLen`.

If the `argsLen` is not specified in the function, the outside `argsLen` config or the default value -1 will be used.

```typescript title="mydapp/src/querycells.ts"
export const finegrainedsearch = async (
  lockscript: Script,
  typescript: Script,
  argslen: number
): Promise<Cell[]> => {
const lockScript:ScriptWrapper = {
  script:lockscript,
  argsLen: argslen
}
const collector = INDEXER.collector({ lock:lockScript,type:typescript});
const cells: Cell[] = [];
console.log("Fine-Grained Query:");
for await (const cell of collector.collect()) {
    cells.push(cell);
    console.log(cell);
 }
return cells;
};
```

### Get the Cell Minimal Capacity

```typescript title="mydapp/src/querycells.ts"
const fullcell:Cell = {
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
    tx_hash: '0x4a08e1609cd2f85ba33b4edf3c40ced779150925796ccea1441cad2b0a95395c',
    index: '0x0'
  },
  block_hash: '0x37f53dd6884eec2fa93b8fded335f28a3ac63fe9ed3a60226e03138968d30d3c',
  block_number: '0xc0',
  data: '0x0000000000000000'
}
import {minimalCellCapacity} from "@ckb-lumos/helpers";
export const getminimalCellCapacity = async (
  fullcell:Cell
) => {

const result = minimalCellCapacity(fullcell);
console.log("The minimal cell capacity is",result);
};
```

<details><summary>CLICK ME</summary>
<p>

```shell
The minimal cell capacity is 10200000000n
```
</p>
</details>

### Get the Mainnet Address from a Lock Script

```typescript title="mydapp/src/querycells.ts"
import {predefined} from "@ckb-lumos/config-manager";
export const generatemainnetAddressfromLock = async (
  lockscript:Script,
) => {
  const config = undefined || predefined.LINA;
  const mainnetAddress = generateAddress(lockscript,{config});
  console.log("The mainnet address for the lockscript is", mainnetAddress);  
}
```
<details><summary>CLICK ME</summary>
<p>

```shell
The mainnet address for the lockscript is ckb1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qxe85u4
```
</p>
</details>

### Generate the Testnet Address from a Lock Script

```typescript title="mydapp/src/querycells.ts"
export const generateTestnetAddressfromLock = async (
  lockscript:Script,
) => {
  const config = undefined || predefined.AGGRON4;
  const testnetAddress = generateAddress(lockscript, {config});
  console.log("The testnet address for the lockscript is", testnetAddress);  
}
```

<details><summary>CLICK ME</summary>
<p>

```shell
The testnet address for the lockscript is ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
```
</p>
</details>

### Get the Lock Script from an Address

```typescript title="mydapp/src/querycells.ts"
import { parseAddress} from "@ckb-lumos/helpers";
const address = "ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf";
const script = parseAddress(address);
console.log("The lockscript of the address is", lockscript);
```

<details><summary>CLICK ME</summary>
<p>

```shell
The lockscript of the address is {
  code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
  hash_type: 'type',
  args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
}
```

</p>
</details>

### Get the Balance of an Account

```typescript title="mydapp/src/querycells.ts"
export const getBalance = async(
  lockscript:Script
) => {
  let balance = BigInt(0);
  const collector = INDEXER.collector({ lock:lockscript});
  const cells: Cell[] = [];
  console.log("Get the balance of an account");
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

<details><summary>CLICK ME</summary>
<p>

```shell
The balance of the account is 3878947012798771n
```
</p>
</details>

### Get Uncommitted Cells

The transaction manager (`@ckb-lumos/transaction-manager`) is a tool for managing uncommitted cells. You can `send_transaction` via this tool and get uncommitted outputs by `collector`.

```typescript title="mydapp/src/querycells.ts"
import TransactionManager = require ("@ckb-lumos/transaction-manager");
const transactionmanager = new TransactionManager(INDEXER);
transactionmanager.start();

export const getUncommittedCells = async (
  lockscript:Script,
  transactionmanager:TransactionManager
) => {

  console.log("Get uncommitted cells");
  const collector = transactionmanager.collector( {lock:lockscript});
  for await (const cell of collector.collect()) {
    console.log(cell)
  }
}
```



