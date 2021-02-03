---
id: components
title: Components
---
- The **Lumos indexer** is a CKB cell indexer that fulfills the [Index-Query-Assemble](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern. The Lumos indexer indexes cells and maintains a local database of the cells that provides an optimal way for querying cells. 

- The **base** component includes the core definitions and stateless functions that can be used in the other components. 

- The **helpers** component defines interfaces, types, for example, the `TransactionSkeletonType` , and utilities that require to work under a CKB network. So the helpers component requires the Lumos config manager to be set up.

- The **common scripts** component integrates known scripts on CKB. The common scripts component plays an important role in the transaction generator. The scripts use the Lumos indexer to query and collect cells, and assemble transactions with these cells. Each script implements a specific  `TransactionSkeleton`  for building transactions that forms a unified workflow for transaction generation.

  The common scripts component can also integrate and leverage user customized CKB scripts. An example is included in the `@ckb-lumos/common-scripts` package. 

- The **config manager** connects to Nervos networks and deploys contracts to a locally running instance or one of Nervos's public networks.

- The **RPC** component is responsible for the communication between the DApp and the CKB network.

In addition to these components, Lumos provides some other components that consolidate the strength of the Lumos framework, such as the **HD cache manager**, the **HD wallet manager** and the **transaction manager**. 