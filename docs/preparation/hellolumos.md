---
id: hellolumos
title: Hello Lumos
---
The Hello Lumos example is built by using Lumos and is designed to serve as the starting point for learning Lumos.

It includes the following functional examples:

- Query cells or transactions from the blockchain.
- Build, sign, send, and track transactions.

This guide will walk you through a common transaction example step by step. For more information about the basic usage of Lumos, see the guides under **Basics**. The full code of the example can be found here.

## Environment

The following examples are verified on Ubuntu 20.04.2.

## Steps

### Set up the development Environment.

Step 1. Install Node.js.

```
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
sudo apt install nodejs
```

Step 2. Install Yarn.

```
npm install --global yarn
```

Step 3. Install Dependencies for node-gyp.

```
$ sudo apt update
$ sudo apt install build-essential
```

For more information, see [Set Up the Development Environment](../preparation/setupsystem).

### Install and run a CKB Node on DEV chain by using the CKB pre-built installer package.

Step 1. Download the CKB Pre-built Installer Package.

```shell
$ export TOP=$(pwd)
$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ tar xzf ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
```

Step 2. Initialize the CKB node on the DEV blockchain.

```shell
$ ckb init -C devnet -c dev
```

Step 3. Modify `genesis_epoch_length` and `permanent_difficulty_in_dummy` in the /ckb_v0.39.0_x86_64-unknown-linux-gnu/specs/**dev.toml** file.

```shell
$ ed devnet/specs/dev.toml <<EOF
91d
90a
genesis_epoch_length = 10  # The unit of meansurement is "block".
permanent_difficulty_in_dummy = true
.
wq
EOF
```

Step 4. Modify the `value` parameter under the `miner.workers` section in the **ckb-miner.toml** file.

```shell
$ ed devnet/specs/dev.toml <<EOF
91d
90a
genesis_epoch_length = 10  # The unit of meansurement is "block".
permanent_difficulty_in_dummy = true
.
wq
EOF
```

Step 5. Start the CKB node with the dev chain.

```shell
$ ckb run -C devnet
```

For more information, see [Install a CKB Node by Using the Pre-built Installer Package](../preparation/installckb#install-a-ckb-node-by-using-the-pre-built-installer-package)

### Create accounts for transactions.

Create two CKB accounts, Alice and Bob, and specify Alice as the miner to receive mining rewards that is used for transactions.

Step 1. Create the account for Alice.

```
$ export TOP=$(pwd)
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
$ ckb-cli account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Password: 
Repeat password: 
address:
  mainnet: ckb1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qxe85u4
  testnet: ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
lock_arg: 0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e
lock_hash: 0xf6ea009a4829de7aeecd75f3ae6bcdbaacf7328074ae52a48456a8793a4b1cca
```

Step 2. Get the private key for the account of Alice.

```
$ ckb-cli account export --extended-privkey-path alice --lock-arg 0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e
Password: 
message: "Success exported account as extended privkey to: \"alice\", please use this file carefully"
```

Step 3. Specify the account of Alice as the miner by replacing args in the devnet/ckb.toml file with the lock_arg of the account.

```
$ ed devnet/ckb.toml <<EOF
143a
[block_assembler]
code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"
args = "0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e"
hash_type = "type"
message = "0x"
.
wq
EOF
```

Step 4. Restart the CKB node and start the miner.

Stop the CKB node by using the ctrl + C command in the terminal that runs the node and then start the node by executing `ckb run -C devnet`.

To start the miner, open a new terminal and run the following commands:

```shell
$ export TOP=$(pwd)
$ export PATH=$PATH:$TOP/ckb_v0.40.0_x86_64-unknown-linux-gnu.tar.gz
$ ckb miner -C devnet
```

Step 5. Check the Capacity of the Account of Alice.

```
$ ckb-cli wallet get-capacity --address "ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf"
immature: 8039446.8758295 (CKB)
total: 10451302.54823011 (CKB)
```

Step 6. Create an account for Bob.

```shell
$ export TOP=$(pwd)
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
$ ckb-cli account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Password: 
Repeat password: 
address:
  mainnet: ckb1qyqwe03shn6udvhjmrkzm53f53sr5l3qdwvsewv2mv
  testnet: ckt1qyqwe03shn6udvhjmrkzm53f53sr5l3qdwvsytj4hs
lock_arg: 0xecbe30bcf5c6b2f2d8ec2dd229a4603a7e206b99
lock_hash: 0x34f085b5d2fa3f4ad2880713082a72864522a6ebffa1eb931b09e0407092eda5
```

To get the private key for the account of Bob:

```shell
$ ckb-cli account export --extended-privkey-path bob --lock-arg 0xecbe30bcf5c6b2f2d8ec2dd229a4603a7e206b99
Password: 
message: "Success exported account as extended privkey to: \"bob\", please use this file carefully"
```

For more information about creating accounts, see [Create Accounts](../preparation/createaccount).

### Download the Hello Lumos example.

```
$ cd
$ git clone https://github.com/nervosnetwork/
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

Replace the value of `PRIVATE_KEY`, `ADDRESS`, `ARGS` and `LOCKHASH` for ALICE and BOB in the `accounts.ts` file with the account information you have prepared when creating accounts. For more information about creating accounts, see [Create an Account](../preparation/createaccount).

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
> The balance of the account is 5908399726984497n
```

```shell
> const balance2 = querycells.getBalancebyLock(script2);
> The balance of the account is 000000000000n
```

Step 3. Assemble a common transfer transaction. 

The buildCommonTx() function performs the following actions: 

- Create a new Transaction Skeleton.
- Add transfer action to the skeleton by using `common.transfer`.
- Add pay fee for the transaction by using `common.payFee`.
- Prepare signing entries by using `common.prepareSigningEntries`.

For information about assembling a transaction, see [Assemble Transactions](../tutorials/buildtransactions).

```shell
> const txskeleton = await buildTXs.buildCommonTx(alice.ADDRESS, bob.ADDRESS,20000000000n,10000000n);
```

Step 4. Sign the transaction.

```shell
> const message = txskeleton.get("signingEntries").get(0)?.message;
> console.log(message);
0x7b9f14c93c1105213ab437f157460aa93963babff4cb03553e7dde6e72cbaf19
> const privatekey1 = alice.PRIVATE_KEY;
> const { key }=require("@ckb-lumos/hd");
> const Sig = key.signRecoverable(message, privatekey1);
> console.log(Sig);
0x709026a75b82aca580d758c62eceaa9982b81057146a6c0205db3ee7b5581e3201d3ccd5845ea6d25b9b977f98f7c1c74efe4c38292b654d03fa2d037fa0777b01
```

Step 5. Seal the transaction.

```shell
> const { sealTransaction }=require("@ckb-lumos/helpers");
> const tx = sealTransaction(txskeleton, [Sig]);
```

Step 6. Send the transaction.

```shell
> const { RPC }=require("@ckb-lumos/rpc");
> const rpc = new RPC("http://127.0.0.1:8114");
> const hash = await rpc.send_transaction(tx);
> console.log(hash);
0xe332fb6efba38e16b8fd20a4f47d5fffcf8fcac0c863b0eb30ef75067847936d
```

Step 7. Check the transaction status.

```shell
> const txWithStatus= await rpc.get_transaction(hash);
> console.log(txWithStatus.tx_status.status);
committed
```

Step 8. Check the new balance of Bob.

```shell
> const newbalance = querycells.getBalancebyLock(script2);
> The balance of the account is 20000000000n
```
