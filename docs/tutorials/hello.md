---
id: hello
title: Hello Lumos DApp Template
---
## Introduction

The `Hello Lumos DApp Template` is a Typescript + React template that is designed to serve as the starting point for developing a CKB DApp by using Lumos. 

The template provides the following functional examples:

- Query data from the blockchain.
- Interact with CKB wallets.
- Build, sign, send, and track transactions.

This tutorial provides TypeScript and JavaScript code snippets and describes what the code does.

A [Video Walkthrough](https://www.youtube.com/watch?v=9U23hrzCAiM) is also provided for an overview of the architecture and code walkthrough. 

## Architecture of the Hello Lumos DApp

<img src="../../img/CKB dapp arch.png" width="600"/>

The Hello Lumos Template contains the following components:

- **Server Application**

  The server application is the main part of the Hello Lumos template providing the following functionalities:

  - The server application wraps up the Lumos indexer and transaction generation functionalities. It uses the Lumos indexer to maintain a database of cells and then uses the database to respond to user queries and transaction generation requests.
  - The server application provides simple REST API for interacting with the client application. 
  - The server application also serves as a simple intermediary for common interactions with CKB nodes. 

- **Client Application**

  The client is the user-facing application displaying the content and responding to user actions.

- **External Components**

  - **CKB Node**
  
  - **Wallet** ([Keypering](https://nervosnetwork.github.io/keypering/#/) is used in the template)
  
    The wallet is used to sign transaction requests for the user.  For the security of user private keys and to facilitate DApps to interact with all wallets in the ecosystem, the wallet is logically separated from the client application. 

## Environment

- OS: Ubuntu 20.04.2
- NodeJS  (v14.15.5)
- Yarn (1.22.5)
- GCC and make

## **Steps**

### Set Up the Testnet node.

```
$ export TOP=$(pwd)
$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.40.0/ckb_v0.40.0_x86_64-unknown-linux-gnu.tar.gz
$ tar xzf ckb_v0.40.0_x86_64-unknown-linux-gnu.tar.gz
$ export PATH=$PATH:$TOP/ckb_v0.40.0_x86_64-unknown-linux-gnu
$ ckb init --chain testnet
$ ckb run
```

For more information, see [Run a CKB Testnet Node](https://docs.nervos.org/docs/basics/guides/testnet).

### Set Up the Keypering Wallet

**Step 1. Install the Keypering wallet.**

The Keypering wallet can be built from source for installation. 

Another way to install Keypering is to download [the latest release](https://github.com/nervosnetwork/keypering/releases) directly corresponding to the platform for installation. For example, [Keypering-v0.1.0-alpha.5-x86_64.AppImage](https://github.com/nervosnetwork/keypering/releases/download/v0.1.0-alpha.5/Keypering-v0.1.0-alpha.5-x86_64.AppImage) for Linux.

To install the Keypering wallet that is built from source:

```
$ sudo apt-get update
$ sudo apt-get install python2.7
$ git clone https://github.com/nervosnetwork/keypering.git
$ cd keypering
$ npm config set python /usr/bin/python2.7
$ npm run bootstrap
$ npm run build:specs
$ cp ./packages/app/.env.example ./packages/app/.env
$ npm start
```

The `npm start` command is used to start the Keyperting wallet instance. For more information about the installation of Keypering, see [Keypering](https://github.com/nervosnetwork/keypering).

**Step 2. Configure the network for the Keypering wallet.**

<img src="../../img/keypering network.png"/>

**Step 3. [Create a wallet in Keypering](https://nervosnetwork.github.io/keypering/#/manual?id=create-a-wallet).**

**Step 4. Claim CKB for the wallet address on Faucet.**

To claim CKB for a Testnet address, go to https://faucet.nervos.org and paste the address in the address inputbox, then click the Claim button.

50000 CKB can be claimed for each Testnet address from the [faucet](https://faucet.nervos.org/) per 24 hours. When the request is processed, the CKB balance will appear in the Keypering wallet.

<img src="../../img/keypering balance.png"/>

### Set Up the Hello Lumos Project

**Step 1. Download the hello lumos template.**

```
$ git clone https://github.com/tspoff/hello-lumos.git
```

**Step 2. Install all dependencies for the project.**

```
$ cd hello-lumos
$ yarn install
```

**Step 3. Run the server and client applications of the Hello Lumos project.**

```
$ yarn start
```