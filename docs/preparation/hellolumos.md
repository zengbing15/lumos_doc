---
id: hellolumos
title: Hello Lumos
---
The Hello Lumos example is designed to serve as the starting point for learning the usage of Lumos. This guide will walk you through the example step by step. The full code of the example can be found in the github repository.

The example provides the following functional examples:

- Query cells or transactions from the blockchain.
- Build, sign, send, and track transactions.

## Prerequisites

The following prerequisites apply for going through the Hello Lumos example:

- The development environment is set up.
- The CKB node is running.
- A CKB account is created with enough CKB capacity.

## Environment

The following examples are verified on Ubuntu 20.04.2.

## Steps

### **Step 1. Download the Hello Lumos example.**

```
$ cd
$ git clone https://github.com/nervosnetwork/
```

### **Step 2. Install dependencies.**

```shell
$ cd hellolumos
$ yarn install
```

<details><summary>CLICK ME</summary>
<p>

```shell
yarn install v1.22.10
[1/4] Resolving packages...
[2/4] Fetching packages...
info fsevents@2.3.2: The platform "win32" is incompatible with this module.
info "fsevents@2.3.2" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 52.70s.
```
</p>
</details>

### Step 3. Update the account information.

In the hellolumos/src/accounts.ts file, update `PRIVATE_KEY`, `ADDRESS`, `ARGS` and `LOCKHASH` for ALICE and BOB with the information prepared in preparation phase.

### Step 4. Build the project.

```
$ tsc
```

### Step 5. Enter the Node.js REPL mode.

```shell
$ node --experimental-repl-await
```
<details><summary>CLICK ME</summary>
<p>

```shell
Welcome to Node.js v14.0.0.
Type ".help" for more information.
```
</p>
</details>

### Step 6. Start the server.

```shell
> const {ADDRESS,querycells,buildTXs,querytransactions} = require(".");
```

<details><summary>CLICK ME</summary>
<p>


```shell
The server is started.
```

</p>
</details>

### Step 7. Perform a common transfer transaction.

Get the information of the two accounts that are required for later queries and transactions.

```shell
> const alice = ADDRESS.ALICE;
> const bob = ADDRESS.BOB;
> const {parseAddress}=require("@ckb-lumos/helpers");
> const script1= parseAddress(alice.ADDRESS);
> const script2= parseAddress(bob.ADDRESS);
> const privatekey1=alice.PRIVATE_KEY;
> console.log(script1);
```

<details><summary>CLICK ME</summary>
<p>


```shell
{
  code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
  hash_type: 'type',
  args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
}
```

</p>
</details>

Get the balance information of Alice.

```shell
> const balance1 = querycells.getBalancebyLock(script1);
```

<details><summary>CLICK ME</summary>
<p>


```shell
> The balance of the account is 5908399726984497n
```

</p>
</details>

Get the balance information of Bob.

```shell
> const balance1 = querycells.getBalancebyLock(script2);
```

<details><summary>CLICK ME</summary>
<p>


```shell
> The balance of the account is 360000000000n
```

</p>
</details>

Build the common transaction.

```shell
> const txskeleton = await buildTXs.buildCommonTx(alice.ADDRESS, bob.ADDRESS,20000000000n,10000000n);
> const message = txskeleton.get("signingEntries").get(0)?.message;
> console.log(message);
0x7b9f14c93c1105213ab437f157460aa93963babff4cb03553e7dde6e72cbaf19
> const Sig = key.signRecoverable(message, privatekey1);
> console.log(Sig);
0x709026a75b82aca580d758c62eceaa9982b81057146a6c0205db3ee7b5581e3201d3ccd5845ea6d25b9b977f98f7c1c74efe4c38292b654d03fa2d037fa0777b01
> const transaction = sealTransaction(txskeleton, [Sig]);
> const {RPC}=require("@ckb-lumos/rpc");
> const rpc = new RPC("http://127.0.0.1:8114");
> const hash = await rpc.send_transaction(transaction);
> console.log(hash);
0xe332fb6efba38e16b8fd20a4f47d5fffcf8fcac0c863b0eb30ef75067847936d
> const txWithStatus= await rpc.get_transaction(hash);
> console.log(txWithStatus.tx_status.status);
committed
> const newbalance = querycells.getBalancebyLock(script2);
> The balance of the account is 380000000000n
```

