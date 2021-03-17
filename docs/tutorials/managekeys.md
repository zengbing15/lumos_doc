---
id: managekeys
title: Manage Keys
---
<!--A CKB account is represented as a collection of cells of a lock script. At the preparation step, we have created an account by using ckb-cli.-->

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
  privateKey: '0xf2a91b1410f7308631b89603262448ba515cddac1ffe250265551c82fff3eb3a',
  chainCode: '0x7922fb7c888bc3509b1fee6bc0e792ff766dd04efb095ced05af62f63dde9a32'
}
```
</p>
</details>

### Generate a Public Key from the Private Key

```typescript title="/mydapp/src/managekey.ts"
const publickey = extendedPrivateKey.toExtendedPublicKey().publicKey;
console.log("The public key is", publickey);
```

### Generate Addresses from the Public Key

```typescript title="/mydapp/src/managekey.ts"
import { env } from "process";
import {
    AddressPrefix,
    AddressType as Type,
    pubkeyToAddress,
  } from "@nervosnetwork/ckb-sdk-utils";
import { utils } from "@ckb-lumos/base";
const { computeScriptHash } = utils;
import { parseAddress } from "@ckb-lumos/helpers";
import { getConfig, initializeConfig } from "@ckb-lumos/config-manager";

env.LUMOS_CONFIG_FILE = env.LUMOS_CONFIG_FILE || "./config.json";
initializeConfig();

const publickey = extendedPrivateKey.toExtendedPublicKey().publicKey;
console.log("The public key is", publickey);
  
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
const lockScript = parseAddress(mainnetaddress);
const lockHash = computeScriptHash(lockScript);
console.log("The lockScript is ", lockScript, ".\nThe lockHash is", lockHash);
```

<details><summary>CLICK ME</summary>
<p>

```shell
The public key is 0x02963f88be6c4163a68abf0539facdfc2a77064c6091f618953a230caeacf5237e
The mainnet address is ckb1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qxe85u4
The testnet address is ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
The lockScript is  {
  code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
  hash_type: 'type',
  args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
}
The lockHash is 0xf6ea009a4829de7aeecd75f3ae6bcdbaacf7328074ae52a48456a8793a4b1cca
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

