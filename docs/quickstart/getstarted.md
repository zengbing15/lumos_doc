---
id: getstarted
title: Developing CKB DApps with Lumos
---
## Workflow

The basic steps for developing a CKB DApp are as follows:

1. Prepare the prerequisite skills and development stacks listed in [Prerequisites](../quickstart/getstarted#prerequisites)
2. Install and configure Nervos CKB
3. Run the CKB node
4. Create a new DApp project
5. Common CKB tasks
   - Initialize connections to a CKB node
   - Set up an Express server
   - Get the balance of an account
   - Transfer CKB

## Prerequisites

The following prerequisites apply for using Lumos to develop CKB DApps:

- Basic Skills
  - Nervos CKB<!-- are prerequisites for developing CKB DApps with Lumos. -->. For more details about the basic knowledge of Nervos CKB, see [Nervos CKB Basics](https://docs.nervos.org/docs/basics/introduction).
  - Knowledge of CKB Data Model. For more details about the CKB data model, see [Nervos CKB Reference](https://docs.nervos.org/docs/reference/introduction) and [CKB Data Structure](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md).
  - Lumos features
- Development Stacks
  - JavaScript runtime environment: NodeJS version 12+
  - Web application framework: Express.js is recommended.
  - OS:  MacOS, Ubuntu Linux, or Windows 10 + WSL2 (Ubuntu)

## Steps

### Install and Configure Nervos CKB

If Nervos CKB is already installed, go to the next step.

To install and configure Nervos CKB, perform one of the following steps for connecting CKB mainet or testnet based on your development purpose:

- Run a CKB Mainnet Node

  For instructions about running a CKB mainnet node, see https://docs.nervos.org/docs/basics/guides/mainnet

- Run a CKB Testnet Node

  For instructions about running a CKB testnet node, see https://docs.nervos.org/docs/basics/guides/testnet

### Run the Nervos CKB Node

```
$ ckb run
```

### Create a New Project

Step 1. Create a new directory for the new project `ckbdapp`:


```
$ mkdir ckbdapp
$ cd ckbdapp
```

Step 2. Add Lumos packages as dependencies for the project:

```
$ yarn add @ckb-lumos/indexer@0.14.1 @ckb-lumos/common-scripts@0.14.1
```

Step 3. Install all dependencies:

```
$ yarn install
```

Step 4. Enable async/await for the node shell:

```
$ node --experimental-repl-await
Welcome to Node.js v12.16.2.
Type ".help" for more information.
>
```

### Common CKB Tasks

For more information, see the [Common CKB Tasks](../tutorials/common#configure-environment) section. 