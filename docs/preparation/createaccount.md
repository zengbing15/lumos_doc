---
id: createaccount
title: Create an Account
---
CKB accounts are required for development and testing purposes. 

The following methods are described in this guide:

- Create an account by using ckb-cli. 
- Get the private key of the account.
- Get CKB capacity for the account.
- Check the capacity of the account.

## Prerequisites 

The following prerequisites apply for creating an account by using ckb-cli:

- The CKB node is installed by using the pre-built installer package. 
- The CKB node is running.

## Steps

### Step 1. Create an account by using ckb-cli.

When the CKB node is installed by using the pre-built installer package, ckb-cli is available and can be used to create an account. For more information about the installation of a CKB node, see [Installation Options](../preparation/installckb#installation-options).

```shell
$ ckb-cli account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Password: 
Repeat password: 
address:
  mainnet: ckb1qyqzz2az9emgl7runavw3tul22gd4qs5ueqs68fy9e
  testnet: ckt1qyqzz2az9emgl7runavw3tul22gd4qs5ueqs8zhmf9
lock_arg: 0x212ba22e768ff87c9f58e8af9f5290da8214e641
lock_hash: 0x85aa4381b04366e88a10fb9519db99b0993bea7ee0ce67c099e5b627538cd212
```

### Step 2. Get the private key of the account.

Sometimes private keys are required in the development or testing process.

To get the private key of the account:

```
$ ckb-cli account export --extended-privkey-path wallet --lock-arg 0x212ba22e768ff87c9f58e8af9f5290da8214e641
Password: 
message: "Success exported account as extended privkey to: \"wallet\", please use this file carefully"
```

The extended private key is exported to the wallet file. The first line in the file is the private key of the account. The second line is the chain code.

### Step 3. Get CKB Capacity for the Account

To get CKB capacity for an account on **DEV chain**, specify the account as the miner for receiving mining rewards.

- If the CKB node is installed by Tippy, specify **Block Assembler Lock Arg** in the Edit Chain form with the `lock_arg` of the account.

- If the CKB node is installed manually, specify the `args` in the `block_assembler` section in ckb.toml with the `lock_arg` of the account.

  ```shell
  $ ed devnet/ckb.toml <<EOF
  143a
  [block_assembler]
  code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"
  args = "0x212ba22e768ff87c9f58e8af9f5290da8214e641"
  hash_type = "type"
  message = "0x"
  .
  wq
  EOF
  ```

After the miner is specified, restart the CKB node and start the CKB miner.

To start the CKB miner:

```shell
$ export TOP=$(pwd)
$ export PATH=$PATH:$TOP/ckb_v0.40.0_x86_64-unknown-linux-gnu.tar.gz
$ ckb miner -C devnet
```

To get CKB capacity for an account on **Testnet**, go to https://faucet.nervos.org and paste the Testnet address of the account in the address inputbox, then click the **Claim** button.

50,000 CKB can be claimed for each Testnet address from the [faucet](https://faucet.nervos.org/) per 24 hours. 

### Step 4. Check the Capacity of the Account

To check the capacity of the account, execute the `ckb-cli wallet get-capacity --address <the Testnet address of the account>` command as follows:

```shell
$ ckb-cli wallet get-capacity --address "ckt1qyqzz2az9emgl7runavw3tul22gd4qs5ueqs8zhmf9"
immature: 8039065.13953246 (CKB)
total: 38186544.69769654 (CKB)
```

