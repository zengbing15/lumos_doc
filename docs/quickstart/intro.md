---
id: intro
title: Overview
sidebar_label: Overview
---
Lumos is a development framework made with JavaScript and TypeScript for Nervos CKB DApps.

CKB is designed to support on-chain verification and off-chain computation.  <!--A CKB DApp has two parts, an off-chain transaction generator and an on-chain transaction validator.--> The Lumos framework provides powerful support for the off-chain computation DApps. 

<!--and designed based on the [index-query-assemble]https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern.-->

## Components

Lumos can speed up the development of DApps with comprehensive features and utilities in the following components:

- The **base** component includes the core definitions and stateless functions that can be used in the other components. 
- The **common scripts** component integrates known scripts on CKB. The scripts uses the Lumos indexer to query cells and assemble transactions with these cells. Each script implements a  `TransactionSkeleton`  to build script specific transactions. 
- The **config manager** connects to Nervos networks and deploys contracts to a locally running instance or one of Nervos's public networks.
- The **helpers** component provides a `TransactionSkeleton`  type and other utilities that require to work under a CKB network.
- The **Lumos indexer** indexes cells and maintains a local database of the cells that provides an optimal way for querying cells. 
- The **HD cache manager** builds a memory cache for derived addresses and live cells of these addresses.
- The **HD wallet manager** supports *mnemonic* and *keystore* that are compatible with `Neuron` and `ckb-cli`.
- The **RPC** component is responsible for the communication between the DApp and the CKB network.
- The **transaction manager** can be used to handle all pending transactions. The transaction manager enables the output cells of these transactions to be usable even before the transactions are committed.

<!--A CKB DApp must be able to locate cells and transform cells. The following components in Lumos enable the DApps to query cells and assemble transactions:-->

<!--[Base](../package/base): The base component includes the core definitions and stateless functions that can be used for a CKB specific task.-->

<!--[Common Scripts](/package/commonscripts): Lumos provides a unified workflow to assemble transactions with the integration of known scripts on CKB. The scripts can use the Lumos indexer to query cells and assemble transactions with these cells based on the `TransactionSkeleton`  object.-->

<!--The cell manager can **query** cells by using `CellCollector` and **assemble** transactions with these cells through the `TransactionSkeleton` object in the `@ckb-lumos/helpers` package.-->

<!--[Configuration Manager](../package/configmanager): The configuration manager connects to Nervos networks and deploys contracts to a locally running instance or one of Nervos's public networks.-->

<!--[Lumos Indexer](../package/indexer): The Lumos indexer indexes cells and maintains a local database of the cells that provides an optimal way for querying cells.-->

<!--[HD Cache Manager](../package/hdcache): The HD cache manager builds a memory cache for derived addresses and live cells of these addresses.-->

<!--[HD Wallet Manager](../package/hd): The HD wallet manager for CKB supports *mnemonic* and *keystore* that are compatible with `Neuron` and `ckb-cli`.-->

<!--[Transaction Manager](../package/transactionmanager): The Transaction Manager can be used to handle all pending transactions. The transaction manager enables the output cells of these transactions to be usable even before the transactions are committed.-->

<img src="../../img/CKB dapp with Lumos.png" width="500"/>

Figure 1. CKB DApp with Lumos

The combination of the Lumos indexer, common scripts and RPC components enables the DApp to query cells, assemble and send transactions. The HD cache manager, HD wallet manager and transaction manager components complement the Lumos framework with additional functionalities. 

For more information about each component, see the sections in *Components* .

<!--[**Cell Manager**](../package/commonscripts): The integration of known scripts on CKB that include the `common` script and `locktime pool` script enables a unified cell manager in Lumos.-->

<!--[**Helpers**](../package/helpers): The utilities for working with CKB transactions. The `@ckb-lumos/helpers` package is used in a framework sense that requires to setup the *configuration manager*.-->

<!--[**Lumos Indexer**](../package/indexer): The Lumos indexer is a CKB cell indexer that fulfills the [Index-Query-Assemble](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern.-->

<!--[**Transaction Manager**](../package/transactionmanager): The transaction manager is a tool for managing uncommitted cells. The `send_transaction` method can be used to send a transaction to a CKB Node.  The `collector` method can be used to get uncommitted outputs.-->

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

