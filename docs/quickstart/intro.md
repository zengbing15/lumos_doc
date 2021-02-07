---
id: intro
title: Overview
sidebar_label: Overview
---
## Introduction

Lumos is an open-source framework that was developed by the Nervos Developer Tools team for building Nervos CKB DApps. <!--The framework is developed by using JavaScript and TypeScript in NodeJs environment.-->

All the DApps running on CKB separate functionally into two parts: computation and verification, according to the programming model of CKB. For more information about the CKB programming model, see [CKB whitepaper](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md).

The desktop applications or web server applications that run in NodeJS environment and serve as the off-chain computation part can be developed on top of Lumos. 



<!--The framework is typically used for the off-chain computation part, i.e. the transaction generator on top of the CKB network for handling user requests.-->

<!--The Lumos framework supports to develop DApps using JavaScript and TypeScript in NodeJs environment.-->

<!--The Lumos framework is typically used for the development of the off-chain computation part, i.e. the transaction generator on top of the CKB network for handling user requests.--> <!--CKB is designed to support on-chain verification and off-chain computation.  A CKB DApp has two parts, an off-chain transaction generator and an on-chain transaction validator.-->

<!--and designed based on the [index-query-assemble]https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern.-->

## Architecture

Lumos provides a set of fully comprehensive features and utilities with the components as shown in the figure of the architecture.

The fundamental components, such as the **Lumos indexer**, **common scripts** and the **RPC** components enable the DApp to query cells, assemble transactions and communicate with the CKB network.

<!--The **HD cache manager** and the **HD wallet manager** components provide the functions that consolidate the strength of the Lumos framework.-->

<img src="../../img/CKB dapp with Lumos.png" width="600"/>

Figure 1 Architecture of a CKB DApp Built with Lumos

The components can be classified into several groups according to their features.

- Helper and Config
  - **Base**: The base component (`@ckb-lumos/base`) includes the core definitions and stateless functions that can be used in the other components. The `@ckb-lumos/base` package can be used as a standalone library.
  - **Helpers**: The helpers component (`@ckb-lumos/helpers`) defines interfaces, types <!--,for example, the `TransactionSkeletonType` ,--> and utilities that require to work under a CKB network. The network, testnet or mainnet, is specified by the config manager.

  - **Config Manager**: The config manager component (`@ckb-lumos/config-manager`) connects to Nervos networks and deploys contracts to a locally running instance or one of Nervos's public networks.

- Cell Provider
  - **Lumos Indexer**: The Lumos indexer (`@ckb-lumos/indexer` and `@ckb-lumos/sql-indexer`) is a CKB cell indexer that fulfills the [Index-Query-Assemble](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern. The Lumos indexer indexes cells and maintains a local database of the cells that provides an optimal way for querying cells.

  - **Transaction Manager**: The transaction manager (`@ckb-lumos/transaction-manager`) can serve as an optional cell provider that enables the output cells of pending transactions to be usable for assembling new transactions.

- Transaction Generator
  - **Common Scripts**: The common scripts component (`@ckb-lumos/common-scripts`) integrates known scripts on CKB. The scripts use a cell provider (the Lumos indexer or `transactionManager`) to collect cells and assemble transactions. Each script implements a specific  `TransactionSkeleton`  for building transactions that forms a unified workflow for transaction generation.

    The common scripts component can also integrate and leverage user customized CKB scripts. An example is included in the `@ckb-lumos/common-scripts` package.

- Communication
  
- **RPC**: The RPC component (`@ckb-lumos/rpc`) interacts with the CKB network, communicating block and transaction information with CKB nodes.
  
- Other Functions
  - **HD cache manager**: The HD cache manager (`@ckb-lumos/hd-cache`) builds a memory cache for derived addresses and live cells of these addresses. It supports query functions, such as querying the balance of an HD wallet.

  - **HD wallet manager**: The HD wallet manager (`@ckb-lumos/hd`) supports *mnemonic* and *keystore* that are compatible with `Neuron` and `ckb-cli`.

<!--The **transaction manager** can serve as an optional cell provider that enables the output cells of pending transactions to be usable for assembling new transactions.-->

<!--Transaction Generator:-->

<!--The **common scripts** component integrates known scripts on CKB. The scripts use a cell provider (the Lumos indexer or `transactionManager`) to collect cells and assemble transactions. Each script implements a specific  `TransactionSkeleton`  for building transactions that forms a unified workflow for transaction generation.-->

<!--The common scripts component can also integrate and leverage user customized CKB scripts. An example is included in the `@ckb-lumos/common-scripts` package.--><!--Helper and Config:-->

<!--The **base** component includes the core definitions and stateless functions that can be used in the other components.--><!--The **config manager** connects to Nervos networks and deploys contracts to a locally running instance or one of Nervos's public networks.--><!--The **helpers** component defines interfaces, types, for example, the `TransactionSkeletonType` , and utilities that require to work under a CKB network. That means the helpers component requires the Lumos config manager to be set up.--><!-- Communication:--><!--The **RPC** component is responsible for the communication between the DApp and the CKB network.--><!--Other Functions:--><!--The **HD cache manager** builds a memory cache for derived addresses and live cells of these addresses. It supports query functions, such as querying the balance of an HD wallet.--><!--The **HD wallet manager** supports *mnemonic* and *keystore* that are compatible with `Neuron` and `ckb-cli`.-->

<!--For more information about each component, see the sections in *Lumos Components* .-->

## Resources

| Resource          | Link                                                         |
| ----------------- | ------------------------------------------------------------ |
| Website           | https://docs.nervos.org/                                     |
| API Documentation | https://nervosnetwork.github.io/lumos/globals.html           |
| Source Code       | https://github.com/nervosnetwork/lumos                       |
| Tutorial          | [Intro to Lumos](https://docs.nervos.org/docs/labs/lumos-nervosdao) |
| Video Lecture     | <ul><li>[Dapps with CKB Workshop - Lecture 3: Dapps with Lumos (Chinese + English Subtitles)](https://youtu.be/TJ2bnSFUpPQ)</li><li>[Dapps with CKB Workshop - Lecture 4: Dapp Architecture with Lumos (English)](https://youtu.be/9U23hrzCAiM)</li></ul> |
