---
id: createaccount
title: Create an Account for CKB Transactions
---
This guide introduces how to generate a new account with enough CKB capacities that can be used for developing and testing operations.

The following two methods are described in this guide for creating a new account:

- Create an account by using the ckb-cli tool. 
- Create an account by using the HD wallet manager: The HD wallet manager supports to generate extended private keys (`privateKey` and `chaincode`). The `privateKey` can be used to create accounts on chain. This method is used when the private key of the account is required during the development or testing process. 

## Create an Account by Using the HD Wallet Manager

### Step 1. Create an extended private key.

```
> const { mnemonic, ExtendedPrivateKey } = require("@ckb-lumos/hd");
> const m = mnemonic.generateMnemonic();
> const seed = mnemonic.mnemonicToSeedSync(m);
> const extendedPrivateKey = ExtendedPrivateKey.fromSeed(seed);
> console.log(extendedPrivateKey);
ExtendedPrivateKey {
  privateKey: '0x143f8236e711b972a34e9e44795494fa4e65aba2bd3abee2f3c572f945091485',
  chainCode: '0x9bbf03c1de73889ef34b7645b31ecac124268a6e4f5cabc26dcb4fb2c9fb06ef'
}
```

### Step 2. Open a new terminal and import the private key to create a new account.

```
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

## Create an Account by Using ckb-cli

```
$ ckb-cli account new
account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Password: 
Repeat password: 
address:
  mainnet: ckb1qyqxdzuvueply4fgzhm9k283ma043pqw52yqwzk02v
  testnet: ckt1qyqxdzuvueply4fgzhm9k283ma043pqw52yqn8gsxs
lock_arg: 0x668b8ce643f2552815f65b28f1df5f58840ea288
lock_hash: 0x17323019e0ad96fbe450622a6bd059cc839b93fa2dcccfe3db55af991fd6b260
```

## Get CKB Capacity for the Account

- If you are running a **DEV blockchain**, specify the `args` in the `block_assembler` section in ckb.toml with the `lock_arg` of the account for receiving mining rewards. 

  ```
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

  Then restart the CKB node and start the CKB miner in a different terminal.

  ```
  $ export TOP=$(pwd)
  $ export PATH=$PATH:$TOP/ckb_v0.40.0_x86_64-unknown-linux-gnu.tar.gz
  $ ckb miner -C devnet
  ```

- If you are running a **Testnet** node, go to https://faucet.nervos.org and paste the account address in the address inputbox, then click the Claim button.

  50,000 CKB can be claimed for each Testnet address from the [faucet](https://faucet.nervos.org/) per 24 hours. The CKB balance can checked in the ckb-cli interface.

  To check the capacity of the account by running `ckb-cli wallet get-capacity --address <the Testnet address of the account>`:

  ```
  $ ckb-cli wallet get-capacity --address "ckt1qyqv6dfjmelhmrej2g5ju2d4994xkd462d5sathj2h"
  immature: 8039065.13953246 (CKB)
  total: 38186544.69769654 (CKB)
  ```

