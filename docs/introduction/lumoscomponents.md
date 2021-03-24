---
id: lumoscomponents
title: Lumos Components
---
Lumos components (packages) can be classified into several groups according to their features:

- Helper and Config

  - **Base**: The base component (`@ckb-lumos/base`) includes the core definitions and stateless functions that can be used in the other components. The `@ckb-lumos/base` package can be used as a standalone library.

  - **Helpers**: The helpers component (`@ckb-lumos/helpers`) defines interfaces, types <!--,for example, the `TransactionSkeletonType` ,--> and utilities that require to work under a CKB network. The network, testnet or mainnet, is specified by the config manager.

  - **Config Manager**: The config manager component  (`@ckb-lumos/config-manager`) deals with differences between chains, such as the Mainnet, Testnet, or numerous DEV chains. Each chain is abstracted into an individual configuration file.

    When a configuration file is loaded, the config manager handles the chain specific logic that saves corresponding coding effort for configuration management.

    For more information, see [Set Up the Config Manager](../tutorials/config).

- Cell Provider

  - **Lumos Indexer**: The Lumos indexer (`@ckb-lumos/indexer` and `@ckb-lumos/sql-indexer`) is a CKB cell indexer that fulfills the [Index-Query-Assemble](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern. The Lumos indexer indexes cells and maintains a local database of the cells that provides an optimal way for querying cells.

    For more information, see [Set Up the Database](../tutorials/database).

  - **Transaction Manager**: The transaction manager (`@ckb-lumos/transaction-manager`) can serve as an optional cell provider that enables the output cells of pending transactions to be usable for assembling new transactions.

- Transaction Generator

  - **Common Scripts**: The common scripts component (`@ckb-lumos/common-scripts`) integrates known scripts on CKB. The scripts use a cell provider (the Lumos indexer or `transactionManager`) to collect cells and assemble transactions. Each script implements a specific  `TransactionSkeleton`  for building transactions that forms a unified workflow for transaction generation.

    The common scripts component can also integrate and leverage user customized CKB scripts. An example is included in the `@ckb-lumos/common-scripts` package.

- Communication

  - **RPC**: The RPC component (`@ckb-lumos/rpc`) interacts with the CKB network, communicating block and transaction information with CKB nodes.

- Other Functions

  - **HD cache manager**: The HD cache manager (`@ckb-lumos/hd-cache`) builds a memory cache for derived addresses and live cells of these addresses. It supports query functions, such as querying the balance of an HD wallet.

  - **HD wallet manager**: The HD wallet manager (`@ckb-lumos/hd`) supports *mnemonic* and *keystore* that are compatible with `Neuron` and `ckb-cli`. 

For information about the installation of Lumos components (packages), see [Install Lumos](../tutorials/installlumos). <!--For the projects that have already listed Lumos packages as dependencies, just run `yarn install` in the projects directly to install the packages.--> 
