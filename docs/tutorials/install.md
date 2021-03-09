---
id: installckb
title: Install a CKB Node
---
<!--The Nervos CKB (Common Knowledge Base) is the bottom-most layer in the Nervos ecosystem. It serves as a foundation to build on and provides trust to all layers built on top.-->

## Introduction

To develop DApps for Nervos CKB, the first step is to install and run a CKB node. 

The node syncs block and transaction information with a CKB network and indexes the data in a local database. The node also collects new transactions from the DApp, package the transactions into blocks and produce new blocks. 

## Networks

The node can be set up to connect and interact with one of the following CKB networks:

- Lina Mainnet: The Lina Mainnet is the main CKB public network. The real-time information of the Lina Mainnet can be checked on the [CKB Explorer](https://explorer.nervos.org/) page.

- Aggron Testnet: The Aggron Testnet is used to test applications integration and smart contracts in real environment with actual data. 

  For the first time to start running a node on the Testnet chain, syncing data requires approximately one hour for the current number of blocks (**1,300,000+**). The real-time block number on the Testnet chain can be checked on the [CKB Explorer](https://explorer.nervos.org/aggron) page.

- DEV Chain:  The DEV chain is a local blockchain that provides an efficient and useful development mode for building and testing applications. This is the recommended network for starters and DApp developers.

## Environment

- All major platforms including Linux, Windows, and Mac.

## Installation Methods

There are two methods for installing a CKB node:

- Install a CKB Node automatically by using Tippy.

  **Tippy** is a tool that can automatically set up and manage CKB nodes. It can install and start running a CKB node by one simple click.

- Install a CKB Node Manually.

  This guide shows the example of installing a CKB Node on DEV chain manually.

  For information about the manual installation on the Testnet, see [Run a CKB Testnet Node](https://docs.nervos.org/docs/basics/guides/testnet).

  For information about the manual installation on the Mainnet, see [Run a CKB Mainnet Node](https://docs.nervos.org/docs/basics/guides/mainnet).

### Install a CKB Node Automatically by Using Tippy

#### Step 1. Install Tippy

Tippy can be installed from pre-built binaries or [source](https://github.com/nervosnetwork/tippy). 

This example shows how to install Tippy from pre-built binaries. For more information about the installation from source, see the [Readme](https://github.com/nervosnetwork/tippy) of Tippy.

To install Tippy from pre-built binaries, download the pre-built binaries and untar the files:

```shell
$ curl -LO https://github.com/nervosnetwork/tippy/releases/download/v0.1.4/tippy-linux-x64.tar.gz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   630  100   630    0     0     81      0  0:00:07  0:00:07 --:--:--   179
100 70.7M  100 70.7M    0     0  4328k      0  0:00:16  0:00:16 --:--:-- 10.2M
$ tar xzf tippy-linux-x64.tar.gz
```

#### Step 2. Run the Tippy tool

If a desktop GUI is installed, the Tippy tool can be run by double clicking the Tippy file under the tippy-linux-x64 folder.

A web page on http://localhost:5000/Home will be opened in a browser after the double click.

#### Step 3. Install and Run a CKB node on DEV chain.

To install and run a CKB node on DEV chain, click the **Launch a CKB devnet instantly** button on the home page.

<img src="../../img/tippycreate.png"/>

To install and run a CKB node on the other networks, click **Create a customized chain** to choose the network in the `Chain Type` dropdown list of the **Create Chain** form.

The node starts running after the click. It can be stopped or restarted on the Dashboard. Details of blocks and transactions of the chain can be checked on the Blocks and Transaction pages.

### Install a CKB Node on DEV Chain Manually

To install and configure a CKB DEV Blockchain on Linux:

#### Step 1. Download the latest CKB binary file from the CKB releases page on [GitHub](https://github.com/nervosnetwork/ckb/releases).

```shell
$ export TOP=$(pwd)
$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ tar xzf ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
```

#### Step 2. Verify the binaries are working and check versions.

```shell
$ ckb -V
ckb 0.39.0
```

#### Step 3. Initialize the development blockchain.

```shell
$ ckb init -C devnet -c dev
WARN: mining feature is disabled because of lacking the block assembler config options
Initialized CKB directory in devnet
create specs/dev.toml
create ckb.toml
create ckb-miner.toml
create default.db-options
```

#### Step 4. (Optional) Adjust the parameters to shorten the block interval. 

- Modify `genesis_epoch_length` and `permanent_difficulty_in_dummy`  in the c:\ckb\specs\\`dev.toml` chain config file.

  The default value for the `genesis_epoch_length` parameter is `1000`. That means each epoch contains 1000 blocks by default. The value 10 or 100 can be used for testing Nervos DAO operations.

  When `permanent_difficulty_in_dummy` is set to `true`, all epochs skip the difficulty adjustment<!--and use the same length as the `genesis_epoch_length`-->. This parameter is typically used in combination with `genesis_epoch_length`.

  To modify `genesis_epoch_length` and `permanent_difficulty_in_dummy`:

  ```shell
  $ ed devnet/specs/dev.toml <<EOF
  91d
  90a
  genesis_epoch_length = 10  # The unit of meansurement is "block".
  permanent_difficulty_in_dummy = true
  .
  wq
  EOF
  ```

- Modify the `value` parameter under the `miner.workers` section  in the `ckb-miner.toml` file.

  The default mining interval is 5000 milliseconds (5 seconds). That means a new block is generated at intervals of every 5 seconds.

  To modify the value to generate a new block every second (1000 milliseconds):

  ```shell
  $ ed devnet/ckb-miner.toml <<EOF
  39s/5000/1000/
  wq
  EOF
  ```

#### Step 5. Start the CKB node with the dev chain.

```shell
$ ckb run -C devnet
```
