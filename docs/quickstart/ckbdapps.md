---
id: ckbdapps
title: CKB DApps with Lumos
---
A CKB DApp can include a server, a client and a wallet.

The server in a CKB DApp provides the following functions:

- The server handles blockchain related tasks such as querying data and generating transactions by using the Lumos framework.
- The server provides a user-friendly API for the client as a simple intermediary for common interactions between the client and CKB nodes. 

The client is the user-facing app displaying the content and responding to user actions.

The wallet is the component used to sign transaction requests for the user.

## Lumos for the Server Development

The Lumos framework is mainly used for the server side development of a client-server based CKB DApp. 

The Lumos functions can be utilized by the server as the following:

- Lumos indexer: The server uses the Lumos indexer to maintain a database of cells. 
- Processing queries: The server uses the database to respond to user queries.
- Transaction generation: The server uses the database to respond to transaction generation requests.

Lumos indexer and processing queries functionalities are located in  the `Lumos Indexer` (@ckb-lumos/indexer) package.

Transaction generation functionalities are located in the `Helpers` (@ckb-lumos/helpers) package and `Common Scripts` (@ckb-lumos/common-scripts) package.



