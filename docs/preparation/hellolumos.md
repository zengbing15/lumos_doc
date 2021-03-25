---
id: hellolumos
title: Hello Lumos
---
The Hello Lumos example is designed to serve as the starting point for learning Lumos. 

The  example has the following structure:

```
hellolumos/
├── src|accounts.ts
├── src|buildTXs.ts
├── src|index.ts
├── src|managekeys.ts
├── src|querycells.ts
├── src|querytransactions.ts
├── config.json
├── package.json
├── tsconfig.json
└── yarn.lock
```

All required dependencies for the Hello Lumos example are listed in package.json. To install the other Lumos packages, see [Install Lumos](../tutorials/installlumos).

The connection with the CKB node is established by the setup of the config manager and the Lumos indexer in the <u>index.ts</u> file. The Lumos indexer indexes cells locally to provide cells for queries and transaction requests. For more information about setting up the config manager, see [Set Up the Config Manger](../tutorials/config). For more information about setting up the Lumos indexer, see [Set Up the Lumos Indexer](../tutorials/indexer).

The functions like querying on cells in <u>querycells.ts</u>, building transactions in <u>buildTXs.ts</u> are all facilitated based on the Lumos framework.

The <u>querycells.ts</u> file implements several sample functions by utilizing Lumos utilities for querying on cells. For more information, see [Query on Cells](../tutorials/querycells).

The <u>querytransactions.ts</u> file implements several sample functions by utilizing Lumos utilities for querying on transactions. For more information, see [Query on Transactions](../tutorials/querytransactions).

The <u>buildTXs.ts</u> file implements several sample functions by utilizing Lumos utilities for assembling common transfer transactions, DAO deposit and withdraw transactions. For more information, see [Assembling Transactions](../tutorials/buildtransactions).

This guide will help you to get a general idea about the usage of Lumos through a common transaction. The full code of the example can be found here. 

## Prerequisites

The following Prerequisites apply for walking through this guide:

- The development environment is set up. For more information, see [Set Up the Development Environment](../preparation/setupsystem).
- The CKB node is installed and started on DEV chain. For more information, see [Install a CKB Node](../preparation/installckb).
- Two accounts, Alice and Bob are created. Alice is specified as the miner to receive mining rewards that is used for transactions. For more information, see [Create Accounts](../preparation/createaccount).

## Environment

The following examples are verified on Ubuntu 20.04.2. Steps on the other platforms are similar and can be adjusted accordingly.

## Steps

<!--Set up the development Environment.-->

<!--Step 1. Install Node.js.-->

<!--Step 2. Install Yarn.-->

<!--Step 3. Install Dependencies for node-gyp.-->

<!--For more information about the setup and the steps on the other platforms, see [Set Up the Development Environment](../preparation/setupsystem).-->

<!--Install and run a CKB Node on DEV chain.-->

<!--Step 1. Download the CKB Pre-built Installer Package.-->

<!--Step 2. Initialize the CKB node on the DEV blockchain.-->

<!--Step 3. Modify `genesis_epoch_length` and `permanent_difficulty_in_dummy` in the /ckb_v0.39.0_x86_64-unknown-linux-gnu/specs/**dev.toml** file.-->

<!--Step 4. Modify the `value` parameter under the `miner.workers` section in the **ckb-miner.toml** file.-->

<!--Step 5. Start the CKB node with the dev chain.$ ckb run -C devnet-->

<!--For more information, see [Install a CKB Node by Using the Pre-built Installer Package-->

### Download the Hello Lumos example.

```
$ cd
$ git clone https://github.com/nervosnetwork/hellolumos
```

### Install dependencies.

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

### Update the account information.

Replace the value of `PRIVATE_KEY`, `ADDRESS`, `ARGS` and `LOCKHASH` for ALICE and BOB in the `accounts.ts` file with the account information you have prepared when creating accounts. For more information about creating accounts, see [Create Accounts](../preparation/createaccount).

Example:

```typescript title="hellolumos/src/accounts.ts"
export const ALICE = {
  PRIVATE_KEY:
    "0xf2a91b1410f7308631b89603262448ba515cddac1ffe250265551c82fff3eb3a",
  ADDRESS: "ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf",
  ARGS: "0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e",
  LOCKHASH: "0xf6ea009a4829de7aeecd75f3ae6bcdbaacf7328074ae52a48456a8793a4b1cca"
};

export const BOB = {
  PRIVATE_KEY:
    "0x670ac6ac1ce8004b4220f0fb024179461f11989ff4d446816f78813b80b9c696",
  ADDRESS: "ckt1qyqwe03shn6udvhjmrkzm53f53sr5l3qdwvsytj4hs",
  ARGS: "0xecbe30bcf5c6b2f2d8ec2dd229a4603a7e206b99",
  LOCKHASH: "0x34f085b5d2fa3f4ad2880713082a72864522a6ebffa1eb931b09e0407092eda5",
};
```

### Build the project.

```
$ tsc
```

### Enter the Node.js REPL mode.

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

### Execute the index.js file to start the server and include the required modules.

```shell
> const {accounts,querycells,buildTXs,querytransactions} = require(".");
```

<details><summary>CLICK ME</summary>
<p>

```shell
The server is started.
```

</p>
</details>

### Perform a common transfer transaction.

Step 1. Get the lock script for the accounts of Alice and Bob.

```shell
> const alice = accounts.ALICE;
> const bob = accounts.BOB;
> const { parseAddress }=require("@ckb-lumos/helpers");
> const script1 = parseAddress(alice.ADDRESS);
> const script2 = parseAddress(bob.ADDRESS);
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

Step 2. Get the balance for the accounts of Alice and Bob.

```shell
> const balance1 = querycells.getBalancebyLock(script1);
> The balance of the account is 1386763373620166n
```

```shell
> const balance2 = querycells.getBalancebyLock(script2);
> The balance of the account is 0n
```

Step 3. Assemble a common transfer transaction. 

The buildCommonTx() function performs the following actions: 

- Create a new `TransactionSkeleton` for the transfer action with the `common.transfer` function.
- Add the pay fee for the transaction with the `common.payFee` function.
- Prepare signing entries with the `common.prepareSigningEntries` function.
- Sign and seal the transaction with the `signandSeal` function.
- Send the transaction with the `rpc.send_transaction` function. 

For more information about assembling a transaction, see [Assemble Transactions](../tutorials/buildtransactions).

```shell
> const txskeleton = await buildTXs.buildCommonTx(alice.ADDRESS, bob.ADDRESS,20000000000n,10000000n,alice.PRIVATE_KEY);
The transaction hash is 0x10104ec6857fd99b818e7b401216268c067ce7fbc536b77c86f3565c108e958e
```

Step 4. Check the transaction status.

```shell
> await querytransactions.getTXStatus("0x10104ec6857fd99b818e7b401216268c067ce7fbc536b77c86f3565c108e958e");
The transaction status is pending
```

The CKB miner must be started to enable the transaction to be committed. For more information about transaction status, see [Get Transaction Status](../tutorials/querytransactions#get-the-transaction-status).

Step 5. Check the new balance of Bob.

When the transaction is committed, the new balance appears in the result.

```shell
> await querycells.getBalancebyLock(script2);
> The balance of the account is 20000000000n
```
