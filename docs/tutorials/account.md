---
id: createaccount
title: Create an Account for CKB Transactions
---
This step generates a new account that can be used for developing and testing operations.

## Steps

To import create a new account :

Step 1. Create an extended private key by using the HD wallet manager.

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

Step 2. Open a new terminal and import the private key to create a new account.

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

Step 3. Specify the `args` in the `block_assembler` section in ckb.toml with `lock_arg` for receiving mining rewards.

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

Step 4. Restart the CKB node and start the CKB miner in a different terminal.

```
$ export TOP=$(pwd)
$ export PATH=$PATH:$TOP/ckb_v0.40.0-rc1_x86_64-unknown-centos-gnu
$ ckb miner -C devnet
```

Step 5. Check the capacity of the account by using the testnet address.

```
$ ckb-cli wallet get-capacity --address "ckt1qyqv6dfjmelhmrej2g5ju2d4994xkd462d5sathj2h"
immature: 8039065.13953246 (CKB)
total: 38186544.69769654 (CKB)
```

