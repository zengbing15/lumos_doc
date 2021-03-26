---
id: managekeys
title: Manage Keys
---
Lumos also provides the functions to create private keys and public keys.

## Prerequisites

The following prerequisites apply for managing keys by using Lumos:

- Node.js is installed.
- The Lumos packages are installed as dependencies for the project.

## Examples

### Generate Keys

```typescript title="hellolumos/src/managekey.ts"
import { mnemonic, ExtendedPrivateKey } from "@ckb-lumos/hd";

export async function generateKey(){
  const m = mnemonic.generateMnemonic();
  console.log("The mnemonic is",m);
  const seed = mnemonic.mnemonicToSeedSync(m);
  const extendedPrivateKey = ExtendedPrivateKey.fromSeed(seed);
  console.log(extendedPrivateKey);
  
  const publickey = extendedPrivateKey.toExtendedPublicKey().publicKey;
  console.log("The public key is", publickey);
}
```


<details><summary>CLICK ME</summary>
<p>



```shell
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts,querytransactions, querycells, managekeys}=require(".");
The server is started.
> await managekeys.generateKey();
The mnemonic is put sweet bomb route thrive version evoke about excite pumpkin voyage tragic
ExtendedPrivateKey {
  privateKey: '0xb0551ab24a366ae15fe8cbf450d275ed5c5dd72f2a8de0fbc74072230c05aa6c',
  chainCode: '0x821f8011f21b00a82c832f1208367e31456bc81a7c1909e01d337a240bd629ed'
}
The public key is 0x022186277d6626f615ec926d1a5c79ba7d6dd459e27597b68c4797e45336a2ba20
```
</p>
</details>

### Generate Addresses from the Public Key

```typescript title="hellolumos/src/managekey.ts"
import {
    AddressPrefix,
    AddressType as Type,
    pubkeyToAddress,
  } from "@nervosnetwork/ckb-sdk-utils";

export async function publicKey2Address (
    publicKey: string,
  ):Promise<string[]> {
    const pubkey = publicKey.startsWith("0x") ? publicKey : `0x${publicKey}`;
    
    const mainnetaddress = pubkeyToAddress(pubkey, {
        prefix:AddressPrefix.Mainnet,
        type: Type.HashIdx,
        codeHashOrCodeHashIndex: "0x00",
      });
      const testnetaddress = pubkeyToAddress(pubkey, {
        prefix:AddressPrefix.Testnet,
        type: Type.HashIdx,
        codeHashOrCodeHashIndex: "0x00",
      });
    return [mainnetaddress, testnetaddress];
    
}
```

<details><summary>CLICK ME</summary>
<p>

```shell
> await managekeys.publicKey2Address("0x022186277d6626f615ec926d1a5c79ba7d6dd459e27597b68c4797e45336a2ba20");
[
  'ckb1qyqqp9e0qcrrywuxszmtcv9nm3lylnyqsvvqr003u2',
  'ckt1qyqqp9e0qcrrywuxszmtcv9nm3lylnyqsvvq723wsk'
]
>
```
</p>
</details>