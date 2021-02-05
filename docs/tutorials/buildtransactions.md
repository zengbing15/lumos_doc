---
id: buildtransactions
title: Building Transactions
---
The goal and core functionality of a DApp built with Lumos is to build transactions in response to user requests.

## Workflow

1. Create a transaction skeleton.

2. Add a fee for the transaction. **Note**: It is also possible to have someone other than the sender to pay the fee. 

3. Prepare the signing entries: The signing entries are the data that the user's wallet needs to sign to provide valid witnesses for the input lock scripts. 

4. Send the raw transaction to the client:  From the security perspective of a DApp, Lumos does not support built-in message signing. So the DApp needs to send the raw transaction <!--or the signing entries piece of the skeleton which contains the actual data to sign--> to the user wallet to acquire signatures. The raw transaction contains all the cells and dependencies for the action and the data that needs to be signed. 

   After the client gets the skeleton, the client forwards the transaction skeleton to the wallet for signing. 

5. Seal the transaction: The transaction with signatures is forwarded to the DApp. The DApp seals the transaction by adding the transaction signatures to the transaction structure. 

6. Send this finalized transaction to the CKB network: The sealed transaction is then forwarded to the CKB network.

   Upon successful receipt, the CKB network returns the transaction hash to the DApp. The transaction hash is sent back to the client such that the client can track the transactions.

7. (Optional) Get the Transaction Status: A transaction can be in one of the three statuses: **pending**, **proposed** and **committed**.

   A **pending** result means the node is aware of the transaction but the transaction is not confirmed yet. 

   A **proposed** result means the node sees a transaction included in a block candidate that is not yet mined. 

   A **committed** result means that the block involving the transaction has been mined and is officially on chain.

## Examples