---
id: installckb
title: Install and Configure Nervos CKB
---
Nervos CKB can be installed on all major platforms, including Linux, Windows and macOS. 

This guide will introduce how to install and configure Nervos CKB on Linux.

## Install Nervos CKB on Linux

### **Steps**

To install and configure Nervos CKB on Linux:

#### **Step 1. Download the latest CKB binary file from the CKB releases page on [GitHub](https://github.com/nervosnetwork/ckb/releases).**

```shell
$ export TOP=$(pwd)
$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ tar xzf ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
```

#### **Step 2. Verify the binaries are working and check versions.**

```shell
$ ckb -V
ckb 0.39.0
```

#### **Step 3. Create a new account.**

This step generates a new account that can be used for developing and testing operations. 

The `testnet` address of the account can be used for [claiming free **Testnet CKBytes**](https://faucet.nervos.org/). 

The `lock_arg` of the account can be used for receiving mining rewards.

```shell
$ ckb-cli account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Password:
Repeat password:
address:
  mainnet: ckb1qyq9wpfzjc5n00s80l5js6msf903ez6thrpq0d64ag
  testnet: ckt1qyq9wpfzjc5n00s80l5js6msf903ez6thrpqjgy235
lock_arg: 0x570522962937be077fe9286b70495f1c8b4bb8c2
lock_hash: 0x53472631f0f66ef299edcbfffe889a98cafaedc30695f1ff751d2fc6fd9be973
```

#### **Step 4. Initialize the development blockchain.**

```shell
$ ckb init -C devnet -c dev
WARN: mining feature is disabled because of lacking the block assembler config options
Initialized CKB directory in devnet
create specs/dev.toml
create ckb.toml
create ckb-miner.toml
create default.db-options
```

#### **Step 5. (Optional) Adjust the parameters to shorten the block interval.** 

- Modify `genesis_epoch_length` and `permanent_difficulty_in_dummy`  in the c:\ckb\specs\`dev.toml` chain config file.

  The default value for the `genesis_epoch_length` parameter is `1000`. That means each epoch contains 1000 blocks by default. The value 10 or 100 can be used for testing Nervos DAO operations.

  When `permanent_difficulty_in_dummy` is set to `true`, all epochs skip the difficulty adjustment<!--and use the same length as the `genesis_epoch_length`-->. This parameter is typically used in combination with `genesis_epoch_length`.

  To modify `genesis_epoch_length` and `permanent_difficulty_in_dummy`:

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

- Modify the `value` parameter under the `miner.workers` section  in the `ckb-miner.toml` file.

  The default mining interval is 5000 milliseconds (5 seconds). That means a new block is generated at intervals of every 5 seconds.

  To modify the value to generate a new block every second (1000 milliseconds):

  ```shell
  $ ed devnet/ckb-miner.toml <<EOF
  39s/5000/1000/
  wq
  EOF
  ```

#### **Step 6. Specify the args (public key)  in the `block_assembler` section for receiving mining rewards.**

```shell
$ ed devnet/ckb.toml <<EOF
143a
[block_assembler]
code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"
args = "0x570522962937be077fe9286b70495f1c8b4bb8c2"
hash_type = "type"
message = "0x"
.
wq
EOF
```

#### **Step 7. Start the CKB node with the dev chain.**

```shell
$ ckb run -C devnet
```

#### **Step 8. Start the CKB miner in a different terminal.**

```shell
$ export TOP=$(pwd)
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
$ ckb miner -C devnet
```
