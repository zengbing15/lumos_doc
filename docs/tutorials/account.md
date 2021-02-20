---
id: key
title: Create an Extended Private Key
---
Steps

This step generates a new account that can be used for developing and testing operations.

To import create an extended private key:

Step 1. 

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

<!--The `testnet` address of the account can be used for [claiming free **Testnet CKBytes**](https://faucet.nervos.org/).--><!--The `lock_arg` of the account can be used for receiving mining rewards.--><!--$ ckb-cli account import --privkey-path pk1--><!-- Password:--><!-- address:--><!--mainnet: ckb1qyqwkrfx5hvkgvenxj0n6k795pnepv9avtxs78drxj--><!--testnet: ckt1qyqwkrfx5hvkgvenxj0n6k795pnepv9avtxsrznu2w--><!--lock_arg: 0xeb0d26a5d9643333349f3d5bc5a06790b0bd62cd--><!--Check the balance of the account by using ckb-cli:--><!--CKB> wallet get-capacity --address "ckt1qyqwkrfx5hvkgvenxj0n6k795pnepv9avtxsrznu2w"--><!--immature: 8029036.69499957 (CKB)--><!--total: 787543313.59805864 (CKB)-->

