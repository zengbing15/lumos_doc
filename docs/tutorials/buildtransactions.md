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

To transfer CKB in a common transaction:

**Step 1. Create a transaction skeleton.**

```typescript
import {sealTransaction, TransactionSkeleton } from "@ckb-lumos/helpers";
import { common } from "@ckb-lumos/common-scripts";
 
const senderaddress = generateAddress(script);
const recipient = "ckt1qyqx57xrsztnq7g5mlw6r998uyc2f5hm3vnsvgsaet";
const amount = 100153459536n;
const txFee =  100000000n;

let txSkeleton = TransactionSkeleton({
  cellProvider: indexer,
});
txSkeleton = await common.transfer(
txSkeleton,
senderaddress,
recipient,
BigInt(amount),
);
```

**Step 2. Add a fee for the transaction.**

```typescript
txSkeleton = await common.payFee(
  txSkeleton,
  senderaddress,
  BigInt(txFee),
);
```

**Step 3. Prepare the signing entries.** 

To prepare the signing entries:

```typescript
txSkeleton = common.prepareSigningEntries(txSkeleton);
```

<!--**Step 4. Return the transaction skeleton to the client.**-->

<!--const routes = express.Router();--> <!--routes.post("/build-transfer", async (req: any, res) => {try {//const txSkeleton = await buildTransferCkbTx(req.body); return res .status(200) .json(JSON.stringify({ params: req.body, txSkeleton })); } catch (error) {return res.status(500).json({ error: error.message }); } });-->

**Step 4. Sign the transaction.**

For simplicity and demonstration, this example uses the HD wallet manager to generate a signature based on the private key 0x29159d8bb4b27704b168fc7fae70ffebf82164ce432b3f6b4c904a116a969f19.

<!--["0x1cb952fd224d1d14d07af621587e91a65ccb051d55ed1371b3b66d4fe169cf7758173882e4c02587cb54054d2de287cbb1fdc2fc21d848d7b320ee8c5826479901"];-->

```
const {key} = require("@ckb-lumos/hd");
const message = txSkeleton.get("signingEntries").get(0).message;
const signature = key.signRecoverable(message, privateKey)
```

**Step 5. Seal the transaction with the signature.**

```
const tx = sealTransaction(txSkeleton, signature);
```

**Step 6. Send this finalized transaction to the CKB network.**

```typescript
import { RPC } from "ckb-js-toolkit";
const rpc = new RPC("http://127.0.0.1:8114");
const hash = await rpc.send_transaction(tx);
console.log(hash);
```

Result

```shell
'0x88536e8c25f5f8c89866dec6a5a1a6a72cccbe282963e4a7bfb5542b4c15d376'
```

**Step 7. (Optional) Get the Transaction Status.**

```
const tx = await rpc.get_transaction(txHash);
return tx.tx_status.status; 
```

### Deposit to DAO

To deposit to Nervos DAO:

**Step 1. Create a transaction skeleton.**

The following example uses `generateAddress` from the helpers component with lock script to get the address. The same address can be used as the `fromInfo` and `toAddress`  for the deposit transaction. The deposited cells are frozen after the deposit operation.

```javascript
// <terminal 2>
> const script = {
  code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
  hash_type: "type",
  args: "0xcd3532de7f7d8f3252292e29b5296a6b36ba5369"
};
> const {generateAddress, createTransactionFromSkeleton, sealTransaction, TransactionSkeleton } = require("@ckb-lumos/helpers");
> const address = generateAddress(script);
> let skeleton = TransactionSkeleton({ cellProvider: indexer });
> const { secp256k1Blake160, dao } = require("@ckb-lumos/common-scripts");
> skeleton = await dao.deposit(skeleton, address, address, 100000000000n);
```

createTransactionFromSkeleton can be used to build a final transaction. It can also be used to view the current skeleton.

```
> console.log(JSON.stringify(createTransactionFromSkeleton(skeleton), null, 2));
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
        "tx_hash": "0xdb44f7c8ff0b97abfaf33665131fc95abe3b3ae5244d371431a4c5abfd547ccc",
        "index": "0x0"
      }
    }
  ],
  "outputs": [
    {
      "capacity": "0x174876e800",
      "lock": {
        "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        "hash_type": "type",
        "args": "0xcd3532de7f7d8f3252292e29b5296a6b36ba5369"
      },
      "type": {
        "code_hash": "0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e",
        "hash_type": "type",
        "args": "0x"
      }
    },
    {
      "capacity": "0x1230577b333f",
      "lock": {
        "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        "hash_type": "type",
        "args": "0xcd3532de7f7d8f3252292e29b5296a6b36ba5369"
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

**Step 2. Add a fee for the transaction.**

First, because we are using the default secp256k1-blake160 lock script, an existing module in common-scripts can be leveraged to incur transaction fee. Here we are using the same address to provide 1 CKByte as transaction fee.

> // If you checked the transaction skeleton after incurring fees. You will notice that it only has one input. This might raise a question: if NervoDAO deposit consumes one input cell, transaction fee requires a different input cell, shouldn't there be 2 input cells with 3 output cells(a deposited cell, and 2 change cell)? The trick here, is that common-scripts is smart enough to figure out that the 2 actions here use the same address. Hence it just rewrite the change cell generated in the NervosDAO deposit action to pay enough transaction fee.

```javascript
// <terminal 2>
> skeleton = await secp256k1Blake160.payFee(skeleton, address, 100000000n);
> createTransactionFromSkeleton(skeleton).inputs.length;
1
```

**Step 3. Prepare the signing entries.**

```javascript
// <terminal 2>
> skeleton = secp256k1Blake160.prepareSigningEntries(skeleton);
> // This method actually loops through the skeleton, and create `signingEntries`
> // that are using the default secp256k1-blake160 lock script:
> skeleton.get("signingEntries").toArray();
[
  {
    type: 'witness_args_lock',
    index: 0,
    message: '0xccf2e1edfd9523b3c4c1b91d77f30025cdff1fb5373e8e0df4dec86cc51f7735'
  }
]
```

**Step 4. Sign the transaction with the private key by using the HD wallet manager.**

```javascript
// <terminal 2>
> const {key} = require("@ckb-lumos/hd");
> const privateKey = "0x8a4cb53f641ee8df90cf5bc5204574744657a091dfe41c98069aa4e41ed9c86b";
> const message = skeleton.get("signingEntries").get(0).message;
> const signature = key.signRecoverable(message, privateKey);
> console.log(signature);
0x81a6d8ff2c581db3819e7ef8da2b88995eaca8d45f11353e814017e01859f1d61fd75287e86e37a697ed097b1bfc580d192438433b1bef7f7ca83346d9828e5d01
```

**Step 5. Seal the transaction.**

```javascript
// <terminal 2>
> const signatures = ["0x81a6d8ff2c581db3819e7ef8da2b88995eaca8d45f11353e814017e01859f1d61fd75287e86e37a697ed097b1bfc580d192438433b1bef7f7ca83346d9828e5d01"];
> const tx = sealTransaction(skeleton, signatures);
```

**Step 6. Send this finalized transaction to the CKB network**

```javascript
// <terminal 2>
> const { RPC } = require("ckb-js-toolkit");
> const rpc = new RPC("http://127.0.0.1:8114");
> await rpc.send_transaction(tx);
'0x67babe1a6d64473360c2d3417b715744542d8527590ffc4a088b5f17dbcd181d'
```

**Step 7. Check the capacity of the account by using the testnet address in <terminal 3>.**

The deposited 1000 CKB appears in the result.

```shell
//<terminal 3>
$ ckb-cli wallet get-capacity --address "ckt1qyqv6dfjmelhmrej2g5ju2d4994xkd462d5sathj2h"
dao: 1000.0 (CKB)
free: 464300332.92941572 (CKB)
immature: 8033296.18878644 (CKB)
total: 464301332.92941572 (CKB)
```

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
