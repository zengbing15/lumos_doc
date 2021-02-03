---
id: ckbdapps
title: Flows of Queries and Transactions
---
The DApps built with Lumos mainly deal with user queries and transaction requests, such as transferring capacity, deposits, withdrawals, and other operations of user assets.

The following flows of queries and transactions show the work process of these operations:

### Query Flow

1. The user expresses an intent to perform a query action on the client.
2. The DApp uses the index database of cells to find all the live cells satisfying the query conditions.
3. The DApp perform other related operations or calculations and returns the result to the user.

### Transaction Flow

1. The user expresses an intent to perform an transaction action on the client.

2. The DApp builds a Lumos transaction skeleton and send it to the client. This structure contains all the cells and dependencies for the action and the data that needs to be signed. 

3. After the client gets the skeleton, the client forwards transaction skeleton to the wallet for signing. 

4. The wallet returns the required signatures to the client.
5. The transaction with signatures is then forwarded to the DApp. The DApp seals the transaction by adding the transaction signatures to the transaction structure. 
6. The sealed transaction is then forwarded to the CKB network.
7. Upon successful receipt, the CKB network returns the transaction hash to the DApp.
8. The transaction hash is sent back to the client such that the client can track the transactions.

<img src="../../img/transaction flow.png" width="600"/>

Figure 2 Transaction Flow

