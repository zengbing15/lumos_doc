---
id: intro
title: What is Lumos?
sidebar_label: Lumos Overview
---
Lumos is an open-source framework that was developed by the Nervos Developer Tools team for building Nervos CKB DApps. <!--The framework is developed by using JavaScript and TypeScript in NodeJs environment.-->

All the DApps running on CKB separate functionally into two parts: computation and verification, according to the programming model of CKB. For more information about the CKB programming model, see [CKB whitepaper](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md).

The <!--desktop applications or web server--> applications that run in the Node.js environment and serve as the **off-chain computation** part can be developed on top of Lumos. 

> Lumos enables to free the DApp developers from most of the hassles for dealing with CKB. So the developers can focus on the specific logic in the DApps.

## Architecture

Lumos provides a set of fully comprehensive features and utilities with the components as shown in the figure of the architecture.

The fundamental components, such as the **Lumos indexer**, **common scripts** and the **RPC** components enable a DApp to query cells, assemble transactions and communicate with the CKB network.

The **HD cache manager** and the **HD wallet manager** components provide the functions that consolidate the strength of the Lumos framework.

For more information about the Lumos packages, see [Lumos Components](../introduction/lumoscomponents).

<!--The **HD cache manager** and the **HD wallet manager** components provide the functions that consolidate the strength of the Lumos framework.-->

<img src="../../img/CKB dapp with Lumos.png" width="600"/>

Figure 1 Architecture of a CKB DApp Built with Lumos

## References

| Resource                          | Link                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| Nervos&nbsp;Document&nbsp;Website | https://docs.nervos.org/                                     |
| API&nbsp;Documentation            | https://nervosnetwork.github.io/lumos/globals.html           |
| Source&nbsp;Code                  | https://github.com/nervosnetwork/lumos                       |
| Tutorials                         | [Intro to Lumos](https://docs.nervos.org/docs/labs/lumos-nervosdao) |
| Video&nbsp;Lectures               | <ul><li>[Dapps with CKB Workshop - Lecture 3: Dapps with Lumos (Chinese + English Subtitles)](https://youtu.be/TJ2bnSFUpPQ)</li><li>[Dapps with CKB Workshop - Lecture 4: Dapp Architecture with Lumos (English)](https://youtu.be/9U23hrzCAiM)</li></ul> |
