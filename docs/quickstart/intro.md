---
id: intro
title: Overview
sidebar_label: Overview
---
Lumos is an open-source framework that was developed by the Nervos Developer Tools team for building Nervos CKB DApps. The framework is developed by using JavaScript and TypeScript in NodeJs environment.

All the DApps running on CKB separate functionally into two parts: computation and verification according to the programming model of CKB. Either a desktop application or a server application that runs in NodeJS environment and serves as the off-chain computation part can be developed on top of Lumos. 

For more information about the CKB programming model, see [CKB whitepaper](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md).

<!--The framework is typically used for the off-chain computation part, i.e. the transaction generator on top of the CKB network for handling user requests.-->

<!--The Lumos framework supports to develop DApps using JavaScript and TypeScript in NodeJs environment.-->

<!--The Lumos framework is typically used for the development of the off-chain computation part, i.e. the transaction generator on top of the CKB network for handling user requests.--> <!--CKB is designed to support on-chain verification and off-chain computation.  A CKB DApp has two parts, an off-chain transaction generator and an on-chain transaction validator.-->

<!--and designed based on the [index-query-assemble]https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern.-->

## Architecture

<img src="../../img/CKB dapp with Lumos.png" width="600"/>

Figure 1 Architecture of a CKB DApp Built with Lumos

Lumos provides a list of components with fully comprehensive features and utilities that can speed up the development of CKB DApps.

The fundamental components, such as the **Lumos indexer**, **common scripts**, the **base**, the **helpers** and the **RPC** enable the DApp to query cells, assemble transactions and communicate with the CKB network.

- The **Lumos indexer** is a CKB cell indexer that fulfills the [Index-Query-Assemble](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern. The Lumos indexer indexes cells and maintains a local database of the cells that provides an optimal way for querying cells. 

- The **base** component includes the core definitions and stateless functions that can be used in the other components. 

- The **helpers** component defines interfaces, types, for example, the `TransactionSkeletonType` , and utilities that require to work under a CKB network. So the helpers component requires the Lumos config manager to be set up.

- The **common scripts** component integrates known scripts on CKB. The common scripts component plays an important role in the transaction generator. The scripts use the Lumos indexer to query and collect cells, and assemble transactions with these cells. Each script implements a specific  `TransactionSkeleton`  for building transactions that forms a unified workflow for transaction generation.

  The common scripts component can also integrate and leverage user customized CKB scripts. An example is included in the `@ckb-lumos/common-scripts` package. 

- The **config manager** connects to Nervos networks and deploys contracts to a locally running instance or one of Nervos's public networks.

- The **RPC** component is responsible for the communication between the DApp and the CKB network.

In addition to these components, Lumos provides some other components that consolidate the strength of the Lumos framework, such as the **HD cache manager**, the **HD wallet manager** and the **transaction manager**. 

For more information about each component, see the sections in *Lumos Components* .

<!--The **HD cache manager** builds a memory cache for derived addresses and live cells of these addresses.-->

<!--The **HD wallet manager** supports *mnemonic* and *keystore* that are compatible with `Neuron` and `ckb-cli`.-->

<!--The **transaction manager** can be used to handle all pending transactions. The transaction manager enables the output cells of these transactions to be usable even before the transactions are committed.-->

## Resources

| Resource          | Link                                               |
| ----------------- | -------------------------------------------------- |
| Website           | https://docs.nervos.org/                           |
| API Documentation | https://nervosnetwork.github.io/lumos/globals.html |
| Source Code       | https://github.com/nervosnetwork/lumos             |
| Demos             |                                                    |

