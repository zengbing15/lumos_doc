---
id: querytransactions
title: Query on Transactions
---
Transactions are the most fundamental entities for interacting with Nervos CKB. 

## Data Structure

A transaction includes the following fields:

- `deps`: Dependent cell set, provides read-only cells required by transaction verification. These must be references to living cells.
- `inputs`: Cell references and proofs. Cell references point to live cells that are transferred or updated in the transaction. Proofs (e.g., signature) prove that the transaction creator has the permission to transfer or update the referenced cells.
- `outputs`: New cells created in this state transition.

For more information about CKB transactions, see [Transaction](https://docs.nervos.org/docs/reference/transaction#docsNav) and [CKB RFC](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#44-transaction).

### A Transaction Example

```
{
  "version": "0x0",
  "cell_deps": [
    {
      "out_point": {
        "tx_hash": "0xbd864a269201d7052d4eb3f753f49f7c68b8edc386afc8bb6ef3e15a05facca2",
        "index": "0x0"
      },
      "dep_type": "dep_group"
    }
  ],
  "header_deps": [
    "0xaa1124da6a230435298d83a12dd6c13f7d58caf7853f39cea8aad992ef88a422"
  ],
  "inputs": [
    {
      "previous_output": {
        "tx_hash": "0x8389eba3ae414fb6a3019aa47583e9be36d096c55ab2e00ec49bdb012c24844d",
        "index": "0x1"
      },
      "since": "0x0"
    }
  ],
  "outputs": [
    {
      "capacity": "0x746a528800",
      "lock": {
        "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        "args": "0x56008385085341a6ed68decfabb3ba1f3eea7b68",
        "hash_type": "type"
      },
      "type": null
    },
    {
      "capacity": "0x1561d9307e88",
      "lock": {
        "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        "args": "0x886d23a7858f12ebf924baaacd774a5e2cf81132",
        "hash_type": "type"
      },
      "type": null
    }
  ],
  "outputs_data": [
    "0x",
    "0x"
  ],
  "witnesses": ["0x55000000100000005500000055000000410000004a975e08ff99fa0001
    42ff3b86a836b43884b5b46f91b149f7cc5300e8607e633b7a29c94dc01c6616a12f62e74a1
    415f57fcc5a00e41ac2d7034e90edf4fdf800"
  ]
}
```

## Examples

### Query Transactions Related to a Lock Script

To query transactions related to a lock script:

```typescript title="mydapp/src/querytransactions.ts"
const indexer = new Indexer("http://127.0.0.1:8114", "./indexed-data");
export const getTransactionsbyLock = async (
    lockScript: Script,
  ) => {
    const txCollector = new TransactionCollector(indexer,{lock:lockScript});
    for await (const txWithStatus of txCollector.collect()) {
        console.log(txWithStatus);
    }
}
const lockscript:Script = {
    code_hash:
      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
    hash_type: "type",
    args: "0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e",
  };

async function Query(lockscript:Script) {
  await getTransactionsbyLock(lockscript);
} 
Query(lockscript);
```

<details><summary>CLICK ME</summary>
<p>

```shell
{
  transaction: {
    cell_deps: [],
    hash: '0x84a1ff885e82f1d48813968994f63eae22df5baf65519240fc74811ba3b31e92',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object] ],
    outputs_data: [ '0x' ],
    version: '0x0',
    witnesses: [
      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'
    ]
  },
  tx_status: {
    block_hash: '0x4e23ef8268abd4f58b93a060d5f97ad0c039384ec031d073cb680f916b5ec201',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [],
    hash: '0xbdc50e04c88978fe53debe989863855b2e3e4be02dd989c6f8771a2b263ef213',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object] ],
    outputs_data: [ '0x' ],
    version: '0x0',
    witnesses: [
      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'
    ]
  },
  tx_status: {
    block_hash: '0xce5cffcdf54b5583bd9a8773893d62004c0462fdd3eeb7d69473027a054795b6',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [],
    hash: '0x2a02955087850354a731a8a782e58e936ad67308af8f3a781f4c0edeb3c6c9fc',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object] ],
    outputs_data: [ '0x' ],
    version: '0x0',
    witnesses: [
      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'
    ]
  },
  tx_status: {
    block_hash: '0x5cddd87368dbec89c221bad5a5159b4a12ac9129445db25426a4ab91312b566d',
    status: 'committed'
  }
}
...
```
</p>
</details>

### Query Transactions between Given Block Numbers

The following example fetches the transactions between `[fromBlock, toBlock]`, that means both `fromBlock` and `toBlock` are included in the query range.

```typescript title="mydapp/src/querytransactions.ts"
export const getTransactionsbetweenBlocks = async (
    lockScript: Script,
    fromBlock: string,
    toBlock: string
  ) => {
    const txCollector = new TransactionCollector(indexer,{lock:lockScript,fromBlock:fromBlock,toBlock:toBlock});
    console.log("Get transactions between given blocks:");
    for await (const txWithStatus of txCollector.collect()) {
        console.log(txWithStatus);
    }
}
async function Query(lockscript:Script) {
    await getTransactionsbetweenBlocks(lockscript,"0xc5","0xca");
} 
Query(lockscript);
```
<details><summary>CLICK ME</summary>
<p>

```shell
{
  transaction: {
    cell_deps: [],
    hash: '0xfb54d9d8c756ffb30809fe58979e5c33e5ec3692bcff0f1275464e3114bae878',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object] ],
    outputs_data: [ '0x' ],
    version: '0x0',
    witnesses: [
      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'
    ]
  },
  tx_status: {
    block_hash: '0xd6c6ae5575d56ae8071a0b2e481bc1383112de5016a0c429bd56068dff992af9',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [],
    hash: '0xb912f892f80865c219c012eb260c85160524f76a429763fc2b048ab255e4724d',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object] ],
    outputs_data: [ '0x' ],
    version: '0x0',
    witnesses: [
      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'
    ]
  },
  tx_status: {
    block_hash: '0x7f8d1ae67583735bbc51ea6eca160d41f3bafb0f1b2616eae3652c11e7b2a090',
    status: 'committed'
  }
}
{
  transaction: {
    cell_deps: [],
    hash: '0x56040bcd0038dc641d7300f48a6ab153132dcc41e5ef26295cf4c617200210aa',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object] ],
    outputs_data: [ '0x' ],
    version: '0x0',
    witnesses: [
      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'
    ]
  },
  tx_status: {
    block_hash: '0xca60ac493084b8ad60f8b2f151e71239a18da3fa5cb395aed413131eccdd7649',
    status: 'committed'
  }
}
...
```
</p>
</details>

### Skip Transactions

The `skip` query option represents the number of transactions being skipped. The following code snippet skips the first 20 transactions and return the results from the 21st transaction.

```typescript title="mydapp/src/querytransactions.ts"
export const getTxandSkip = async (
    lockScript: Script,
    skip: number
  ) => {
    const txCollector = new TransactionCollector(indexer,{lock:lockScript,skip:skip});
    console.log("Get transactions and skip the first", skip, "trasactions");
    for await (const txWithStatus of txCollector.collect()) {
        console.log(txWithStatus);
    }
}

async function Query(lockscript:Script) {
    await getTxandSkip(lockscript,20);
} 
Query(lockscript);
```

### Order Transactions by Block Number

By default, the transactions are in ascending order of block numbers.

The following code snippet returns the results in descending order of block numbers.

```typescript title="mydapp/src/querytransactions.ts"
export const getTxandOrder = async (
    lockScript: Script,
    order: "asc"|"desc"
  ) => {
    const txCollector = new TransactionCollector(indexer,{lock:lockScript,order:order});
    console.log("Get transactions in order of", order);
    for await (const txWithStatus of txCollector.collect()) {
        console.log(txWithStatus);
    }
}
```

### Prefix Search on `args`

When the `args` field is the full slice of the original args, the default `argsLen` value is -1. 

When the `args` field is the prefix of the original args, you can specify `argsLen`  with other values to enable the prefix search on `args` .

```typescript title="mydapp/src/querytransactions.ts"
export const prefixSearch = async (
    lockScript: Script,
    argslen : number
  ) => {
    const txCollector = new TransactionCollector(indexer,{lock:lockScript,argsLen:argslen});
    console.log("Prefix Search");
    for await (const txWithStatus of txCollector.collect()) {
        console.log(txWithStatus);
    }
}
```

The args length is **20** bytes in normal scenarios and **28** bytes in multisig scenarios.  When the length is not certain, the `argsLen` field can be set as `any`. It is recommended to specify an explicit length for the `argsLen` field in prefix search. Prefix searches using explicit length have better performance than using `any`.

### Fine Grained Query for Transactions

Fine Grained Query for Transactions can be achieved by using `ScriptWrapper` with customized options like `ioType`, `argsLen`.

The `ioType` field is among `input | output | both`.

The following example gets the transactions of depositing CKB to DAO by specifying the `ioType`  as output for DAO script.

```typescript title="mydapp/src/querytransactions.ts"
env.LUMOS_CONFIG_FILE = env.LUMOS_CONFIG_FILE || "./config.json";
initializeConfig();
const config = undefined || getConfig();
const template = config.SCRIPTS["DAO"]!;
const DAOscript:Script = {
	code_hash: template.CODE_HASH,
	hash_type: template.HASH_TYPE,
    args: "0x"
 };
const DAOscriptWrapper:ScriptWrapper = {
    script:DAOscript,
    ioType:"output"
 };
export const fineGrainedQuery = async (
    lockScript: Script,
    typescript : ScriptWrapper
  ) => {
    const txCollector = new TransactionCollector(indexer,{lock:lockScript,type:typescript});
    console.log("Fine Grained Query");
    for await (const txWithStatus of txCollector.collect()) {
        console.log(txWithStatus);
    }
}
async function Query() {
    await fineGrainedQuery(lockscript,DAOscriptWrapper);
} 
Query();
```

<details><summary>CLICK ME</summary>
<p>
The DAO cell is created by the step <a href="../preparation/createaccount#step-5-deposit-ckb-to-dao">Deposit CKB to DAO</a> in the preparation phase.

```shell
{
  transaction: {
    cell_deps: [ [Object], [Object] ],
    hash: '0x4a08e1609cd2f85ba33b4edf3c40ced779150925796ccea1441cad2b0a95395c',
    header_deps: [],
    inputs: [ [Object] ],
    outputs: [ [Object], [Object] ],
    outputs_data: [ '0x0000000000000000', '0x' ],
    version: '0x0',
    witnesses: [
      '0x5500000010000000550000005500000041000000f87feb885a4bbfed59284b3eb5131c03639de5c941dc549985c55215a918c3ce019c348cc8090d03f2d9a72e7d840cbbd23a0705770750861c9cb8bf84dc747600'
    ]
  },
  tx_status: {
    block_hash: '0x37f53dd6884eec2fa93b8fded335f28a3ac63fe9ed3a60226e03138968d30d3c',
    status: 'committed'
  }
}
```
</p>
</details>

