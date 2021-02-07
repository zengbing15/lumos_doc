---
id: installckb
title: Install and Configure Nervos CKB
---
If Nervos CKB is already installed, perform step 6 to start the CKB Node directly.

## Steps

To install and configure Nervos CKB:

### **Step 1. Download the latest CKB binary file from the CKB releases page on [GitHub](https://github.com/nervosnetwork/ckb/releases).**

```
$ export TOP=$(pwd)
 # I'm testing this on a Linux machine, if you use other platforms, please adjust
 # this accordingly.
$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ tar xzf ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
```

### **Step 2. Verify the binaries are working and check versions.**

```
$ ckb -V
ckb 0.39.0
$ ckb init -C devnet -c dev
```

### **Step 3. Modify the chain config to skip difficulty adjustment, and set all epoch to contain 10 blocks.**

```
$ ed devnet/specs/dev.toml <<EOF
91d
90a
genesis_epoch_length = 10
permanent_difficulty_in_dummy = true
.
wq
EOF
```

### **Step 4. Modify miner config to generate a new block every second.**

```
$ ed devnet/ckb-miner.toml <<EOF
39s/5000/1000/
wq
EOF
```

### **Step 5. Use a specific private key as the wallet used in miner.** 

**Note**: Do not use this private key in other place.

```
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
```

### **Step 6. Start the CKB node with the dev chain.**

```
$ ckb run -C devnet
```

### **Step 7. Start the CKB miner in a different terminal.**

```
$ export TOP=$(pwd)
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
$ ckb miner -C devnet
```