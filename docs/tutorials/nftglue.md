---
id: nftglue
title: Integrating NFT on CKB DEV Chain
---
## Introduction

Non Fungible Tokens (NFTs) are tokens that are not interchangeable or necessarily of equal value, even if they are within the same token class. This includes digital collectibles, game items, and records of ownership of physical assets. 

The integration of NFT on CKB mainly includes the following two parts:

- Deploy the NFT script on chain.
- Operate on NFT tokens.

## A Code Example: DApps on CKB Workshop Code

A code example, [DApps on CKB Workshop Code](https://github.com/nervosnetwork/dapps-on-ckb-workshop-code), is provided for the demonstration of integrating NFT on CKB DEV chain. 

The example includes two separate projects, nft-validator and nft-glue.

- The **nft-validator** is a Rust based on-chain script validator project for supporting NFT tokens on CKB. [Capsule](https://github.com/nervosnetwork/capsule) is leveraged to simplify the script development. [Slides](https://docs.google.com/presentation/d/1pl5DtkaoHceC2zZ_OTosXAr98cr80D-8D_5iVEptecY/edit?usp=sharing) and a [video](https://www.youtube.com/watch?v=NcN3NiBuJbo) and  are provided for an overview of the architecture and code walkthrough for the nft-validator project. 
- The **nft-glue** is a separate project in the example that provides operations on NFT tokens with the support of Lumos. [Slides](https://docs.google.com/presentation/d/1fQKyOrkN8I61a1ZGXCgRczi6T_zWH0aN-IA2SFpdCU4/edit?usp=sharing) and a [video](https://www.youtube.com/watch?v=7ob-WL1eWrQ) are provided for an overview of the architecture and code walkthrough of the nft-glue project. 

Walking through this example requires the knowledge on CKB scripts and the NFT script.

For more information about CKB scripts, see [Script](https://docs.nervos.org/docs/reference/script).

For more information about the NFT script, see the [RFC: CKB-NFT Draft Spec](https://talk.nervos.org/t/rfc-ckb-nft-draft-spec/4779).

## Environment

- OS: Ubuntu 20.04.2 with KDE Plasma GUI. For more information about the installation of the KDE plasma GUI, see [How to Install a Desktop (GUI) on An Ubuntu Server](https://phoenixnap.com/kb/how-to-install-a-gui-on-ubuntu).
- NodeJS  (v14.16.0)
- Yarn (1.22.5)
- GCC and make
- TypeScript version 3.8.3

## Deploy the NFT Script on DEV Chain

### **Step 1. Install and run a CKB Node on DEV chain.**

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

For more information, see [Install a CKB Node on DEV Chain Manually](../tutorials/installckb#install-a-ckb-node-on-dev-chain-manually).

### Step 2. Create an account by using the HD wallet manager.

To create an account by using the HD wallet manager:

- Install the Lumos packages.

  ```
  $ mkdir mydapp
  $ cd mydapp
  $ yarn init
  $ yarn add @ckb-lumos/indexer@0.15.0 @ckb-lumos/common-scripts@0.15.0 @ckb-lumos/config-manager@0.15.0 @ckb-lumos/hd@0.15.0
  ```

- Set up the Config Manager for the DEV chain.

  ```
  $ cat <<EOF > config.json
  {
    "PREFIX": "ckt",
    "SCRIPTS": {
      "SECP256K1_BLAKE160": {
        "CODE_HASH": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        "HASH_TYPE": "type",
        "TX_HASH": "0xace5ea83c478bb866edf122ff862085789158f5cbff155b7bb5f13058555b708",
        "INDEX": "0x0",
        "DEP_TYPE": "dep_group",
        "SHORT_ID": 0
      },
      "SECP256K1_BLAKE160_MULTISIG": {
        "CODE_HASH": "0x5c5069eb0857efc65e1bca0c07df34c31663b3622fd3876c876320fc9634e2a8",
        "HASH_TYPE": "type",
        "TX_HASH": "0xace5ea83c478bb866edf122ff862085789158f5cbff155b7bb5f13058555b708",
        "INDEX": "0x1",
        "DEP_TYPE": "dep_group",
        "SHORT_ID": 1
      },
      "DAO": {
        "CODE_HASH": "0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e",
        "HASH_TYPE": "type",
        "TX_HASH": "0xa563884b3686078ec7e7677a5f86449b15cf2693f3c1241766c6996f206cc541",
        "INDEX": "0x2",
        "DEP_TYPE": "code"
      }
    }
  }
  EOF
  $ LUMOS_CONFIG_FILE="config.json" node --experimental-repl-await
  Welcome to Node.js v14.16.0.
  Type ".help" for more information.
  > const { initializeConfig, getConfig } = require("@ckb-lumos/config-manager");
  > initializeConfig();
  ```

- Create an extended private key for the account by using the HD wallet manager.

  ```
  > const { mnemonic, ExtendedPrivateKey } = require("@ckb-lumos/hd");
  > const m = mnemonic.generateMnemonic();
  > const seed = mnemonic.mnemonicToSeedSync(m);
  > const extendedPrivateKey = ExtendedPrivateKey.fromSeed(seed);
  > console.log(extendedPrivateKey);
  ExtendedPrivateKey {
    privateKey: '0xc09f61958adda1e8cf5b336ee310552d57a9d084c7e544ee1f28770102507453',
    chainCode: '0x8c03d4a46622ad63cb482df6e8d4de5313bfb798134e970bcd372786ff5dd891'
  }
  ```

- Import the private key by using ckb-cli. 

  This step creates the account with the private key on the DEV chain.

  To import the private key by using ckb-cli:

  ```
  $ cd ckb_v0.39.0_x86_64-unknown-linux-gnu
  $ echo 0xc09f61958adda1e8cf5b336ee310552d57a9d084c7e544ee1f28770102507453 > pk
  $ ckb-cli account import --privkey-path pk
  Password:
  address:
    mainnet: ckb1qyqfsh757xdy5vahah474juhhy287kp7jdxqguzvxj
    testnet: ckt1qyqfsh757xdy5vahah474juhhy287kp7jdxq4eun2w
  lock_arg: 0x985fd4f19a4a33b7edebeacb97b9147f583e934c
  ```

- Get CKB capacity for the account by specifying the `args` in the `block_assembler` section in ckb.toml with the `lock_arg` of the account.

  ```
  $ ed devnet/ckb.toml <<EOF
  143a
  [block_assembler]
  code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"
  args = "0x985fd4f19a4a33b7edebeacb97b9147f583e934c"
  hash_type = "type"
  message = "0x"
  .
  wq
  EOF
  ```

### Step 3. Install Docker on Ubuntu and manage Docker as a non-root user.

1. To install Docker engine on **Ubuntu**, see the Docker documentations of [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/).
2. To manage Docker as a non-root user, see the Docker documentations of [Manage Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/).

### Step 4. Install Capsule. 

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

  - ckb-cli: `export PATH=$PATH:/home/username/ckb_v0.39.0_x86_64-unknown-linux-gnu`

    The folder /home/username/ckb_v0.40.0_x86_64-unknown-linux-gnu contains the ckb tools installed in **step 1**.

  - Capsule: `export PATH=$PATH:/home/username/capsule_v0.1.3_x86_64-linux`

    The folder /home/username/capsule_v0.1.3_x86_64-linux contains the Capsule tools installed in **step 2**.

  **Note**: The current user must have permissions to run ckb-cli and Capsule. If the execution of ckb-cli or Capsule requires sudo commands, that may cause issues during the deployment process.

- Check the Capsule installation.

  ```
  $ capsule check
  ------------------------------
  docker  installed
  ckb-cli installed v0.40.0
  ------------------------------
  ```

### Step 5. Download the example code.

```
$ git clone https://github.com/nervosnetwork/dapps-on-ckb-workshop-code.git
```

### Step 6. Build the NFT script.

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

### Step 7. Deploy the script.

**Note**: The CKB node must start running before the deployment of the NFT script.

If the node is not started, run `ckb run -C devnet` in another terminal to start the node.

To deploy the NFT script:

- Update the `[lock]` section in the nft-validator/`deployment.toml` file with the `lock_arg`  "0x985fd4f19a4a33b7edebeacb97b9147f583e934c" of the account created in step 2.

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
  args = "0x985fd4f19a4a33b7edebeacb97b9147f583e934c"
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

- Deploy the NFT binary program to the DEV chain by using the `capsule deploy --address <the testnet address of the account created in step 2>` command.

  A cell is created with the binary program as cell data on the DEV chain. Transactions on NFT tokens reference the cell by cell deps, and use the NFT script in the transactions.
  
  **Note**: Remember the `data_hash` and `tx_hash` that will be used in later NFT operations.
  
  ```shell
  $ capsule deploy --address ckt1qyqfsh757xdy5vahah474juhhy287kp7jdxq4eun2w
  Deployment plan:
  ---
  migrated_capacity: 0.0 (CKB)
  new_occupied_capacity: 33669.0 (CKB)
  txs_fee_capacity: 0.0001 (CKB)
  total_occupied_capacity: 33669.0 (CKB)
  recipe:
    cells:
      - name: nft
        index: 0
        tx_hash: 0xd6ae484f45a6bc40a558db60e2b55d8621a4db1e20e6196e2bed01a1234ee34f
        occupied_capacity: 33669.0 (CKB)
        data_hash: 0xcd26ace6d4a532c005b6af13196a912bfed399007584dc6a256c72d8bac0fde2
        type_id: ~
    dep_groups: []
  Confirm deployment? (Yes/No)
  y
  Password: 
  send cell_tx d6ae484f45a6bc40a558db60e2b55d8621a4db1e20e6196e2bed01a1234ee34f
  Deployment complete
  ```

## Operate on NFT Tokens by Using Lumos

After the NFT script is deployed on DEV chain, perform the following steps to interact with and operate on NFT tokens by using Lumos.

### Step 1. Install dependencies in the nft-glue project.

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

### Step 2. Update the config.json file.

To update the config.json file, add the following content for the NFT script under the "DAO" script.

`CODE_HASH` is the `data_hash` from the NFT script deployment recipe.

`TX_HASH` is the `tx_hash` from the NFT script deployment recipe.

```
	,
    "NFT": {
      "CODE_HASH": "0xcd26ace6d4a532c005b6af13196a912bfed399007584dc6a256c72d8bac0fde2",
      "HASH_TYPE": "data",
      "TX_HASH": "0xd6ae484f45a6bc40a558db60e2b55d8621a4db1e20e6196e2bed01a1234ee34f",
      "INDEX": "0x0",
      "DEP_TYPE": "code"
    }
```

### Step 3. Update the `index.ts` file for NFT operations.

The `index.ts` file includes the following operations:

- Generate NFT tokens
- Find all live NFT cells by NFT ID
- Find all live NFT cells by the lock script
- Transfer NFT tokens.

#### Generate NFT Tokens

This example only supports gathering capacities from one single wallet.

To generate NFT tokens:

**Step 1. Insert a dummy NFT output cell.** 

The dummy cell is exactly the same as a normal cell, except that it uses all zeros as NFT ID. This way we can leverage Lumos' utility for providing input cells that accommodate the capacities required by the output cell. When input cells are created, we can then generate correct NFT ID based on the first input cell.

```javascript
import { normalizers } from "ckb-js-toolkit";
import {HexString,Hash,Address,Cell,CellDep,OutPoint,Script,core,utils} from "@ckb-lumos/base";
import {
  parseAddress,
  generateAddress,
  sealTransaction,
  TransactionSkeletonType,
  TransactionSkeleton,
} from "@ckb-lumos/helpers";
import { common, secp256k1Blake160 } from "@ckb-lumos/common-scripts";

//fromAddress: Address,
//governanceLock: Script,
//owner: Address

function buildNftTypeScript(governanceLock: Script): Script {
  const hasher = new CKBHasher();
  hasher.update(
    core.SerializeScript(normalizers.NormalizeScript(governanceLock))
  );
  const hash = hasher.digestHex();
  const NFT = CONFIG.SCRIPTS.NFT;
  if (!NFT) {
    throw new Error("NFT script is not configured!");
  }
  return {
    code_hash: NFT.CODE_HASH,
    hash_type: NFT.HASH_TYPE,
    args: hash,
  };
}

let skeleton = TransactionSkeleton({ cellProvider: indexer });
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

**Step 2.  Mark the `outputs` fields as fixed.**

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

**Step 3. Inject input cells to the transaction to provide capacities needed by the newly created input cells.**

```javascript
  skeleton = await secp256k1Blake160.injectCapacity(skeleton, 0, fromAddress);
```

**Step 4. Generate and fill in the correct NFT token ID.**

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

**Step 5. Mark the first input cell as fixed, because the first input cell is used to generate NFT ID.**

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

**Step 6. Include NFT `cell_deps`.**

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

**Step 7. Add fee for the transaction.**

```javascript
// For simplicity, we hardcode 0.1 CKB as transaction fee here.
const FEE = BigInt(1*10**8); 
skeleton = await common.payFee(skeleton, [fromAddress], FEE);
```

**Step 8. Generate messages that are required in transaction signing phase.**

```typescript
skeleton = common.prepareSigningEntries(skeleton, { config: CONFIG });
```

**Step 9. Sign the transaction.**

**Step 10. Seal the transaction with the signatures.**

```typescript
const tx = sealTransaction(skeleton, signatures);
```

**Step 11. Send the transaction.**

```typescript
const txHash = await rpc.send_transaction(tx);
```

#### List All Live NFT Cells

Live NFT cells are the cells with the requested NFT type script.

To list all current live NFT cells:

```javascript
const collector = indexer.collector({
  type: buildNftTypeScript(governanceLock),
  data: "any",
});

const results = [];
// For simplicity, we are gathering all cells in a single array. Note this might
// be slow in case the number of cells grows quite big. You might want to use
// a stream based solution to fetch only cells you need from the async iterator.
for await (const cell of collector.collect()) {
  results.push(cell);
}
return results;
```

#### Find Live NFT Cells by NFT ID

To find the live NFT cells by NFT ID:

```javascript
const collector = indexer.collector({
  type: buildNftTypeScript(governanceLock),
  data: nftId,
});
const results = [];
// For simplicity, we are gathering all cells in a single array. Note this might
// be slow in case the number of cells grows quite big. You might want to use
// a stream based solution to fetch only cells you need from the async iterator.
for await (const cell of collector.collect()) {
  results.push(cell);
}
return results;
```

#### List All Current Live NFT Cells by the Lock Script

To list all live NFT cells by the `lock` script:

```javascript
    const collector = indexer.collector({
      lock: lockScript,
      type: buildNftTypeScript(governanceLock),
    });
    const results = [];
    // For simplicity, we are gathering all cells in a single array. Note this might
    // be slow in case the number of cells grows quite big. You might want to use
    // a stream based solution to fetch only cells you need from the async iterator.
    for await (const cell of collector.collect()) {
      results.push(cell);
    }
    return results;
```

#### Transfer NFT Token from One User to Another User

To transfer NFT Token from one user to another user:

**Step 1. Insert input and output cell for the specified NFT.**

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

**Step 2. Add `fixedEntries` for the input and output NFT cells.**

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

**Step 3. Include NFT `cell_deps`.**

```javascript
skeleton = skeleton.update("cellDeps", (cellDeps) => {
    return cellDeps.push(buildNftCellDep());
  });
```

**Step 4. Add a fee for the transaction.**

**Note**: For simplicity, the token sender will pay for the transaction fee. So the token sender must have spare CKB capacities in addition to the NFT token.

```javascript
skeleton = await common.payFee(
  skeleton,
  [generateAddress(nftCell.cell_output.lock)],
  FEE
);
```

**Step 5. Generate messages that are required in transaction signing phase.**

```javascript
 skeleton = common.prepareSigningEntries(skeleton, { config: CONFIG });
 return skeleton;
```

**Step 6. Sign the transaction.**

This example uses a secp256k1 tool to generate a signature based on the private key `0x29159d8bb4b27704b168fc7fae70ffebf82164ce432b3f6b4c904a116a969f19`.

```javascript
const signatures = ["0x1cb952fd224d1d14d07af621587e91a65ccb051d55ed1371b3b66d4fe169cf7758173882e4c02587cb54054d2de287cbb1fdc2fc21d848d7b320ee8c5826479901"];
```

Step 7. Seal the transaction with returned signatures.

```javascript
const tx = sealTransaction(skeleton, signatures);
```

Step 8. Send the transaction.

```javascript
const txHash = await rpc.send_transaction(tx);
```

#### Add Interaction Code

To demonstrate the operations, add the following content in the `index.ts` file:

```typescript
const transferNFT = async ()=>  {
const fromAddress = "ckt1qyqfsh757xdy5vahah474juhhy287kp7jdxq4eun2w";
console.log("fromAddress",fromAddress);
const governanceLock:Script = {
  code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
  hash_type: "type",
  args: "0x985fd4f19a4a33b7edebeacb97b9147f583e934c"
};


const script1:Script = buildNftTypeScript(governanceLock);
console.log("script1",script1);
const owner = "ckt1qyqfsh757xdy5vahah474juhhy287kp7jdxq4eun2w";

const privateKey = "0xc09f61958adda1e8cf5b336ee310552d57a9d084c7e544ee1f28770102507453";
//try{
const txSkeleton = await generateNftToken(
      fromAddress,
      governanceLock,
      owner
    );
//console.log("txSkeleton",txSkeleton);
//@ts-ignore
console.log(JSON.stringify(createTransactionFromSkeleton(txSkeleton), null, 2));
const hash:Hash = await signAndSendTransactionSkeleton(txSkeleton, privateKey);


console.log("hash",hash);
const nftCells = await listNftTokens(governanceLock);
const nftCell:Cell = nftCells[0];

const toAddress = "ckt1qyqz7gfvvnd4f6j9ug7zgcq48rngmv8v5yyq4n8l38";
const txSkeleton2 = await transferNftToken(nftCell, toAddress);
console.log("txSkeleton2", JSON.stringify(createTransactionFromSkeleton(txSkeleton2), null, 2));
const hash2:Hash = await signAndSendTransactionSkeleton(txSkeleton2, privateKey);

return hash2;
}
const txhash = transferNFT();
console.log("success!",txhash);
```

### Step 4. Compile and Run the nft-glue project.

```
$ tsc
$ node lib/index.js
```