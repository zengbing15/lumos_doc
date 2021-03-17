---
id: managekeys
title: Manage Keys
---
Lumos also provides the functions to create private and public keys.

The following methods are described in this guide:

- Create an Extended Private Key by Using the Lumos HD Wallet Manager. 
- Generate a Public Key from the Private Key.
- Generate Addresses from the Public Key.

## Prerequisites

The following prerequisites apply for managing accounts by using Lumos:

- The CKB node is running.
- The Lumos packages are installed.

## Examples

### Create an Extended Private Key

```typescript title="/mydapp/src/managekey.ts"
import { mnemonic, ExtendedPrivateKey } from "@ckb-lumos/hd";
const m = mnemonic.generateMnemonic();
const seed = mnemonic.mnemonicToSeedSync(m);
const extendedPrivateKey = ExtendedPrivateKey.fromSeed(seed);
console.log(extendedPrivateKey);
```


<details><summary>CLICK ME</summary>
<p>

#### 

```shell
ExtendedPrivateKey {
  privateKey: '0x0bd29e73cb36399a5e4071153ae927248c914a402a2de91e8eb609c5256a907f',
  chainCode: '0x2a37938ba7904529f4ab19456feeae9aa4f0dae6b066b4e52d51f49684f8f392'
}
```
</p>
</details>

### Generate a Public Key from the Private Key

```typescript title="/mydapp/src/managekey.ts"
const publickey = extendedPrivateKey.toExtendedPublicKey().publicKey;
console.log("The public key is", publickey);
```
<details><summary>CLICK ME</summary>
<p>

```shell
The public key is 0x028ce047ab13c66822d10801a9dfffb62b6059798f3d87abd33a5665bb4a7c0346
```
</p>
</details>

### Generate Addresses from the Public Key

```typescript title="/mydapp/src/managekey.ts"
import { env } from "process";
import {
    AddressPrefix,
    AddressType as Type,
    pubkeyToAddress,
  } from "@nervosnetwork/ckb-sdk-utils";

import { initializeConfig } from "@ckb-lumos/config-manager";
env.LUMOS_CONFIG_FILE = env.LUMOS_CONFIG_FILE || "./config.json";
initializeConfig();

export const publicKeyAddress = (
  publicKey: string,
 ) => {
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
  };
const mainnetaddress = publicKeyAddress(pubKey)[0];
const testnetaddress = publicKeyAddress(pubKey)[1];
console.log("The mainnet address is", publicKeyAddress(pubKey)[0]);
console.log("The testnet address is", publicKeyAddress(pubKey)[1]);
```

<details><summary>CLICK ME</summary>
<p>

```shell
The mainnet address is ckb1qyq2rulujdgjn2r8dsl4xk500mj4qgs32rhqk8yxru
The testnet address is ckt1qyq2rulujdgjn2r8dsl4xk500mj4qgs32rhqtz6e0q
```
</p>
</details>

### Generate the Lock Script

```typescript title="/mydapp/src/managekey.ts"
import { parseAddress } from "@ckb-lumos/helpers";
const lockScript = parseAddress(mainnetaddress);
console.log("The lockScript is ", lockScript);
```
<details><summary>CLICK ME</summary>
<p>

```shell
The lockScript is  {
  code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
  hash_type: 'type',
  args: '0xa1f3fc935129a8676c3f535a8f7ee550221150ee'
}
```
</p>
</details>

### Generate the Lock Hash

```typescript title="/mydapp/src/managekey.ts"
import { utils } from "@ckb-lumos/base";
const { computeScriptHash } = utils;
const lockHash = computeScriptHash(lockScript);
console.log("The lockHash is", lockHash);
```
<details><summary>CLICK ME</summary>
<p>

```shell
The lockHash is 0xee975e19f18318afb708d49567e6f9e652a0d58cd18043f4c85be2a81351a0ac
```
</p>
</details>

### Use the HD Cache Manager

```typescript title="/mydapp/src/managekey.ts"
import { Indexer } from "@ckb-lumos/indexer";
const CKB_RPC = "http://127.0.0.1:8114";
export const INDEXER = new Indexer(CKB_RPC, "./indexed-data");
import { CacheManager,CellCollector, CellCollectorWithQueryOptions, getBalance } from "@ckb-lumos/hd-cache";

export const useHDCache = async (
  keystorePath: string,
  password: string
) => {

  const cacheManager = CacheManager.loadFromKeystore(INDEXER, keystorePath, password)
  cacheManager.startForever();
  const masterPubkey = cacheManager.getMasterPublicKeyInfo();
  const nextReceivingPubkey = cacheManager.getNextReceivingPublicKeyInfo();
  const nextChangePubkey = cacheManager.getNextChangePublicKeyInfo();
  console.log("Get HD Wallet Balance");
  const cellCollector = new CellCollector(cacheManager);
  for await (const cell of cellCollector.collect()) {
    cells.push(cell);
    //console.log(cell)
  }
  const balance = await getBalance(cellCollector);
  console.log("The HD wallet balance is", balance);
}
```