### Step 8. Deposit to DAO

### Step 9. Withdraw from DAO

```shell
> const depositcells = buildTXs.listDAOCells(alice.ADDRESS,"deposit");
```

<details><summary>CLICK ME</summary>
<p>


```shell
List the DAO cells of the celltype deposit for the address ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
> {
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
    tx_hash: '0x953a32bc8cad5023d59f9467789ca0826fc7e17248ed6d09cfa9ea4d03f15eec',
    index: '0x0'
  },
  block_hash: '0x28cb80a7eeb12db569e50c7058c33e6f77026d47591a335cb58e08105754932c',
  block_number: '0xa9',
  data: '0x0000000000000000'
}
```

</p>
</details>

```shell
> const withdrawcells = buildTXs.listDAOCells(alice.ADDRESS,"withdraw");
```

<details><summary>CLICK ME</summary>
<p>


```shell
List the DAO cells of the celltype withdraw for the address ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
undefined
> {
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
    tx_hash: '0x313378dc3ce2d5c3f3efd546bc9595b54907844c20a72adae15cb9e970ce90df',
    index: '0x0'
  },
  block_hash: '0x657bef9f9d300bfd884065992f243770b9fa7dc8aafa304c98e210d2e02d1248',
  block_number: '0x12c',
  data: '0x6a00000000000000'
}
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
    tx_hash: '0xbc708146e8fea53a4629d37fbd345f7e9dca79225d90bb1f73e7077ade93da19',
    index: '0x0'
  },
  block_hash: '0xfc4a10116dbfb591796dcbf19e95c26ac647e7c2e41fc1b327a19c7ddd1eb938',
  block_number: '0x135',
  data: '0x1a01000000000000'
}
```

</p>
</details>



```shell
> const depositcell = {
...   cell_output: {
.....     capacity: '0x4a817c800',
.....     lock: {
.......       code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
.......       hash_type: 'type',
.......       args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
.......     },
.....     type: {
.......       code_hash: '0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e',
.......       hash_type: 'type',
.......       args: '0x'
.......     }
.....   },
...   out_point: {
.....     tx_hash: '0xa0b55857228b8f1d1d4c8bb09af5d35076d314510d539dfa5e7ebdaa02517145',
.....     index: '0x0'
.....   },
...   block_hash: '0xf19e0764b46e1454d9a18a9e69ef56e1d1f91e185ccbdf43c737ee8761b7bdfe',
...   block_number: '0x11a',
...   data: '0x0000000000000000'
... };
> const withdrawSkeleton = await buildTXs.withdrawfromDAO(depositcell,alice.ADDRESS,10000000n);
```

<details><summary>CLICK ME</summary>
<p>


```shell
Withdraw a DAO cell for the address ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
signingEntries: [
  {
    type: 'witness_args_lock',
    index: 0,
    message: '0xaa2600befcdf92a7fee92825f3248d47dc8f3f56939a64a2556679c71e06d818'
  }
]
```

</p>
</details>



```shell
> const withdrawMessage = withdrawSkeleton.get("signingEntries").get(0)?.message;
> const privatekey1=alice.PRIVATE_KEY;
> const {key}=require("@ckb-lumos/hd");
> const withdrawSig = key.signRecoverable(withdrawMessage, privatekey1);
> const {sealTransaction}=require("@ckb-lumos/helpers");
> const withdrawTX = sealTransaction(withdrawSkeleton, [withdrawSig]);
> const {RPC}=require("@ckb-lumos/rpc");
> const rpc = new RPC("http://127.0.0.1:8114");
> const withdrawHash = await rpc.send_transaction(withdrawTX);
> console.log("The withdraw transaction hash is",withdrawHash);
```

<details><summary>CLICK ME</summary>
<p>


```shell
The withdraw transaction hash is 0xbc708146e8fea53a4629d37fbd345f7e9dca79225d90bb1f73e7077ade93da19
```

</p>
</details>



