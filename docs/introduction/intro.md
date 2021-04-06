---
id: intro
title: What is Lumos?
sidebar_label: Lumos Overview
---
Lumos is an open-source framework that was developed by the Nervos Developer Tools team for building Nervos CKB DApps. <!--The framework is developed by using JavaScript and TypeScript in NodeJs environment.-->

> Lumos enables to free the DApp developers from most of the hassles for dealing with CKB. So the developers can focus on the specific logic in the DApps.

## How It Works?

According to [the programming model of CKB](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#4-programming-model), DApps running on CKB separate functionally into two parts: computation and verification. <!--For more information about the CKB programming model, see [CKB whitepaper](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md).-->

The applications that run in the Node.js environment and serve as the **off-chain computation** part can be developed on top of Lumos. The DApp built upon Lumos polls the block information from the CKB network,  indexes cells locally, and provides the cells for queries and transactions corresponding to user requests.

For more information, see [Lumos Components](../introduction/lumoscomponents).

<img src="../../img/how.svg" width="70%"/>

Figure 1 Architecture of a CKB DApp Built with Lumos
