---
id: intro
title: Overview
sidebar_label: Overview
---
Lumos is a framework for the development of Nervos CKB DApps. 

The Lumos framework provides a list of powerful and high-performance features and utilities in JavaScript and TypeScript:

<!--[**Common Types and Utilities**](../package/base): These are the core definitions and stateless functions that can be used for a CKB specific task.-->

- [**Common Scripts**](../package/commonscripts): The known scripts on CKB that includes the `common` script and `locktime pool` script to enable a unified cell manager in Lumos.
- [**Configuration Manager**](../package/configmanager): The configuration manager to connect to Nervos networks and deploy contracts, to a locally running instance, or one of Nervos's public networks.
- [**HD Cache Manager**](../package/hdcache): The HD cache manager builds a memory cache for derived addresses and live cells of these addresses.
- [**HD Wallet Manager**](../package/hd): The HD wallet manager for CKB supports *mnemonic* and *keystore* that are compatible with `Neuron` and `ckb-cli`. 
- [**Helpers**](../package/helpers): The utilities for working with CKB transactions. The `@ckb-lumos/helpers` package is used in a framework sense that requires to setup the **configuration manager**.
- [**Lumos Indexer**](../package/indexer): The Lumos indexer is a CKB cell indexer that fulfills the [Index-Query-Assemble](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern.
- [**Transaction Manager**](../package/transactionmanager): Transaction Manager is a tool for managing uncommitted cells. The `send_transaction` method can be used to send a transaction to a CKB Node.  The `collector` method can be used to get uncommitted outputs.

For more information, see the details about each feature or utility in the Features and Utilities sections.

<!--[**Common Types and Utilities**](../package/base)-->

<!--[**Common Scripts**](../package/commonscripts)-->

<!--[**Config Manager**](../package/configmanager): Configuration to connect to Nervos networks and deploy contracts, whether to a locally running instance, or one of Nervos's public networks.-->

<!--[**HD Cache Manager**](../package/hdcache)-->

<!--[**HD Wallet Manager**](../package/hd)-->

<!--[**Helpers**](../package/helpers)-->

<!--[**Indexer**](../package/indexer)-->

<!--[**Transaction Manager**](../package/transactionmanager)-->

## How Lumos Fits in with CKB DApps

CKB DApps are designed based on the [index-query-assemble](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern including a cell indexer, a cell querier and a transaction generator.

The Lumos framework wraps up the functionalities that a CKB DApp requires:

- **Cell Indexer**: The Lumos indexer (`@ckb-lumos/indexer` or`@ckb-lumos/sql-indexer`) is used to maintain a local database of cells.
- **Cell Querier**: The Lumos cell manager (`@ckb-lumos/common-scripts`) query cells by using the Lumos indexer. The cells satisfying some criteria are collected from the local database through `CellCollector`.
- **Transaction Generator**: Lumos provides the `TransactionSkeleton` in the `@ckb-lumos/helpers` package. A new transaction can be assembled based on the queried cells through the `TransactionSkeleton` object. Transactions can be sent to the CKB node through the Lumos transaction manager.

<img src="../../img/CKB dapp with Lumos.png"/>

## Resources

| Resource          | Link                                               |
| ----------------- | -------------------------------------------------- |
| Website           |                                                    |
| API Documentation | https://nervosnetwork.github.io/lumos/globals.html |
| Source Code       | https://github.com/nervosnetwork/lumos             |

