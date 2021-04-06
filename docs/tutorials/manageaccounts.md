---
id: manageaccounts
title: Manage Accounts
---
The ownership of CKB is established through keys, the lock script and addresses. Lumos also provides the functions to manage the keys, addresses and the lock script of [a CKB account](../concepts/ckbaccounts). <!--For more information about CKB accounts, see [CKB Accounts](../concepts/ckbaccounts).--> 

## Prerequisites

The following prerequisites apply for managing keys by using Lumos:

- Node.js is installed.
- The Lumos packages are installed as dependencies for the project.

## Examples

### Generate Keys

```typescript title="hellolumos/src/manageaccounts.ts"
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

Try the `generateKey` function in the Node.js REPL mode:


<details><summary>CLICK ME</summary>
<p>



```shell
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, manageaccounts}=require(".");
The server is started.
> await manageaccounts.generateKey();
The mnemonic is put sweet bomb route thrive version evoke about excite pumpkin voyage tragic
ExtendedPrivateKey {
  privateKey: '0xb0551ab24a366ae15fe8cbf450d275ed5c5dd72f2a8de0fbc74072230c05aa6c',
  chainCode: '0x821f8011f21b00a82c832f1208367e31456bc81a7c1909e01d337a240bd629ed'
}
The public key is 0x022186277d6626f615ec926d1a5c79ba7d6dd459e27597b68c4797e45336a2ba20
```
</p>
</details>

### Recover Public Keys from Signatures

```typescript title="hellolumos/src/manageaccounts.ts"
export async function signature2PublicKey (
  message: HexString,
  signature: HexString
):Promise<HexString> {
  const pubkey = key.recoverFromSignature(message,signature);
  
  console.log("The public key is",pubkey);
  return pubkey;
  
}
```

### Convert a Private Key to a Public Key

```typescript title="hellolumos/src/manageaccounts.ts"
export async function private2Public (
  privatekey: HexString
):Promise<HexString> {
  const pubkey = key.privateToPublic(privatekey);
  
  console.log("The public key is",pubkey);
  return pubkey;
}
```

### Generate the Address from a Lock Script

The [generateAddress](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/helpers/src/index.ts#L89) function of the @ckb-lumos/helpers package can be used to generate address from a specific lock script.

The following example generates the address from a lock script.

```typescript title="hellolumos/src/manageaccounts.ts"
export async function generateAddressfromLock(
  lockScript:Script,
  config: Config
)  {
  const address = generateAddress(lockScript, {config});
  console.log("The address for the lockscript is", address);  
}
```

Try the `generateAddressfromLock` function in the Node.js REPL mode:


<details><summary>CLICK ME</summary>
<p>



```bash {1,4,6-9}
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, manageaccounts, CONFIG}=require(".");
The server is started.
> const alice = accounts.ALICE;
> const { parseAddress }=require("@ckb-lumos/helpers");
> const script = parseAddress(alice.ADDRESS);
> const address = await manageaccounts.generateAddressfromLock(script,CONFIG);
The address for the lockscript is ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
```

</p>
</details>

### Get the Lock Script from an Address

The [parseAddress](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/helpers/src/index.ts#L145) function of the @ckb-lumos/helpers package can be used to get the lock script from an address.

**Example**:

```typescript title="hellolumos/src/manageaccounts.ts"
import { parseAddress } from "@ckb-lumos/helpers";

export async function generatelockFromAddress (
  address:Address
)  {
  const lockscript = parseAddress(address);
  console.log("The lockscript of the address is", lockscript);  
}
```

Try the `generatelockFromAddress` function in the Node.js REPL mode: 

<details><summary>CLICK ME</summary>
<p>


```shell
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, manageaccounts }=require(".");
The server is started.
> const alice = accounts.ALICE;
> await manageaccounts.generatelockFromAddress(alice.ADDRESS);
The lockscript of the address is {
  code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
  hash_type: 'type',
  args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
}
```

</p>
</details>

### Generate the Lock Hash from a Lock Script

The [computeScriptHash](https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/base/lib/utils.js#L73) function generates the hash value for a specific lock script.

```typescript title="hellolumos/src/manageaccounts.ts"
import { utils } from "@ckb-lumos/base";
const {  computeScriptHash } = utils;

export async function generateLockHash(
  lock:Script
  ){
    const lockHash = computeScriptHash(lock);
    console.log("The lockHash is", lockHash);
}
```

### Generate an Account from a Private Key

```typescript title="hellolumos/src/manageaccounts.ts"
import { parseAddress} from "@ckb-lumos/helpers";
import { utils, Address, Hash, Script, HexString } from "@ckb-lumos/base";
const { computeScriptHash } = utils;
import { key } from "@ckb-lumos/hd";

export type Account = {
  lockScript: Script;
  lockHash: Hash;
  address: Address;
  pubKey: string;
  lockScriptMeta?: any;
}
export const generateAccountFromPrivateKey = (privKey: string): Account => {
  const pubKey = key.privateToPublic(privKey);
  const args = key.publicKeyToBlake160(pubKey);
  const template = CONFIG.SCRIPTS["SECP256K1_BLAKE160"]!
  const lockScript = {    
    code_hash: template.CODE_HASH,
    hash_type: template.HASH_TYPE,
    args: args
  };
  const address = generateAddress(lockScript);
  const lockHash = computeScriptHash(lockScript);
  return {
    lockScript,
    lockHash,
    address,
    pubKey,
  }
}
```

Try the `generateAccountFromPrivateKey` function in the Node.js REPL mode: 

<details><summary>CLICK ME</summary>
<p>



```shell
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const { accounts, manageaccounts }=require(".");
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