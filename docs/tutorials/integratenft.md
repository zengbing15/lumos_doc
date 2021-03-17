---
id: integratenft
title: DApps on CKB Workshop Code
---
A code example, [DApps on CKB Workshop Code](https://github.com/nervosnetwork/dapps-on-ckb-workshop-code), is provided for the demonstration of integrating NFT on CKB. 

The example integrates NFT on CKB mainly by the following two steps:

- Deploy the NFT script (contract) on chain with the **nft-validator** project.
- Operate on NFT tokens with the **nft-glue** project.

Walking through this example requires the knowledge on CKB scripts and CKB NFT.

### NFT

Non Fungible Tokens (NFTs) are tokens that are not interchangeable or necessarily of equal value, even if they are within the same token class. This includes digital collectibles, game items, and records of ownership of physical assets. 

#### CKB NFT Data Structure

An NFT instance is a cell with a type script that references an NFT definition. 

*NFT Token Instance: Cell Schema + NFT Semantics*

```
data:
  id: 32_bytes
  type:
    code_hash: NFT Definition Cell Hash
    type_hash: code | type
    args: governance_lock_hash, [other args], *
  lock: <user_lock>
```

For more information about CKB NFT, see the [RFC: CKB-NFT Draft Spec](https://talk.nervos.org/t/rfc-ckb-nft-draft-spec/4779).

### nft-validator

The **nft-validator** is a Rust based on-chain script validator project for supporting NFT tokens on CKB. [Capsule](https://github.com/nervosnetwork/capsule) is leveraged to simplify the script development.

<!--The file main.rs under nft-validator/contracts/nft-validator/src is the NFT script written in Rust.-->

### nft-glue

The **nft-glue** is a separate project in the code example. It provides operations on NFT tokens with the support of Lumos. [Slides](https://docs.google.com/presentation/d/1fQKyOrkN8I61a1ZGXCgRczi6T_zWH0aN-IA2SFpdCU4/edit?usp=sharing) and a [video](https://www.youtube.com/watch?v=7ob-WL1eWrQ) are provided for an overview of the architecture and code walkthrough of the nft-glue project. 

The `index.ts` file under the nft-glue project includes the following operations:

- Generate NFT tokens.
- List all live NFT cells.
- Transfer NFT tokens from one user to another user.

#### Generate NFT Tokens

The generateNftToken() function can be used to generate NFT tokens (cells).

The function firstly inserts a dummy NFT output cell. The dummy cell is exactly the same as a normal cell, except that it uses all zeros as NFT ID. 

```javascript
  let skeleton = TransactionSkeleton({ cellProvider: INDEXER });

  skeleton = skeleton.update("outputs", (outputs) => {
    return outputs.push({
      cell_output: {
        capacity: "0x" + (BigInt(200) * BigInt(100000000)).toString(16),
        lock: parseAddress(owner),
        type: buildNftTypeScript(governanceLock),
      },
      data:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      out_point: undefined,
      block_hash: undefined,
    });
  });
```

Lumos is designed to generate smaller transactions for optimizations of a normal workflow. That means the following two cases may happen: 

1. Multiple output cells with the same owner might be merged together.
2. Transferring to an address which has input cells in the transaction, might result in the input cells being removed to cancel the transfer operation.

Because NFT requires special output cell and stable input cell. To avoid further optimizations altering those fields, `fixedEntries` can be used to mark the fields as fixed.

```javascript
  skeleton = skeleton.update("fixedEntries", (fixedEntries) => {
    return fixedEntries.push(
      {
        field: "outputs",
        index: 0,
      }
    );
  });
```

Lumos is used to provide input cells that accommodate the capacities required by the output cell. .

```javascript
  skeleton = await secp256k1Blake160.injectCapacity(skeleton, 0, fromAddress);
```

The following code snippet generates the correct NFT ID based on the first input cell and fill the NFT ID in the NFT output cell. 

```javascript
const { CKBHasher } = utils;  
const hasher = new CKBHasher();
  const inputCell = skeleton.get("inputs")!.get(0)!;
  hasher.update(
    core.SerializeCellInput(
      normalizers.NormalizeCellInput({
        previous_output: inputCell.out_point,
        since: "0x0",
      })
    )
  );
  hasher.update("0x0000000000000000");
  const nftId = hasher.digestHex();
  skeleton = skeleton.update("outputs", (outputs) => {
    return outputs.update(0, (output) => {
      output.data = nftId;
      return output;
    });
  });
```

The first input cell requires to be fixed because it is used to generate NFT ID. The following code snippet marks the first input cell as fixed.

```javascript
  skeleton = skeleton.update("fixedEntries", (fixedEntries) => {
    return fixedEntries.push(
      {
        field: "inputs",
        index: 0,
      }
    );
  });
```

Because the output cell references the NFT script, the NFT cell dep needs to be included. The `tx_hash` and `index` of the NFT script cell must be defined in the nft-glue/config.json file.

```javascript
import { getConfig, initializeConfig } from "@ckb-lumos/config-manager";
export const CONFIG = getConfig();

function buildNftCellDep(): CellDep {
  const NFT = CONFIG.SCRIPTS.NFT;
  if (!NFT) {
    throw new Error("NFT script is not configured!");
  }
  return {
    out_point: {
      tx_hash: NFT.TX_HASH,
      index: NFT.INDEX,
    },
    dep_type: NFT.DEP_TYPE,
  };
}

skeleton = skeleton.update("cellDeps", (cellDeps) => {
    return cellDeps.push(buildNftCellDep());
  });
```

Lumos also provides methods in the common-scripts package to inject fee. The common script is used in the following code snippet to add fee for this transaction.

```javascript
// For simplicity, we hardcode 0.1 CKB as transaction fee here.
const FEE = BigInt(1*10**8); 
skeleton = await common.payFee(skeleton, [fromAddress], FEE);
```

The common.prepareSigningEntries function generates messages that are required in transaction signing phase.

```typescript
skeleton = common.prepareSigningEntries(skeleton, { config: CONFIG });
```

#### List All Live NFT Cells

Live NFT cells are the cells with the requested NFT type script.

For simplicity, the function gathers all cells in a single array. The number of cells may impact the execution performance. 

```javascript
export async function listNftTokens(
  governanceLock: Script
): Promise<Array<Cell>> {
    const collector = INDEXER.collector({
    type: buildNftTypeScript(governanceLock),
    data: "any",
  });
  const results = [];
  for await (const cell of collector.collect()) {
    results.push(cell);
  }
  return results;
}
```

#### Transfer NFT Tokens from One User to Another User

The transferNftToken() function transfers NFT tokens from one user to another user.

For simplicity, the original token sender will pay for the transaction fee. This means the token sender must have spare CKB capacities in addition to the NFT token.

The following code snippet inserts the input and output cells from the NFT cell into the transaction skeleton.

```javascript
let skeleton = TransactionSkeleton({ cellProvider: indexer });
  
  skeleton = skeleton
    .update("inputs", (inputs) => {
      return inputs.push(nftCell);
    })
    .update("outputs", (outputs) => {
      return outputs.push({
        cell_output: {
          capacity: nftCell.cell_output.capacity,
          lock: parseAddress(toAddress),
          type: nftCell.cell_output.type,
        },
        data: nftCell.data,
        out_point: undefined,
        block_hash: undefined,
      });
    });
```

For extra safety, mark the input and output NFT cells as `fixedEntries` .

```javascript
  skeleton = skeleton.update("fixedEntries", (fixedEntries) => {
    return fixedEntries.push(
      {
        field: "inputs",
        index: 0,
      },
      {
        field: "outputs",
        index: 0,
      }
    );
  });
```

Because the output cell references the NFT script, the NFT cell dep needs to be included. 

```javascript
skeleton = skeleton.update("cellDeps", (cellDeps) => {
    return cellDeps.push(buildNftCellDep());
  });
```

For simplicity, the token sender will pay for the transaction fee. So the token sender must have spare CKB capacities in addition to the NFT token.

```javascript
skeleton = await common.payFee(
  skeleton,
  [generateAddress(nftCell.cell_output.lock)],
  FEE
);
```

The common.prepareSigningEntries() function generates messages that are required in transaction signing phase.

```javascript
 skeleton = common.prepareSigningEntries(skeleton, { config: CONFIG });
 return skeleton;
```

#### Sign and Send Transaction Skeleton

The signAndSendTransactionSkeleton() function signs the prepared transaction skeleton, for example, the returned result of generateNftToken() or transferNftToken() and send the signed transaction skeleton to the CKB node.

**Note**: The signing function is just for demonstration and simplicity in this code example. The signing function is separate from Lumos related functions because Lumos do not manage private keys unless absolutely requested. Developers can use a service that handle private keys when developing DApps.

```typescript
export async function signAndSendTransactionSkeleton(
  skeleton: TransactionSkeletonType,
  privateKey: HexString
): Promise<Hash> {
  const signatures = skeleton
    .get("signingEntries")
    .map(({ message }) => {
      const o = ecdsaSign(
        new Uint8Array(new Reader(message).toArrayBuffer()),
        new Uint8Array(new Reader(privateKey).toArrayBuffer())
      );
      const signature = new Uint8Array(65);
      signature.set(o.signature, 0);
      signature.set([o.recid], 64);
      return new Reader(signature.buffer).serializeJson();
    })
    .toArray();
  const tx = sealTransaction(skeleton, signatures);
  const rpc = new RPC(CKB_RPC);
  const hash = await rpc.send_transaction(tx);
  return hash;
}
```

## Environment

- OS: Ubuntu 20.04.2 with KDE Plasma GUI. For more information about the installation of the KDE plasma GUI, see [How to Install a Desktop (GUI) on An Ubuntu Server](https://phoenixnap.com/kb/how-to-install-a-gui-on-ubuntu).
- NodeJS  (v14.16.0)
- Yarn (1.22.5)
- GCC and make
- TypeScript version 3.8.3

## Steps

### Deploy the NFT Script on DEV Chain

#### **Step 1. Install and run a CKB node on DEV chain.**

The following example installs and runs the CKB version [0.39.0](https://github.com/nervosnetwork/ckb/releases/tag/v0.39.0) on DEV chain manually.

To install and run a CKB node on DEV chain manually:

```shell
$ export TOP=$(pwd)
$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ tar xzf ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
$ ckb -V
ckb 0.39.0
$ ckb init -C devnet -c dev
WARN: mining feature is disabled because of lacking the block assembler config options
Initialized CKB directory in devnet
create specs/dev.toml
create ckb.toml
create ckb-miner.toml
create default.db-options
$ ckb run -C devnet
```

For more information, see [Install a CKB Node on DEV Chain Manually](../preparation/installckb#install-a-ckb-node-on-dev-chain-manually).

#### **Step 2. Create an account by using ckb-cli.**

To create an account by using ckb-cli:

- Create an account and export the private key for the account.

  ```
  $ export TOP=$(pwd)
  $ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
  $ ckb-cli account new
  Your new account is locked with a password. Please give a password. Do not forget this password.
  Password: 
  Repeat password: 
  address:
    mainnet: ckb1qyqzz2az9emgl7runavw3tul22gd4qs5ueqs68fy9e
    testnet: ckt1qyqzz2az9emgl7runavw3tul22gd4qs5ueqs8zhmf9
  lock_arg: 0x212ba22e768ff87c9f58e8af9f5290da8214e641
  lock_hash: 0x85aa4381b04366e88a10fb9519db99b0993bea7ee0ce67c099e5b627538cd212
  $ ckb-cli account export --extended-privkey-path wallet --lock-arg 0x212ba22e768ff87c9f58e8af9f5290da8214e641
  Password: 
  message: "Success exported account as extended privkey to: \"wallet\", please use this file carefully"
  ```

- Get CKB capacity by specifying the `args` in the `block_assembler` section in ckb.toml with the `lock_arg` of the account.

  **Note**: The following example is based on the condition that the CKB node is installed manually. The process of getting capacity for an account is different when the CKB node is installed by using Tippy.

  ```shell
  $ ed devnet/ckb.toml <<EOF
  143a
  [block_assembler]
  code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"
  args = "0x212ba22e768ff87c9f58e8af9f5290da8214e641"
  hash_type = "type"
  message = "0x"
  .
  wq
  EOF
  ```

- Restart the CKB node and start the miner.

  ```shell
  $ export TOP=$(pwd)
  $ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
  $ ckb miner -C devnet
  ```

#### **Step 3. Install Docker on Ubuntu and manage Docker as a non-root user.**

1. To install Docker engine on **Ubuntu**, see the Docker documentations of [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/).
2. To manage Docker as a non-root user, see the Docker documentations of [Manage Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/).

#### **Step 4. Install Capsule.** 

Capsule is the tool for building deploying scripts (contracts) on Nervos CKB. The Capsule tool can be installed from source or the pre-built installer.

The following example installs Capsule on Ubuntu by using the [pre-built installer](https://github.com/nervosnetwork/capsule/releases/tag/v0.1.3) of Capsule. For more information about installation from source, see the [Readme](https://github.com/nervosnetwork/capsule) of Capsule.

To install Capsule by using the pre-built installer:

- Download the pre-built installer of capsule_v0.1.3_x86_64-linux.tar.gz.

  **Note**: Some versions of Capsule are incompatible with the NFT integration code example in this guide. Version **0.1.3** is verified and recommended for walking through this NFT integration example.

  ```shell
  $ curl -LO https://github.com/nervosnetwork/capsule/releases/download/v0.1.3/capsule_v0.1.3_x86_64-linux.tar.gz
  $ tar xzf capsule_v0.1.3_x86_64-linux.tar.gz
  ```

- Add ckb-cli and Capsule to the PATH environment variable.

  To add the PATH variables, add the lines `export PATH=$PATH:/<path to the file>` of ckb-cli and Capsule to the end of the **~/.bashrc** file for Bash shell.

  For example:

  - ckb-cli: `export PATH=$PATH:/home/user1/ckb_v0.39.0_x86_64-unknown-linux-gnu`

    The folder /home/user1/ckb_v0.40.0_x86_64-unknown-linux-gnu contains the ckb tools installed in **step 1**.

  - Capsule: `export PATH=$PATH:/home/user1/capsule_v0.1.3_x86_64-linux`

    The folder /home/user1/capsule_v0.1.3_x86_64-linux contains the Capsule tools installed in **step 2**.

  **Note**: The current user must have permissions to run ckb-cli and Capsule. If the execution of ckb-cli or Capsule requires sudo commands, that may cause issues during the deployment process.

- Check the Capsule installation.

  ```
  $ capsule check
  ------------------------------
  docker  installed
  ckb-cli installed v0.39.0
  ------------------------------
  ```

#### **Step 5. Download the example code.**

```
$ git clone https://github.com/nervosnetwork/dapps-on-ckb-workshop-code.git
```

#### **Step 6. Build the NFT script.**

This step compiles and generates the NFT source script to an RISC-V binary program into the `dapps-on-ckb-workshop-code/nft-validator/build/debug` folder.

To build the NFT script:

```shell
$ cd dapps-on-ckb-workshop-code/nft-validator
$ capsule build
Building contract nft-validator
 Downloading crates ...
  Downloaded ckb-allocator v0.1.1
  Downloaded cc v1.0.58
  Downloaded ckb-std v0.4.1
  Downloaded buddy-alloc v0.3.0
   Compiling cfg-if v0.1.10
   Compiling cc v1.0.58
   Compiling buddy-alloc v0.3.0
   Compiling blake2b-ref v0.1.0
   Compiling molecule v0.6.0
   Compiling ckb-allocator v0.1.1
   Compiling ckb-standalone-types v0.0.1-pre.1
   Compiling ckb-std v0.4.1
   Compiling nft-validator v0.1.0 (/code/contracts/nft-validator)
    Finished dev [unoptimized + debuginfo] target(s) in 58.96s
Done
```

#### **Step 7. Deploy the script.**

**Note**: The CKB node must start running before the deployment of the NFT script.

If the node is not started, run `ckb run -C devnet` in a terminal to start the node.

To deploy the NFT script:

- Update the `[lock]` section in the nft-validator/`deployment.toml` file with the `lock_arg`  "0x212ba22e768ff87c9f58e8af9f5290da8214e641" of the account created in step 2.

  ```shell
  # [[cells]]
  # name = "my_cell"
  # enable_type_id = false
  # location = { file = "build/release/my_cell" }
  
  # # Dep group cells
  # [[dep_groups]]
  # name = "my_dep_group"
  # cells = [
  #   "my_cell",
  #   "secp256k1_data"
  # ]
  
  # # Replace with your own lock if you want to unlock deployed cells.
  # # The deployment code_hash is secp256k1 lock
  [lock]
  code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"
  args = "0x212ba22e768ff87c9f58e8af9f5290da8214e641"
  hash_type = "type"
  ```

- Generate the release binary.

  ```shell
  $ capsule build --release
  Building contract nft-validator
     Compiling cc v1.0.58
     Compiling cfg-if v0.1.10
     Compiling buddy-alloc v0.3.0
     Compiling blake2b-ref v0.1.0
     Compiling molecule v0.6.0
     Compiling ckb-allocator v0.1.1
     Compiling ckb-standalone-types v0.0.1-pre.1
     Compiling ckb-std v0.4.1
     Compiling nft-validator v0.1.0 (/code/contracts/nft-validator)
      Finished release [optimized] target(s) in 17.31s
  Done
  ```

- Deploy the NFT binary program to DEV chain by using the `capsule deploy --address <the testnet address of the account created in step 2>` command.

  A cell is created with the binary program as cell data on the DEV chain. Transactions on NFT tokens reference the cell by cell deps, and use the NFT script in the transactions.
  
  **Note**: Remember the `data_hash` and `tx_hash` that will be used in later NFT operations.
  
  ```shell
  $ capsule deploy --address ckt1qyqzz2az9emgl7runavw3tul22gd4qs5ueqs8zhmf9
  Create directory "/home/xy/dapp/nft-validator/migrations/dev"
  Deployment plan:
  ---
  migrated_capacity: 0.0 (CKB)
  new_occupied_capacity: 33613.0 (CKB)
  txs_fee_capacity: 0.0001 (CKB)
  total_occupied_capacity: 33613.0 (CKB)
  recipe:
    cells:
      - name: nft
        index: 0
        tx_hash: 0xf60675098165131a1d44d75ea0377af34895878d33420ee271b5c10ba7a8e954
        occupied_capacity: 33613.0 (CKB)
        data_hash: 0x790420c4244a42e732f8065c275b541695a66c7348f885bb3d9b52d83b279115
        type_id: ~
    dep_groups: []
  Confirm deployment? (Yes/No)
  yes
  Password: 
  send cell_tx f60675098165131a1d44d75ea0377af34895878d33420ee271b5c10ba7a8e954
  Deployment complete
  ```

### Operate on NFT Tokens by Using Lumos

After the NFT script is deployed on DEV chain, perform the following steps to interact with and operate on NFT tokens by using Lumos.

#### **Step 1. Install dependencies in the nft-glue project.**

```
$ cd dapps-on-ckb-workshop-code/nft-glue
$ yarn install
yarn install v1.22.5
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 13.02s.
```

#### **Step 2. Update the config.json file.**

To update the config.json file, add the NFT configuration for the NFT script under the "DAO" script.

`CODE_HASH` is the `data_hash` from the deployment recipe.

`TX_HASH` is the `tx_hash` from the deployment recipe.

```
	,
    "NFT": {
      "CODE_HASH": "0x790420c4244a42e732f8065c275b541695a66c7348f885bb3d9b52d83b279115",
      "HASH_TYPE": "data",
      "TX_HASH": "0xbe6003de6d3d2a03ca54bdbe2e1df47131109b3bd0a941a6284dd761f292d886",
      "INDEX": "0x0",
      "DEP_TYPE": "code"
    }
```

#### Step 3. Add some interaction functions to demonstrate the operations on NFT tokens

**Generate NFT tokens**

```typescript
import {
  Hash,
  Cell,
  Script,
} from "@ckb-lumos/base";

import { createTransactionFromSkeleton} from "@ckb-lumos/helpers";
import {signAndSendTransactionSkeleton, generateNftToken} from "./index";

const generateNFT = async ()=>  {
const fromAddress = "ckt1qyqzz2az9emgl7runavw3tul22gd4qs5ueqs8zhmf9";

const governanceLock:Script = {
  code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
  hash_type: "type",
  args: "0x212ba22e768ff87c9f58e8af9f5290da8214e641"
};

const owner = "ckt1qyqzz2az9emgl7runavw3tul22gd4qs5ueqs8zhmf9";

const privateKey = "0x55d720a7477c211a9126e3917d0764663beb033a1e2f878532d89d56972bd7c2";

const txSkeleton = await generateNftToken(
      fromAddress,
      governanceLock,
      owner
    );

console.log("Transaction Skeleton:", JSON.stringify(createTransactionFromSkeleton(txSkeleton), null, 2));
           
const hash:Hash = await signAndSendTransactionSkeleton(txSkeleton, privateKey);
console.log("hash",hash);}catch(error){console.log("error:", error)}
//hash 0xb675528456092e751ef93599e1299703d2cfcf2bb9966bc33d8379bbadf82317

}
generateNFT();
```

Result:

```shell
Transaction Skeleton: {
  "version": "0x0",
  "cell_deps": [
    {
      "out_point": {
        "tx_hash": "0xace5ea83c478bb866edf122ff862085789158f5cbff155b7bb5f13058555b708",
        "index": "0x0"
      },
      "dep_type": "dep_group"
    },
    {
      "out_point": {
        "tx_hash": "0xf60675098165131a1d44d75ea0377af34895878d33420ee271b5c10ba7a8e954",
        "index": "0x0"
      },
      "dep_type": "code"
    }
  ],
  "header_deps": [],
  "inputs": [
    {
      "since": "0x0",
      "previous_output": {
        "tx_hash": "0x183d20a44567861618120445d16373e1e48dc3daa0d15f0a2295a640082a2c0d",
        "index": "0x0"
      }
    }
  ],
  "outputs": [
    {
      "capacity": "0x4a817c800",
      "lock": {
        "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        "hash_type": "type",
        "args": "0x212ba22e768ff87c9f58e8af9f5290da8214e641"
      },
      "type": {
        "code_hash": "0x790420c4244a42e732f8065c275b541695a66c7348f885bb3d9b52d83b279115",
        "hash_type": "data",
        "args": "0x85aa4381b04366e88a10fb9519db99b0993bea7ee0ce67c099e5b627538cd212"
      }
    },
    {
      "capacity": "0x1242f6d7e2c9",
      "lock": {
        "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        "hash_type": "type",
        "args": "0x212ba22e768ff87c9f58e8af9f5290da8214e641"
      }
    }
  ],
  "outputs_data": [
    "0xe416d0877b63e0f98ab42edd10a02ffd4f267f910df0eb5274400aa3bac23cac",
    "0x"
  ],
  "witnesses": [
    "0x55000000100000005500000055000000410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  ]
}
hash 0xb675528456092e751ef93599e1299703d2cfcf2bb9966bc33d8379bbadf82317
```

**Transfer NFT tokens**

```typescript
import {
  Cell,
  Script,
} from "@ckb-lumos/base";

import { createTransactionFromSkeleton} from "@ckb-lumos/helpers";

import {signAndSendTransactionSkeleton, listNftTokens, transferNftToken} from "./index";
const transferNFT = async ()=>  {
const governanceLock:Script = {
  code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
  hash_type: "type",
  args: "0x212ba22e768ff87c9f58e8af9f5290da8214e641"
};
const privateKey = "0x55d720a7477c211a9126e3917d0764663beb033a1e2f878532d89d56972bd7c2";

const nftCells = await listNftTokens(governanceLock);
console.log("nftCells",nftCells);

const nftCell:Cell = nftCells[0];

const toAddress = "ckt1qyqzq3uqxuxt2qkkrr03gj0fahftcqjklcrqnkthm5";
const txSkeleton2 = await transferNftToken(nftCell, toAddress);
console.log("Transaction Skeleton 2", JSON.stringify(createTransactionFromSkeleton(txSkeleton2), null, 2));


const hash2:Hash = await signAndSendTransactionSkeleton(txSkeleton2, privateKey);

console.log("Transfer success! The transaction hash is ",hash2);
}

transferNFT();
```

Result:

```shell
nftCells [
  {
    cell_output: { capacity: '0x4a817c800', lock: [Object], type: [Object] },
    out_point: {
      tx_hash: '0xb675528456092e751ef93599e1299703d2cfcf2bb9966bc33d8379bbadf82317',
      index: '0x0'
    },
    block_hash: '0x5b68126ea2b441930b58dcfa4a0e2e76900361c966f7a320c57c0d99ae8295cf',
    block_number: '0xa6',
    //"0xe416d0877b63e0f98ab42edd10a02ffd4f267f910df0eb5274400aa3bac23cac" is the NFT ID of the NFT cell
    data: '0xe416d0877b63e0f98ab42edd10a02ffd4f267f910df0eb5274400aa3bac23cac'
  }
]
Transaction Skeleton 2 {
  "version": "0x0",
  "cell_deps": [
    {
      "out_point": {
        "tx_hash": "0xf60675098165131a1d44d75ea0377af34895878d33420ee271b5c10ba7a8e954",
        "index": "0x0"
      },
      "dep_type": "code"
    },
    {
      "out_point": {
        "tx_hash": "0xace5ea83c478bb866edf122ff862085789158f5cbff155b7bb5f13058555b708",
        "index": "0x0"
      },
      "dep_type": "dep_group"
    }
  ],
  "header_deps": [],
  "inputs": [
    {
      "since": "0x0",
      "previous_output": {
        "tx_hash": "0xb675528456092e751ef93599e1299703d2cfcf2bb9966bc33d8379bbadf82317",
        "index": "0x0"
      }
    },
    {
      "since": "0x0",
      "previous_output": {
        "tx_hash": "0x1b6994d408db4609ce62dcef18f7206cc2912ee6065e10e02c4bbeca4c027da3",
        "index": "0x0"
      }
    }
  ],
  "outputs": [
    {
      "capacity": "0x4a817c800",
      "lock": {
        "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        "hash_type": "type",
        "args": "0x204780370cb502d618df1449e9edd2bc0256fe06"
      },
      "type": {
        "code_hash": "0x790420c4244a42e732f8065c275b541695a66c7348f885bb3d9b52d83b279115",
        "hash_type": "data",
        "args": "0x85aa4381b04366e88a10fb9519db99b0993bea7ee0ce67c099e5b627538cd212"
      }
    },
    {
      "capacity": "0x12479e85d13c",
      "lock": {
        "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        "hash_type": "type",
        "args": "0x212ba22e768ff87c9f58e8af9f5290da8214e641"
      }
    }
  ],
  "outputs_data": [
    "0xe416d0877b63e0f98ab42edd10a02ffd4f267f910df0eb5274400aa3bac23cac",
    "0x"
  ],
  "witnesses": [
    "0x55000000100000005500000055000000410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  ]
}
Transfer success! The transaction hash is 0xf0659b6aad5eca24234a7d2095fd5ef2e9825e17e175043270a830eca396df26
```

**Check the new capacity of the toaddress**

```shell
$ ckb-cli wallet get-capacity --address ckt1qyqzq3uqxuxt2qkkrr03gj0fahftcqjklcrqnkthm5
total: 200.0 (CKB)
```