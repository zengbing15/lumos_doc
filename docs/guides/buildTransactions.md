---
id: buildtransactions
title: Build Transactions
---
The objective and the core functionality of a DApp built on top of Lumos is to build transactions in response to user requests. Lumos provides the [TransactionSkeleton](https://nervosnetwork.github.io/lumos/modules/helpers.html#transactionskeletontype) that significantly simplifies the transaction assembling process. Each transaction skeleton corresponds to an action, and will be built into a single transaction that is ready to be submitted to CKB.

This guide introduces the general workflow of assembling transactions. The workflow applies to the following examples of a common transfer operation, DAO operations, a transfer operation with the `locktimepool`, and SUDT operations.

<!--[TransactionSkeleton](https://github.com/nervosnetwork/lumos/blob/develop/packages/helpers/src/index.ts#L212) supports transaction assembling with the following conveniences:--><!--A well designed component must be able to query and include cells automatically to provide capacities required by the transaction.--><!--Individual script logic must be managed and respected by the general transaction skeleton.--><!--Scripts sharing the same behavior must be managed together in a unified interface. Developers can rely on abstractions instead of catering for every single detail.-->

## General Workflow

The DApp can assemble a transaction in the following steps:

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

## Prerequisites

The following prerequisites apply for the examples in this guide:

- The development environment is set up. For more information, see [Set Up the Development Environment](http://localhost:3000/lumos_doc/docs/preparation/setupsystem).
- The Lumos packages are installed. For more information, see [Install Lumos Packages](../guides/installlumos).

## Environment

The following examples are verified on Ubuntu 20.04.2. Steps on the other platforms can be adjusted accordingly.


## Examples

### Transfer CKB in a Common Transaction

The `@ckb-lumos/common-scripts` package includes a `common` script that can transfer capacity from `fromInfos` to an address, add the transaction fee and prepare signing entries for the transaction.

#### **Step 1. Create a transaction skeleton.**

The following example firstly creates a new transaction skeleton with the Lumos indexer as the cell provider `TransactionSkeleton({cellProvider: INDEXER})` that provides cells for assembling the transaction. 

Then the [common.transfer](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#transfer-15) function is used to add the input cells and output cells to the transaction skeleton according to the specified parameters.

Example:

```typescript title="hellolumos/src/buildTXs.ts/commonTransfer"
let txSkeleton: TransactionSkeletonType = TransactionSkeleton({
  cellProvider: INDEXER,
});
const tipheader = await rpc.get_tip_header();

txSkeleton = await common.transfer(
  txSkeleton,
  fromInfos,
  toAddress,
  BigInt(amount),
  undefined,
  tipheader
);
```

The [common.transfer](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#transfer-15) function creates a common transfer transaction.

**Constructor**

```typescript
common.transfer(
    txSkeleton: TransactionSkeletonType, 
    fromInfos: FromInfo[], 
    toAddress: Address,  
    amount: bigint, 
    changeAddress?: Address, 
    tipHeader?: Header, 
    {  
        config = undefined,  
        useLocktimeCellsFirst = true,  
        LocktimePoolCellCollector = locktimePool.CellCollector,
    }: {   config?: Config;   useLocktimeCellsFirst?: boolean;  LocktimePoolCellCollector?: any;  } = {}
)
```

Lumos supports gathering input cells from multiple wallets as a single unit by using the <var>fromInfos</var> parameter. It is a array of wallet parameters of a [MultisigScript](https://nervosnetwork.github.io/lumos/interfaces/common_scripts.multisigscript.html), Address (string), [ACP](https://nervosnetwork.github.io/lumos/interfaces/common_scripts.acp.html) or [CustomScript](https://nervosnetwork.github.io/lumos/interfaces/common_scripts.customscript.html) type. MultisigScript is used for the secp256k1_blake160_multisig lock script (the transactions that require multi-signatures).

The MultisigScript requires the following parameters:

 * <var>M</var>: <b>M</b> of N signatures must be provided to unlock the cell. <b>N</b> equals to the size of <var>publicKeyHashes</var>. <var>M</var> is a single byte unsigned integer that ranges from 0 to 255.
 * <var>R</var>: The provided signatures must match at least the first <b>R</b> items of the Pubkey list. <var>R</var> is a single byte unsigned integer that ranges from 0 to 255.
 * <var>publicKeyHashes</var>: The list of Lock Args generated by the blake160 function that extracts the first 20 bytes of a public key hash.

```typescript
export interface MultisigScript {
  R: number;
  M: number;
  publicKeyHashes: Hash[];
  /** locktime in since format */
  since?: PackedSince;
}
```

The following MultisigScript example means that any one of Alice and Bob can unlock the cell, but Alice must approve the transaction (1 is assigned to R).

```typescript
const fromInfo = {
  R: 1,
  M: 1,
  publicKeyHashes: [
    "0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e", //Lock Arg of Alice
    "0xecbe30bcf5c6b2f2d8ec2dd229a4603a7e206b99", // Lock Arg of Bob
  ],
};
```

If <var>changeAddress</var> is not specified in the `common.transfer` function, the first element of <var>fromInfos</var> is used as the change address. 

The `common.transfer` function can use cells with lock period in priority over other cells by specifying <var>tipHeader</var> in the `transfer` function.

To use the cells without lock period, just use `undefined` for <var>tipHeader</var> or specify the <var>useLocktimeCellsFirst</var> parameter as false.

#### **Step 2. Add the fee for the transaction.**

The [common.payFee](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#payfee-11) function can be used to add the transaction fee to the transaction skeleton.

**Constructor**

```typescript
common.payFee(
  txSkeleton: TransactionSkeletonType,
  fromInfos: FromInfo[],
  amount: bigint,
  tipHeader?: Header,
  {
    config = undefined,
    useLocktimeCellsFirst = true,
    enableDeductCapacity = true,
  }: {
    config?: Config;
    useLocktimeCellsFirst?: boolean;
    enableDeductCapacity?: boolean;
  } = {}
)
```

The [common.payFee](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#payfee-11)  function can use cells with lock period in priority over other cells by specifying <var>tipHeader</var> in the function.

To use the cells without lock period, just use `undefined` for <var>tipHeader</var> or specify the <var>useLocktimeCellsFirst</var> parameter as false.

The following example uses the cells without lock period to add the pay fee to the transaction skeleton created from Step 1.

Example:

```typescript title="hellolumos/src/buildTXs.ts/commonTransfer"
txSkeleton = await common.payFee(txSkeleton, fromInfos, BigInt(txFee));
```

#### **Step 3. Prepare the signing entries.** 

The [common.prepareSigningEntries](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#preparesigningentries-16) function is used to add the signing entries to the transaction skeleton. The result is a raw transaction that requires signatures.

**Constructor**

```typescript
common.prepareSigningEntries(
  txSkeleton: TransactionSkeletonType,
  { config = undefined }: Options = {}
)
```

Example:

```typescript title="hellolumos/src/buildTXs.ts/commonTransfer"
skeleton = common.prepareSigningEntries(txSkeleton);
```

#### **Step 4. Sign and seal the transaction.**

:::note

Lumos does not support built-in message signing. The DApp needs to send the raw transaction to the user wallet to acquire signatures. 

:::

For simplicity and demonstration, this example uses the [key.signRecoverable](https://nervosnetwork.github.io/lumos/modules/hd.html#signrecoverable-3) function of the HD wallet manager (@ckb-lumos/hd) package to generate a signature based on the private key of the account. 

Example:

```typescript title="hellolumos/src/buildTXs.ts/signandSeal" {9,10}
import { key } from "@ckb-lumos/hd";
import { sealTransaction } from "@ckb-lumos/helpers";

export async function signandSeal(
  txskeleton: TransactionSkeletonType,
  privatekey: string
): Promise<Transaction> {
  const message = txskeleton.get("signingEntries").get(0)?.message;
  const Sig = key.signRecoverable(message!, privatekey);
  const tx = sealTransaction(txskeleton, [Sig]);
  return tx;
}
```

The following is a signature output example：

```bash {1-3}
[  
'0x4f73f26e51bee76d89edb74aee20e6fb2f8c670881f087aba04be80d7bd05117579d2bcfea3618d55473504e06586c10eecb76169d2ef0849c72e50a2f5d2b9500'
]
```

To seal the transaction, the example uses the [sealTransaction](https://nervosnetwork.github.io/lumos/modules/helpers.html#sealtransaction) function of the `@ckb-lumos/helpers` package to add the transaction signatures to the transaction skeleton.

#### **Step 5. Send this finalized transaction to the CKB network.**

The [send_transaction](https://nervosnetwork.github.io/lumos/classes/rpc.rpc-2.html#send_transaction) function of the `@ckb-lumos/rpc` package can be used to send the transaction to the CKB network. The function sends the transaction to chain and returns a hash for the transaction. The hash can then be used to track the transactions.

Example:

```typescript title="hellolumos/src/buildTXs.ts/commonTransfer" {3}
import { RPC } from "@ckb-lumos/rpc";
const rpc = new RPC("http://127.0.0.1:8114");
const hash = await rpc.send_transaction(tx);
console.log("The transaction hash is", hash);
```

Instead of the `RPC.send_transaction` function, the [TransactionManager.send_transaction](https://nervosnetwork.github.io/lumos/classes/transaction_manager.transactionmanager.html#send_transaction) function supports validation on the transaction before sending the transaction to the CKB network. The function checks whether spent cells are used as input cells in the transaction. If any spent cell is used, it will throw an error. If no spent cells is used, the function will send the transaction to the CKB network and return the transaction hash as the result.

```typescript {1}
const hash = await transactionManager.send_transaction(tx);
console.log("The transaction hash is", hash);
```

A transaction hash output example:

```shell {1}
0x10104ec6857fd99b818e7b401216268c067ce7fbc536b77c86f3565c108e958e
```

:::info

The earlier versions before 0.16.0 require the Anyone-Can-Pay (ACP) script for submitting transactions. If you fail to submit transactions because of missing the ACP script, you can upgrade Lumos to the latest version, or copy a dummy script into the config.json file under the root of the DApp project to fix the error.

:::

**Step 6. (Optional) Get the Transaction Status.**

The [get_transaction](https://nervosnetwork.github.io/lumos/classes/rpc.rpc-2.html#get_transaction) function of the `@ckb-lumos/rpc` package can be used to get the transaction with status. 

Example:

```typescript title="hellolumos/src/buildTXs.ts/commonTransfer()" {3}
import { RPC } from "@ckb-lumos/rpc";
const rpc = new RPC("http://127.0.0.1:8114");
const txWithStatus = await rpc.get_transaction(hash);
console.log("Transaction status is:", txWithStatus.tx_status.status);
```

### Deposit CKB to DAO

> Nervos DAO is a smart contract. Users can interact the same way as any smart contract on CKB with Nervos DAO. One function of Nervos DAO is to provide an dilution counter-measure for CKByte holders. By deposit in Nervos DAO, holders get proportional secondary rewards, which guarantee their holding are only affected by hardcapped primary issuance as in Bitcoin. For more information about Nervos DAO, see [CKB RFC: Nervos DAO](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0023-dao-deposit-withdraw/0023-dao-deposit-withdraw.md).

#### **Step 1. Create a transaction skeleton with the DAO script.**

The [dao.deposit](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#deposit-2) is used to deposit CKB to DAO. The deposited cells are frozen after the deposit operation.

**Constructor**

```typescript
dao.deposit(
  txSkeleton: TransactionSkeletonType,
  fromInfo: FromInfo,
  toAddress: Address,
  amount: bigint,
  { config = undefined }: Options = {}
)
```

The <var>fromInfo</var> parameter must be specified when it is a [MultisigScript](https://nervosnetwork.github.io/lumos/interfaces/common_scripts.multisigscript.html) script. The same address can be used as the `fromInfo` and `toAddress` in the [dao.deposit](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#deposit-2) function.

The following example creates a transaction skeleton for the deposit action with the cells provided by the indexer. 

Example:

```typescript title="hellolumos/src/buildTXs.ts/deposit2DAO" {5}
let skeleton: TransactionSkeletonType = TransactionSkeleton({
  cellProvider: INDEXER,
});
console.log("Deposit to DAO transaction");
skeleton = await dao.deposit(skeleton, fromInfo, toAddress, BigInt(amount));
```

Use the [createTransactionFromSkeleton](https://nervosnetwork.github.io/lumos/modules/helpers.html#createtransactionfromskeleton-1) function to view the current skeleton. 

```typescript title="hellolumos/src/buildTXs.ts/deposit2DAO" {2}
import { createTransactionFromSkeleton } from "@ckb-lumos/helpers";
console.log(JSON.stringify(createTransactionFromSkeleton(skeleton), null, 2));
```

#### **Step 2. Add the fee for the deposit transaction.**

The `secp256k1_blake160`, `secp256k1_blake160_multisig` and `locktime_pool` script are similar to the `common` script. It is recommended to use the `common` script to deal with those lock scripts for the `payFee` action and the `prepareSigningEntries` action.

The `deposit` action and the `payFee` action are using the same address in the example. If you checked the transaction skeleton after incurring fees, you can notice that the transaction skeleton has only one input for the two actions. Lumos can intelligently rewrite the change cells generated in the deposit action to pay enough transaction fee. 

Example:

```typescript title="hellolumos/src/buildTXs.ts/deposit2DAO" {1}
skeleton = await common.payFee(skeleton, [fromInfo], BigInt(txFee));
```

#### **Step 3. Prepare the signing entries.** 

Example:

```typescript title="hellolumos/src/buildTXs.ts/deposit2DAO" {1}
skeleton = common.prepareSigningEntries(skeleton);
```

This example loops through the skeleton, and creates `signingEntries` by using the `common` script.

#### **Step 4. Sign and seal the transaction.**

:::note

Lumos does not support built-in message signing. The DApp needs to send the raw transaction to the user wallet to acquire signatures. 

:::

For simplicity and demonstration, the example uses the [key.signRecoverable](https://nervosnetwork.github.io/lumos/modules/hd.html#signrecoverable-3) function of the HD wallet manager (`@ckb-lumos/hd`) to generate a signature based on the private key of the account. 

For more information, see Step 4 in the common transaction section.

#### **Step 5. Send this finalized transaction to the CKB network**

Example:

```typescript title="hellolumos/src/buildTXs.ts/deposit2DAO" {1}
const hash = await rpc.send_transaction(tx);
console.log("The transaction hash is", hash);
return hash;
```
The following is a deposit transaction hash output example:


```shell
The transaction hash is 0x655bac89e443db42d48644f9fd89ddee70691f8e39ee4635c313375e8b2e6c0a
```
Try the `deposit2DAO` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>

```shell {1,2,5,7,8}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, buildTXs } = require(".");
The server is started.
> const alice = accounts.ALICE;
> await buildTXs.deposit2DAO(alice.ADDRESS, alice.ADDRESS, 20000000000n, 10000000n, alice.PRIVATE_KEY);
Deposit to DAO transaction
[warn] ANYONE_CAN_PAY script info not found in config!
1
1
{
  "version": "0x0",
  "cell_deps": [
    {
      "out_point": {
        "tx_hash": "0xb57669e3d40cdb3b4246e5e696307bfb46355dea6a9ba57d839860be101abf9a",
        "index": "0x2"
      },
      "dep_type": "code"
    },
    {
      "out_point": {
        "tx_hash": "0x6ddc6718014b7ad50121b95bb25ff61b4445b6c57ade514e7d08447e025f9f30",
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
        "tx_hash": "0x439c19db1367dfa9dd3fe105c3ae66a88520c58f7bf699ff45a571b7b3790c4d",
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
      "capacity": "0x1242f741bdf5",
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
signingEntries: [
  {
    type: 'witness_args_lock',
    index: 0,
    message: '0x4b756c942c7cf999e37b51b730298904148154539590a94cafb07b14fd728cc9'
  }
]
The transaction hash is 0xdf206bbebc18f9df18940c4b9bedaaf0b34e7d8640b5bbab5d8610bbb39ccbaa
'0xdf206bbebc18f9df18940c4b9bedaaf0b34e7d8640b5bbab5d8610bbb39ccbaa'
```
</p>
</details>

When the transaction is committed to the chain, check the capacity by using ckb-cli. You can see the deposited 200 CKB in the result.

:::note

Ensure the CKB minder is started to enable the transaction to be committed.

:::

```shell {1}
$ ckb-cli wallet get-capacity --address "ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf"
dao: 200.0 (CKB)
free: 77585.38025888 (CKB)
immature: 70346.24338446 (CKB)
total: 77785.38025888 (CKB)
```

### List DAO Cells

The [dao.listDaoCells](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#listdaocells-2) function can be used to list DAO cells for a specific type (deposit, withdraw or all). 

**Constructor**

```typescript
dao.listDaoCells(
  cellProvider: CellProvider,
  fromAddress: Address,
  cellType: "all" | "deposit" | "withdraw",
  { config = undefined }: Options = {}
)
```

Example:

```typescript title="hellolumos/src/buildTXs.ts/listDAOCells" {8}
import { dao } from "@ckb-lumos/common-scripts";

export async function listDAOCells(
  fromAddress: string,
  cellType: "deposit" | "all" | "withdraw"
) {
  console.log("List the", cellType, "cells for the address", fromAddress);
  for await (const cell of dao.listDaoCells(INDEXER, fromAddress, cellType)) {
    console.log(cell);
  }
}
```

You can also use the collect function of the [dao.CellCollector](https://nervosnetwork.github.io/lumos/classes/common_scripts.cellcollector-2.html) class to list the DAO cells of a specific type.

```typescript
import { dao } from "@ckb-lumos/common-scripts";

export async function listDAOCells2(
  fromInfo: FromInfo,
  cellType: "deposit" | "all" | "withdraw"
) {
  const CellCollector = new dao.CellCollector(fromInfo, INDEXER, cellType);
  for await (const cell of CellCollector.collect()) {
    console.log(cell);
  }
}
```

Try the `listDAOCells` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>


```shell {1,2,5,7,8}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, buildTXs } = require(".");
The server is started.
> const alice = accounts.ALICE;
> await buildTXs.listDAOCells(alice.ADDRESS, "deposit");
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
    tx_hash: '0xdf206bbebc18f9df18940c4b9bedaaf0b34e7d8640b5bbab5d8610bbb39ccbaa',
    index: '0x0'
  },
  block_hash: '0x453e13d6da2c863b44cfa49ff8dd421d34f6448cb21e3677bed54a3ffbe05ff9',
  block_number: '0x13',
  data: '0x0000000000000000'
}
```

</p>

</details>

### Withdraw a Cell from Nervos DAO

Example: 

```typescript title="hellolumos/src/buildTXs.ts/withdrawfromDAO" {15}
import { TransactionSkeleton } from "@ckb-lumos/helpers";
import { common, dao } from "@ckb-lumos/common-scripts";
import { Hash, Cell } from "@ckb-lumos/base";
import { INDEXER } from "./index";
const rpc = new RPC("http://127.0.0.1:8114");

export async function withdrawfromDAO(
  cell: Cell,
  frominfo: string,
  txFee: bigint,
  privateKey: string
): Promise<Hash> {
  console.log("Withdraw a DAO cell for the address", frominfo);
  let skeleton = TransactionSkeleton({ cellProvider: INDEXER });
  skeleton = await dao.withdraw(skeleton, cell, frominfo);
  skeleton = await common.payFee(skeleton, [frominfo], BigInt(txFee));
  skeleton = common.prepareSigningEntries(skeleton);
  //For simplicity and demonstration, this example uses the signandSeal function to sign the transaction.
  const tx = await signandSeal(skeleton, privateKey);
  const hash = await rpc.send_transaction(tx);
  console.log("The transaction hash is", hash);
  return hash;
}
```

The example creates a transaction skeleton and then uses the [dao.withdraw](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#withdraw-4) function to withdraw a deposited cell.

The steps like adding transaction fee, preparing signing entries, signing and sealing the transaction, are the same as the previous examples. For more information, see the steps in the common transaction and the deposit transaction. 

Try the `withdrawfromDAO` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>


```shell {1,2,5,7,9-31}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, buildTXs } = require(".");
The server is started.
> const alice = accounts.ALICE;
# Choose one deposited cell from the result of the listDAOCells step.
> const depositCell = {
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
    tx_hash: '0xdf206bbebc18f9df18940c4b9bedaaf0b34e7d8640b5bbab5d8610bbb39ccbaa',
    index: '0x0'
  },
  block_hash: '0x453e13d6da2c863b44cfa49ff8dd421d34f6448cb21e3677bed54a3ffbe05ff9',
  block_number: '0x13',
  data: '0x0000000000000000'
}
> await buildTXs.withdrawfromDAO(depositCell, alice.ADDRESS, 10000000n, alice.PRIVATE_KEY);
Withdraw a DAO cell for the address ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
The transaction hash is 0x5b2e8e943a9e9209b105e4de63a81657dc7e177dc366b9314b7f794727a9cccb
'0x5b2e8e943a9e9209b105e4de63a81657dc7e177dc366b9314b7f794727a9cccb'
```

</p>

</details>

### Unlock a Withdrawn Cell

A withdrawn cell must be unlocked to make it usable as a live cell for new transactions.

The following example uses the [dao.unlock](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#unlock-2) function to implement the unlock function.

Example: 

```typescript title="hellolumos/src/buildTXs.ts/unlockWithdraw" {16-22}
import { TransactionSkeleton } from "@ckb-lumos/helpers";
import { common, dao } from "@ckb-lumos/common-scripts";
import { Hash, Cell } from "@ckb-lumos/base";
import { INDEXER } from "./index";
const rpc = new RPC("http://127.0.0.1:8114");

export async function unlockWithdraw(
  depositinput: Cell,
  withdrawinput: Cell,
  toaddress: string,
  frominfo: string,
  txFee: bigint,
  privateKey: string
): Promise<Hash> {
  let skeleton = TransactionSkeleton({ cellProvider: INDEXER });
  skeleton = await dao.unlock(
    skeleton,
    depositinput,
    withdrawinput,
    toaddress,
    frominfo
  );
  skeleton = await common.payFee(skeleton, [frominfo], BigInt(txFee));
  skeleton = common.prepareSigningEntries(skeleton);
  console.log("signingEntries:", skeleton.get("signingEntries").toArray());
  const tx = await signandSeal(skeleton, privateKey);
  const hash = await rpc.send_transaction(tx);
  console.log("The transaction hash is", hash);
  return hash;
}
```

:::note

A withdrawn cell can only be successfully unlocked when the epoch reaches the number that fulfills the lock period, i.e. the lock period of the cell has passed. Otherwise the unlock function will throw an error like "... the transaction is immature because of the since requirement...". 

:::

<b>The earliest epoch number</b> (since when the withdrawn cell can be unlocked) = <b>180</b> (the default lock period) + <b><var>the epoch number of the deposit transaction</var></b> + <b><var>the block index of the deposit transaction</var></b> / <b><var>the epoch length</var>. </b>

The epoch information is located in the block header. For the CKB node installed by Tippy, you can check the epoch number and the block index of the deposit transaction on the Tippy Block page.<!--For example, the epoch information is 0xa0009000001 of the deposit transaction, the epoch number that fulfills the lock period for the withdrawn cell is (180 + 1 + 9/10) . It is approximately the 1,820th. block.-->

The following figure shows the epoch number and the block index of the deposit transaction (0x3162e8ccef8844e83c6cc63122f332f89d7dbd65c7d5f9fa040f4dd532b7abee). The withdrawn cell can be unlocked after epoch (180 + 1 + 9 / 10).

import useBaseUrl from "@docusaurus/useBaseUrl";

<img src={useBaseUrl("img/block.png")}/>

Try the `unlockWithdraw` function in the Node.js REPL mode.

<details><summary>CLICK ME</summary>
<p>


```shell {1,2,5,7-29,53-74,76}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { querytransactions } = require(".");
The server is started.
> const depositCell = {
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
    tx_hash: '0xdf206bbebc18f9df18940c4b9bedaaf0b34e7d8640b5bbab5d8610bbb39ccbaa',
    index: '0x0'
  },
  block_hash: '0x453e13d6da2c863b44cfa49ff8dd421d34f6448cb21e3677bed54a3ffbe05ff9',
  block_number: '0x13',
  data: '0x0000000000000000'
}
> await buildTXs.listDAOCells(alice.ADDRESS, "withdraw");
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
    tx_hash: '0x5b2e8e943a9e9209b105e4de63a81657dc7e177dc366b9314b7f794727a9cccb',
    index: '0x0'
  },
  block_hash: '0x06b0b91738866e50fd670e8c25dbd7ab35297c497a14c1e084afbea06e07a6b0',
  block_number: '0x19',
  data: '0x1300000000000000'
}
> const withdrawnCell = {
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
    tx_hash: '0x5b2e8e943a9e9209b105e4de63a81657dc7e177dc366b9314b7f794727a9cccb',
    index: '0x0'
  },
  block_hash: '0x06b0b91738866e50fd670e8c25dbd7ab35297c497a14c1e084afbea06e07a6b0',
  block_number: '0x19',
  data: '0x1300000000000000'
};
# Unlock the withdrawn cell.
> await buildTXs.unlockWithdraw(depositCell, withdrawnCell, alice.ADDRESS, alice.ADDRESS, 10000000n, alice.PRIVATE_KEY);
The transaction hash is 0x9c29e46995de785a0713e72447c8a0832d7d62cb53272a0d1b075102a21cc23f
'0x9c29e46995de785a0713e72447c8a0832d7d62cb53272a0d1b075102a21cc23f'
```

</p>

</details>

### Transfer CKB with Locktime Pool

Lumos provides the locktime pool for the cells that has a lock period. A cell with a lock period is only available for new transactions when the lock period has passed.

:::note

The default lock period is 180 epochs. If the cell is still in the lock period, the [locktimepool.transfer](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#transfer-12) function will throw an error like "Uncaught Error: Not enough capacity in from addresses!". 

:::

Example:

```typescript title="hellolumos/src/buildTXs.ts/locktimePoolTransfer" {19-25}
import {
  TransactionSkeleton,
  createTransactionFromSkeleton,
} from "@ckb-lumos/helpers";
import { Hash } from "@ckb-lumos/base";
import { INDEXER } from "./index";
const rpc = new RPC("http://127.0.0.1:8114");
import { locktimePool } from "@ckb-lumos/common-scripts";

export async function locktimePoolTransfer(
  toaddress: string,
  frominfo: string,
  amount: bigint,
  txFee: bigint,
  privateKey: string
): Promise<Hash> {
  const tipheader = await rpc.get_tip_header();
  let skeleton = TransactionSkeleton({ cellProvider: INDEXER });
  skeleton = await locktimePool.transfer(
    skeleton,
    [frominfo],
    toaddress,
    BigInt(amount),
    tipheader
  );
  console.log(JSON.stringify(createTransactionFromSkeleton(skeleton), null, 2));
  skeleton = await locktimePool.payFee(skeleton, [frominfo], txFee, tipheader);
  skeleton = locktimePool.prepareSigningEntries(skeleton);
  skeleton.get("signingEntries").toArray();
  const tx = await signandSeal(skeleton, privateKey);
  const hash = await rpc.send_transaction(tx);
  console.log("The transaction hash is", hash);
  return hash;
}
```

Try the `locktimePoolTransfer` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>



```shell {1,2,5,7,9,13,17,42-63,66,72,77,108}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, querycells, querytransactions, buildTXs } = require(".");
The server is started.
> const alice = accounts.ALICE;
# Perform another deposit action to create a deposit cell 
> await buildTXs.deposit2DAO(alice.ADDRESS, alice.ADDRESS, 20000000000n, 10000000n, alice.PRIVATE_KEY);
...
The transaction hash is 0xc9a29ac9984b508f4bd7bbe3c6453540e1c4f6b03009133bffa250f2c28485ab
'0xc9a29ac9984b508f4bd7bbe3c6453540e1c4f6b03009133bffa250f2c28485ab'
> await querytransactions.getTXbyHash("0xc9a29ac9984b508f4bd7bbe3c6453540e1c4f6b03009133bffa250f2c28485ab");
The transaction status is committed
The block hash for the transaction is 0x3ca4a7ce76b12ae6687f3402e3e840b44f2171f1e4dde38283f05e97e39adc24
>
> await buildTXs.listDAOCells(alice.ADDRESS, "deposit");
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
    tx_hash: '0xc9a29ac9984b508f4bd7bbe3c6453540e1c4f6b03009133bffa250f2c28485ab',
    index: '0x0'
  },
  block_hash: '0x3ca4a7ce76b12ae6687f3402e3e840b44f2171f1e4dde38283f05e97e39adc24',
  block_number: '0x72b',
  data: '0x0000000000000000'
}
>
> const depositCell = {
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
    tx_hash: '0xc9a29ac9984b508f4bd7bbe3c6453540e1c4f6b03009133bffa250f2c28485ab',
    index: '0x0'
  },
  block_hash: '0x3ca4a7ce76b12ae6687f3402e3e840b44f2171f1e4dde38283f05e97e39adc24',
  block_number: '0x72b',
  data: '0x0000000000000000'
}
>
# Withdraw the cell from DAO to prepare a withdraw cell that has a lock period.
> await buildTXs.withdrawfromDAO(depositCell, alice.ADDRESS, 10000000n, alice.PRIVATE_KEY);
...
The transaction hash is 0x6d9a12180755791eaf61d070d8d5112513cfd671d14434bec5b57c91fef17ee8
'0x6d9a12180755791eaf61d070d8d5112513cfd671d14434bec5b57c91fef17ee8'
>
# Check the withdraw transaction status.
> await querytransactions.getTXbyHash("0x6d9a12180755791eaf61d070d8d5112513cfd671d14434bec5b57c91fef17ee8");
The transaction status is committed
The block hash for the transaction is 0x23b5e3299f50305f76ad55789e1958a9e26b2145cc9eef464cd14006b8c01304
>
# Check the cell in locktimepool, we can see the withdrawn cell in the locktime pool.
> await querycells.locktimePoolCells(alice.ADDRESS);
{
  cell_output: {
    capacity: '0x4a82d540f',
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
    tx_hash: '0x6d9a12180755791eaf61d070d8d5112513cfd671d14434bec5b57c91fef17ee8',
    index: '0x0'
  },
  block_hash: '0x23b5e3299f50305f76ad55789e1958a9e26b2145cc9eef464cd14006b8c01304',
  block_number: '0x77b',
  data: '0x2b07000000000000',
  since: '0x20000a000500016b',
  depositBlockHash: '0x3ca4a7ce76b12ae6687f3402e3e840b44f2171f1e4dde38283f05e97e39adc24',
  withdrawBlockHash: '0x23b5e3299f50305f76ad55789e1958a9e26b2145cc9eef464cd14006b8c01304',
  sinceValidationInfo: undefined
}
...
>
>
# When the epoch reaches '0x20000a000500016b'(363 + 5/10), the locktimepool.transfer function can be executed sucessfully.
> await buildTXs.locktimePoolTransfer(bob.ADDRESS, alice.ADDRESS, 10000000000n, 10000000n, alice.PRIVATE_KEY);
The transaction hash is 0x60db4b0dc2e21632a035c021ad05a56e80fd2d50aeb3d9e00aa554f9f7c1e87a
'0x60db4b0dc2e21632a035c021ad05a56e80fd2d50aeb3d9e00aa554f9f7c1e87a'
```

</p>

</details>

### Issue SUDT Tokens

> SUDT is the abbreviation of Simple User Defined Token which defines a minimal standard that contains what’s absolutely needed for dapp developers to issue custom tokens on Nervos CKB. You can refer to [CKB RFC: Simple UDT Draft Spec](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0025-simple-udt/0025-simple-udt.md) for more details.

:::note

The SUDT script needs to be deployed to DEV chain before operating on SUDT tokens. For more information about deploying the SUDT script, see [Write a SUDT script by Capsule](https://docs.nervos.org/docs/labs/sudtbycapsule). You can also refer to the [Deploy the NFT Script on DEV Chain](../guides/integratenft#deploy-the-nft-script-on-dev-chain) example for details about deploying a script on DEV chain.

:::

The [sudt.issueToken](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#issuetoken-2) function can be used to generate SUDT tokens.

**Constructor**

```typescript
sudt.issueToken(
  txSkeleton: TransactionSkeletonType,
  fromInfo: FromInfo,
  amount: bigint,
  capacity?: bigint,
  tipHeader?: Header,
  { config = undefined }: Options = {}
)
```

The <var>amount</var> parameter means the amount of SUDT tokens to be generated. The <var>capacity</var> parameter is  optional, and it means the amount of CKB capacity used for the generation. If <var>capacity</var> is not defined, the `sudt.issueToken` function will use 142 CKB (the minimal CKB capacity of an SUDT cell) to generate SUDT tokens. 

Example:

```typescript title="hellolumos/src/buildTXs.ts/issueSUDT" {23}
import {
  createTransactionFromSkeleton,
  TransactionSkeleton,
  TransactionSkeletonType,
} from "@ckb-lumos/helpers";
import { common, sudt } from "@ckb-lumos/common-scripts";
import { Hash } from "@ckb-lumos/base";
import { INDEXER } from "./index";
import { RPC } from "@ckb-lumos/rpc";
const rpc = new RPC("http://127.0.0.1:8114");

export async function issueSUDT(
  fromInfo: FromInfo,
  amount: bigint,
  capacity: bigint,
  txFee: bigint,
  privateKey: string
): Promise<Hash> {
  let skeleton: TransactionSkeletonType = TransactionSkeleton({
    cellProvider: INDEXER,
  });
  console.log("Issue SUDT tokens.");
  skeleton = await sudt.issueToken(skeleton, fromInfo, amount, capacity);
  skeleton = await common.payFee(skeleton, [fromInfo], BigInt(txFee));
  console.log(createTransactionFromSkeleton(skeleton).inputs.length);
  skeleton = common.prepareSigningEntries(skeleton);
  const tx = await signandSeal(skeleton, privateKey);
  const hash = await rpc.send_transaction(tx);
  console.log("The transaction hash is", hash);
  return hash;
}
```

Try the `issueSUDT` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>




```shell {1,2,5,7-8}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, querytransactions, buildTXs } = require(".");
The server is started.
> const alice = accounts.ALICE;
> await buildTXs.issueSUDT(alice.ADDRESS, 60000000000n, 20000000000n, 10000000n, alice.PRIVATE_KEY);
Issue SUDT tokens.
The transaction hash is 0xa0b29a0cf416e8971207070860f0add8af25e35b6861b0b08470072d1370bb4b
'0xa0b29a0cf416e8971207070860f0add8af25e35b6861b0b08470072d1370bb4b'
```

</p>

</details>

### Transfer SUDT Tokens

The [sudt.transfer](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#transfer-14) function can be used to transfer SUDT tokens.

**Constructor**

```typescript
sudt.transfer(
  txSkeleton: TransactionSkeletonType,
  fromInfos: FromInfo[],
  sudtToken: Token,
  toAddress: Address,
  amount: bigint,
  changeAddress?: Address,
  capacity?: bigint,
  tipHeader?: Header,
  {
    config = undefined,
    LocktimePoolCellCollector = LocktimeCellCollector,
    splitChangeCell = false,
  }: Options & {
    LocktimePoolCellCollector?: any;
    splitChangeCell?: boolean;
  } = {}
)
```

The <var>sudtToken</var> parameter is the lock hash of the tokens' owner. The [sudt.ownerForSudt](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#ownerforsudt-2) function can be used to get the lock hash.

Example:

```typescript title="hellolumos/src/buildTXs.ts/transferSUDT()" {24-33}
import {
  createTransactionFromSkeleton,
  TransactionSkeleton,
  TransactionSkeletonType,
} from "@ckb-lumos/helpers";
import { common, sudt } from "@ckb-lumos/common-scripts";
import { Hash } from "@ckb-lumos/base";
import { INDEXER } from "./index";
import { RPC } from "@ckb-lumos/rpc";
const rpc = new RPC("http://127.0.0.1:8114");

export async function transferSUDT(
  fromInfo: FromInfo,
  toAddress: string,
  amount: bigint,
  capacity: bigint,
  txFee: bigint,
  privateKey: string
): Promise<Hash> {
  let skeleton: TransactionSkeletonType = TransactionSkeleton({
    cellProvider: INDEXER,
  });
  console.log("Transfer SUDT tokens.");
  const sudtToken = sudt.ownerForSudt(fromInfo);
  skeleton = await sudt.transfer(
    skeleton,
    [fromInfo],
    sudtToken,
    toAddress,
    amount,
    undefined,
    capacity
  );
  skeleton = await common.payFee(skeleton, [fromInfo], BigInt(txFee));
  console.log(createTransactionFromSkeleton(skeleton).inputs.length);
  skeleton = common.prepareSigningEntries(skeleton);
  const tx = await signandSeal(skeleton, privateKey);
  const hash = await rpc.send_transaction(tx);
  console.log("The transaction hash is", hash);
  return hash;
}
```

Try the `transferSUDT` function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>




```shell {1,2,5,7-9}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, querytransactions, buildTXs } = require(".");
The server is started.
> const alice = accounts.ALICE;
> const bob = accounts.BOB;
> await buildTXs.transferSUDT(alice.ADDRESS, bob.ADDRESS, 20000000000n, 20000000000n, 10000000n, alice.PRIVATE_KEY);
Transfer SUDT tokens:
The transaction hash is 0x1c6c608969d5e09f3e55d1628df05d1f1c26f6f65f6a5e728b66c6eae5e074e2
'0x1c6c608969d5e09f3e55d1628df05d1f1c26f6f65f6a5e728b66c6eae5e074e2'
> 
```

</p>

</details>