```shell
> const withdrawTxWithStatus= await rpc.get_transaction(withdrawHash);
> console.log("The withdraw transaction status is:",withdrawTxWithStatus.tx_status.status);
```

<details><summary>CLICK ME</summary>
<p>


```shell
The withdraw transaction status is: pending
```

</p>
</details>



```shell
> const depositcells2 = buildTXs.listDAOCells(alice.ADDRESS,"deposit");
```

<details><summary>CLICK ME</summary>
<p>


```shell
List the DAO cells of the celltype deposit for the address ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf

> {
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
    tx_hash: '0x953a32bc8cad5023d59f9467789ca0826fc7e17248ed6d09cfa9ea4d03f15eec',
    index: '0x0'
  },
  block_hash: '0x28cb80a7eeb12db569e50c7058c33e6f77026d47591a335cb58e08105754932c',
  block_number: '0xa9',
  data: '0x0000000000000000'
}
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
    tx_hash: '0xa0b55857228b8f1d1d4c8bb09af5d35076d314510d539dfa5e7ebdaa02517145',
    index: '0x0'
  },
  block_hash: '0xf19e0764b46e1454d9a18a9e69ef56e1d1f91e185ccbdf43c737ee8761b7bdfe',
  block_number: '0x11a',
  data: '0x0000000000000000'
}
```

</p>
</details>



```shell
> const withdrawcells2 = buildTXs.listDAOCells(alice.ADDRESS,"withdraw");
```

<details><summary>CLICK ME</summary>
<p>


```shell
List the DAO cells of the celltype withdraw for the address ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf

> {
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
    tx_hash: '0x313378dc3ce2d5c3f3efd546bc9595b54907844c20a72adae15cb9e970ce90df',
    index: '0x0'
  },
  block_hash: '0x657bef9f9d300bfd884065992f243770b9fa7dc8aafa304c98e210d2e02d1248',
  block_number: '0x12c',
  data: '0x6a00000000000000'
}
```

</p>
</details>



```shell
const withdrawcell={
...   cell_output: {
.....     capacity: '0x4a817c800',
.....     lock: {
.......       code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
.......       hash_type: 'type',
.......       args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
.......     },
.....     type: {
.......       code_hash: '0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e',
.......       hash_type: 'type',
.......       args: '0x'
.......     }
.....   },
...   out_point: {
.....     tx_hash: '0xff73473ae997d9d5f4285c2ce3f8e39fd856094fb549731bb8b2cb8e81aaec08',
.....     index: '0x0'
.....   },
...   block_hash: '0x33f572a2a2ce308aa51342ce0dae844fda33490c43af02da9711df708fbfe492',
...   block_number: '0x13d',
...   data: '0xa900000000000000'
... };
> const unlockskeleton = await buildTXs.unlockWithdraw(depositcell,withdrawcell,alice.ADDRESS,alice.ADDRESS,10000000n);
```

<details><summary>CLICK ME</summary>
<p>


```shell
signingEntries: [
  {
    type: 'witness_args_lock',
    index: 0,
    message: '0xe2443664840ecd470aaa68eb1d947fd0cc8e177cfc2209a70cebf26c56e8d3aa'
  }
]
```

</p>
</details>



```shell
> const unlockMessage = unlockskeleton.get("signingEntries").get(0)?.message;
> const unlockSig = key.signRecoverable(unlockMessage,privatekey1);

> const unlockTX = sealTransaction(unlockskeleton, [unlockSig])

> const unlockHash = await rpc.send_transaction(unlockTX);
> console.log("The unlock withdraw transaction hash is",unlockHash);
```

<details><summary>CLICK ME</summary>
<p>


```shell
The unlock withdraw transaction hash is 0x1eb26531dc32e1c7d8a167fb99735ecb8fb81c8c2d4ddc6ec0245fdb3af420f4
```

</p>
</details>



```shell
> const unlockTxWithStatus= await rpc.get_transaction(unlockHash);
> console.log("The unlock transaction status is:",unlockTxWithStatus.tx_status.status);
```

<details><summary>CLICK ME</summary>
<p>


```shell
The unlock transaction status is: committed
```

</p>
</details>