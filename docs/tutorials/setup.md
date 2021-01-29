---
id: setup
title: Initialize Connections to the CKB Node
---
Step 1. set up an RPC connection to the CKB node defined in the environment file. 

The environment file specifies ports, urls and directories used by the server.

```javascript
import dotenv from "dotenv";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import { Indexer, TransactionCollector } from "@ckb-lumos/indexer";
import { initializeConfig, getConfig } from "@ckb-lumos/config-manager";
import { RPC } from "ckb-js-toolkit";

// Configure environment
dotenv.config();
initializeConfig();

// Initialize Services
export const rpc = new RPC(process.env.RPC_URL);
```

Step 2. Set up a Lumos indexer with a connection to the same node

This step is to use the Lumos indexer to maintain a local database of cells for efficient transaction generation.

```javascript
export const indexer = new Indexer(
  process.env.RPC_URL,
  process.env.INDEXER_DATA_DIR
);
```

Step 3. Set up some express middleware for parsing JSON input and for accepting cross-site requests from the local client.

```javascript
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

Step 4. Bundle routes into files and include them at different base resources

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

Step 5. Start the indexer and announce that the server is running

```javascript
app.listen(process.env.PORT, () => {
  indexer.startForever();
  console.log(`The server is listening on port ${process.env.PORT}`);
});
```