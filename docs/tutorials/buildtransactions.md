---
id: buildtransactions
title: Build Transactions
---
The goal and core functionality of a DApp built with Lumos is to build transactions in response to user requests.

## Workflow

1. Create a transaction skeleton.

2. Add a fee for the transaction. **Note**: It is also possible to have someone other than the sender to pay the fee. 

3. Prepare the signing entries: The signing entries are the data that the user's wallet needs to sign to provide valid witnesses for the input lock scripts. 

4. Send the raw transaction to the client:  From the security perspective of a DApp, Lumos does not support built-in message signing. So the DApp needs to send the raw transaction <!--or the signing entries piece of the skeleton which contains the actual data to sign--> to the user wallet to acquire signatures. The raw transaction contains all the cells and dependencies for the action and the data that needs to be signed. 

   After the client gets the skeleton, the client forwards the transaction skeleton to the wallet for signing. 

5. Seal the transaction: The transaction with signatures is forwarded to the DApp. The DApp seals the transaction by adding the transaction signatures to the transaction structure. 

6. Send this finalized transaction to the CKB network: The sealed transaction is then forwarded to the CKB network.

   Upon successful receipt, the CKB network returns the transaction hash to the DApp. The transaction hash is sent back to the client such that the client can track the transactions.

7. (Optional) Get the Transaction Status: A transaction can be in one of the three statuses: **pending**, **proposed** and **committed**.

   A **pending** result means the node is aware of the transaction but the transaction is not confirmed yet. 

   A **proposed** result means the node sees a transaction included in a block candidate that is not yet mined. 

   A **committed** result means that the block involving the transaction has been mined and is officially on chain.

## Examples

### Transfer CKB from the Current Live Cells

To transfer CKB from the current set of live cells in response to a user request:

**Step 1. Create a transaction skeleton.**

```
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

```
txSkeleton = await common.payFee(
  txSkeleton,
  senderaddress,
  BigInt(txFee),
);
```

**Step 3. Prepare the signing entries.** 

To prepare the signing entries:

```
txSkeleton = common.prepareSigningEntries(txSkeleton);
```

<!--**Step 4. Return the transaction skeleton to the client.**-->

<!--const routes = express.Router();--> <!--routes.post("/build-transfer", async (req: any, res) => {try {//const txSkeleton = await buildTransferCkbTx(req.body); return res .status(200) .json(JSON.stringify({ params: req.body, txSkeleton })); } catch (error) {return res.status(500).json({ error: error.message }); } });-->

**Step 4. Sign the transaction.**

This example uses the HD wallet manager to generate a signature based on the private key 0x29159d8bb4b27704b168fc7fae70ffebf82164ce432b3f6b4c904a116a969f19.

<!--["0x1cb952fd224d1d14d07af621587e91a65ccb051d55ed1371b3b66d4fe169cf7758173882e4c02587cb54054d2de287cbb1fdc2fc21d848d7b320ee8c5826479901"];-->

```
const {key} = require("@ckb-lumos/hd");
const message = txSkeleton.get("signingEntries").get(0).message;
const signature = key.signRecoverable(message, privateKey)
```

**Step 5. Seal the transaction with the** **signature****.**

```
const tx = sealTransaction(txSkeleton, signature);
```

**Step 6. Send this finalized transaction to the CKB network.**

```
const { RPC } = require("ckb-js-toolkit");
const rpc = new RPC("http://127.0.0.1:8114");
const txHash = await rpc.send_transaction(tx);
'0x88536e8c25f5f8c89866dec6a5a1a6a72cccbe282963e4a7bfb5542b4c15d376'
```

**Step 7. (Optional) Get the Transaction Status.**

```
const tx = await rpc.get_transaction(txHash);
return tx.tx_status.status; 
```

