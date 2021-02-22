---

id: usedao
title: Integrate Nervos DAO with DApps by Using Lumos
---
## Introduction

Nervos DAO is a smart contract, with which users can interact the same way as any smart contract on CKB. One function of Nervos DAO is to provide an dilution counter-measure for CKByte holders. By deposit in Nervos DAO, holders get proportional secondary rewards, which guarantee their holding are only affected by hardcapped primary issuance as in Bitcoin.

Holders can deposit their CKBytes into Nervos DAO at any time. Nervos DAO deposit is a time deposit with a minimum deposit period (counted in blocks). Holders can only withdraw after a full deposit period. If the holder does not withdraw at the end of the deposit period, those CKBytes should enter a new deposit period automatically, so holders' interaction with CKB could be minimized.

For more information about Nervos DAO, see [RFC: Nervos DAO](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0023-dao-deposit-withdraw/0023-dao-deposit-withdraw.md).

<!--Workflow-->

<!--Here is a summary of the steps to be taken to integrate Nervos DAO by using Lumos:-->

<!--Prepare the prerequisite skills and development stacks.-->

<!--Install and configure Nervos CKB.-->

<!--Initialize a Node project by using Lumos and other required application development frameworks.-->

<!--Set up the config manager.-->

<!--Set up the database.-->

<!--Deposit to DAO.-->

<!--Withdraw from Nervos DAO.-->

<!--For more information about the prerequisites in step 1, see [Prerequisites](../quickstart/prerequisites).-->

<!--Step 2. to Step 5 are explained in detail in the sections in **Basic Operations**.-->

## Steps

### Install and Configure a CKB DEV Blockchain

In a terminal <terminal 1>, perform the following steps to install and configure a CKB DEV blockchain:

