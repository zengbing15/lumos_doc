---
id: nftglue
title: Integrating NFT Script on CKB
---
## Introduction

Non Fungible Tokens (NFTs) are tokens that are not interchangeable or necessarily of equal value, even if they are within the same token class. This includes digital collectibles, game items, and records of ownership of physical assets.

For more information, see the [RFC: CKB-NFT Draft Spec](https://talk.nervos.org/t/rfc-ckb-nft-draft-spec/4779).

This tutorial includes two parts:

- Deploy the NFT script on DEV chain.
- Operate on NFT tokens by using Lumos.

A [Video Walkthrough](https://www.youtube.com/watch?v=7ob-WL1eWrQ) is also provided for an overview of the architecture and code walkthrough. 

## Environment and Tools

- OS: Ubuntu 20.04.2
- NodeJS  (v14.15.5)
- Yarn (1.22.5)
- GCC and make
- TypeScript version 3.8.3

## Deploy the NFT Script on DEV Chain

### **Step 1. Install and configure a DEV blockchain.**

This example uses CKB (v0.40.0).

For more information, see [Install and Configure a CKB DEV Blockchain](http://localhost:3000/lumos_doc/docs/tutorials/installckb).

### **Step 2. Install Docker on Ubuntu system and manage Docker as a non-root user.**

For more information, see [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/) and [Manage Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/).

### **Step 3. Install Capsule.** 

[The pre-built tools](https://github.com/nervosnetwork/capsule/releases/tag/v0.1.3) of Capsule can be downloaded for the installation.

This example uses capsule_v0.1.3_x86_64-linux.tar.gz for Ubuntu system.

**Note**: Some versions of Capsule are incompatible with this example. Version **0.1.3** is verified and recommended.

```
$ curl -LO https://github.com/nervosnetwork/capsule/releases/download/v0.1.3/capsule_v0.1.3_x86_64-linux.tar.gz
$ tar xzf capsule_v0.1.3_x86_64-linux.tar.gz
```

### **Step 4. Add ckb-cli and Capsule to the PATH environment variable.**

To add the variable, add the lines `export PATH=$PATH:/<path to the file>` to the end of the **~/.bashrc** file for Bash shell.

For example:

- ckb-cli: `export PATH=$PATH:/home/username/ckb_v0.40.0_x86_64-unknown-linux-gnu`

- Capsule: `export PATH=$PATH:/home/username/capsule_v0.1.3_x86_64-linux`

The folder /home/username/ckb_v0.40.0_x86_64-unknown-linux-gnu contains the ckb tools installed in **step 1**.

The folder /home/username/capsule_v0.1.3_x86_64-linux contains the Capsule tools installed in **step 2**.

**Note**: The current user must have permissions to execute ckb-cli and Capsule. 

### **Step 5. Check the Capsule installation.**

```
$ capsule check
------------------------------
docker  installed
ckb-cli installed v0.40.0
------------------------------
```

### **Step 6. Download the example code.**

```
$ git clone https://github.com/nervosnetwork/dapps-on-ckb-workshop-code.git
```

### **Step 7. Build the NFT script.**

The generated script binary is located in the `dapps-on-ckb-workshop-code/nft-validator/build/debug` folder.

```
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

### Step 8. Deploy the script.

**Note**: The CKB node must be running before deploying the NFT script.

If the node is not started, run `ckb run -C devnet` in another terminal to start the node.

To deploy the NFT script:

- Update the `[lock]` field in the nft-validator/`deployment.toml` file with your lock script.

```
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
args = "the address that you can unlock in the dev chain"
hash_type = "type"
```

- Generate the release binary.

```
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

- Deploy the NFT script to DEV chain by using the `capsule deploy --address <the deployer's address>` command.

  For details about creating accounts with CKB capacities for developing and testing purpose, see [Create an Account for CKB Transactions](http://localhost:3000/lumos_doc/docs/tutorials/createaccount).

**Note**: Remember the `data_hash` and `tx_hash` that will be used in later operations.

```
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

### Step 1. Install dependencies.

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