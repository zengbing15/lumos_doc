---
id: buildtransactions
title: Assemble Transactions
---
The goal and core functionality of a DApp built on top of Lumos is to build transactions in response to user requests. Lumos provides the [TransactionSkeleton](https://github.com/nervosnetwork/lumos/blob/develop/packages/helpers/src/index.ts#L212) interface that significantly simplifies the transaction assembling process. Each transaction skeleton corresponds to an action, and will be built into a single transaction that is ready to be submitted to CKB.

This guide introduces the general workflow of assembling transactions. The workflow applies to the following examples of a common transfer operation, DAO deposit and withdraw operations, and a transfer operation with the `locktimepool`.

<!--[TransactionSkeleton](https://github.com/nervosnetwork/lumos/blob/develop/packages/helpers/src/index.ts#L212) supports transaction assembling with the following conveniences:--><!--A well designed component must be able to query and include cells automatically to provide capacities required by the transaction.--><!--Individual script logic must be managed and respected by the general transaction skeleton.--><!--Scripts sharing the same behavior must be managed together in a unified interface. Developers can rely on abstractions instead of catering for every single detail.-->

## General Workflow

1. **The DApp creates a transaction skeleton**.

2. **The DApp adds the fee for the transaction**. The sender or someone other than the sender can pay the fee. 

3. **The DApp prepares the signing entries**. The signing entries are the data that the user's wallet needs to sign to provide valid witnesses for the input lock scripts. 

4. **The DApp acquires the signature from a user wallet**.

   :::note

   From the security perspective of a DApp, Lumos does not support built-in message signing. So the DApp needs to send the raw transaction <!--or the signing entries piece of the skeleton which contains the actual data to sign--> to the user wallet to acquire signatures. The raw transaction contains all the cells and dependencies for the action and the data that needs to be signed.<!--When the client gets the skeleton, the client forwards the transaction skeleton to the wallet for signing.--> 

   :::

5. **The DApp seals the transaction.** The transaction with signatures is forwarded to the DApp. The DApp seals the transaction by adding the transaction signatures to the transaction structure. 

6. **The DApp forwards this finalized transaction to the CKB network**. The DApp forwards the sealed transaction to the CKB network through the RPC interface. Upon successful receipt, the CKB network returns the transaction hash to the DApp. The transaction hash is sent back to the client such that the client can track the transactions.

7. **(Optional) The DApp gets the transaction status.**


## Examples

### Transfer CKB in a Common Transaction

Example: <u>hellolumos/src/buildTXs.ts/buildCommonTx</u>

```typescript title="hellolumos/src/buildTXs.ts"
export async function buildCommonTx(
    sender: string,
    recipient: string,
    amount: bigint,
    txFee: bigint,
    privateKey:string
):Promise<Hash> {
    let skeleton:TransactionSkeletonType = TransactionSkeleton({cellProvider: INDEXER});
    skeleton = await common.transfer(
        
            skeleton,
            [sender],
            recipient,
            BigInt(amount),
            undefined,
            undefined
            );
    
    skeleton = await common.payFee(
        skeleton,
        [sender],
        BigInt(txFee),
    )
    skeleton = common.prepareSigningEntries(skeleton);
    const tx = await signandSeal(skeleton,privateKey);
    const hash = await rpc.send_transaction(tx);
    console.log("The transaction hash is",hash);
    return hash;
}
```

The example builds a common transaction with the following steps:

**Step 1. Create a transaction skeleton.**

```typescript title="hellolumos/src/buildTXs.ts"
let skeleton:TransactionSkeletonType = TransactionSkeleton({cellProvider: INDEXER});
skeleton = await common.transfer(
    skeleton,
    [sender],
    recipient,
    BigInt(amount),
    undefined,
    undefined
);
```

**Step 2. Add the fee for the transaction.**

The [common.payFee](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/common-scripts/src/common.ts#L412) function is used to add the transaction fee to the transaction skeleton.

```typescript title="hellolumos/src/buildTXs.ts"
skeleton = await common.payFee(
   skeleton,
   [sender],
   BigInt(txFee),
)
```

**Step 3. Prepare the signing entries.** 

The [prepareSigningEntries](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/common-scripts/src/common.ts#L434) function is used to add the signing entries to the transaction skeleton. Now the transaction skeleton is the raw transaction that requires signatures.

```typescript title="hellolumos/src/buildTXs.ts"
skeleton = common.prepareSigningEntries(skeleton);
```

**Step 4. Sign and seal the transaction.**

:::note

Lumos does not support built-in message signing. The DApp needs to send the raw transaction to the user wallet to acquire signatures. 

:::

For simplicity and demonstration, this example uses the [key.signRecoverable](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/hd/src/key.ts#L7) function of the HD wallet manager (@ckb-lumos/hd) package to generate a signature based on the private key of the account. 

```typescript title="hellolumos/src/buildTXs.ts"
import {key} from "@ckb-lumos/hd";
import { sealTransaction } from "@ckb-lumos/helpers";

export async function signandSeal(
    txskeleton:TransactionSkeletonType,
    privatekey : string
):Promise<Transaction>{
    const message = txskeleton.get("signingEntries").get(0)?.message;
    const Sig = key.signRecoverable(message!, privatekey);
    const tx = sealTransaction(txskeleton, [Sig]);
    return tx;
}
```

The following is a signature output example：

```shell
[  
'0x4f73f26e51bee76d89edb74aee20e6fb2f8c670881f087aba04be80d7bd05117579d2bcfea3618d55473504e06586c10eecb76169d2ef0849c72e50a2f5d2b9500'
]
```

To seal the transaction, the example uses the [sealTransaction](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/helpers/src/index.ts#L257) function of the @ckb-lumos/helpers package to add the transaction signatures to the transaction skeleton.

**Step 5. Send this finalized transaction to the CKB network.**

:::info

The earlier versions before 0.16.0 require the Anyone-Can-Pay (ACP) script for submitting transactions. If you fail to submit transactions because of missing the ACP script, you can convert to the latest version of Lumos, or copy a dummy script into the config.json file under the root of the DApp project to fix the error.

:::

The [send_transaction](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/rpc/src/index.ts#L339) function of the @ckb-lumos/rpc package is used to send the transaction. The function sends the transaction to chain and returns a hash for the transaction. The hash can then be used to track the transactions.

```typescript
import { RPC } from "@ckb-lumos/rpc";
const rpc = new RPC("http://127.0.0.1:8114");
const hash = await rpc.send_transaction(skeleton);
console.log("The transaction hash is",hash);
```

The following is a transaction hash output example:

```shell
The transaction hash is 0x10104ec6857fd99b818e7b401216268c067ce7fbc536b77c86f3565c108e958e
```

**Step 6. (Optional) Get the Transaction Status.**

```typescript
const txWithStatus= await rpc.get_transaction(hash);
console.log("Transaction status is:",txWithStatus.tx_status.status); 
```

### Deposit CKB to DAO

Nervos DAO is a smart contract. Users can interact the same way as any smart contract on CKB with Nervos DAO. One function of Nervos DAO is to provide an dilution counter-measure for CKByte holders. By deposit in Nervos DAO, holders get proportional secondary rewards, which guarantee their holding are only affected by hardcapped primary issuance as in Bitcoin. For more information about Nervos DAO, see [RFC: Nervos DAO](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0023-dao-deposit-withdraw/0023-dao-deposit-withdraw.md).

Example: <u>hellolumos/src/buildTXs.ts/deposit2DAO()</u>

```typescript title="hellolumos/src/buildTXs.ts"
import { secp256k1Blake160, dao } from "@ckb-lumos/common-scripts";
export async function deposit2DAO(
    sender: string,
    amount: bigint,
    txFee: bigint,
    privateKey:string
):Promise<Hash> {
    let skeleton:TransactionSkeletonType = TransactionSkeleton({cellProvider: INDEXER});
    console.log("Deposit to DAO transaction");
    skeleton = await dao.deposit(skeleton,sender,sender,BigInt(amount));
    console.log(JSON.stringify(createTransactionFromSkeleton(skeleton), null, 2));
    skeleton = await secp256k1Blake160.payFee(skeleton,sender,BigInt(txFee));
    console.log(createTransactionFromSkeleton(skeleton).inputs.length);
    skeleton = secp256k1Blake160.prepareSigningEntries(skeleton);
    console.log("signingEntries:",skeleton.get("signingEntries").toArray());
    
    const tx = await signandSeal(skeleton,privateKey);
    const hash = await rpc.send_transaction(tx);
    console.log("The transaction hash is",hash);
    return hash;
}
```

The example builds a deposit transaction with the following steps:

**Step 1. Create a transaction skeleton with the DAO script.**

The example creates a TransactionSkeleton with the cells provided by the indexer. The same address is used as the `fromInfo` and `toAddress` for the [deposit](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/common-scripts/src/dao.ts#L112) function. The deposited cells are frozen after the deposit operation.

```typescript title="hellolumos/src/buildTXs.ts"
let skeleton:TransactionSkeletonType = TransactionSkeleton({cellProvider: INDEXER});
console.log("Deposit to DAO transaction");
skeleton = await dao.deposit(skeleton,sender,sender,BigInt(amount));
```

[createTransactionFromSkeleton](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/helpers/src/index.ts#L224) can be used to build a final transaction. It can also be used to view the current skeleton.

```typescript title="hellolumos/src/buildTXs.ts"
import { createTransactionFromSkeleton } from "@ckb-lumos/helpers";
console.log(JSON.stringify(createTransactionFromSkeleton(skeleton), null, 2));
```

**Step 2. Add the fee for the deposit transaction.**

The example uses an existing module, the secp256k1-blake160 lock script of the @ckb-lumos/common-scripts package to build the transaction for the paying transaction fee action. In the example, the sender provides 0.1 CKB as the transaction fee.

The deposit action and the paying transaction fee action are using the same address (the sender address). If you checked the transaction skeleton after incurring fees, you can notice that the transaction skeleton has only one input for the two actions. Lumos can intelligently rewrite the change cells generated in the deposit action to pay enough transaction fee. 

```typescript title="hellolumos/src/buildTXs.ts"
skeleton = await secp256k1Blake160.payFee(skeleton,sender,BigInt(txFee));
```

**Step 3. Prepare the signing entries.** 

This example loops through the skeleton, and creates `signingEntries` by using the default secp256k1-blake160 lock script.

```typescript title="hellolumos/src/buildTXs.ts"
skeleton = secp256k1Blake160.prepareSigningEntries(skeleton);
```

**Step 4. Sign and seal the transaction.**

:::note

Lumos does not support built-in message signing. The DApp needs to send the raw transaction to the user wallet to acquire signatures. 

:::

For simplicity and demonstration, the example uses the [key.signRecoverable](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/hd/src/key.ts#L7) function of the HD wallet manager (@ckb-lumos/hd) to generate a signature based on the private key of the account. 

For more information, see Step 4 in the common transaction section.

**Step 5. Send this finalized transaction to the CKB network**

```typescript title="hellolumos/src/buildTXs.ts"
 const hash = await rpc.send_transaction(tx);
 console.log("The transaction hash is",hash);
 return hash;
```
The following is a deposit transaction hash output example:


```shell
The transaction hash is 0x655bac89e443db42d48644f9fd89ddee70691f8e39ee4635c313375e8b2e6c0a
```
Try the `deposit2DAO` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>

```shell
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const {accounts,buildTXs} = require(".");
The server is started.
> const alice = accounts.ALICE;
> await buildTXs.deposit2DAO(alice.ADDRESS,20000000000n,10000000n,alice.PRIVATE_KEY);
Deposit to DAO transaction
{
  "version": "0x0",
  "cell_deps": [
    {
      "out_point": {
        "tx_hash": "0xa563884b3686078ec7e7677a5f86449b15cf2693f3c1241766c6996f206cc541",
        "index": "0x2"
      },
      "dep_type": "code"
    },
    {
      "out_point": {
        "tx_hash": "0xace5ea83c478bb866edf122ff862085789158f5cbff155b7bb5f13058555b708",
        "index": "0x0"
      },
      "dep_type": "dep_group"
    }
  ],
  "header_deps": [],
  "inputs": [
    {
      "since": "0x0",
      "previous_output": {
        "tx_hash": "0xd1b20dd4042374ad44d8ef9489420ff9d09cb6e72767fa549926ca42deced13a",
        "index": "0x0"
      }
    }
  ],
  "outputs": [
    {
      "capacity": "0x4a817c800",
      "lock": {
        "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        "hash_type": "type",
        "args": "0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e"
      },
      "type": {
        "code_hash": "0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e",
        "hash_type": "type",
        "args": "0x"
      }
    },
    {
      "capacity": "0x1242f69cc698",
      "lock": {
        "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        "hash_type": "type",
        "args": "0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e"
      }
    }
  ],
  "outputs_data": [
    "0x0000000000000000",
    "0x"
  ],
  "witnesses": [
    "0x55000000100000005500000055000000410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  ]
}
1
signingEntries: [
  {
    type: 'witness_args_lock',
    index: 0,
    message: '0x9728a156408f43f8d8de4fe48e3d14f16b1fc3086eaa419ae435f83b08dc6dfa'
  }
]
The transaction hash is 0x58f49e100a00742396fa66bcd2541fadcae549b56e75350efaa166d5d5bfacdc
'0x58f49e100a00742396fa66bcd2541fadcae549b56e75350efaa166d5d5bfacdc'
```
</p>
</details>

When the transaction is committed to the chain, check the capacity by using ckb-cli. You can see the deposited 200 CKB in the result.

:::note

Ensure the CKB minder is started to enable the transaction to be committed.

:::

```shell
$ ckb-cli wallet get-capacity --address "ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf"
dao: 200.0 (CKB)
free: 16078049.27374609 (CKB)
immature: 8039369.55859429 (CKB)
total: 16078249.27374609 (CKB)
```

### List DAO Cells

Example: <u>hellolumos/src/buildTXs.ts/listDAOCells()</u>

```typescript title="hellolumos/src/buildTXs.ts"
export async function listDAOCells(
    fromaddress: string,
    celltype: "deposit" | "all" | "withdraw"
) {
    console.log("List the",celltype,"cells for the address", fromaddress);
    for await (const cell of dao.listDaoCells(INDEXER,fromaddress,celltype)) {
         console.log(cell); 
    }
}
```

Try the `listDAOCells` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>


```shell
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const {accounts,buildTXs} = require(".");
The server is started.
> const alice = accounts.ALICE;
> await buildTXs.listDAOCells(alice.ADDRESS,"deposit");
List the deposit cells for the address ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
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
    tx_hash: '0x58f49e100a00742396fa66bcd2541fadcae549b56e75350efaa166d5d5bfacdc',
    index: '0x0'
  },
  block_hash: '0xc9a0077484dbcfa990e0d12b94d137723aec6a9f3ae44e8ed05e19084a076549',
  block_number: '0x59',
  data: '0x0000000000000000'
}
```

</p>

</details>

### Withdraw a Cell from Nervos DAO

Example: <u>hellolumos/src/buildTXs.ts/withdrawfromDAO()</u>

```typescript title="hellolumos/src/buildTXs.ts"
export async function withdrawfromDAO(
    cell: Cell,
    frominfo: string,
    txFee: bigint,
    privateKey:string
):Promise<Hash> {
    console.log("Withdraw a DAO cell for the address", frominfo);
    let skeleton = TransactionSkeleton({ cellProvider: INDEXER });
    skeleton = await dao.withdraw(skeleton, cell, frominfo);
    skeleton = await secp256k1Blake160.payFee(skeleton, frominfo, BigInt(txFee));
    skeleton = secp256k1Blake160.prepareSigningEntries(skeleton);
    console.log("signingEntries:",skeleton.get("signingEntries").toArray());
    const tx = await signandSeal(skeleton,privateKey);
    //const rpc = new RPC("http://127.0.0.1:8114");
    const hash = await rpc.send_transaction(tx);
    console.log("The transaction hash is",hash);
    return hash;
}
```

The example creates a transaction skeleton and then uses the [dao.withdraw](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/common-scripts/src/dao.ts#L225) function to withdraw a deposited cell.

The steps like adding transaction fee, preparing signing entries, signing and sealing the transaction, are the same as the previous examples. For more information, see the steps in the common transaction and the deposit transaction. 

Try the `withdrawfromDAO` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>


```shell
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const {accounts,buildTXs} = require(".");
The server is started.
> const alice = accounts.ALICE;
//Choose one deposited cell from the result of the listDAOCells step.
> const depositcell = {
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
	     tx_hash: '0x58f49e100a00742396fa66bcd2541fadcae549b56e75350efaa166d5d5bfacdc',
	     index: '0x0'
	   },
	   block_hash: '0xc9a0077484dbcfa990e0d12b94d137723aec6a9f3ae44e8ed05e19084a076549',
	   block_number: '0x59',
	   data: '0x0000000000000000'
	 };
> await buildTXs.withdrawfromDAO(fullcell,alice.ADDRESS,10000000n,alice.PRIVATE_KEY);
Withdraw a DAO cell for the address ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
signingEntries: [
  {
    type: 'witness_args_lock',
    index: 0,
    message: '0x7223a1da8032b346a69fc78957e144427e3c31c4c14afc2d87ed41635707df39'
  }
]
The transaction hash is 0x00df109343e2335a4e91375b37b575373902660be5f0d3fd0c2281b4425c1a7e
'0x00df109343e2335a4e91375b37b575373902660be5f0d3fd0c2281b4425c1a7e'
```

</p>

</details>

### Unlock a Withdrawn Cell

A withdrawn cell must be unlocked to make it usable as a live cell for new transactions.

:::info

A withdrawn cell can only be successfully unlocked when the epoch reaches the number that fulfills the lock period, i.e. the lock period of the cell has passed. Otherwise the unlock function will throw an error like "... the transaction is immature because of the since requirement...". 

The epoch number that fulfills the lock period = 180 (the default lock period) + <var>the epoch number of the deposit transaction</var> + <var>the epoch index of the deposit transaction</var>/<var>epoch length</var>. 

:::

Example: <u>hellolumos/src/buildTXs.ts/unlockWithdraw()</u>

```typescript title="hellolumos/src/buildTXs.ts"
export async function unlockWithdraw(
    depositinput: Cell,
    withdrawinput: Cell,
    toaddress:string,
    frominfo: string,
    txFee: bigint,
    privateKey:string
):Promise<Hash> {
    let skeleton = TransactionSkeleton({ cellProvider: INDEXER });
    skeleton = await dao.unlock(skeleton,depositinput,withdrawinput,toaddress,frominfo);
    skeleton = await secp256k1Blake160.payFee(skeleton, frominfo, BigInt(txFee));
    skeleton = secp256k1Blake160.prepareSigningEntries(skeleton);
    console.log("signingEntries:",skeleton.get("signingEntries").toArray());
    const tx = await signandSeal(skeleton,privateKey);
    const hash = await rpc.send_transaction(tx);
    console.log("The transaction hash is",hash);
    return hash;
}
```

Use the following commands to fetch the epoch information of the deposit transaction. It firstly gets the block hash of this transaction and then uses the block hash to get the block information. The epoch information "0xa0009000008 {number: 8, index: 9, length: 10}" is located in the block header. So the epoch number that fulfills the lock period for the withdrawn cell is (180+8+9/10) .

```shell
> const {RPC}=require("@ckb-lumos/rpc");
> const rpc = new RPC("http://127.0.0.1:8114");
> const tx = await rpc.get_transaction("0x58f49e100a00742396fa66bcd2541fadcae549b56e75350efaa166d5d5bfacdc");
> console.log(tx.tx_status.block_hash);
0xc9a0077484dbcfa990e0d12b94d137723aec6a9f3ae44e8ed05e19084a076549
> const block = await rpc.get_block("0xc9a0077484dbcfa990e0d12b94d137723aec6a9f3ae44e8ed05e19084a076549");
undefined
> console.log(block.header.epoch);
0xa0009000008 // {number: 8, index: 9, length: 10}
```

Try the `unlockWithdraw` function in the Node.js REPL mode.

<details><summary>CLICK ME</summary>
<p>


```shell
> await querytransactions.getTXStatus("0x00df109343e2335a4e91375b37b575373902660be5f0d3fd0c2281b4425c1a7e"); // To check if the withdraw transaction is committed.
The transaction status is committed 

> await buildTXs.listDAOCells(alice.ADDRESS,"withdraw");
List the withdraw cells for the address ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
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
    tx_hash: '0x00df109343e2335a4e91375b37b575373902660be5f0d3fd0c2281b4425c1a7e',
    index: '0x0'
  },
  block_hash: '0x3d1589aa3a2fdaf2971a2528f5285b9755c983142f9eb42dcf27181711410d85',
  block_number: '0x5f',
  data: '0x5900000000000000'
}
> const withdrawcell = {
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
    tx_hash: '0x00df109343e2335a4e91375b37b575373902660be5f0d3fd0c2281b4425c1a7e',
    index: '0x0'
  },
  block_hash: '0x3d1589aa3a2fdaf2971a2528f5285b9755c983142f9eb42dcf27181711410d85',
  block_number: '0x5f',
  data: '0x5900000000000000'
};
> await buildTXs.unlockWithdraw(depositcell,withdrawcell,alice.ADDRESS, alice.ADDRESS,10000000n,alice.PRIVATE_KEY);
signingEntries: [
  {
    type: 'witness_args_lock',
    index: 0,
    message: '0xbc12c2f7123eb9c55addac3c93f22ad337e1cf6324c158b2ec8bd018755dd46f'
  }
]
The transaction hash is 0xe41b9a78b96719ac4e75eed1359d804e97812131ed961be0c33f27c6f254e08b
'0xe41b9a78b96719ac4e75eed1359d804e97812131ed961be0c33f27c6f254e08b'
```

</p>

</details>

### Transfer CKB with locktimepool

Lumos provides [locktimepool](https://github.com/nervosnetwork/lumos/blob/develop/packages/common-scripts/src/locktime_pool.ts) for the cells that has a lock period.

:::info

The default lock period is 180 epochs. A cell that has a lock period is available for new transactions after the lock period of the cell passed. Otherwise transactions performed by the locktimepool.transfer function will throw an error like "Uncaught Error: Not enough capacity in from addresses!". 

:::

Example: <u>hellolumos/src/buildTXs.ts/locktimepoolTX()</u>

```typescript title="hellolumos/src/buildTXs.ts"
import {locktimePool} from "@ckb-lumos/common-scripts";

export async function locktimepoolTX(
    toaddress:string,
    frominfo: string,
    amount:bigint,
    txFee:bigint,
    privateKey:string
):Promise<Hash> {
    const tipheader = await rpc.get_tip_header();
   
    let skeleton = TransactionSkeleton({ cellProvider: INDEXER });
    //@ts-ignore
    skeleton = await locktimePool.transfer(skeleton, [frominfo], toaddress, BigInt(amount),tipheader);
    console.log(JSON.stringify(createTransactionFromSkeleton(skeleton), null, 2));
    skeleton = await locktimePool.payFee(skeleton,[frominfo], txFee, tipheader);
    skeleton = locktimePool.prepareSigningEntries(skeleton);
    skeleton.get("signingEntries").toArray();
    const tx = await signandSeal(skeleton,privateKey);
    const hash = await rpc.send_transaction(tx);
    console.log("The transaction hash is",hash);
    return hash;
}
```

Try the `locktimepoolTX` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>



```shell {77-102}
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts,querytransactions, buildTXs}=require(".");
The server is started.
>
//Perform another deposit action to create a deposit cell 
> await buildTXs.deposit2DAO(alice.ADDRESS,20000000000n,10000000n,alice.PRIVATE_KEY);
...
The transaction hash is 0x3162e8ccef8844e83c6cc63122f332f89d7dbd65c7d5f9fa040f4dd532b7abee
> await querytransactions.getTXbyHash("0x3162e8ccef8844e83c6cc63122f332f89d7dbd65c7d5f9fa040f4dd532b7abee");
The transaction status is committed
The block hash for the transaction is 0xd025028f2bc4e4381c0fb1743ada5a5c48e387bf6a49e162120ea9a626fe0772
>
> await buildTXs.listDAOCells(alice.ADDRESS,"deposit");
List the deposit cells for the address ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
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
    tx_hash: '0x3162e8ccef8844e83c6cc63122f332f89d7dbd65c7d5f9fa040f4dd532b7abee',
    index: '0x0'
  },
  block_hash: '0xd025028f2bc4e4381c0fb1743ada5a5c48e387bf6a49e162120ea9a626fe0772',
  block_number: '0xf0e',
  data: '0x0000000000000000'
}
>
>const depositcell = {
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
    tx_hash: '0x3162e8ccef8844e83c6cc63122f332f89d7dbd65c7d5f9fa040f4dd532b7abee',
    index: '0x0'
  },
  block_hash: '0xd025028f2bc4e4381c0fb1743ada5a5c48e387bf6a49e162120ea9a626fe0772',
  block_number: '0xf0e',
  data: '0x0000000000000000'
};
>
>
//Withdraw the cell from DAO to prepare a withdraw cell that has a lock period.
> await buildTXs.withdrawfromDAO(depositcell,alice.ADDRESS,10000000n,alice.PRIVATE_KEY);
...
The transaction hash is 0xee510df9a3bebbb00eef405318ba4fa19e5112139a3718ff13921bb962f9dda0
'0xee510df9a3bebbb00eef405318ba4fa19e5112139a3718ff13921bb962f9dda0'
>
//Check the withdraw transaction status.
> await querytransactions.getTXbyHash("0xee510df9a3bebbb00eef405318ba4fa19e5112139a3718ff13921bb962f9dda0");
The transaction status is committed
The block hash for the transaction is 0x63afdb21e9ce8173eb84bd59ac519aa80ab6f18cd4c61be9ceb5d536116c7a3f
>
//Check the cell in locktimepool, we can see the withdrawn cell in the locktime pool.
> await querycells.locktimepoolCells(alice.ADDRESS);
{
  cell_output: {
    capacity: '0x4a81c0719',
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
    tx_hash: '0xee510df9a3bebbb00eef405318ba4fa19e5112139a3718ff13921bb962f9dda0',
    index: '0x0'
  },
  block_hash: '0x63afdb21e9ce8173eb84bd59ac519aa80ab6f18cd4c61be9ceb5d536116c7a3f',
  block_number: '0xf1e',
  data: '0x0e0f000000000000',
  since: '0x20000a0004000235',
  depositBlockHash: '0xd025028f2bc4e4381c0fb1743ada5a5c48e387bf6a49e162120ea9a626fe0772',
  withdrawBlockHash: '0x63afdb21e9ce8173eb84bd59ac519aa80ab6f18cd4c61be9ceb5d536116c7a3f',
  sinceValidationInfo: undefined
}
>
>
//when the epoch reaches '0x20000a0004000235'(565+4/10), the locktimepool.transfer function can be executed sucessfully.
> await buildTXs.locktimepoolTX(bob.ADDRESS,alice.ADDRESS, 10000000000n,10000000n,alice.PRIVATE_KEY);
```

</p>

</details>