1. Download the latest CKB binary file from the CKB releases page on [GitHub](https://github.com/nervosnetwork/ckb/releases).
2. Verify the binaries are working and check versions.
3. Initialize the local development blockchain.
5. Adjust the parameters to shorten the block interval.
5. Start the CKB node.

For more information about installing and configuring a CKB DEV blockchain, see the instructions in the [Install and Configure a CKB DEV Blockchain](../tutorials/installckb) guide.

### Add Lumos Packages for a Node Project

To add Lumos packages for a node project in a new terminal <terminal 2>:

```shell
//<terminal 2>
$ mkdir mydapp
$ cd mydapp
$ yarn init
yarn init v1.22.5
question name (mydapp):
question version (1.0.0):
question description:
question entry point (index.js):
question repository url:
question author:
question license (MIT):
question private:
success Saved package.json
Done in 44.49s.
$ yarn add @ckb-lumos/indexer@0.15.0 @ckb-lumos/common-scripts@0.15.0 @ckb-lumos/config-manager@0.15.0
...
```

### Set Up the Config Manager

The dev chain must use a local configuration file to set up the config manager. For more information, see [Set Up the Config Manager](../tutorials/config).

To set up the config manager:

```shell
// <terminal 2>
$ cat <<EOF > config.json
{
  "PREFIX": "ckt",
  "SCRIPTS": {
    "SECP256K1_BLAKE160": {
      "CODE_HASH": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
      "HASH_TYPE": "type",
      "TX_HASH": "0xace5ea83c478bb866edf122ff862085789158f5cbff155b7bb5f13058555b708",
      "INDEX": "0x0",
      "DEP_TYPE": "dep_group",
      "SHORT_ID": 0
    },
    "SECP256K1_BLAKE160_MULTISIG": {
      "CODE_HASH": "0x5c5069eb0857efc65e1bca0c07df34c31663b3622fd3876c876320fc9634e2a8",
      "HASH_TYPE": "type",
      "TX_HASH": "0xace5ea83c478bb866edf122ff862085789158f5cbff155b7bb5f13058555b708",
      "INDEX": "0x1",
      "DEP_TYPE": "dep_group",
      "SHORT_ID": 1
    },
    "DAO": {
      "CODE_HASH": "0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e",
      "HASH_TYPE": "type",
      "TX_HASH": "0xa563884b3686078ec7e7677a5f86449b15cf2693f3c1241766c6996f206cc541",
      "INDEX": "0x2",
      "DEP_TYPE": "code"
    }
  }
}
EOF
$ LUMOS_CONFIG_FILE="config.json" node --experimental-repl-await
Welcome to Node.js v14.15.0.
Type ".help" for more information.
> const { initializeConfig, getConfig } = require("@ckb-lumos/config-manager");
> initializeConfig();
```

<!--Set Up the Database-->

<!--Choose RocksDB or SQL as the database and start the indexer according to the instructions in [Set Up the Database](../tutorials/database).-->

### Start the Indexer

```shell
// <terminal 2>
> const {Indexer} = require("@ckb-lumos/indexer");
> const indexer = new Indexer("http://127.0.0.1:8114", "./indexed-data");
> indexer.startForever();
```

### Create an Account for Transactions.

Step 1. Create a specific private key for the account. The private key is also used for signing transactions. 

**Note**: The private key generated in this example is used for development purposes in the Lumos guides. Do not use the private key in other places. 

```shell
// <terminal 2>
> const { mnemonic, ExtendedPrivateKey } = require("@ckb-lumos/hd");
> const m = mnemonic.generateMnemonic();
> const seed = mnemonic.mnemonicToSeedSync(m);
> const extendedPrivateKey = ExtendedPrivateKey.fromSeed(seed);
> console.log(extendedPrivateKey);
ExtendedPrivateKey {
  privateKey: '0x8a4cb53f641ee8df90cf5bc5204574744657a091dfe41c98069aa4e41ed9c86b',
  chainCode: '0x9824361e4c7293e8cc4174d8d1fa37cf175630c96d323f84884292a0ede202cd'
}
```

Step 2. Open a new terminal <terminal 3> and import the private key to create the account.

```shell
//<terminal 3>
$ echo 0x8a4cb53f641ee8df90cf5bc5204574744657a091dfe41c98069aa4e41ed9c86b > pk
$ export TOP=$(pwd)
$ export PATH=$PATH:$TOP/ckb_v0.40.0-rc1_x86_64-unknown-centos-gnu
$ ckb-cli account import --privkey-path pk
Password:
address:
  mainnet: ckb1qyqv6dfjmelhmrej2g5ju2d4994xkd462d5sqwfdxt
  testnet: ckt1qyqv6dfjmelhmrej2g5ju2d4994xkd462d5sathj2h
lock_arg: 0xcd3532de7f7d8f3252292e29b5296a6b36ba5369
```

Step 3. Specify the `args` in the `block_assembler` section in ckb.toml with `lock_arg` for receiving mining rewards.

```shell
//<terminal 3>
$ ed devnet/ckb.toml <<EOF
143a
[block_assembler]
code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"
args = "0xcd3532de7f7d8f3252292e29b5296a6b36ba5369"
hash_type = "type"
message = "0x"
.
wq
EOF
```

Step 4. Restart the CKB node in <terminal 1> and start the CKB miner in a different terminal <terminal 4>.

```shell
// <terminal 4>
$ export TOP=$(pwd)
$ export PATH=$PATH:$TOP/ckb_v0.40.0-rc1_x86_64-unknown-centos-gnu
$ ckb miner -C devnet
```

Step 5. Check the capacity of the account by using the testnet address in <terminal 3>.

```shell
//<terminal 3>
$ ckb-cli wallet get-capacity --address "ckt1qyqv6dfjmelhmrej2g5ju2d4994xkd462d5sathj2h"
immature: 8039065.13953246 (CKB)
total: 38186544.69769654 (CKB)
```

### Deposit to DAO

To deposit to Nervos DAO:

Step 1. Create a transaction skeleton.

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

Step 2. Add a fee for the transaction.

First, because we are using the default secp256k1-blake160 lock script, an existing module in common-scripts can be leveraged to incur transaction fee. Here we are using the same address to provide 1 CKByte as transaction fee.

> // If you checked the transaction skeleton after incurring fees. You will notice that it only has one input. This might raise a question: if NervoDAO deposit consumes one input cell, transaction fee requires a different input cell, shouldn't there be 2 input cells with 3 output cells(a deposited cell, and 2 change cell)? The trick here, is that common-scripts is smart enough to figure out that the 2 actions here use the same address. Hence it just rewrite the change cell generated in the NervosDAO deposit action to pay enough transaction fee.

```javascript
// <terminal 2>
> skeleton = await secp256k1Blake160.payFee(skeleton, address, 100000000n);
> createTransactionFromSkeleton(skeleton).inputs.length;
1
```

Step 3. Prepare the signing entries.

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

Step 4. Sign the transaction with the private key by using the HD wallet manager.

```javascript
// <terminal 2>
> const {key} = require("@ckb-lumos/hd");
> const privateKey = "0x8a4cb53f641ee8df90cf5bc5204574744657a091dfe41c98069aa4e41ed9c86b";
> const message = skeleton.get("signingEntries").get(0).message;
> const signature = key.signRecoverable(message, privateKey);
> console.log(signature);
0x81a6d8ff2c581db3819e7ef8da2b88995eaca8d45f11353e814017e01859f1d61fd75287e86e37a697ed097b1bfc580d192438433b1bef7f7ca83346d9828e5d01
```

Step 5. Seal the transaction.

```javascript
// <terminal 2>
> const signatures = ["0x81a6d8ff2c581db3819e7ef8da2b88995eaca8d45f11353e814017e01859f1d61fd75287e86e37a697ed097b1bfc580d192438433b1bef7f7ca83346d9828e5d01"];
> const tx = sealTransaction(skeleton, signatures);
```

Step 6. Send this finalized transaction to the CKB network

```javascript
// <terminal 2>
> const { RPC } = require("ckb-js-toolkit");
> const rpc = new RPC("http://127.0.0.1:8114");
> await rpc.send_transaction(tx);
'0x67babe1a6d64473360c2d3417b715744542d8527590ffc4a088b5f17dbcd181d'
```

Step 7. Check the capacity of the account by using the testnet address in <terminal 3>.

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

Step1. List all deposited Nervos DAO cells for an address.

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

Step 2. Locate the cell we just deposited to Nervos DAO and withdraw it from Nervos DAO.

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

