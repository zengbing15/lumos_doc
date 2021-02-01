---
id: nft
title: NFT
---

Non Fungible Tokens (NFTs) are tokens that are not interchangeable or necessarily of equal value, even if they are within the same token class. This includes digital collectibles, game items, and records of ownership of physical assets.

For more information, see the [RFC: CKB-NFT Draft Spec](https://talk.nervos.org/t/rfc-ckb-nft-draft-spec/4779).

## Generate NFT Token

This example only supports gathering capacities from one single wallet.

To generate NFT token:

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

## List All Live NFT Cells

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

## Find Live NFT Cells by NFT ID

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

## List All Current Live NFT Cells by the Lock Script

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

## Transfer NFT Token from One User to Another User

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

