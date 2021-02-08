---
id: installckb
title: Install and Configure Nervos CKB
---
Nervos CKB can be installed on all major platforms, including Linux, Windows and macOS. 

This guide will introduce how to install and configure Nervos CKB on Linux and Windows.

## Install Nervos CKB on Linux

**Steps**

To install and configure Nervos CKB on Linux:

**Step 1. Download the latest CKB binary file from the CKB releases page on [GitHub](https://github.com/nervosnetwork/ckb/releases).**

```
$ export TOP=$(pwd)
$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ tar xzf ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
```

**Step 2. Verify the binaries are working and check versions.**

```
$ ckb -V
ckb 0.39.0
```

**Step 3. Initialize the development blockchain.**

```
$ ckb init -C devnet -c dev
WARN: mining feature is disabled because of lacking the block assembler config options
Initialized CKB directory in devnet
create specs/dev.toml
create ckb.toml
create ckb-miner.toml
create default.db-options
```

**Step 4. (Optional) Adjust the parameters to shorten the block interval.** 

- **Modify the `genesis_epoch_length` parameter in the c:\ckb\specs\`dev.toml` chain config file to set all epoch to contain 10 blocks.**

  The default epoch length is `1000` blocks. To change the value to `10` or `100` can help with testing Nervos DAO operations.

- **Set `permanent_difficulty_in_dummy`= true to skip difficulty adjustment.**

  When `permanent_difficulty_in_dummy` is set to `true`, all epochs use the same length as the genesis epoch length, skipping the difficulty adjustment entirely. This parameter is typically used in conjunction with `genesis_epoch_length`.

  ```
  $ ed devnet/specs/dev.toml <<EOF
  91d
  90a
  genesis_epoch_length = 10  # The unit of meansurement is "block".
  permanent_difficulty_in_dummy = true
  .
  wq
  EOF
  ```

- **Modify the `value` parameter under the `miner.workers` section  in the `ckb-miner.toml` file to generate a new block every second (1000 milliseconds).**

  The default mining interval is `5000`, which is a value in milliseconds (5 seconds). Blocks are created faster with a smaller mining interval.

  ```
  $ ed devnet/ckb-miner.toml <<EOF
  39s/5000/1000/
  wq
  EOF
  ```

**Step 5. Specify the args (public key)  in the `block_assembler` section for receiving mining rewards.**

**Note**: Do not use this private key in other place.

```
$ ed devnet/ckb.toml <<EOF
143a
[block_assembler]
code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"
args = "0x818d29e05b3400d2ac0adcba7da74a708f0fbb0b"
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
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
$ ckb miner -C devnet
```

## Install Nervos CKB on Windows

**Steps**

To install and configure Nervos CKB:

**Step 1. Download the latest CKB binary file `ckb_v0.xx.x_x86_64-pc-windows-msvc.zip` from the CKB releases page on [GitHub](https://github.com/nervosnetwork/ckb/releases).**

**Step 2. Unzip or extract the downloaded file to an easily accessible folder. It is recommended to extract the files to `C:\ckb` on windows.**

**Step 3. Check the version in the `cmd` terminal.**

```
c:\ckb>ckb --version
ckb 0.39.2 (2d56a24 2021-01-30)

c:\ckb>ckb-cli --version
ckb-cli 0.39.0 (0a13cb3 2020-12-18)
```

**Step 4. Initialize the development blockchain.**

```
c:\ckb>ckb init -C devnet -c dev
WARN: mining feature is disabled because of lacking the block assembler config options
Initialized CKB directory in devnet
create specs/dev.toml
create ckb.toml
create ckb-miner.toml
create default.db-options
```

**Step 5. (Optional) Adjust the parameters to shorten the block interval.**

**5a. Modify the `genesis_epoch_length` parameter in the c:\ckb\specs\`dev.toml` chain config file to set all epoch to contain 10 blocks.**

The default epoch length is `1000` blocks. To change the value to `10` or `100` can help with testing Nervos DAO operations.

```
genesis_epoch_length = 10 # The unit of meansurement is "block".
```

**5b. Set `permanent_difficulty_in_dummy`= true to skip difficulty adjustment.**

When `permanent_difficulty_in_dummy` is set to `true`, all epochs use the same length as the genesis epoch length, skipping the difficulty adjustment entirely. This parameter is typically used in conjunction with `genesis_epoch_length`.

```
permanent_difficulty_in_dummy = true
```

**5c. Modify the `value` parameter in the c:\ckb\devnet\`ckb-miner.toml` file under the `miner.workers` section to generate a new block every second (1000 milliseconds).**

The default mining interval is `5000`, which is a value in milliseconds (5 seconds). Blocks are created faster with a smaller mining interval.

```toml
# ckb-miner.toml
[[miner.workers]]
worker_type = "Dummy"
delay_type = "Constant"
value = 1000  # The unit of measurement is "ms".
```

**Step 6. Specify the args (public key)  in the `block_assembler` section of the c:\ckb\devnet\`ckb.toml` file for receiving mining rewards.**

```toml
#ckb.toml
[block_assembler]
code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8" // Do not change this.
args = "0x818d29e05b3400d2ac0adcba7da74a708f0fbb0b"
hash_type = "type" // Do not change this value.
message = "0x"
```

**Step 7. Start the CKB node with the dev chain.**

```
c:\ckb>ckb run -C devnet
```

**Result**

```
2021-02-08 17:14:02.617 +08:00 main INFO ckb_db::db  Initialize a new database
2021-02-08 17:14:02.827 +08:00 main INFO ckb_db_migration  Init database version 20200707214700
2021-02-08 17:14:02.836 +08:00 main INFO main  Touch chain spec hash: Byte32(0x7ae7361371a36a66c9fd5699c6b8c5c634631001cb3e3cc1a4506b0cafe39280)
2021-02-08 17:14:02.838 +08:00 main INFO ckb_memory_tracker::process  track current process: unsupported
2021-02-08 17:14:02.838 +08:00 main INFO main  ckb version: 0.39.2 (2d56a24 2021-01-30)
2021-02-08 17:14:02.838 +08:00 main INFO main  chain genesis hash: 0x120ab9abd48e3b82f93b88eba8c50a0e1304cc2fffb5573fb14b56c6348f2305
2021-02-08 17:26:08.556 +08:00 ckb-global-runtime INFO ckb_network::network  p2p service event: ListenStarted { address: "/ip4/0.0.0.0/tcp/8114" }
2021-02-08 17:26:08.556 +08:00 ckb-global-runtime INFO ckb_network::network  Listen on address: /ip4/0.0.0.0/tcp/8114/p2p/QmdjcsiGEd6DLaQKFXmZz2UMA9RX9gDvN4oE32q7eVN5qj
2021-02-08 17:26:08.556 +08:00 main WARN jsonrpc_http_server  Multi-threaded server is not available on Windows. Falling back to single thread.
2021-02-08 17:26:08.557 +08:00 main INFO ckb_rpc::server  Listen HTTP RPCServer on address 127.0.0.1:8114
2021-02-08 17:26:08.558 +08:00 main INFO ckb_rpc::server  Listen TCP RPCServer on address 127.0.0.1:18114
2021-02-08 17:26:08.558 +08:00 main INFO ws  Listening for new connections on 127.0.0.1:18115.
2021-02-08 17:26:08.558 +08:00 main INFO ckb_rpc::server  Listen WS RPCServer on address 127.0.0.1:18115
```

**Step 8. Start the CKB miner in a different terminal.**

```
c:\ckb>ckb miner -C devnet
```

