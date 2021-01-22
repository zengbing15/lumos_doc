---
id: ckbdapps
title: Developing CKB DApps with Lumos
---
## Prerequisites

The following essential knowledge are required for using Lumos to develop CKB DApps:

- Basic knowledge of Nervos CKB<!-- are prerequisites for developing CKB DApps with Lumos. -->: For more details about the common knowledge of Nervos CKB, see [Nervos CKB Basics](https://docs.nervos.org/docs/basics/introduction).
- CKB Data Model: For more details about the CKB data model, see [Nervos CKB Reference](https://docs.nervos.org/docs/reference/introduction) and [CKB Data Structure](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md).

## How Lumos Fits in with CKB DApps

CKB DApps are designed based on the [index-query-assemble](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern including a cell indexer, a cell querier and a transaction generator.

The Lumos framework wraps up the functionalities that a CKB DApp requires:

- **Cell Indexer**: The Lumos indexer (`@ckb-lumos/indexer` or`@ckb-lumos/sql-indexer`) is used to maintain a local database of cells.
- **Cell Querier**: Cells satisfying some criteria are collected from the local database through `CellCollector` to respond to queries.
- **Transaction Generator**: A new transaction can be assembled based on the queried cells through `@ckb-lumos/common-scripts` and `@ckb-lumos/helpers`.

<img src="../../img/CKB dapp with Lumos.png"/>

<!--A CKB DApp is comprised of three main components:-->
<!--A Server-->
<!--The server handles blockchain related tasks such as querying data and generating transactions.-->
<!--The server provides a user-friendly API for common interactions with the client.-->
<!--A Client: The client is the user-facing app displaying the content and responding to user actions.-->
<!--A wallet: The wallet is the component used to sign transaction requests for the user.-->
<!--<img src="../../img/CKB dapp arch.png"/>-->

## Transaction Flow

The goal of a DApp is to achieve correct transactions. The transaction flow in a CKB DApp can have the following steps:

1. The user performs a transaction action on the client. In response of the action, the client requests the server to generate the transaction.
2. The server uses a local database generate the transaction and forwards the raw transaction to the client.
3. The client acquires signature from the wallet.
4. The wallet signs the transaction with the signature and sends it to the client.
5. The client forwards the transaction with the signature to the server.
6. The server send the transaction with the signature to the CKB node.
7. The CKB node returns the transaction hash to the server.
8. The server can forward the transaction hash to the client. The server and the client keep track of the transaction hash to see the transaction status on-chain.

The following figure shows the transaction flow between the components of a CKB DApp.

<img src="../../img/transaction flow.png"/>

## <!--How Lumos Fits in with CKB DApps-->

<!--The Lumos framework is mainly used for the server side development of a client-server based CKB DApp.The Lumos functions can be utilized by the server as the following: Lumos indexer: The server uses the Lumos indexer to maintain a database of cells. Processing queries: The server uses the database to respond to user queries.Transaction generation: The server uses the database to respond to transaction generation requests. Lumos indexer and processing queries functionalities are located in  the `Lumos Indexer` (@ckb-lumos/indexer) package. Transaction generation functionalities are located in the `Helpers` (@ckb-lumos/helpers) package and `Common Scripts` (@ckb-lumos/common-scripts) package.-->



