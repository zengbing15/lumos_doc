---
id: getstarted
title: Getting Started
---
## Prerequisites

The following prerequisites apply for using Lumos to develop CKB DApps:

- Basic Skills
  - Nervos CKB<!-- are prerequisites for developing CKB DApps with Lumos. -->. For more details about the basic knowledge of Nervos CKB, see [Nervos CKB Basics](https://docs.nervos.org/docs/basics/introduction).
  - Knowledge of CKB Data Model. For more details about the CKB data model, see [Nervos CKB Reference](https://docs.nervos.org/docs/reference/introduction) and [CKB Data Structure](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md).
  - Lumos features
- Development Stacks
  - JavaScript runtime environment: NodeJS version 12+
  - Web application framework: Express.js is recommended.
  - OS:  MacOS, Ubuntu Linux, or Windows 10 + WSL2 (Ubuntu)

## Workflow

The basic steps for developing a CKB DApp are as follows:

1. Prepare the prerequisite skills and development stacks listed in [Prerequisites](../quickstart/getstarted#prerequisites)
2. Install and configure Nervos CKB
3. Create the node skeleton
4. Set up the config manager
5. Program common CKB tasks
   - Check the current indexed tip
   - Get the balance of an account
   - Transfer CKB

## Steps

### Install and Configure Nervos CKB

If Nervos CKB is already installed, perform step 6 to start the CKB Node directly.

To install and configure Nervos CKB:

**Step 1. Download the latest CKB binary file from the CKB releases page on [GitHub](https://github.com/nervosnetwork/ckb/releases).**

```
$ export TOP=$(pwd)
# I'm testing this on a Linux machine, if you use other platforms, please adjust
# this accordingly.
$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.33.0/ckb_v0.33.0_x86_64-unknown-linux-gnu.tar.gz
$ tar xzf ckb_v0.33.0_x86_64-unknown-linux-gnu.tar.gz
$ export PATH=$PATH:$TOP/ckb_v0.33.0_x86_64-unknown-linux-gnu
```

**Step 2. Verify the binaries are working and check versions.**

```
$ ckb -V
ckb 0.33.0
$ ckb init -C devnet -c dev
```

**Step 3. Modify the chain config to skip difficulty adjustment, and set all epoch to contain 10 blocks.**

```
$ ed devnet/specs/dev.toml <<EOF
91d
90a
genesis_epoch_length = 10
permanent_difficulty_in_dummy = true
.
wq
EOF
```

**Step 4. Modify miner config to generate a new block every second.**

```
$ ed devnet/ckb-miner.toml <<EOF
39s/5000/1000/
wq
EOF
```

**Step 5. Use a specific private key as the wallet used in miner.** 

**Note**: Do not use this private key in other place.

```
$ ed devnet/ckb.toml <<EOF
143a
[block_assembler]
code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"
# private key: 0x29159d8bb4b27704b168fc7fae70ffebf82164ce432b3f6b4c904a116a969f19
args = "0xcbfbb9edb5838e2d61061c3fc69eaaa5fdbd3273"
hash_type = "type"
message = "0x"
.
wq
EOF
```

**Step 6. Start the CKB node with the dev chain.**

```
$ ckb run -C devnet
```

**Step 7. Start the CKB miner in a different terminal.**

```
$ export TOP=$(pwd)
$ export PATH=$PATH:$TOP/ckb_v0.33.0_x86_64-unknown-linux-gnu
$ ckb miner -C devnet
```

<!--To install and configure Nervos CKB, perform one of the following steps for connecting CKB mainet or testnet based on your development purpose:-->

<!--Run a CKB Mainnet Node-->

<!--For instructions about running a CKB mainnet node, see https://docs.nervos.org/docs/basics/guides/mainnet -->

<!--Run a CKB Testnet Node-->

<!--For instructions about running a CKB testnet node, see https://docs.nervos.org/docs/basics/guides/testnet -->

### Create the Node Skeleton

The node skeleton is used to run the JavaScript code.

To create the node skeleton:

**Step 1. Create a new directory for the skeleton and navigate into it.**


```
$ mkdir mydapp
$ cd mydapp
```

**Step 2. Add Lumos packages as dependencies for the project.**

```
$ yarn init
$ yarn add @ckb-lumos/indexer@0.14.1 @ckb-lumos/common-scripts@0.14.1
```

**Step 3. Install all dependencies.**

```
$ yarn install
```

**Step 4. Enable async/await for the node shell:**

```
$ node --experimental-repl-await
Welcome to Node.js v12.16.2.
Type ".help" for more information.
>
```

### Set Up the Config Manager

To set up the config manager:

**Note**: The following example shows how to set up the config manager by using pre_defined configurations. The config manager can also be set up by using a local config file. For more information about config manager, see the [Config Manager](../package/configmanager) section.

```
$ LUMOS_CONFIG_NAME=LINA node --experimental-repl-await
Welcome to Node.js v12.16.2.
Type ".help" for more information.
> const { initializeConfig } = require("@ckb-lumos/config-manager");
> initializeConfig();
```

### Start the Lumos Indexer

The DApp that is built with Lumos must have an indexer configured and running.

To start the Lumos indexer:

```
> const { Indexer } = require("@ckb-lumos/indexer");
> const indexer = new Indexer("http://127.0.0.1:8114", "./indexed-data");
> indexer.startForever();
```

### Program Common CKB Tasks

#### Check the Current Indexed Tip

To check the current indexed tip:

```
> await indexer.tip()
{
  block_number: "0x1aef6",
  block_hash: "0x432451e23c26f45eaceeedcc261764d6485ea5c9a204ac55ad755bb8dec9a079"
}
```

#### Get the Balance of an Account

**Step 1. Find all the simple CKB cells for the user.**

```javascript
const script = {
  code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
  hash_type: "type",
  args: "0xcbfbb9edb5838e2d61061c3fc69eaaa5fdbd3273"
};

const collector = indexer.collector({ lock: script, type: null });

const cells: Cell[] = [];
for await (const cell of collector.collect()) {
  cells.push(cell);
}
```

**Step 2. Add the capacity of these cells up and return the result as the balance.**

```javascript
let balance = BigInt(0);
return cells
  .map((cell) =>
    BigInt(
      cell.cell_output.capacity
    )
  )
  .reduce((balance, capacity) => (balance = balance += capacity));
```

#### Transfer CKB from the Current Live Cells

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
    tipHeader
  );
```

**Step 2. Add a fee for the transaction.**

```javascript
  txSkeleton = await common.payFee(
    txSkeleton,
    senderaddress,
    BigInt(txFee),
    tipHeader
  );
```

**Note**: It is also possible to have someone other than the sender to pay the fee.

**Step 3. Prepare the signing entries.** 

The signing entries are the data that the user's wallet needs to sign to provide valid witnesses for the input lock scripts. 

To prepare the signing entries:

```javascript
 txSkeleton = common.prepareSigningEntries(txSkeleton);
```

<!--**Step 4. Return the transaction skeleton to the client.**-->

<!--const routes = express.Router();-->
<!--routes.post("/build-transfer", async (req: any, res) => {try {//const txSkeleton = await buildTransferCkbTx(req.body);
return res
.status(200)
.json(JSON.stringify({ params: req.body, txSkeleton }));
} catch (error) {return res.status(500).json({ error: error.message });
}
});-->

**Step 5. Sign the transaction.**

From the security perspective of a DApp, Lumos does not support built-in message signing.

For demonstration purpose, this example uses a secp256k1 tool to generate a signature based on the private key `0x29159d8bb4b27704b168fc7fae70ffebf82164ce432b3f6b4c904a116a969f19`.

```
const signatures = ["0x1cb952fd224d1d14d07af621587e91a65ccb051d55ed1371b3b66d4fe169cf7758173882e4c02587cb54054d2de287cbb1fdc2fc21d848d7b320ee8c5826479901"];
```

**Step 5. Seal the transaction with the signatures.**

```javascript
const tx = sealTransaction(txSkeleton, signatures);
```

**Step 6. Send this finalized transaction to the CKB network.**

```javascript
const { RPC } = require("ckb-js-toolkit");
const rpc = new RPC("http://127.0.0.1:8114");
await rpc.send_transaction(tx);
'0x88536e8c25f5f8c89866dec6a5a1a6a72cccbe282963e4a7bfb5542b4c15d376'
```

**Step 7. (Optional) Get the Transaction Status.**

```javascript
const tx = await rpc.get_transaction(txHash);
return tx.tx_status.status;
```

A transaction can be in one of the three statuses: **pending**, **proposed** and **committed**.

A **pending** result means the node is aware of the transaction but the transaction is not confirmed yet. 

A **proposed** result means the node sees a transaction included in a block candidate that is not yet mined. 

A **committed** result means that the block involving the transaction has been mined and is officially on chain.

