---
id: usedao
title: Integrate Nervos DAO with DApps by Using Lumos
---
Nervos DAO is a smart contract, with which users can interact the same way as any smart contract on CKB. One function of Nervos DAO is to provide an dilution counter-measure for CKByte holders. By deposit in Nervos DAO, holders get proportional secondary rewards, which guarantee their holding are only affected by hardcapped primary issuance as in Bitcoin.

Holders can deposit their CKBytes into Nervos DAO at any time. Nervos DAO deposit is a time deposit with a minimum deposit period (counted in blocks). Holders can only withdraw after a full deposit period. If the holder does not withdraw at the end of the deposit period, those CKBytes should enter a new deposit period automatically, so holders' interaction with CKB could be minimized.

For more information about Nervos DAO, see [RFC: Nervos DAO](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0023-dao-deposit-withdraw/0023-dao-deposit-withdraw.md).

## Install and Configure Nervos CKB

```
$ export TOP=$(pwd)
$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ tar xzf ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
$ ckb -V
ckb 0.39.0
$ ckb init -C devnet -c dev
$ ed devnet/specs/dev.toml <<EOF
91d
90a
genesis_epoch_length = 10
permanent_difficulty_in_dummy = true
.
wq
EOF
$ ed devnet/ckb-miner.toml <<EOF
39s/5000/1000/
wq
EOF
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
$ ckb run -C devnet
```

Start the CKB miner in a different terminal.

```
$ export TOP=$(pwd)
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
$ ckb miner -C devnet
```

## Create the Node Skeleton

Create the node skeleton and install all dependencies.

```
$ mkdir mydapp
$ cd mydapp
$ yarn init
$ yarn add @ckb-lumos/indexer@0.15.0 @ckb-lumos/common-scripts@0.15.0 @ckb-lumos/config-manager@0.15.0
$ yarn install
```

Enable async/await for the node shell.

```
$ node --experimental-repl-await
Welcome to Node.js v12.16.2.
Type ".help" for more information.
>
```

## Set Up the Config Manager

This tutorial uses the pre-defined configurations to set up the config manager.

```
$ LUMOS_CONFIG_NAME=LINA node --experimental-repl-await
Welcome to Node.js v12.16.2.
Type ".help" for more information.
> const { initializeConfig, getConfig } = require("@ckb-lumos/config-manager");
> initializeConfig();
> getConfig();
{
  PREFIX: 'ckb',
  SCRIPTS: {
    SECP256K1_BLAKE160: {
      CODE_HASH: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      HASH_TYPE: 'type',
      TX_HASH: '0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c',
      INDEX: '0x0',
      DEP_TYPE: 'dep_group',
      SHORT_ID: 0
    },
    SECP256K1_BLAKE160_MULTISIG: {
      CODE_HASH: '0x5c5069eb0857efc65e1bca0c07df34c31663b3622fd3876c876320fc9634e2a8',
      HASH_TYPE: 'type',
      TX_HASH: '0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c',
      INDEX: '0x1',
      DEP_TYPE: 'dep_group',
      SHORT_ID: 1
    },
    DAO: {
      CODE_HASH: '0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e',
      HASH_TYPE: 'type',
      TX_HASH: '0xe2fb199810d49a4d8beec56718ba2593b665db9d52299a0f9e6e75416d73ff5c',
      INDEX: '0x2',
      DEP_TYPE: 'code'
    }
  }
}
```

## Set Up the Database

This tutorial uses the RocksDB database.

```
const { Indexer, CellCollector, TransactionCollector } = require("@ckb-lumos/indexer");
const indexer = new Indexer("http://127.0.0.1:8114", "/tmp/indexed-data");
indexer.startForever();
```

Check the current indexed tip with the following code snippet:

```
> await indexer.tip()
{
  block_number: "0x29c",
  block_hash: "0x3e44b571c82a09117231baee1939d38440d71f56de8bc600ac32b1dead9be46d"
}
```

## Deposit to DAO

