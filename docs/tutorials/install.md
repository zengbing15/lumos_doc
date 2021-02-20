---
id: installckb
title: Install and Configure a CKB DEV Blockchain
---
Nervos CKB can be installed on all major platforms, including Linux, Windows and macOS. 

This guide introduces how to install and configure a CKB DEV Blockchain on Linux. For more information about the installation and configuration of Nervos CKB, see the guides in [Nervos Doc site](https://docs.nervos.org/).

## **Steps**

To install and configure a CKB DEV Blockchain on Linux:

### **Step 1. Download the latest CKB binary file from the CKB releases page on [GitHub](https://github.com/nervosnetwork/ckb/releases).**

```shell
$ export TOP=$(pwd)
$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ tar xzf ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
```

### **Step 2. Verify the binaries are working and check versions.**

```shell
$ ckb -V
ckb 0.39.0
```

### **Step 3. Initialize the development blockchain.**

```shell
$ ckb init -C devnet -c dev
WARN: mining feature is disabled because of lacking the block assembler config options
Initialized CKB directory in devnet
create specs/dev.toml
create ckb.toml
create ckb-miner.toml
create default.db-options
```

### **Step 4. (Optional) Adjust the parameters to shorten the block interval.** 

- Modify `genesis_epoch_length` and `permanent_difficulty_in_dummy`  in the c:\ckb\specs\\`dev.toml` chain config file.

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

### **Step 5. Specify the args (public key)  in the `block_assembler` section for receiving mining rewards.**

```shell
$ ed devnet/ckb.toml <<EOF
143a
[block_assembler]
code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"
args = "0xeb0d26a5d9643333349f3d5bc5a06790b0bd62cd"
hash_type = "type"
message = "0x"
.
wq
EOF
```

### **Step 6. Start the CKB node with the dev chain.**

```shell
$ ckb run -C devnet
```

### **Step 7. Start the CKB miner in a different terminal.**

```shell
$ export TOP=$(pwd)
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
$ ckb miner -C devnet
```
