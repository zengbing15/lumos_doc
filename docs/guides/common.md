---
id: common
title: Common CKB Tasks
---
## Initialize Connections to a CKB Node

<!--Step 1. Specify ports, URLs and directories used by the server in the `.env` environment file.-->

<!--PORT=8080-->
<!--RPC_URL="http://127.0.0.1:8114"-->
<!--CLIENT_URL="http://localhost:3001/"-->
<!--INDEXER_DATA_DIR="/tmp/indexed-data"-->

### Configure Environment

```javascript
import { initializeConfig } from "@ckb-lumos/config-manager";
// Configure environment
initializeConfig();
```

### Set Up an RPC Connection to the CKB Node. 

The RPC connection is set up for handling standard RPC calls between the DApp and the CKB node. 

```javascript
import { RPC } from "@ckb-lumos/rpc";

// Initialize Services
export const rpc = new RPC("http://127.0.0.1:8114");
```

### Set Up and Start the Lumos Indexer with a Connection to the Same CKB Node.

This step is to use the Lumos indexer to maintain a local database of cells for efficient transaction generation.

```javascript
import { Indexer } from "@ckb-lumos/indexer";

export const indexer = new Indexer(
  "http://127.0.0.1:8114",
  "/tmp/indexed-data"
);
indexer.startForever();
```

## Set Up an Express Server

An [Express](https://expressjs.com/) server can be used to convert API requests from the client into blockchain queries and transactions using Lumos.

**Step 1. Set up the Express middleware for parsing JSON input and accepting cross-site requests from the local client.**

```javascript
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
// Server Setup
const app = express();
app.use(bodyParser.json());
// Allow CORS for localhost
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
```

**Step 2. Bundle routes into files and include the routes at different base resources.**

```javascript
import indexerRoutes from "./routes/indexer";
import ckbRoutes from "./routes/ckb";
import generalRoutes from "./routes/general";
import nftRoutes from "./routes/nft";
import sudtRoutes from "./routes/sudt";
import sudtSaleRoutes from "./routes/sudt-sale";

// Routes
app.use("/", generalRoutes);
app.use("/indexer", indexerRoutes);
app.use("/ckb", ckbRoutes);
app.use("/nft", nftRoutes);
app.use("/sudt", sudtRoutes);
app.use("/sudt-sale", sudtSaleRoutes);
```

**Step 3. Announce the server is running.**

```javascript
app.listen(process.env.PORT, () => {
  console.log(`The server is listening on port ${"http://localhost:3001/"}`);
});
```

## Get the Balance of an Account

**Step 1. Find all the simple CKB cells for the user.**

```javascript
let balance = BigInt(0);

const collector = indexer.collector({ lock: lockScript, type: null });

const cells: Cell[] = [];
for await (const cell of collector.collect()) {
  cells.push(cell);
}
```

**Step 2. Add the capacity of these cells up and return the result as the balance.**

```javascript
return cells
  .map((cell) =>
    BigInt(
      cell.cell_output.capacity
    )
  )
  .reduce((balance, capacity) => (balance = balance += capacity));
```

**Step 3. Return the capacity result to the client.**

```typescript

```

## Transfer CKB from the Current Live Cells

To transfer CKB from the current set of live cells in response to a user request:

**Step 1. Create a transaction skeleton and  add the transfer operation.**

```javascript
import {sealTransaction, TransactionSkeleton } from "@ckb-lumos/helpers";
import { common } from "@ckb-lumos/common-scripts";

const tipHeader = {
  compact_target: '0x20010000',
  dao: '0x49bfb20771031d556c8480d47f2a290059f0ac7e383b6509006f4a772ed50200',
  epoch: '0xa0006002b18',
  hash: '0x432451e23c26f45eaceeedcc261764d6485ea5c9a204ac55ad755bb8dec9a079',
  nonce: '0x8199548f8a5ac7a0f0caef1620f37b79',
  number: '0x1aef6',
  parent_hash: '0x63594a64108f19f6aed53d0dca9ab4075aac4379cb80b2097b0deac8fc16fd3b',
  proposals_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
  timestamp: '0x172f6b9a4cf',
  transactions_root: '0x282dbadcd49f3e229d997875f37f4e4f19cb4f04fcf762e9639145aaa667b6f8',
  uncles_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
  version: '0x0'
}

const sender = ;
const recipient = ;
const amount = ;
const txFee = ;

let txSkeleton = TransactionSkeleton({
    cellProvider: indexer,
  });
  txSkeleton = await common.transfer(
    txSkeleton,
    sender,
    recipient,
    BigInt(amount)
  );
```

**Step 2. Add a fee for the transaction.**

```javascript
  txSkeleton = await common.payFee(
    txSkeleton,
    sender,
    BigInt(txFee)
  );
```

**Note**: It is also possible to have someone other than the sender to pay the fee.

**Step 3. Prepare the signing entries.** 

```javascript
 txSkeleton = common.prepareSigningEntries(txSkeleton);
```

The signing entries are the data that the user's wallet needs to sign to provide valid witnesses for the input lock scripts. 

**Step 4. Return the transaction skeleton to the client.**

```javascript
const routes = express.Router();
routes.post("/build-transfer", async (req: any, res) => {
  try {
    //const txSkeleton = await buildTransferCkbTx(req.body);
    return res
      .status(200)
      .json(JSON.stringify({ params: req.body, txSkeleton }));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
```

The user signs the transaction in the wallet and then the signatures are returned to the DApp through the client.

**Step 5. Seal the transaction with the required signatures.**

```javascript
const tx = sealTransaction(txSkeleton, signatures);
```
**Step 6. Send this finalized transaction to the CKB network.**

```javascript
const txHash = await rpc.send_transaction(tx);
```

**Step 7. (Optional) Get the Transaction Status.**

```javascript
const tx = await rpc.get_transaction(txHash);
return tx.tx_status.status;
```

A transaction can be in one of the three statuses: **pending**, **proposed** and **committed**.

A **pending** result means the node is aware of the transaction but the transaction is not confirmed yet. 

A **proposed** result means the node sees a transaction included in a block candidate that is not yet mined. 

A **committed** result means that the block involving the transaction has been mined and is officially on chain 