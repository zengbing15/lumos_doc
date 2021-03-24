---
id: buildtransactions
title: Assemble Transactions
---
<!--The goal and core functionality of a DApp built with Lumos is to build transactions in response to user requests.CKB programming model is flexible but it significantly complicates transaction assembling. -->

Lumos provides the `TransactionSkeleton` interface that significantly simplifies transaction assembling. 

<!--Different scripts used in transaction inputs will require separate message generation, and also separate signing steps.--><!--Some cells might require special argument setup in witness, due to type script validation rules.--><!--Coordination might be required, since both lock script and type script in a cell might require arguments in the same witness construct.-->

## TransactionSkeleton

Each transaction skeleton corresponds to an action, and will be built into a single transaction that is ready to be submitted to CKB. [TransactionSkeleton](https://github.com/nervosnetwork/lumos/blob/develop/packages/helpers/src/index.ts#L212) supports transaction assembling with the following conveniences:

- A well designed component must be able to query and include cells automatically to provide capacities required by the transaction.
- Individual script logic must be managed and respected by the general transaction skeleton.
- Scripts sharing the same behavior must be managed together in a unified interface. Developers can rely on abstractions instead of catering for every single detail.

## General Workflow for Assembling a Transaction

1. The DApp creates a transaction skeleton.

2. The DApp adds the fee for the transaction.

   **Note**: It is also possible to have someone other than the sender to pay the fee. 

3. The DApp prepares the signing entries.

   The signing entries are the data that the user's wallet needs to sign to provide valid witnesses for the input lock scripts. 

4. The DApp acquires the signature from a user wallet.

   From the security perspective of a DApp, Lumos does not support built-in message signing. So the DApp needs to send the raw transaction <!--or the signing entries piece of the skeleton which contains the actual data to sign--> to the user wallet to acquire signatures. The raw transaction contains all the cells and dependencies for the action and the data that needs to be signed.<!--When the client gets the skeleton, the client forwards the transaction skeleton to the wallet for signing.--> 

5. The DApp seals the transaction.

   The transaction with signatures is forwarded to the DApp. The DApp seals the transaction by adding the transaction signatures to the transaction structure. 

6. The DApp forwards this finalized transaction to the CKB network.

   The DApp forwards the sealed transaction to the CKB network through the RPC interface.

   Upon successful receipt, the CKB network returns the transaction hash to the DApp. The transaction hash is sent back to the client such that the client can track the transactions.

7. (Optional) The DApp gets the transaction status.

   A transaction can be in one of the following status:

   - A **pending** result means the node is aware of the transaction but the transaction is not confirmed yet. 
   - A **proposed** result means the node sees a transaction included in a block candidate that is not yet mined. 
   - A **committed** result means that the block involving the transaction has been mined and is officially on chain.

## Examples

### Transfer CKB in a Common Transaction

A common transaction can be built with the following steps:

**Step 1. Create a transaction skeleton.**

Example: <u>hellolumos/src/buildTXs.ts/buildCommonTx()</u>

```typescript title="hellolumos/src/buildTXs.ts"
import { TransactionSkeleton, TransactionSkeletonType } from "@ckb-lumos/helpers";
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

Example: <u>hellolumos/src/buildTXs.ts/buildCommonTx()</u>

```typescript title="hellolumos/src/buildTXs.ts"
skeleton = await common.payFee(
   //@ts-ignore
   skeleton,
   [sender],
   BigInt(txFee),
)
```

**Step 3. Prepare the signing entries.** 

Example: <u>hellolumos/src/buildTXs.ts/buildCommonTx()</u>

The [prepareSigningEntries()](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/common-scripts/src/common.ts#L434) function is used in the following example.

```typescript title="hellolumos/src/buildTXs.ts"
skeleton = common.prepareSigningEntries(skeleton);
```

The buildCommonTx function returns the raw transaction that requires signatures.

**Step 4. Sign the transaction.**

Lumos does not support built-in message signing. The DApp needs to send the raw transaction to the user wallet to acquire signatures. For simplicity and demonstration, this example uses the ecdsaSign function to generate the signatures for signing the transaction.

Example: <u>hellolumos/src/buildTXs.ts/signandSeal()</u>

```typescript title="hellolumos/src/buildTXs.ts"
import { ecdsaSign } from "secp256k1";

const signatures = txskeleton
    .get("signingEntries")
    .map(({ message }) => {
      const o = ecdsaSign(
        new Uint8Array(new Reader(message).toArrayBuffer()),
        new Uint8Array(new Reader(privatekey).toArrayBuffer())
      );
      const signature = new Uint8Array(65);
      signature.set(o.signature, 0);
      signature.set([o.recid], 64);
      return new Reader(signature.buffer).serializeJson();
    })
    .toArray();
```

<details><summary>CLICK ME</summary>
<p>

```
[  
'0x4f73f26e51bee76d89edb74aee20e6fb2f8c670881f087aba04be80d7bd05117579d2bcfea3618d55473504e06586c10eecb76169d2ef0849c72e50a2f5d2b9500'
]
```
</p>
</details>


Another simple method is to use the HD wallet manager to generate a signature based on the private key of the account.

```typescript
const {key} = require("@ckb-lumos/hd");
const message = skeleton.get("signingEntries").get(0).message;
const signatures = key.signRecoverable(message, privateKey)
```

**Step 5. Seal the transaction with the signature.**

Example: <u>hellolumos/src/buildTXs.ts/signandSeal()</u>

The [sealTransaction()](https://github.com/nervosnetwork/lumos/blob/develop/packages/helpers/src/index.ts#L257) function is used to seal the transaction.

```typescript title="hellolumos/src/buildTXs.ts"
import { sealTransaction } from "@ckb-lumos/helpers";
const tx = sealTransaction(txSkeleton, signatures);
```

**Step 6. Send this finalized transaction to the CKB network.**

**Note:** There is one legacy issue in Lumos old versions, that Anyone-Can-Pay script must be available on the chain. If you encounter the error that Anyone-Can-Pay script is not available when sending transactions to DEV chain, just copy a dummy script into the config.json file under the root of the DApp project to fix the error.

The [send_transaction()](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/rpc/src/index.ts#L339) function is used to send the transaction in the following example. The function send the transaction to chain and returns a hash for the transaction.

```typescript
import { RPC } from "@ckb-lumos/rpc";
const rpc = new RPC("http://127.0.0.1:8114");
const hash = await rpc.send_transaction(skeleton);
console.log(hash);
```

<details><summary>CLICK ME</summary>
<p>

```shell
'0x9a501e405653219aa8022132158820231aa5ecaff91c970b18d10fbad5ccc178'
```
</p>
</details>

**Step 7. (Optional) Get the Transaction Status.**

```typescript title="mydapp/src/buildTxs.ts"
const txWithStatus= await rpc.get_transaction(hash);
console.log("Transaction status is:",txWithStatus.tx_status.status); 
```

### Deposit CKB to DAO

Nervos DAO is a smart contract. Users can interact the same way as any smart contract on CKB with Nervos DAO. One function of Nervos DAO is to provide an dilution counter-measure for CKByte holders. By deposit in Nervos DAO, holders get proportional secondary rewards, which guarantee their holding are only affected by hardcapped primary issuance as in Bitcoin.

For more information about Nervos DAO, see [RFC: Nervos DAO](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0023-dao-deposit-withdraw/0023-dao-deposit-withdraw.md).

**Step 1. Assemble a TransactionSkeleton with the transaction fee and signing entries for the deposit transaction.**

**Example**: <u>hellolumos/src/buildTXs.ts/deposit2DAO()</u>

```typescript title="hellolumos/src/buildTXs.ts"
export async function deposit2DAO(
    sender: string,
    amount: bigint,
    txFee: bigint
):Promise<TransactionSkeletonType> {
    let skeleton:TransactionSkeletonType = TransactionSkeleton({cellProvider: INDEXER});
    //@ts-ignore
    console.log("Deposit to DAO transaction");
    skeleton = await dao.deposit(skeleton,sender,sender,BigInt(amount));
    console.log(JSON.stringify(createTransactionFromSkeleton(skeleton), null, 2));
    skeleton = await secp256k1Blake160.payFee(skeleton,sender,BigInt(txFee));
    console.log(createTransactionFromSkeleton(skeleton).inputs.length);
    skeleton = secp256k1Blake160.prepareSigningEntries(skeleton);
    console.log("signingEntries:",skeleton.get("signingEntries").toArray());
    return skeleton;
}
```
The example creates a TransactionSkeleton with the cells provided by the indexer. The same address is used as the `fromInfo` and `toAddress` for the [deposit](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/common-scripts/src/dao.ts#L112) function. The deposited cells are frozen after the deposit operation.

```typescript title="hellolumos/src/buildTXs.ts"
let skeleton:TransactionSkeletonType = TransactionSkeleton({cellProvider: INDEXER});
skeleton = await dao.deposit(skeleton,sender,sender,BigInt(amount));
```

[createTransactionFromSkeleton](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/helpers/src/index.ts#L224) can be used to build a final transaction. It can also be used to view the current skeleton.

```typescript title="hellolumos/src/buildTXs.ts"
import { createTransactionFromSkeleton } from "@ckb-lumos/helpers";
console.log(JSON.stringify(createTransactionFromSkeleton(skeleton), null, 2));
```

The example uses an existing module, the secp256k1-blake160 lock script in common-scripts to build the transaction for the paying transaction fee action. In the example, the sender provides 0.1 CKB as the transaction fee.

> The deposit action and the paying transaction fee action are using the same address (the sender address). If you checked the transaction skeleton after incurring fees, you can notice that the transaction skeleton has only one input for the two actions. Lumos can intelligently rewrite the change cells generated in the deposit action to pay enough transaction fee. 

```typescript title="hellolumos/src/buildTXs.ts"
skeleton = await secp256k1Blake160.payFee(skeleton,sender,BigInt(txFee));
```

This example loops through the skeleton, and creates `signingEntries` by using the default secp256k1-blake160 lock script.

```typescript title="hellolumos/src/buildTXs.ts"
skeleton = secp256k1Blake160.prepareSigningEntries(skeleton);
```

Try the buildTXs() function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>

```shell

```
</p>
</details>

**Step 2. Sign the transaction with the private key by using the HD wallet manager.**

```typescript
import {key} from "@ckb-lumos/hd";
const privatekey = ALICE.PRIVATE_KEY;
const message = skeleton.get("signingEntries").get(0).message;
const signature = key.signRecoverable(message, privateKey);
```

<details><summary>CLICK ME</summary>
<p>

```shell
signingEntries: [
  {
    type: 'witness_args_lock',
    index: 0,
    message: '0x15412513e78a45a183818a370f318de44176e016aa90b2cd459cc1688040a77b'
  }
]
```
</p>
</details>

**Step 5. Seal the transaction.**

```typescript
const depsittx = sealTransaction(depositSkeleton, [depositSig]);
```

**Step 6. Send this finalized transaction to the CKB network**

```typescript
const deposithash = await rpc.send_transaction(depsittx);
console.log("The deposit transaction hash is",deposithash)
```
<details><summary>CLICK ME</summary>
<p>

```shell
The deposit transaction hash is 0x655bac89e443db42d48644f9fd89ddee70691f8e39ee4635c313375e8b2e6c0a
```
</p>
</details>

**Step 7. Check the capacity of the account with the Testnet address.**

```shell
$ ckb-cli wallet get-capacity --address "ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf"
```
The deposited 200 CKB appears in the result.
<details><summary>CLICK ME</summary>
<p>

```shell
dao: 200.0 (CKB)
free: 35571260.54369496 (CKB)
immature: 8039101.70646172 (CKB)
total: 35571660.54369496 (CKB)
```
</p>
</details>

### List all DAO Cells

Example: <u>hellolumos/src/buildTXs.ts/listDAOCells()</u>

```typescript title="hellolumos/src/buildTXs.ts"
export async function listDAOCells(
    fromaddress: string,
    celltype: "deposit" | "all" | "withdraw"
) {
    console.log("List the DAO cells of the celltype",celltype, "for the address", fromaddress);
    //@ts-ignore
    for await (const cell of dao.listDaoCells(INDEXER,fromaddress,celltype)) {
         console.log(cell); 
    }
}
```

Try the withdrawfromDAO() function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>


```shell

```

</p>

</details>

### Withdraw a Cell from Nervos DAO

Example: <u>hellolumos/src/buildTXs.ts/withdrawfromDAO()</u>

```typescript title="hellolumos/src/buildTXs.ts"
export async function withdrawfromDAO(
    cell: Cell,
    frominfo: string,
    txFee: bigint
):Promise<TransactionSkeletonType> {
    console.log("Withdraw a DAO cell for the address", frominfo);
    let skeleton = TransactionSkeleton({ cellProvider: INDEXER });
    skeleton = await dao.withdraw(skeleton, cell, frominfo);
    skeleton = await secp256k1Blake160.payFee(skeleton, frominfo, BigInt(txFee));
    skeleton = secp256k1Blake160.prepareSigningEntries(skeleton);
    console.log("signingEntries:",skeleton.get("signingEntries").toArray());
    return skeleton;
}
```

Try the withdrawfromDAO() function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>


```shell

```



</p>

</details>

### Unlock a Withdrawn Cell

Example: <u>hellolumos/src/buildTXs.ts/unlockWithdraw()</u>

```
export async function unlockWithdraw(
    depositinput: Cell,
    withdrawinput: Cell,
    toaddress:string,
    frominfo: string,
    txFee: bigint
) {
    let skeleton = TransactionSkeleton({ cellProvider: INDEXER });
    skeleton = await dao.unlock(skeleton,depositinput,withdrawinput,toaddress,frominfo);
    skeleton = await secp256k1Blake160.payFee(skeleton, frominfo, BigInt(txFee));
    skeleton = secp256k1Blake160.prepareSigningEntries(skeleton);
    console.log("signingEntries:",skeleton.get("signingEntries").toArray());
    return skeleton;
}
```

**Note**: The withdraw cell can only be successfully unlocked after the lock period of the cell passed. Otherwise this function would throw an error. The lock period is 180 epoches.

 Try the unlockWithdraw() function in the Node.js REPL mode:

<details><summary>CLICK ME</summary>
<p>


```shell

```

</p>

</details>