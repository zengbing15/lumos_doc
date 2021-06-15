---
id: hellolumos
title: Hello Lumos
---
The Hello Lumos example is designed as a simple "DApp" that implemented the most basic functions, such as the query functions, the common transfer function, the DAO operations, etc., based on Lumos functionalities.

You can follow the steps in this guide to perform a common transfer with the functions provided by the Hello Lumos "DApp".

The later sections of the guide, for example, [Query on Cells](../guides/querycells), [Query on Transactions](../guides/querytransactions), and [Assemble Transactions](../guides/buildtransactions), explain the usage of Lumos by using the code examples of Hello Lumos. The full code of the example can be found [here](https://github.com/xying21/hellolumos). 

The  example has the following structure:

```
hellolumos/
├── src/accounts.ts
├── src/buildTXs.ts
├── src/index.ts
├── src/manageaccounts.ts
├── src/querycells.ts
├── src/querytransactions.ts
├── config.json
├── package.json
├── tsconfig.json
└── yarn.lock
```

<!--The query functions on cells and transactions are all facilitated based on the Lumos framework. For more information, see [Query on Cells](../tutorials/querycells) and [Query on Transactions](../tutorials/querytransactions).-->

<!--The <u>buildTXs.ts</u> file implements several sample functions by utilizing Lumos utilities for assembling common transfer transactions, Nervos DAO transactions, and locktime pool transfer transactions. For more information, see [Assemble Transactions](../tutorials/buildtransactions).-->

## Prerequisites

The following prerequisites apply for walking through the Hello Lumos example:

- The development environment is set up. For more information, see [Set Up the Development Environment](../preparation/setupsystem).
- Two accounts, Alice and Bob, have been created. Alice is specified as the miner to receive mining rewards. For more information, see [Create accounts](../preparation/createaccount).

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

All required dependencies for the Hello Lumos example are listed in package.json. The dependencies can be installed by running the `yarn install` command. <!--For information about installing a specific Lumos package, see [Install Lumos](../tutorials/installlumos).-->

:::note

The development environment must be set up correctly for successful installation of the dependencies. For more information, see [Set Up the Development Environment](../preparation/setupsystem).

:::

```shell
$ cd hellolumos
$ yarn install
```

<details><summary>OUTPUT</summary>
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

### Update the account information in the account.ts file.

Replace the value of `PRIVATE_KEY`, `ADDRESS` and `ARGS` for ALICE and BOB in the `accounts.ts` file with the account information you have prepared when creating accounts.

You can retrieve the `ADDRESS` and `ARGS` for ALICE and BOB by executing the `ckb-cli account list` command. The private keys are stored in the <var>alice</var> file and the <var>bob</var> file during the creation of the accounts. For more information about creating accounts, see [Create Accounts](../preparation/createaccount).

:::note

The account information in this documentation is only used for demonstration. Do **not** use these private keys,  addresses and args elsewhere. 

:::

Example:

```typescript title="hellolumos/src/accounts.ts"
export const ALICE = {
  PRIVATE_KEY:
    "0xf2a91b1410f7308631b89603262448ba515cddac1ffe250265551c82fff3eb3a",
  ADDRESS: "ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf",
  ARGS: "0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e",
};

export const BOB = {
  PRIVATE_KEY:
    "0x670ac6ac1ce8004b4220f0fb024179461f11989ff4d446816f78813b80b9c696",
  ADDRESS: "ckt1qyqwe03shn6udvhjmrkzm53f53sr5l3qdwvsytj4hs",
  ARGS: "0xecbe30bcf5c6b2f2d8ec2dd229a4603a7e206b99",
};
```

### Build the project.

```javascript {1}
$ tsc
```

### Enter the Node.js REPL mode.

```javascript {1}
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
```
### Start the indexer and initialize the configurations.


```javascript {1}
> const { accounts, querycells, buildTXs, querytransactions } = require(".");
The server is started.
```

### Perform a common transfer transaction.

The Hello Lumos example implements the common transfer transaction function by using Lumos modules and functions. For more information about building a common transaction by using Lumos, see [Transfer CKB in a Common Transaction](../guides/buildtransactions#transfer-ckb-in-a-common-transaction).

1. Get the account information of Alice and Bob.

   ```javascript {1-7}
   > const alice = accounts.ALICE;
   > const bob = accounts.BOB;
   > const { parseAddress } = require("@ckb-lumos/helpers");
   > const script1 = parseAddress(alice.ADDRESS);
   > const script2 = parseAddress(bob.ADDRESS);
   ```
   
2. Check the balance for the accounts of Alice and Bob.

   ```javascript {1,3}
   > const balance1 = querycells.getBalancebyLock(script1);
   > The balance of the account is 1386763373620166n
   > const balance2 = querycells.getBalancebyLock(script2);
   > The balance of the account is 0n
   ```

3. Transfer 200 CKB from Alice to Bob. 

   ```javascript {1}
   > await buildTXs.commonTransfer([alice.ADDRESS], bob.ADDRESS, 20000000000n, 10000000n, alice.PRIVATE_KEY);
   [warn] ANYONE_CAN_PAY script info not found in config!
   The transaction hash is 0x22cc789bdaa8e021caa303cf20cfa4063b46a17abd62b31aa2cf712844f984cb
   '0x22cc789bdaa8e021caa303cf20cfa4063b46a17abd62b31aa2cf712844f984cb'
   ```
   
4. Check the transaction status.

   :::note

   The CKB miner must be started to commit the transaction on chain.

   :::

   For more information about getting transaction information by using Lumos, see [Get Transaction Status and Block Hash](../guides/querytransactions#get-transaction-status-and-block-hash). 

   ```javascript {1}
   > await querytransactions.getTXbyHash("0x22cc789bdaa8e021caa303cf20cfa4063b46a17abd62b31aa2cf712844f984cb");
   The transaction status is committed
   The block hash for the transaction is 0x6d60ae47167a78fbcf254c81b1d6356aceef2feeb4e039fed693c274a83faac1
   ```

5. Check the new balance of Bob.

   When the transaction is committed, the new balance appears in the result.

   For more information about getting balance by a lock script, see [Get the Balance of an Account](../guides/querycapacity#get-the-balance-of-an-account).

   ```javascript {1}
   > await querycells.getBalancebyLock(script2);
   > The balance of the account is 20000000000n
   ```