---
id: getstarted
title: Getting Started
---
## Workflow

The basic steps for developing a CKB DApp are as follows:

1. Prepare the prerequisite skills and development stacks listed in [Prerequisites](../quickstart/getstarted#prerequisites)
2. Install and configure Nervos CKB
3. Connect to Nervos network by running a CKB Node
4. Create a new DApp project
5. Setup the configuration manager
6. Start the Lumos indexer
7. Start coding

## Prerequisites

The following prerequisites apply for using Lumos to develop CKB DApps:

- Basic Skills
  - Nervos CKB<!-- are prerequisites for developing CKB DApps with Lumos. -->. For more details about the basic knowledge of Nervos CKB, see [Nervos CKB Basics](https://docs.nervos.org/docs/basics/introduction).
  - Knowledge of CKB Data Model. For more details about the CKB data model, see [Nervos CKB Reference](https://docs.nervos.org/docs/reference/introduction) and [CKB Data Structure](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md).
  - Lumos features and general use cases
- Development Stacks
  - JavaScript runtime environment: NodeJS version 12+
  - Web application framework: Express.js is recommended.
  - OS:  MacOS, Ubuntu Linux, or Windows 10 + WSL2 (Ubuntu)

## Run a Nervos CKB Node

Nervos CKB must be installed and configured before running the node.

If Nervos CKB is not installed, perform one of the following steps for connecting CKB mainet or testnet based on your development purpose:

- Run a CKB Mainnet Node

  For instructions about running a CKB mainnet node, see https://docs.nervos.org/docs/basics/guides/mainnet

- Run a CKB Testnet Node

  For instructions about running a CKB testnet node, see https://docs.nervos.org/docs/basics/guides/testnet

If Nervos CKB is already installed and configured, execute `ckb run` directly in this step.

## Create a New Project

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

## Setup the Configuration Manager

Setup the configuration manager using testnet pre-defined configurations: 

```
​```js
$ LUMOS_CONFIG_NAME=LINA node --experimental-repl-await
Welcome to Node.js v12.16.2.
Type ".help" for more information.
> const { initializeConfig, getConfig } = require("@ckb-lumos/config-manager");
> initializeConfig();
> getConfig();
{
  PREFIX: 'ckb',
  SCRIPTS: {
    SECP256K1_BLAKE160: {
      CODE_HASH: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      HASH_TYPE: 'type',
      TX_HASH: '0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c',
      INDEX: '0x0',
      DEP_TYPE: 'dep_group',
      SHORT_ID: 0
    },
    SECP256K1_BLAKE160_MULTISIG: {
      CODE_HASH: '0x5c5069eb0857efc65e1bca0c07df34c31663b3622fd3876c876320fc9634e2a8',
      HASH_TYPE: 'type',
      TX_HASH: '0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c',
      INDEX: '0x1',
      DEP_TYPE: 'dep_group',
      SHORT_ID: 1
    },
    DAO: {
      CODE_HASH: '0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e',
      HASH_TYPE: 'type',
      TX_HASH: '0xe2fb199810d49a4d8beec56718ba2593b665db9d52299a0f9e6e75416d73ff5c',
      INDEX: '0x2',
      DEP_TYPE: 'code'
    }
  }
}
​```
```

The configuration manager can also be setup through a local configuration file specified by the `LUMOS_CONFIG_FILE` variable. For more information, see Configuration Manager.

## Start the Lumos Indexer

Start the Lumos indexer by using a local RocksDB directory:

  ```
  > const { Indexer } = require("@ckb-lumos/indexer");
  > const indexer = new Indexer("http://127.0.0.1:8114", "./indexed-data");
  > indexer.startForever();
  ```

## Start Coding

Here is an starter example 