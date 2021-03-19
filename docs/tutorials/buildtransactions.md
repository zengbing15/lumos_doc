---
id: buildtransactions
title: Assemble Transactions
---
<!--The goal and core functionality of a DApp built with Lumos is to build transactions in response to user requests.CKB programming model is flexible but it significantly complicates transaction assembling. -->

Lumos provides the `TransactionSkeleton` interface that significantly simplifies transaction assembling. 

<!--Different scripts used in transaction inputs will require separate message generation, and also separate signing steps.--><!--Some cells might require special argument setup in witness, due to type script validation rules.--><!--Coordination might be required, since both lock script and type script in a cell might require arguments in the same witness construct.-->

## Transaction Skeleton

Each transaction skeleton corresponds to an action, and will be built into a single transaction that is ready to be submitted to CKB. `TransactionSkeleton` supports transaction assembling with the following conveniences:

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

**Note:** The Anyone-Can-Pay script must be available on the chain. The script is already available in production on Mainnet and Testnet. For DEV chain, copy a dummy script into the config.json file under the root of the DApp project.

To transfer CKB in a common transaction:

**Step 1. Create a transaction skeleton.**

```typescript title="mydapp/src/buildTxs.ts"
import {INDEXER} from "./index";
import { sealTransaction, TransactionSkeleton, TransactionSkeletonType } from "@ckb-lumos/helpers";
import { common } from "@ckb-lumos/common-scripts";
import { ALICE,BOB } from "./addresses";
const senderaddress = ALICE.ADDRESS;
const recipient = BOB.ADDRESS;
const amount = 20000000000n;
const txFee =  10000000n;
const privatekey = ALICE.PRIVATE_KEY;

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

```typescript title="mydapp/src/buildTxs.ts"
skeleton = await common.payFee(
   skeleton,
   [sender],
   BigInt(txFee),
)
```

**Step 3. Prepare the signing entries.** 

```typescript title="mydapp/src/buildTxs.ts"
skeleton = common.prepareSigningEntries(skeleton);
```

**Step 4. Sign the transaction.**

Lumos does not support built-in message signing. The DApp needs to send the raw transaction to the user wallet to acquire signatures. For simplicity and demonstration, this example uses the ecdsaSign function to generate the signatures for signing the transaction.

```typescript title="mydapp/src/buildTxs.ts"
import { HexString } from "@ckb-lumos/base";
import { ecdsaSign } from "secp256k1";
async function signtransaction(txskeleton:TransactionSkeletonType):Promise<HexString[]>{
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
    return signatures;
}
console.log("signatures:",signatures);
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

```typescript title="mydapp/src/buildTxs.ts"
const tx = sealTransaction(txSkeleton, signatures);
```

**Step 6. Send this finalized transaction to the CKB network.**

```typescript title="mydapp/src/buildTxs.ts"
import { RPC } from "ckb-js-toolkit";
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

### Deposit to DAO

To deposit to Nervos DAO:

**Step 1. Create a transaction skeleton.**

The following example uses the same address as the `fromInfo` and `toAddress`  for the deposit transaction. The deposited cells are frozen after the deposit operation.

```typescript title="mydapp/src/buildTxs.ts"
let skeleton:TransactionSkeletonType = TransactionSkeleton({cellProvider: INDEXER});
skeleton = await dao.deposit(skeleton,sender,sender,BigInt(amount));
```

`createTransactionFromSkeleton` can be used to build a final transaction. It can also be used to view the current skeleton.

```typescript title="mydapp/src/buildTxs.ts"
import { createTransactionFromSkeleton } from "@ckb-lumos/helpers";
console.log(JSON.stringify(createTransactionFromSkeleton(skeleton), null, 2));
```

<details><summary>CLICK ME</summary>
<p>

```shell
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
        "tx_hash": "0x4eefc0b5a9c155978440b52b7874959e47cbb54823a1aac78d0319848eedcb2a",
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
      "capacity": "0x1242f27ab8aa",
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
```
</p>
</details>

**Step 2. Add a fee for the transaction.**

The following example uses an existing module, the secp256k1-blake160 lock script in common-scripts to build the transaction for the paying transaction fee action. In the example, the sender provides 0.1 CKB as the transaction fee.

> The deposit action and the paying transaction fee action are using the same address (the sender address). If you checked the transaction skeleton after incurring fees, you can notice that the transaction skeleton has only one input for the two actions. Lumos can intelligently rewrite the change cells generated in the deposit action to pay enough transaction fee. 

```typescript title="mydapp/src/buildTxs.ts"
const txFee =  10000000n;
skeleton = await secp256k1Blake160.payFee(skeleton,sender,BigInt(txFee));
console.log(createTransactionFromSkeleton(skeleton).inputs.length);
```

**Step 3. Prepare the signing entries.**

This example loops through the skeleton, and creates `signingEntries` by using the default secp256k1-blake160 lock script.

```javascript
skeleton = secp256k1Blake160.prepareSigningEntries(skeleton);
```

**Step 4. Sign the transaction with the private key by using the HD wallet manager.**

```typescript title="mydapp/src/buildTxs.ts"
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

