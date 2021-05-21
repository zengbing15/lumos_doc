---
id: manageaccounts
title: Manage Accounts
---
Lumos also provides the functions to manage the keys, addresses and the lock script of a [CKB Account](../preparation/createaccount#ckb-account).

The following figure shows the Lumos functions for the conversion between private key, public key, Lock Script, and CKB address.

import useBaseUrl from "@docusaurus/useBaseUrl";

<img src={useBaseUrl("img/conversion.png")}/>

## Prerequisites

The following prerequisites apply for the examples in this guide:

- The development environment is set up. For more information, see [Set Up the Development Environment](../preparation/setupsystem).
- The Lumos packages are installed. For more information, see [Install Lumos Packages](../guides/installlumos).

## Environment

The following examples are verified on Ubuntu 20.04.2. Steps on the other platforms can be adjusted accordingly.

## Examples

### Generate Extended Keys

The HD wallet manager (`@ckb-lumos/hd`) provides the following functions for generating extended keys based on [BIP-39](https://en.bitcoin.it/wiki/BIP_0039):

- [mnemonic.generateMnemonic](https://nervosnetwork.github.io/lumos/modules/hd.html#generatemnemonic-3): Generates mnemonic words (12 words).
- [mnemonic.mnemonicToSeedSync](https://nervosnetwork.github.io/lumos/modules/hd.html#mnemonictoseed-3): Generates a seed from mnemonic words.
- [ExtendedPrivateKey.fromSeed](https://nervosnetwork.github.io/lumos/classes/hd.extendedprivatekey-1.html#fromseed): Generates an extended private key (a private key and a chain code) from a seed.
- [ExtendedPrivateKey.toExtendedPublicKey](https://nervosnetwork.github.io/lumos/classes/hd.extendedprivatekey-1.html#toextendedpublickey): Generates an extended public key (a public key and a chain code) from an extended private key.

Example:

```typescript title="hellolumos/src/manageaccounts.ts/generateKeys" {4,6,7,10}
import { mnemonic, ExtendedPrivateKey } from "@ckb-lumos/hd";

export async function generateKeys() {
  const m = mnemonic.generateMnemonic();
  console.log("The mnemonic is", m);
  const seed = mnemonic.mnemonicToSeedSync(m);
  const extendedPrivateKey = ExtendedPrivateKey.fromSeed(seed);
  console.log("The extended private key is",extendedPrivateKey);

  const publicKey = extendedPrivateKey.toExtendedPublicKey().publicKey;
  console.log("The public key is", publicKey);
}
```

Try the `generateKeys` function in the Node.js REPL mode:


<details><summary>CLICK ME</summary>
<p>



```shell {1,2,5,7}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { manageaccounts } = require(".");
The server is started.
> await manageaccounts.generateKeys();
The mnemonic is put sweet bomb route thrive version evoke about excite pumpkin voyage tragic
The extended private key is
ExtendedPrivateKey {
  privateKey: '0xb0551ab24a366ae15fe8cbf450d275ed5c5dd72f2a8de0fbc74072230c05aa6c',
  chainCode: '0x821f8011f21b00a82c832f1208367e31456bc81a7c1909e01d337a240bd629ed'
}
The public key is 0x022186277d6626f615ec926d1a5c79ba7d6dd459e27597b68c4797e45336a2ba20
```
</p>
</details>

### Generate the Public Key from a Private Key

The key module of the `@ckb-lumos/hd` package supports producing a public key from a private key based on the [secp256k1](https://en.bitcoin.it/wiki/Secp256k1) standard.

The following example uses the [key.privateToPublic](https://nervosnetwork.github.io/lumos/modules/hd.html#privatetopublic-3) function to generate a public key from a private key.

Example:

```typescript title="hellolumos/src/manageaccounts.ts/private2Public" {7}
import { HexString } from "@ckb-lumos/base";
import { key } from "@ckb-lumos/hd";

export async function private2Public(
  privatekey: HexString
): Promise<HexString> {
  const publicKey = key.privateToPublic(privatekey);

  console.log("The public key is", publicKey);
  return publicKey;
}
```

Try the `private2Public` function in the Node.js REPL mode:


<details><summary>CLICK ME</summary>
<p>




```shell {1,2,5,7}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { manageaccounts } = require(".");
The server is started.
> await manageaccounts.private2Public("0xb0551ab24a366ae15fe8cbf450d275ed5c5dd72f2a8de0fbc74072230c05aa6c");
The public key is 0x022186277d6626f615ec926d1a5c79ba7d6dd459e27597b68c4797e45336a2ba20
'0x022186277d6626f615ec926d1a5c79ba7d6dd459e27597b68c4797e45336a2ba20'
```

</p>
</details>

### Generate Args from a Public Key

The [key.publicKeyToBlake160](https://nervosnetwork.github.io/lumos/modules/hd.html#publickeytoblake160-3) function uses blake160 that extracts the first 20 bytes of a public key hash to generate the lock args.

Example:

```typescript title="hellolumos/src/manageaccounts.ts/public2Args" {5}
import { HexString } from "@ckb-lumos/base";
import { key } from "@ckb-lumos/hd";

export async function public2Args(publicKey: HexString): Promise<string> {
  const lockArgs = key.publicKeyToBlake160(publicKey);

  console.log("The lock args is", lockArgs);
  return lockArgs;
}
```

Try the `public2Args` function in the Node.js REPL mode:


<details><summary>CLICK ME</summary>
<p>




```shell {1,2,5,7}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { manageaccounts } = require(".");
The server is started.
> await manageaccounts.public2Args("0x022186277d6626f615ec926d1a5c79ba7d6dd459e27597b68c4797e45336a2ba20");
The lock args is 0x00972f0606323b8680b6bc30b3dc7e4fcc808318
'0x00972f0606323b8680b6bc30b3dc7e4fcc808318'
```

</p>
</details>

### Recover the Public Key from a Signature and a Signed Message

Signatures are based on elliptic curve private/public key pairs. The public key is recoverable from the signature. 

The [key.recoverFromSignature](https://nervosnetwork.github.io/lumos/modules/hd.html#recoverfromsignature-3) function can recover the public key from a signature and a signed message.

Example:

```typescript title="hellolumos/src/manageaccounts.ts/recoverFromSignature" {8}
import { HexString } from "@ckb-lumos/base";
import { key } from "@ckb-lumos/hd";

export async function recoverFromSignature(
  message: HexString,
  signature: HexString
): Promise<HexString> {
  const publicKey = key.recoverFromSignature(message, signature);

  console.log("The public key is", publicKey);
  return publicKey;
}
```

Try the `recoverFromSignature` function in the Node.js REPL mode:


<details><summary>CLICK ME</summary>
<p>




```shell {1,2,5,7-9}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { manageaccounts } = require(".");
The server is started.
> const message = "0x2e6c43f23bd5b6a658de09e75efdaadde7f7e2a9581fca240a46a75e7fefb21a";
> const signature = "0xb1518236147cbfbbcb80d6e6c6ed9b87652510786f0bdbff3a0202788c871e8801a2c7c10fa23d61fbb88f91f1fed02f68c28aa432ee22759c36171f67134d0c01";
> await manageaccounts.recoverFromSignature(message, signature);
The public key is 0x02963f88be6c4163a68abf0539facdfc2a77064c6091f618953a230caeacf5237e
```

</p>
</details>

### Generate a Keystore File

> A keystore file provides storage for keys. The ckb-cli tool or wallets like the [Neuron Wallet](https://docs.nervos.org/docs/basics/guides/neuron#3-create-a-new-wallet-or-import-existing-keystore-file-or-seed-phrase-to-the-neuron-wallet) can import keystore files to recover the wallets.

The [Keystore](https://nervosnetwork.github.io/lumos/classes/hd.keystore-1.html) module of the `@ckb-lumos/hd` package supports to generate keystore files from a private key and a password that encrypts the keystore file. 

The following example generates a keystore with an extended private key by using the [Keystore.create](https://nervosnetwork.github.io/lumos/classes/hd.keystore-1.html#create) function, and then saves the keystore file by using the [Keystore.save](https://nervosnetwork.github.io/lumos/classes/hd.keystore-1.html#save) function. The default name for the keystore file is `${id}.json`.

Example:

```typescript title="hellolumos/src/manageaccounts.ts/generateKeystore" {14,15}
import { Keystore } from "@ckb-lumos/hd";

export async function generateKeystore(
  password: string,
  path: string,
  name: string,
  overwrite: boolean | undefined
) {
  const m = mnemonic.generateMnemonic();
  console.log("The mnemonic is", m);
  const seed = mnemonic.mnemonicToSeedSync(m);
  const extendedPrivateKey = ExtendedPrivateKey.fromSeed(seed);
  console.log("The extendedPrivateKey is", extendedPrivateKey);
  const keystore = Keystore.create(extendedPrivateKey, password);
  keystore.save(path, { name, overwrite });
}
```

Try the `generateKeystore` function in the Node.js REPL mode:


<details><summary>CLICK ME</summary>
<p>




```shell {1,2,5,7}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { manageaccounts } = require(".");
The server is started.
> await manageaccounts.generateKeystore("test","/users/username","keystore.json",true);
The mnemonic is catalog hero they audit liquid struggle topic enter cotton expire sugar cause
The extendedPrivateKey is ExtendedPrivateKey {
  privateKey: '0x641e26e91e605740b62aa678816af5b82591e977648a90f8d556f4e39962178c',
  chainCode: '0x25a4c28fcdf5a74789536e5f368f931436ee70e38537e7e305db4bd497b732e8'
}
```

</p>
</details>

### Generate an XPub Key File from an Extended Private Key

> An xPub Key (extended public key) is a public key and chain code, which can be used to create child public keys.

The [XPubStore](https://nervosnetwork.github.io/lumos/classes/hd.xpubstore-1.html) class of the `@ckb-lumos/hd` package supports to generate xPub key files from extended private keys.

Example:

```typescript title="hellolumos/src/manageaccounts.ts/generateXpubStore" {9,10}
import { ExtendedPrivateKey, XPubStore } from "@ckb-lumos/hd";

export async function generateXPubStore(
  extendedPrivateKey: ExtendedPrivateKey,
  path: string,
  overwrite: boolean | undefined
) {
  const accountExtendedPublicKey = extendedPrivateKey.toAccountExtendedPublicKey();
  const xpubstore = new XPubStore(accountExtendedPublicKey);
  xpubstore.save(path, { overwrite });
}
```

Try the `generateXPubStore` function in the Node.js REPL mode:


<details><summary>CLICK ME</summary>
<p>




```shell {1,2,5,7-11}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { manageaccounts } = require(".");
The server is started.
> const {ExtendedPrivateKey}=require("@ckb-lumos/hd");
> const privateKey="0x5503cc1d40b9e05a46fe8e1d4702786c624a1b5e774f964db6746ea754b4843a";
> const chainCode = "0x568e6eba7d3be6edf051d5de2e0384637c82f1a2e5bab56f5431b2978bd73a27";
> const extendedPrivateKey = new ExtendedPrivateKey(privateKey,chainCode);
> await manageaccounts.generateXPubStore(extendedPK,"/user/username",true);
```

The example generates an xpub file under the <var>/user/username</var> directory. The content of the generated file is: <p>*{"xpubkey":"027f5e9f79ff3739990a0a4581304d3128cbe0f22ee6274c6601defc87c04986cbcd1efd7be4123e6cd9d15a434407661b30b570ef0b9d444553cfec4527ec8ee3"}*.</p>

</p>
</details>

### Get the Balance of an HD Wallet by Using the HD Cache Manager

A DApp can serve queries on HD wallets in an efficient way by using the HD cache manager (`@ckb-lumos/hd-cache`) component that can store the following data of an HD wallet:

- The master public key
- The next receiving public key
- The next change public key
- 30  receiving keys
- 20 change keys
- The balance of the HD wallet

The HD cache manager can load the data of HD wallets from mnemonic words with the [CacheManager.fromMnemonic](https://nervosnetwork.github.io/lumos/classes/hd_cache.cachemanager-1.html#frommnemonic) function or from a keystore file with the [CacheManager.loadFromKeystore](https://nervosnetwork.github.io/lumos/classes/hd_cache.cachemanager-1.html#loadfromkeystore) function.

If the keystore file is generated by the ckb-cli tool (the keystore file contains `"origin":"ckb-cli"`), or the <var>needMasterPublicKey</var> variable is set as <var>true</var>, the HD cache manager loads the data for all keys including the master public key.

The following example loads the data from a keystore file of an HD wallet, and then uses the [getBalance](https://nervosnetwork.github.io/lumos/modules/hd_cache.html#getbalance-1) function to get the balance of the HD wallet. 

Example:

```typescript title="/mydapp/src/manageaccounts.ts/getBalancebyHDCache" {23}
import {
  CacheManager,
  CellCollector,
  getBalance,
  getDefaultInfos,
} from "@ckb-lumos/hd-cache";

export async function getBalancebyHDCache(
  path: string,
  password: string,
  needMasterPublicKey: boolean
) {
  const cacheManager = CacheManager.loadFromKeystore(
    INDEXER,
    path,
    password,
    getDefaultInfos(),
    { needMasterPublicKey }
  );
  cacheManager.startForever();
  //@ts-ignore
  await cacheManager.cache.loop();
  const balance = await getBalance(new CellCollector(cacheManager));
  console.log("The HD wallet balance is", BigInt(balance));
}
```

Try the `getBalancebyHDCache` function in the Node.js REPL mode:


<details><summary>CLICK ME</summary>
<p>

```shell {1,2,5,8,11}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { manageaccounts } = require(".");
The server is started.
# Set the needMasterPublicKey variable as false to get the balance for all keys except the master public key
> await manageaccounts.getBalancebyHDCache("/user/username","test", false);
The HD wallet balance is 40000000000n
# Set the needMasterPublicKey variable as true to get the balance for all keys including the master public key
> await manageaccounts.getBalancebyHDCache("/user/username","test", true);
The HD wallet balance is 2833614223561041n
```

</p>
</details>

### Generate the Address from a Lock Script

The [generateAddress](https://nervosnetwork.github.io/lumos/modules/helpers.html#generateaddress-1) function of the `@ckb-lumos/helpers` package can be used to generate the address from a specific lock script. 

The function generates the address with the **ckb** prefix or the **ckt** prefix, that can be leveraged from `config.PREFIX`.

Example:

```typescript title="hellolumos/src/manageaccounts.ts/generateAddressfromLock" {8}
import { Config } from "@ckb-lumos/config-manager";
import { generateAddress } from "@ckb-lumos/helpers";

export async function generateAddressfromLock(
  lockScript: Script,
  config: Config
) {
  const address = generateAddress(lockScript, { config });
  console.log("The address for the lockscript is", address);
}
```

Try the `generateAddressfromLock` function in the Node.js REPL mode:


<details><summary>CLICK ME</summary>
<p>



```bash {1,2,5,7-10}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, manageaccounts, CONFIG } = require(".");
The server is started.
> const alice = accounts.ALICE;
> const { parseAddress } = require("@ckb-lumos/helpers");
> const script = parseAddress(alice.ADDRESS);
> const address = await manageaccounts.generateAddressfromLock(script,CONFIG);
The address for the lockscript is ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
```

</p>
</details>

### Get the Lock Script from an Address

The [parseAddress](https://nervosnetwork.github.io/lumos/modules/helpers.html#parseaddress-1) function of the `@ckb-lumos/helpers` package can be used to get the lock script from an address.

Example:

```typescript title="hellolumos/src/manageaccounts.ts/generatelockFromAddress" {4}
import { parseAddress } from "@ckb-lumos/helpers";

export async function generateLockFromAddress(address: Address) {
  const lockScript = parseAddress(address);
  console.log("The lock script of the address is", lockscript);
}
```

Try the `generatelockFromAddress` function in the Node.js REPL mode: 

<details><summary>CLICK ME</summary>
<p>


```shell {1,2,5,7,8}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, manageaccounts } = require(".");
The server is started.
> const alice = accounts.ALICE;
> await manageaccounts.generateLockFromAddress(alice.ADDRESS);
The lock script of the address is {
  code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
  hash_type: 'type',
  args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
}
```

</p>
</details>

### Generate the Lock Hash from a Lock Script

The [computeScriptHash](https://nervosnetwork.github.io/lumos/modules/base.html#utils) function generates the hash value for a specific lock script.

```typescript title="hellolumos/src/manageaccounts.ts/generateLockHash" {5}
import { utils } from "@ckb-lumos/base";
const { computeScriptHash } = utils;

export async function generateLockHash(lock: Script) {
  const lockHash = computeScriptHash(lock);
  console.log("The lock hash is", lockHash);
}
```

Try the `generateLockHash` function in the Node.js REPL mode: 

<details><summary>CLICK ME</summary>
<p>



```shell {1,2,5,7-10}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, manageaccounts } = require(".");
The server is started.
> const alice = accounts.ALICE;
> const { parseAddress } = require("@ckb-lumos/helpers");
> const lockScript = parseAddress(alice.ADDRESS);
> await manageaccounts.generateLockHash(lockScript);
The lock hash is 0xf6ea009a4829de7aeecd75f3ae6bcdbaacf7328074ae52a48456a8793a4b1cca
```

</p>
</details>

### Generate an Account from a Private Key

```typescript title="hellolumos/src/manageaccounts.ts/generateAccountFromPrivateKey"
import { parseAddress } from "@ckb-lumos/helpers";
import { utils, Address, Hash, Script, HexString } from "@ckb-lumos/base";
const { computeScriptHash } = utils;
import { key } from "@ckb-lumos/hd";

export type Account = {
  lockScript: Script;
  lockHash: Hash;
  address: Address;
  pubKey: string;
};
export const generateAccountFromPrivateKey = (privKey: string): Account => {
  const pubKey = key.privateToPublic(privKey);
  const args = key.publicKeyToBlake160(pubKey);
  const template = CONFIG.SCRIPTS["SECP256K1_BLAKE160"]!;
  const lockScript = {
    code_hash: template.CODE_HASH,
    hash_type: template.HASH_TYPE,
    args: args,
  };
  const address = generateAddress(lockScript);
  const lockHash = computeScriptHash(lockScript);
  return {
    lockScript,
    lockHash,
    address,
    pubKey,
  };
};
```

Try the `generateAccountFromPrivateKey` function in the Node.js REPL mode: 

<details><summary>CLICK ME</summary>
<p>



```shell {1,2,5,7,8}
$ cd hellolumos
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, manageaccounts } = require(".");
The server is started.
> const alice = accounts.ALICE;
> await manageaccounts.generateAccountFromPrivateKey(alice.PRIVATE_KEY);
{
  lockScript: {
    code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
    hash_type: 'type',
    args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
  },
  lockHash: '0xf6ea009a4829de7aeecd75f3ae6bcdbaacf7328074ae52a48456a8793a4b1cca',
  address: 'ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf',
  pubKey: '0x02963f88be6c4163a68abf0539facdfc2a77064c6091f618953a230caeacf5237e'
}
```

</p>
</details>