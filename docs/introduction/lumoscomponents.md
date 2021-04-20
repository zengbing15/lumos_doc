---
id: lumoscomponents
title: Lumos Components
---
Lumos provides a set of fully comprehensive features and utilities with the Lumos components (packages)<!--as shown in the figure of the architecture-->. Some components, such as the **Lumos indexer** that supports a DApp to query cells, the **common scripts** component that enables the DApp to assemble transactions, and the **RPC** component that is responsible for the communication with the CKB network, form the fundamentals of Lumos.

The **HD cache manager** and the **HD wallet manager** provide the functions that consolidate the strength of the Lumos framework. 

These components can be utilized in combination for a DApp logic during the development, and according to their functions, they can be classified into several groups.

## Helpers

The **Base** component, the **Helpers** component and the **Config Manager** component serve as helpers that facilitate the other components functions.

- **Base**: The base component (`@ckb-lumos/base`) includes the core definitions and stateless functions that can be used in the other components. The `@ckb-lumos/base` package can be used as a standalone library.

- **Helpers**: The helpers component (`@ckb-lumos/helpers`) defines interfaces, types <!--,for example, the `TransactionSkeletonType` ,--> and utilities that require to work under a CKB network. The network, testnet or mainnet, is specified by the config manager.

- **Config Manager**: The config manager component  (`@ckb-lumos/config-manager`) deals with differences between chains, such as the Mainnet, Testnet, or numerous DEV chains. Each chain is abstracted into an individual configuration file.

  When a configuration file is loaded, the config manager handles the chain specific logic that saves corresponding coding effort for configuration management.

  For more information, see [Set Up the Config Manager](../tutorials/config).

## Cell Provider

Cell provider means the component that provides cells to the other functions. **Lumos Indexer** or **Transaction Manager** can be used as the cell provider on different purposes.

- **Lumos Indexer**: The Lumos indexer (`@ckb-lumos/indexer` and `@ckb-lumos/sql-indexer`) is a CKB cell indexer that fulfills the [Index-Query-Assemble](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern. The Lumos indexer indexes cells and maintains a local database of the cells that provides an optimal way for querying cells.

  For more information, see [Set Up the Lumos Indexer](../tutorials/indexer).

- **Transaction Manager**: The transaction manager (`@ckb-lumos/transaction-manager`) can serve as an optional cell provider that enables the output cells of pending transactions to be usable for assembling new transactions.

## Transaction Generator

The CKB DApp mainly acts as a transaction generator that generates transactions with the support of **Common Scripts** corresponding to user requests.

- **Common Scripts**: The common scripts component (`@ckb-lumos/common-scripts`) integrates known scripts on CKB. The scripts use a cell provider (the Lumos indexer or `transactionManager`) to collect cells and assemble transactions. Each script implements a specific  `TransactionSkeleton`  for building transactions that forms a unified workflow for transaction generation.

  The common scripts component can also integrate and leverage user customized CKB scripts. An example is included in the `@ckb-lumos/common-scripts` package.

## Communication

- **RPC**: The RPC component (`@ckb-lumos/rpc`) interacts with the CKB network, communicating block and transaction information with CKB nodes.


## Other Functions

- **HD cache manager**: The HD cache manager (`@ckb-lumos/hd-cache`) builds a memory cache for derived addresses and live cells of these addresses. It supports query functions, such as querying the balance of an HD wallet.

- **HD wallet manager**: The HD wallet manager (`@ckb-lumos/hd`) supports *mnemonic* and *keystore* that are compatible with `Neuron` and `ckb-cli`. 

For information about the installation of Lumos components (packages), see [Install Lumos](../tutorials/installlumos). <!--For the projects that have already listed Lumos packages as dependencies, just run `yarn install` in the projects directly to install the packages.--> 
