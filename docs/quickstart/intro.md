---
id: intro
title: Overview
sidebar_label: Overview
---
Lumos is a development framework made with JavaScript and TypeScript for Nervos CKB DApps.

<!--CKB DApps need to perform two procedures, building transactions and validating transactions.-->

A CKB DApp has two parts, an off-chain transaction generator and an on-chain transaction validator. The Lumos framework is typically used to develop the off-chain generator on top of the CKB network for handling user requests and building transactions. 

<!--and designed based on the [index-query-assemble]https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern.-->

## Features

<!--The Lumos framework provides powerful and high-performance features and utilities to speed up the development of DApps.-->

A CKB DApp must be able to locate cells and transform cells. The Lumos framework provides the following features to enable the DApps to query cells and assemble transactions:

- **Lumos Indexer**: The Lumos indexer (`@ckb-lumos/indexer` or `@ckb-lumos/sql-indexer`) **indexes** cells and maintains a local database of the cells that provides an optimal way for **querying** cells.
- **Common Scripts**: Lumos provides a unified workflow to assemble transactions with the integration of known scripts (`@ckb-lumos/common-scripts`) on CKB. The scripts can use the Lumos indexer to **query** cells and **assemble** transactions with these cells based on the `TransactionSkeleton`  object.<!--The cell manager can **query** cells by using `CellCollector` and **assemble** transactions with these cells through the `TransactionSkeleton` object in the `@ckb-lumos/helpers` package.--> 

The following figure shows the essential components in a CKB DApp developed by Lumos.

<img src="../../img/CKB dapp with Lumos.png"/>

Figure 1. CKB DApp with Lumos

<!--[**Cell Manager**](../package/commonscripts): The integration of known scripts on CKB that include the `common` script and `locktime pool` script enables a unified cell manager in Lumos.-->

The Lumos framework also provides the following features: 

- [**Common Types and Utilities**](../package/base): These are the core definitions and stateless functions that can be used for a CKB specific task.
- [**Configuration Manager**](../package/configmanager): The configuration manager connects to Nervos networks and deploys contracts to a locally running instance or one of Nervos's public networks.
- [**HD Cache Manager**](../package/hdcache): The HD cache manager builds a memory cache for derived addresses and live cells of these addresses.
- [**HD Wallet Manager**](../package/hd): The HD wallet manager for CKB supports *mnemonic* and *keystore* that are compatible with `Neuron` and `ckb-cli`. 
- **Transaction Manager**: The Transaction Manager (`@ckb-lumos/transaction-manager`) can be used to handle all pending transactions. The transaction manager enables the output cells of these transactions to be usable even before the transactions are committed.

<!--[**Helpers**](../package/helpers): The utilities for working with CKB transactions. The `@ckb-lumos/helpers` package is used in a framework sense that requires to setup the *configuration manager*.-->

<!--[**Lumos Indexer**](../package/indexer): The Lumos indexer is a CKB cell indexer that fulfills the [Index-Query-Assemble](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern.-->

<!--[**Transaction Manager**](../package/transactionmanager): The transaction manager is a tool for managing uncommitted cells. The `send_transaction` method can be used to send a transaction to a CKB Node.  The `collector` method can be used to get uncommitted outputs.-->

For more information about each feature, see the *Features* sections.

<!--[**Common Types and Utilities**](../package/base)-->

<!--[**Common Scripts**](../package/commonscripts)-->

<!--[**Config Manager**](../package/configmanager): Configuration to connect to Nervos networks and deploy contracts, whether to a locally running instance, or one of Nervos's public networks.-->

<!--[**HD Cache Manager**](../package/hdcache)-->

<!--[**HD Wallet Manager**](../package/hd)-->

<!--[**Helpers**](../package/helpers)-->

<!--[**Indexer**](../package/indexer)-->

<!--[**Transaction Manager**](../package/transactionmanager)-->

## Resources

| Resource          | Link                                               |
| ----------------- | -------------------------------------------------- |
| Website           | https://docs.nervos.org/                           |
| API Documentation | https://nervosnetwork.github.io/lumos/globals.html |
| Source Code       | https://github.com/nervosnetwork/lumos             |

