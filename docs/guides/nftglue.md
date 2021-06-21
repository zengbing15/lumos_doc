---
id: integratenft
title: DApps on CKB Workshop Code
---
A code example, [DApps on CKB Workshop Code](https://github.com/nervosnetwork/dapps-on-ckb-workshop-code), is provided for the demonstration of integrating the NFT script on CKB. For more information about CKB NFT, see [CKB RFC: CKB-NFT Draft Spec](https://talk.nervos.org/t/rfc-ckb-nft-draft-spec/4779).

The  example has the following structure:

```
dapps-on-ckb-workshop-code/
├── nft-glue
├── nft-validator
```

- **nft-validator**: The **nft-validator** is a Rust based on-chain script validator project for supporting NFT tokens on CKB. [Capsule](https://github.com/nervosnetwork/capsule) is leveraged to simplify the script development.

- **nft-glue**: The **nft-glue** is a separate project. It provides operations on NFT tokens with the support of Lumos. [Slides](https://docs.google.com/presentation/d/1fQKyOrkN8I61a1ZGXCgRczi6T_zWH0aN-IA2SFpdCU4/edit?usp=sharing) and a [video](https://www.youtube.com/watch?v=7ob-WL1eWrQ) are provided for an overview of the architecture and code walkthrough of the nft-glue project. 

## Environment

- OS: Ubuntu 20.04.2 <!--with KDE Plasma GUI. For more information about the installation of the KDE plasma GUI, see [How to Install a Desktop (GUI) on An Ubuntu Server](https://phoenixnap.com/kb/how-to-install-a-gui-on-ubuntu).-->
- Node.js (v14.0.0)
- Yarn (1.22.5)
- GCC and make
- TypeScript version 3.8.3
- CKB version v0.39.0

## Prerequisites

The following prerequisites apply for this example:

- The development environment is set up. For more information, see [Set Up the Development Environment](../preparation/setupsystem).
- The account to deploy the NFT script owns enough CKB capacity (33,613.0 CKB). For more information about creating accounts, see [Create Accounts](../preparation/createaccount).

## Deploy the NFT Script on DEV Chain

### Step 1. Install Docker on Ubuntu and manage Docker as a non-root user.

**Docker** must be installed for building and deploying smart contracts. For more information about Docker installation, see [Install Docker Engine](https://docs.docker.com/engine/install/).

To manage Docker as a non-root user, see the Docker documentations of [Manage Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/).

### Step 2. Install Capsule. 

**Capsule** is the tool for building and deploying scripts (contracts) on Nervos CKB. 

1. Download the pre-built installer of <b>capsule_v0.1.3_x86_64-linux.tar.gz</b>.

   :::note

   <p>There are some versions of Capsule that are incompatible with the NFT integration code example. Version <b>0.1.3</b> is verified and recommended for walking through this NFT integration example.</p>

   :::

   ```bash
   $ curl -LO https://github.com/nervosnetwork/capsule/releases/download/v0.1.3/capsule_v0.1.3_x86_64-linux.tar.gz
   $ tar xzf capsule_v0.1.3_x86_64-linux.tar.gz
   ```

2. Add <b>ckb-cli</b> and <b>Capsule</b> to the PATH environment variable.</p><p>To add the PATH variables, add the lines <code>export PATH=$PATH:/<var>path-to-the-file</var></code> (ckb-cli and Capsule) to the end of the <b>~/.bashrc</b> file for Bash shell.

   For example:

   - ckb-cli: <code>export PATH=$PATH:/home/user1/ckb_v0.39.0_x86_64-unknown-linux-gnu</code>

     The folder /home/user1/ckb_v0.40.0_x86_64-unknown-linux-gnu contains the ckb tools installed in <b>step 1</b>.

   - Capsule: <code>export PATH=$PATH:/home/user1/capsule_v0.1.3_x86_64-linux</code>

     The folder /home/user1/capsule_v0.1.3_x86_64-linux contains the Capsule tools installed in <b>step 2</b>.

     :::note

     The current user must have permissions to run ckb-cli and Capsule. If the execution of ckb-cli or Capsule requires sudo commands, that may cause issues during the deployment process.

     :::

3. Check the Capsule installation.


```shell
$ capsule check
```

<details><summary>Output</summary>
<p>


```
------------------------------
docker  installed
ckb-cli installed v0.39.0
------------------------------
```

</p>

</details>

<!--The Capsule tool can be installed from source or the pre-built installer.-->

<!--The following example installs Capsule on Ubuntu by using the [pre-built installer](https://github.com/nervosnetwork/capsule/releases/tag/v0.1.3) of Capsule.-->

### Step 3. Download the example code.

```
$ git clone https://github.com/nervosnetwork/dapps-on-ckb-workshop-code.git
```

### Step 4. Build the NFT script.

This step compiles and generates the NFT source script to an RISC-V binary program into the `dapps-on-ckb-workshop-code/nft-validator/build/debug` folder.

To build the NFT script:

```shell
$ cd dapps-on-ckb-workshop-code/nft-validator
$ capsule build
```

<details><summary>Output</summary>
<p>

```
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

</p>
</details>

### Step 5. Deploy the script.

:::note

The CKB node and the miner must start running before deploying the NFT script. To start the CKB node, run `ckb run -C devnet` . To start the miner, run `ckb miner -C devnet`.

:::

To deploy the NFT script:

1. Update the `[lock]` section in the nft-validator/`deployment.toml` file with the `lock_arg`  of the account that is created in the preparation phase. For more information about creating an account, see [Create Accounts](../preparation/createaccount).

   :::note

   The account must have enough CKB capacity (33,613.0 CKB) for the deployment.

   :::

   ```toml title="nft-validator/deployment.toml"
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
   args = "0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e"
   hash_type = "type"
   ```

2. Generate the release binary.

   ```shell
   $ capsule build --release
   ```
   
   <details><summary>Output</summary>
   <p>   
   
   
   
   ```
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
   
   </p>
   </details>

3. Deploy the NFT binary program to DEV chain by using the "<code>capsule deploy --address <var>the testnet address of the account created in step 2</var></code>" command.

   A cell is created on the DEV chain with the binary program as the cell data. Transactions on NFT tokens reference the cell via cell deps to use the NFT script.

   ```shell
   $ capsule deploy --address ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
   ```

   :::note
   
   The `data_hash` and `tx_hash` will be used in later NFT operations.
   
   :::
   

   <details><summary>Output</summary>
   <p>
   
   
   

   
   
   ```shell
   Create directory "/home/xy/dapps-on-ckb-workshop-code/nft-validator/migrations/dev"
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
         tx_hash: 0xec41ba0c9aa59383481aca20b713ba37413478e0a2c6c258c1a2bc489c713a33
         occupied_capacity: 33613.0 (CKB)
         data_hash: 0x790420c4244a42e732f8065c275b541695a66c7348f885bb3d9b52d83b279115
         type_id: ~
     dep_groups: []
   Confirm deployment? (Yes/No)
   yes 
   Password: 
   send cell_tx ec41ba0c9aa59383481aca20b713ba37413478e0a2c6c258c1a2bc489c713a33
   Deployment complete
   ```
   
   </p>
   </details>


## Perform NFT Operations by Using Lumos

After the deployment of the NFT script on DEV chain, implement the following steps to interact with and operate on NFT tokens by using Lumos.

### Step 1. Install dependencies in the nft-glue project.

```
$ cd dapps-on-ckb-workshop-code/nft-glue
$ yarn install
```

<details><summary>Output</summary>
<p>

```shell
yarn install v1.22.5
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 13.02s.
```

</p>
</details>

### Step 2. Update the config.json file.

Add the NFT configuration for the NFT script under the "DAO" script.

- `CODE_HASH` is the `data_hash` from the deployment recipe.

- `TX_HASH` is the `tx_hash` from the deployment recipe.

```json title="nft-glue/config.json"
	,
    "NFT": {
      "CODE_HASH": "0x790420c4244a42e732f8065c275b541695a66c7348f885bb3d9b52d83b279115",
      "HASH_TYPE": "data",
      "TX_HASH": "0xbe6003de6d3d2a03ca54bdbe2e1df47131109b3bd0a941a6284dd761f292d886",
      "INDEX": "0x0",
      "DEP_TYPE": "code"
    }
```

### Step 3. Build the project.

```shell
$ cd nft-glue
$ tsc
```

### Step 4. Operate on NFT.

The `index.ts` file under the nft-glue project includes the following operations:

- [Generate NFT tokens](../guides/integratenft#generate-nft-tokens).
- [List all live NFT cells](../guides/integratenft#list-all-live-nft-cells).
- [Transfer NFT tokens from one user to another user](../guides/integratenft#transfer-nft-tokens-from-one-user-to-another-user).
- [Sign and seal the transaction](../guides/integratenft#sign-and-seal-the-transaction).

Let us check out how the nft-glue project implements these operations by using Lumos. The [execution](../guides/integratenft#run-the-functions-in-the-nodejs-repl-mode) of these operations can be found at the end of this guide.

#### **Generate NFT tokens**

The following code snippet firstly inserts a dummy NFT output cell. The dummy cell is exactly the same as a normal cell, except that the cell uses all zeros as NFT ID. 

```typescript title="nft-glue/src/index.ts"
export async function generateNftToken(
  fromAddress: Address,
  governanceLock: Script,
  owner: Address
): Promise<TransactionSkeletonType> {

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

:::info

Lumos can generate smaller transactions for optimizations of a normal workflow. That means the following two cases may happen:

- Multiple output cells with the same owner will be merged into one single output cell.
- If the transfer operation transfers the assets from the owner to himself/herself, the transfer operation will be canceled.

:::

Because NFT requires special output cell and stable input cell. To avoid further optimizations altering those fields, `fixedEntries` can be used to mark the fields as fixed.

```typescript title="nft-glue/src/index.ts"
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

```typescript title="nft-glue/src/index.ts"
  skeleton = await secp256k1Blake160.injectCapacity(skeleton, 0, fromAddress);
```

The following code snippet generates the correct NFT ID based on the first input cell and fill the NFT ID in the NFT output cell. 

```typescript title="nft-glue/src/index.ts"
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

```typescript title="nft-glue/src/index.ts"
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

```typescript title="nft-glue/src/index.ts"
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

The common script is used in the following code snippet to add fee for this transaction.

```typescript title="nft-glue/src/index.ts"
// For simplicity, we hardcode 0.1 CKB as transaction fee here.
const FEE = BigInt(1*10**8); 
skeleton = await common.payFee(skeleton, [fromAddress], FEE);
```

:::info

The <b>common</b> module, <b>locktime_pool</b> and <b>sudt</b> module of the [common-scripts](https://nervosnetwork.github.io/lumos/modules/common_scripts.html) package can treat multiple different wallets as a single unit. The example only gathers capacities from one single wallet to demonstrate the integrations for NFT. 

:::

The [common.prepareSigningEntries](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#preparesigningentries-16) function generates messages that are required in transaction signing phase.

```typescript title="nft-glue/src/index.ts"
skeleton = common.prepareSigningEntries(skeleton, { config: CONFIG });
```

#### **List all live NFT cells**

Live NFT cells are the cells with the requested NFT type script.

For simplicity, the function gathers all cells in a single array. The number of cells may impact the execution performance. 

```typescript title="nft-glue/src/index.ts"
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

#### **Transfer NFT tokens from one user to another user**

The `transferNftToken()` function transfers NFT tokens from one user to another user.

For simplicity, the original token sender will pay for the transaction fee. This means the token sender must have spare CKB capacities in addition to the NFT tokens.

The following code snippet inserts the input and output cells from the NFT cell into the transaction skeleton.

```typescript title="nft-glue/src/index.ts"
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

```typescript title="nft-glue/src/index.ts"
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

```typescript title="nft-glue/src/index.ts"
skeleton = skeleton.update("cellDeps", (cellDeps) => {
    return cellDeps.push(buildNftCellDep());
  });
```

For simplicity, the token sender will pay for the transaction fee. So the token sender must have spare CKB capacities in addition to the NFT token.

```typescript title="nft-glue/src/index.ts"
skeleton = await common.payFee(
  skeleton,
  [generateAddress(nftCell.cell_output.lock)],
  FEE
);
```

The [common.prepareSigningEntries](https://nervosnetwork.github.io/lumos/modules/common_scripts.html#preparesigningentries-16) function generates messages that are required in transaction signing phase.

```typescript title="nft-glue/src/index.ts"
 skeleton = common.prepareSigningEntries(skeleton, { config: CONFIG });
 return skeleton;
```

#### **Sign and seal the transaction**

The `signAndSendTransactionSkeleton()` function signs the prepared transaction skeleton from the returned result of `generateNftToken()` or `transferNftToken()`, and then send the signed transaction skeleton to the CKB node.

:::note

The signing function is just for demonstration and simplicity in this code example. The signing function is separate from Lumos related functions because Lumos do not manage private keys unless absolutely requested. Developers can use a service that handle private keys when developing DApps.

:::

```typescript title="nft-glue/src/index.ts"
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

#### Run the functions in the Node.js REPL mode

```shell
$ cd nft-glue
$ node --experimental-repl-await
Welcome to Node.js v14.0.0.
Type ".help" for more information.
> const fromAddress = "ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf";
> const governanceLock = {
  code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
  hash_type: "type",
  args: "0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e"
};
> const owner = "ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf";
> const {listNftTokens, generateNftToken, signAndSendTransactionSkeleton,transferNftToken} = require(".");
>
> const txSkeleton = await generateNftToken(fromAddress, governanceLock,owner);
> const { createTransactionFromSkeleton} = require("@ckb-lumos/helpers");
>
> console.log("Transaction Skeleton:", JSON.stringify(createTransactionFromSkeleton(txSkeleton), null, 2));
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
        "tx_hash": "0xec41ba0c9aa59383481aca20b713ba37413478e0a2c6c258c1a2bc489c713a33",
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
        "tx_hash": "0xbdc50e04c88978fe53debe989863855b2e3e4be02dd989c6f8771a2b263ef213",
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
        "args": "0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e"
      },
      "type": {
        "code_hash": "0x790420c4244a42e732f8065c275b541695a66c7348f885bb3d9b52d83b279115",
        "hash_type": "data",
        "args": "0xf6ea009a4829de7aeecd75f3ae6bcdbaacf7328074ae52a48456a8793a4b1cca"
      }
    },
    {
      "capacity": "0x1242f6d7e2c9",
      "lock": {
        "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        "hash_type": "type",
        "args": "0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e"
      }
    }
  ],
  "outputs_data": [
    "0x970e5ca3890a0e33a89e86546a6701531c02cc3b47e58a7eca80b696ec16a581",
    "0x"
  ],
  "witnesses": [
    "0x55000000100000005500000055000000410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  ]
};
>
> const hash = await signAndSendTransactionSkeleton(txSkeleton, "0xf2a91b1410f7308631b89603262448ba515cddac1ffe250265551c82fff3eb3a");
0xb00cf6f69b0fa8821730eb4b1424552b81f766653ce051668ad7cb4e607db2da
>
> await listNftTokens(governanceLock);
[
  {
    cell_output: { capacity: '0x4a817c800', lock: [Object], type: [Object] },
    out_point: {
      tx_hash: '0xb00cf6f69b0fa8821730eb4b1424552b81f766653ce051668ad7cb4e607db2da',
      index: '0x0'
    },
    block_hash: '0x467df1fbf1e85487b082f8673fbab519cdff13f7438d98471043799ef2f66d69',
    block_number: '0xc8',
    data: '0xf7a157eb5551c247f0136b6bbe317401043ca0fbca9345e546112afdd58d352d'
  }
]
> const cell = (await listNftTokens(governanceLock))[0];
>
> console.log(cell);
{
  cell_output: {
    capacity: '0x4a817c800',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: {
      code_hash: '0x790420c4244a42e732f8065c275b541695a66c7348f885bb3d9b52d83b279115',
      hash_type: 'data',
      args: '0xf6ea009a4829de7aeecd75f3ae6bcdbaacf7328074ae52a48456a8793a4b1cca'
    }
  },
  out_point: {
    tx_hash: '0xb00cf6f69b0fa8821730eb4b1424552b81f766653ce051668ad7cb4e607db2da',
    index: '0x0'
  },
  block_hash: '0x467df1fbf1e85487b082f8673fbab519cdff13f7438d98471043799ef2f66d69',
  block_number: '0xc8',
  data: '0xf7a157eb5551c247f0136b6bbe317401043ca0fbca9345e546112afdd58d352d'
}
> const transferTXSkeleton = await transferNftToken(cell, fromAddress);
> const hash = await signAndSendTransactionSkeleton(transferTXSkeleton, "0xf2a91b1410f7308631b89603262448ba515cddac1ffe250265551c82fff3eb3a");
> console.log(hash);
0x3d417016824534fed10e07f2288ce3696b53282e83d826b1538ce287755c0fe5
```