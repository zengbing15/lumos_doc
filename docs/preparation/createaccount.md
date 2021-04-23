---
id: createaccount
title: Create Accounts
---
This guide introduces the concepts of CKB account, CKB capacity of an account, and how to create CKB accounts by using ckb-cli before the DApp development. We will prepare two CKB accounts, Alice and Bob for later usage in the [Hello Lumos](../preparation/hellolumos) example.

In CKB, an account is represented as a collection of [live cells](https://docs.nervos.org/docs/reference/cell#live-cell) (unspent cells) that contain the same lock script.

A cell example:

```typescript
{
  cell_output: {
    capacity: '0x124788a824a4',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0x86a613998a501777f2c3d808f235a8767d28d56868678dd17b53797f280b8b61',
    index: '0x0'
  },
  block_hash: '0xd75069d050a530f8e670235bbcf6054e14326f81b37e5220bb3fc3513ef7e97c',
  block_number: '0x45',
  data: '0x'
}
```

For more information about cells, see [CKB RFC: Cell](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#42-cell).<!--These live cells are locked by a [lock script](https://docs.nervos.org/docs/reference/script#lock-script) of the account.-->

## CKB Capacity of an Account

> The `capacity` of a cell serves two purposes: 
>
> - It represents the amount of CKB tokens stored in the cell. 
> - It sets the limit on how much information the cell can store. 
>
> The basic unit for CKB capacity is **shannon**. A bigger unit, **CKByte** or just **CKB** is also used. 1 CKB equals to 10<sup>8</sup> shannons. 1 CKB also means the cell can store 1 byte of information. For more information about how to calculate the cell information size, see [Cell Information Size Calculation](http://docs.nervos.org/docs/reference/cell#cell-information-size-calculation).

The CKB capacity of an account is the total `capacity` of the live cells owned by the account.

:::note

If an account wants to perform transaction actions like transferring CKB to other accounts, the account must have enough CKB capacity that is equal to or more than the minimal CKB requirement of a transaction.

For example, the minimum CKB capacity requirement is 61 [CKB](https://docs.nervos.org/docs/basics/glossary#shannon "One CKByte is equal to 100,000,000 Shannons.") (6,100,000,000 shannons) for one common transaction, and 102 CKB (10,200,000,000 shannons) for a DAO deposit transaction.

:::

Let us look at the following example. There are three live (unspent) cells in Charlie's account. The three cells contain the same lock script with the lock args "0x9118f7600d395709d08dc4596967d8c929982f1a". Each cell contains **200** (0x4a817c800 in hex) CKB. So the total amount of CKB capacity that Charlie owns is **200 * 3 = 600** CKB.

- Cell 1

  ```typescript
  {
    cell_output: {
      capacity: '0x4a817c800',
      lock: {
        code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
        hash_type: 'type',
        args: '0x9118f7600d395709d08dc4596967d8c929982f1a'
      },
      type: undefined
    },
    out_point: {
      tx_hash: '0x513cd686d4e79a78d92598b525816d2d3253f1840b41e277473b3004208df2e6',
      index: '0x0'
    },
    block_hash: '0x9ba2564a84886c7bb03385aa17a1f063af9c687bbd6d0955fbe567fff8075020',
    block_number: '0x30',
    data: '0x'
  }
  ```

- Cell 2

  ```typescript
  {
    cell_output: {
      capacity: '0x4a817c800',
      lock: {
        code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
        hash_type: 'type',
        args: '0x9118f7600d395709d08dc4596967d8c929982f1a'
      },
      type: undefined
    },
    out_point: {
      tx_hash: '0x301d8439c42b6448c9b23fddf69bb4671c8479a807afe8e2bbd8fc041130e2d5',
      index: '0x0'
    },
    block_hash: '0xa621dd650b3da3045759072119b0b5b7ab2e15e87fdd96ca81e035c4f6848e3c',
    block_number: '0x3c',
    data: '0x'
  }
  ```

- Cell 3

  ```typescript
  {
    cell_output: {
      capacity: '0x4a817c800',
      lock: {
        code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
        hash_type: 'type',
        args: '0x9118f7600d395709d08dc4596967d8c929982f1a'
      },
      type: undefined
    },
    out_point: {
      tx_hash: '0xb90d91dffca55cae4bdf9c7b4c91ce5fe8f9e50bcd7510d28280eb2d4cfc0ee9',
      index: '0x0'
    },
    block_hash: '0xa821a4637c220878baeaeb6b9e1412e9e4179d69c5a456ca9271fdb7f601c16e',
    block_number: '0x43',
    data: '0x'
  }
  ```

:::info

The accounts on the Testnet can claim CKB capacity on [https://faucet.nervos.org](https://faucet.nervos.org/). The accounts on DEV chain can get CKB capacity by mining blocks as a miner. For more information about getting CKB capacity, see **step 4** of [Create the accounts by Using ckb-cli](../preparation/createaccount#create-the-accounts-by-using-ckb-cli).

:::

## Ownership of CKB Capacity

The ownership of CKB capacity for a CKB account is established through private key, public key, lock script, and CKB address.

- **Private Key**: A private key is a string of letters and numbers that is normally stored in a wallet. The private key is used to generate signatures on messages to prove the ownership of the CKB capacity. It allows the user to send his/her CKB capacity to other addresses.<br/><!--A private key must be kept secret at all times. Anyone with the key has the ability to access the cryptocurrency or digital assets.<br/>-->Example:<br/>

  ```
  0x5503cc1d40b9e05a46fe8e1d4702786c624a1b5e774f964db6746ea754b4843a
  ```

- **Public Key**: A public key is derived from a private key. The public key is used to validate the signature generated by the private key without revealing the private key. <br/>Example:<br/>

  ```
  0x03ff69140121e0f1b1533e451ead79849acae8cd4e1ad77feac2ec5186598a98a9
  ```

- **Lock Script**: A lock script consists of three key parameters, including *code_hash*, *hash_type* and *args*. The ID of the account is the lock script args. For more information, see [CKB RFC: Data Structures](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md#Script).<br/>Example:<br/>

  ```typescript
  {
  	code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8', 
  	hash_type:'type',
  	args: '0x9118f7600d395709d08dc4596967d8c929982f1a'
  }
  ```

- **CKB Address**: A CKB address packages a lock script into a single line in a verifiable and human-readable format. For more information, see [CKB RFC: CKB Address Format](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0021-ckb-address-format/0021-ckb-address-format.md).<br/>Example:<br/>

  ```
  ckt1qyqfzx8hvqxnj4cf6zxugktfvlvvj2vc9udqww932t
  ```

The following figure shows the relationship between private key, public key, Lock Script, and CKB address.

<img src="../../img/ownership.png"/>

<!--Create an account by using ckb-cli.--> <!--Get the private key of an account.--><!--Get CKB capacity for an account.--><!--Check the capacity of an account.-->

## Prerequisites 

The following prerequisites apply for creating the accounts:

- The CKB node is installed and running. 

## Create the accounts by using ckb-cli.

> **ckb-cli** is included in the CKB pre-built installer package. It is a command line tool that provides the functions of rpc requests, creating CKB addresses, managing wallets, sending transactions, and depositing to Nervos DAO etc. These functions can help with debugging and testing during the development process. For more information, see [ckb-cli Sub Commands](https://github.com/nervosnetwork/ckb-cli/wiki/Sub-Commands).

### Step 1. Download the CKB pre-built installer package.

The example in this guide downloads the CKB version 0.39.0. All releases can be found on the <a title="Download" href="https://github.com/nervosnetwork/ckb/releases"><i class="feather icon-download"></i>CKB releases</a> page. If the package is already downloaded, go to step 2 directly.

For more information, see [Download the CKB Pre-built Installer Package](../preparation/installckb#step-1-download-the-ckb-pre-built-installer-package).

### Step 2. Verify the ckb-cli tool is working and check the version.

<p>Navigate into the folder where the ckb-cli tool locates, then verify the tool is working.</p>

```shell {1}
ckb-cli -V
ckb-cli 0.39.0
```

### Step 3. Create the account for Alice.

```shell {1}
ckb-cli account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Password: 
Repeat password: 
address:
  mainnet: ckb1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qxe85u4
  testnet: ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
lock_arg: 0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e
lock_hash: 0xf6ea009a4829de7aeecd75f3ae6bcdbaacf7328074ae52a48456a8793a4b1cca
```

### Step 4. Get the private key for the account of Alice.

The extended private key is exported to the `$(pwd)/alice` file. The first line in the file is the private key of the account. The second line is the chain code.

```shell {1}
ckb-cli account export --extended-privkey-path alice --lock-arg 0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e
Password: 
message: "Success exported account as extended privkey to: \"alice\", please use this file carefully"
```

### Step 5. Get CKB Capacity for the account of Alice.

The process of getting CKB capacity varies for the accounts on different networks (chains). 

- To get CKB capacity for an account on **DEV chain**, specify the account as the miner for receiving mining rewards.

  - If the CKB node is installed by Tippy: Specify <b>Block Assembler Lock Arg</b> in the Edit Chain form with the lock args of the account. After the miner is specified, restart the CKB node and start the CKB miner on the Tippy dashboard.

  - If the CKB node is installed by the pre-built installer package: Specify the `args` in the `block_assembler` section in ckb.toml with the lock args of the account.

    ```toml title="devnet/ckb.toml" {2-5}
      [block_assembler]
      code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"
      args = "0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e"
      hash_type = "type"
      message = "0x"
    ```

    After the miner is specified, restart the CKB node and start the CKB miner.

    To restart the CKB node, stop the CKB node by using the `ctrl + C` command in the terminal that runs the node and then start the node by executing `ckb run -C devnet`.

    To start the miner, open a new terminal, and navigate into the folder where the ckb-cli tool locates to run the command `ckb miner -C devnet`.

- To get CKB capacity for an account on **Testnet**, go to https://faucet.nervos.org and paste the Testnet address of the account in the address inputbox, then click the **Claim** button.

  50,000 CKB can be claimed for each Testnet address from the [faucet](https://faucet.nervos.org/) per 24 hours. 

### Step 6. Check the Capacity of the Account of Alice.

To check the capacity of the account, execute the `ckb-cli wallet get-capacity --address <the Testnet address of the account>` command as follows:

```shell {1}
ckb-cli wallet get-capacity --address "ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf"
immature: 8039446.8758295 (CKB)
total: 10451302.54823011 (CKB)
```

### Step 7. Create an account for Bob.

```shell {1}
ckb-cli account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Password: 
Repeat password: 
address:
  mainnet: ckb1qyqwe03shn6udvhjmrkzm53f53sr5l3qdwvsewv2mv
  testnet: ckt1qyqwe03shn6udvhjmrkzm53f53sr5l3qdwvsytj4hs
lock_arg: 0xecbe30bcf5c6b2f2d8ec2dd229a4603a7e206b99
lock_hash: 0x34f085b5d2fa3f4ad2880713082a72864522a6ebffa1eb931b09e0407092eda5
```

To get the private key for the account of Bob:

```shell {1}
ckb-cli account export --extended-privkey-path bob --lock-arg 0xecbe30bcf5c6b2f2d8ec2dd229a4603a7e206b99
Password: 
message: "Success exported account as extended privkey to: \"bob\", please use this file carefully"
```