```typescript title="mydapp/src/buildTxs.ts"
const depsittx = sealTransaction(depositSkeleton, [depositSig]);
```

**Step 6. Send this finalized transaction to the CKB network**

```typescript title="mydapp/src/buildTxs.ts"
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

**Step 7. Check the capacity of the account by using the Testnet address.**

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

### Withdraw from Nervos DAO

**Step1. List all deposited Nervos DAO cells for an address.**

```javascript
// <terminal 2>
> for await (const cell of dao.listDaoCells(indexer, address, "deposit")) { console.log(cell); }
{
  cell_output: {
    capacity: '0x174876e800',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0xcd3532de7f7d8f3252292e29b5296a6b36ba5369'
    },
    type: {
      code_hash: '0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e',
      hash_type: 'type',
      args: '0x'
    }
  },
  out_point: {
    tx_hash: '0x67babe1a6d64473360c2d3417b715744542d8527590ffc4a088b5f17dbcd181d',
    index: '0x0'
  },
  block_hash: '0x800e14d6831c7e5048f08ca01e83b6bf3aa0f389a076ff21e57eb2de13e36e1d',
  block_number: '0x601',
  data: '0x0000000000000000'
}
```

**Step 2. Locate the cell we just deposited to Nervos DAO and withdraw it from Nervos DAO.**

```javascript
> // First, we will need to locate the cell. In a real dapp this is most likely
> // coming from user selection.
> const cell = (await dao.listDaoCells(indexer, address, "deposit").next()).value;
> // For a new action, let's create a new transaction skeleton
> skeleton = TransactionSkeleton({ cellProvider: indexer });
> // This time, we invoke withdraw method to prepare a withdraw skeleton
> skeleton = await dao.withdraw(skeleton, cell, address);
> // Fees are also necessary
> skeleton = await secp256k1Blake160.payFee(skeleton, address, 100000000n);
> // And let's generate signing entries again.
> skeleton = secp256k1Blake160.prepareSigningEntries(skeleton);
> skeleton.get("signingEntries").toArray();
[
  {
    type: 'witness_args_lock',
    index: 0,
    message: '0xbb80f31714ec22b2ea5bab709b572005a3a8b0b0c853ca42b58d327c53e3f517'
  }
]

> const message2 = "0xbb80f31714ec22b2ea5bab709b572005a3a8b0b0c853ca42b58d327c53e3f517";
> const signature2 = key.signRecoverable(message2, privateKey);
> console.log(signature2);
0xcbc5bd9cd5a0ac0e9cb47551186dd1e746e5bbf89bde727801e4cb5e19e180281af475863a8313e88d09c1917554810929f9e50a1b9e7df26749d56d0137f5d001
> // After we signed the message, we can get the signature:
> const signatures2 = ["0xcbc5bd9cd5a0ac0e9cb47551186dd1e746e5bbf89bde727801e4cb5e19e180281af475863a8313e88d09c1917554810929f9e50a1b9e7df26749d56d0137f5d001"];
> // Now we can seal and send the transaction
> const tx2 = sealTransaction(skeleton, signatures2);
> await rpc.send_transaction(tx2);
'0x21151cc478b629926edcad2483e7694c2e187aa7e215b53d15ef0cf152401a89'   
```
