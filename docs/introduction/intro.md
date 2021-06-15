---
id: intro
title: What is Lumos?
sidebar_label: Lumos Overview
---
import useBaseUrl from "@docusaurus/useBaseUrl";

Lumos is an open-source framework that was developed by the Nervos Developer Tools team, for building Nervos CKB DApps. <!--The framework is developed by using JavaScript and TypeScript in NodeJs environment.-->

> Lumos enables to free the DApp developers from most of the hassles for dealing with CKB. So the developers can focus on the specific logic in the DApps.

## How It Works?

Based on [the CKB programming model](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#4-programming-model), DApps that run on CKB are functionally divided into two parts, **computation** and **verification**. <!--For more information about the CKB programming model, see [CKB whitepaper](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md).-->

Applications that run in the Node.js environment and that serve as the ***off-chain computation*** part can be developed on top of Lumos. The DApp built upon Lumos polls the block information from the CKB network, indexes cells locally, and provides the cells for queries and transactions corresponding to user requests.

For more information, see [Lumos Components](../introduction/lumoscomponents).

<img src={useBaseUrl("img/how.svg")}  width="70%"/>

Figure 1 Architecture of a CKB DApp Built with Lumos

## Stable Version

<img src="https://img.shields.io/badge/%40ckb--lumos-v0.16.0-brightgreen"/>

## Contact & Support

- Create a [GitHub issue](https://github.com/nervosnetwork/lumos/issues) for bug reports, feature requests, or questions.
- Star ⭐️ Lumos on [GitHub](https://github.com/nervosnetwork/lumos) to support the project!

## References

| Resource                          | Link                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| Nervos&nbsp;Document&nbsp;Website | https://docs.nervos.org/                                     |
| API&nbsp;Documentation            | https://nervosnetwork.github.io/lumos/globals.html           |
| Source&nbsp;Code                  | https://github.com/nervosnetwork/lumos                       |
| Tutorials                         | [Intro to Lumos](https://docs.nervos.org/docs/labs/lumos-nervosdao) |
| Video&nbsp;Lectures               | <ul><li>[Dapps with CKB Workshop - Lecture 3: Dapps with Lumos (Chinese + English Subtitles)](https://youtu.be/TJ2bnSFUpPQ)</li><li>[Dapps with CKB Workshop - Lecture 4: Dapp Architecture with Lumos (English)](https://youtu.be/9U23hrzCAiM)</li><li>[Dapps On CKB: Building A Liquidable DAO workshop](https://github.com/RetricSu/liquidable-dao-dapp/blob/master)</li></ul> |