```javascript
> // In practice, you might already have the address at your hand, here we just
> // want to demonstrate how this works.
> const script = {
  code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
  hash_type: "type",
  args: "0xcbfbb9edb5838e2d61061c3fc69eaaa5fdbd3273"
};
> const {generateAddress, parseAddress, createTransactionFromSkeleton,
  sealTransaction, TransactionSkeleton } = require("@ckb-lumos/helpers");
> const address = generateAddress(script);

> // Now let's create the actual skeleton, and deposit CKBytes into the skeleton
> let skeleton = TransactionSkeleton({ cellProvider: indexer });
> const { secp256k1Blake160, dao } = require("@ckb-lumos/common-scripts");

> // Using utility provided in common-scripts, let's deposit 1000 CKBytes into
> // the skeleton. We will introduce common-scripts separately below. Here we are
> // using the same address as from and to, but this does not have to be the case
> // everywhere.
> skeleton = await dao.deposit(skeleton, address, address, 100000000000n);

> // createTransactionFromSkeleton is designed to build a final transaction, but
> // there is nothing stopping you from using it to peek into the current skeleton.
> console.log(JSON.stringify(createTransactionFromSkeleton(skeleton), null, 2));

> // But this transaction is not yet complete, we still need 2 parts:
> // * Transaction fee is not taken into consideration
> // * The transaction is not signed yet
> // Let's take a look at them separately.

> // First, since we are using the default secp256k1-blake160 lock script, an
> // existing module in common-scripts can be leveraged to incur transaction
> // fee. Here we are using the same address to provide 1 CKByte as transaction
> // fee.
> skeleton = await secp256k1Blake160.payFee(skeleton, address, 100000000n);

> // If you checked the transaction skeleton after incurring fees. You will
> // notice that it only has one input. This might raise a question: if NervoDAO
> // deposit consumes one input cell, transaction fee requires a different input
> // cell, shouldn't there be 2 input cells with 3 output cells(a deposited cell,
> // and 2 change cell)? The trick here, is that common-scripts is smart enough
> // to figure out that the 2 actions here use the same address. Hence it just
> // rewrite the change cell generated in the NervosDAO deposit action to pay
> // enough transaction fee.
> createTransactionFromSkeleton(skeleton).inputs.length;
1

> // Now the transaction is more or less complete, we can start generate messages
> // used for signing.
> skeleton = secp256k1Blake160.prepareSigningEntries(skeleton);
> // This method actually loops through the skeleton, and create `signingEntries`
> // that are using the default secp256k1-blake160 lock script:
> skeleton.get("signingEntries").toArray();
[
  {
    type: 'witness_args_lock',
    index: 0,
    message: '0x40811fd6ed74b9042f603dc7f2f577da7ebe0e05175d349dbb5c539b1111b83f'
  }
]
```

## Withdraw from Nervos DAO

Step1. List all deposited Nervos DAO cells for an address:

```javascript
> for await (const cell of dao.listDaoCells(indexer, address, "deposit")) { console.log(cell); }
{
  cell_output: {
    capacity: '0x174876e800',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0xcbfbb9edb5838e2d61061c3fc69eaaa5fdbd3273'
    },
    type: {
      code_hash: '0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e',
      hash_type: 'type',
      args: '0x'
    }
  },
  out_point: {
    tx_hash: '0x88536e8c25f5f8c89866dec6a5a1a6a72cccbe282963e4a7bfb5542b4c15d376',
    index: '0x0'
  },
  block_hash: '0xa1ec7dc291774bc0fc229efba4a162c099a8d88ffa7ae2fa410cc574e0701ced',
  block_number: '0x196',
  data: '0x0000000000000000'
}
```

Step 2. Locate the cell we just deposited to Nervos DAO and withdraw it from Nervos DAO:

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
    message: '0x24370c5cedc03c34ae0a00a10d9e62324bce07e8d155c839ff10991d73684c34'
  }
]
> // After we signed the message, we can get the signature:
> const signatures2 = ["0x5aed4480c82844506fefc1d92dd18422a123b8e880018ea4cfa7f95891c4781e6578facedd765676831cf3cca04492ec3ec3885ac8d0b6d90cb6c1d6f99e6ffb01"];
> // Now we can seal and send the transaction
> const tx2 = sealTransaction(skeleton, signatures2);
> await rpc.send_transaction(tx2);
'0xe411eb6a3cf4f659461cc7a9df9ff95a72b9624bf850b9ccad0c4d7f2ab444f6'   
```

