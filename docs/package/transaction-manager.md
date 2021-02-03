---
id: transactionmanager
title: Transaction Manager
---
The `@ckb-lumos/transaction-manager` package deals with one problem with UTXO based blockchains. is that a certain amount of gap period exists between a transaction is accepted by a blockchain, and when it is actually committed on chain. During this gap, new cells created by the pending transaction will not be available. Transaction manager package takes care of this. It wraps an indexer instance, and makes sure cells created in pending transactions, are also exposed and available for assembling new transactions. This means you are no longer bounded to one transaction at a time, you can freely send series of transactions as you wish.

Transaction Manager is a tool for managing uncommitted cells, you can `send_transaction` via this tool and get uncommitted outputs by `collector`.

<img src="../../img/transaction manager.png" width="500"/>

## Examples

```javascript
const TransactionManager = require("@ckb-lumos/transaction-manager")
const { Indexer } = require("@ckb-lumos/indexer")

// generate a new `TransactionManager` instance and start.
const indexer = new Indexer("http://127.0.0.1:8114", "./indexer-data");
const transactionManager = new TransactionManager(indexer)
transactionManager.start()

// now you send transaction via `transactionManager`.
const txHash = await transactionManager.send_transaction(transaction)

// you can get uncommitted cells by `transactionManager.collector`.
const collector = transactionManager.collector({ lock })
for await (const cell of collector.collect()) {
  console.log(cell)
}
```
