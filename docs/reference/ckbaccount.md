---
id: ckbaccount
title: CKB Accounts and Capacity
---
import useBaseUrl from "@docusaurus/useBaseUrl";

This guide introduces the concepts of CKB account, CKB capacity of an account, and how to create CKB accounts before the DApp development.

The accounts can be created by using ckb-cli. DEV chain also provides two accounts from the genesis cells that were issued with a considerable amount of capacity. 

You can create new accounts when developing your DApps by using the method demonstrated in this guide. 

## CKB Account

In CKB, an account is represented as a collection of [live cells](https://docs.nervos.org/docs/reference/cell#live-cell) (unspent cells) that contain the same lock script.

> A live cell refers to an unspent cell in CKB. The concept is similar to that of [UTXO](https://en.wikipedia.org/wiki/Unspent_transaction_output) in Bitcoin's terminology. The full set of live cells in CKB is considered being the full state of CKB at that particular point in time. Any transaction on CKB consumes some live cells. After the transaction is submitted, the live cells become spent cells. Concurrently, some new live cells are created.

The following example is a cell retrieved by Lumos query functions:

:::note

Lumos enriches the cell structure defined in [CKB RFC: Cell](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#42-cell) with some customized fields (`out_point`, `block_hash` and `block_number`). 

:::

```typescript
{
  cell_output: {
    capacity: '0x2ecbd7d7dc',
    lock: {
      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      hash_type: 'type',
      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'
    },
    type: undefined
  },
  out_point: {
    tx_hash: '0x0db73acbbbb04bb1b52153d30ef7486b191b5e376dcc6bc1439b3a6ed2a451d8',
    index: '0x0'
  },
  block_hash: '0x353b8153561400ed623ef295edb7488025ff517a119770cf0c9dca886f193c5a',
  block_number: '0x16',
  data: '0x'
}
```

<!--These live cells are locked by a [lock script](https://docs.nervos.org/docs/reference/script#lock-script) of the account.-->

## CKB Capacity of an Account

> The `capacity` of a cell serves two purposes: 
>
> - It represents the amount of CKB tokens stored in the cell. 
> - It sets a limit on how much information can be stored in a cell. 
>
> The basic unit for CKB capacity is **shannon**. A larger unit, **CKByte** or just **CKB** is also in use. 1 CKB equals to 10<sup>8</sup> shannons. 1 CKB also means a cell can store 1 byte of information. For more information about how to calculate the cell information size, see [Nervos Docs: Cell Information Size Calculation](http://docs.nervos.org/docs/reference/cell#cell-information-size-calculation).

The CKB capacity of an account is the total `capacity` of the live cells owned by the account.

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

:::note

If an account seeks to perform transactional actions, such as transferring CKB to other accounts, the account must have sufficient CKB capacity that equals or exceeds the minimum CKB requirement for the transaction.

For example, the minimum CKB capacity requirement for a regular transaction is 61 [CKB](https://docs.nervos.org/docs/basics/glossary#shannon "One CKByte is equal to 100,000,000 Shannons.") (6,100,000,000 shannons), and the minimum CKB capacity requirement for a DAO deposit transaction is 102 CKB (10,200,000,000 shannons).

Accounts on Testnet can request CKB capacity on [https://faucet.nervos.org](https://faucet.nervos.org/). Accounts on DEV chain can obtain CKB capacity by mining blocks as miners. For more information about getting CKB capacity, see **[step 5](../preparation/createaccount#step-5-get-ckb-capacity-for-the-account-of-alice)** of [Create the accounts by Using ckb-cli](../reference/ckbaccount#create-the-accounts-by-using-ckb-cli).

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

- **Lock Script**: A lock script consists of three key parameters, including *code_hash*, *hash_type* and *args*. The unique identifier of an account, is the lock script used in the cells for this account. For more information, see [CKB RFC: Data Structures](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md#Script).<br/>Example:<br/>

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
  ckb1qyqfzx8hvqxnj4cf6zxugktfvlvvj2vc9udqntmwxh
  ```
  
  The address with the "**ckb**" prefix is for CKB Mainnet. The address with the "**ckt**" prefix is for both Testnet and DEV chain.

The following figure shows the relationship between private key, public key, lock script, and CKB address.

<img src={useBaseUrl("img/ownership.png")}/>

<!--Create an account by using ckb-cli.--> <!--Get the private key of an account.--><!--Get CKB capacity for an account.--><!--Check the capacity of an account.-->

## Prerequisites 

The following prerequisites apply for creating the accounts:

- The CKB node is installed and running. 

## Create the Accounts by Using ckb-cli

> **ckb-cli** is included in the CKB pre-built installer package. It is a command line tool that provides the functions of RPC requests, creating CKB addresses, managing wallets, sending transactions, and depositing to Nervos DAO etc. These functions can help with debugging and testing during the development process. For more information, see [ckb-cli Sub Commands](https://github.com/nervosnetwork/ckb-cli/wiki/Sub-Commands).

### Step 1. Download the CKB pre-built installer package.

This guide uses the CKB 0.39.0 version. All releases can be found on the <a title="Download" href="https://github.com/nervosnetwork/ckb/releases"><i class="feather icon-download"></i>CKB releases</a> page. If the package is already downloaded, go to step 2 directly.

For more information, see [Download the CKB Pre-built Installer Package](../reference/ckbnode#step-1-download-the-ckb-pre-built-installer-package).

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

The extended private key (a private key and a chain code) is exported to the <var>alice</var> file under the current working directory. The first line in the file is the private key of the account. The second line is the chain code.

```shell {1}
ckb-cli account export --extended-privkey-path alice --lock-arg 0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e
Password: 
message: "Success exported account as extended privkey to: \"alice\", please use this file carefully"
```

### Step 5. Get CKB Capacity for the account of Alice.

The process of getting CKB capacity varies for the accounts on different networks (chains). 

- To get CKB capacity for an account on **DEV chain**, specify the account as the miner who receives mining rewards.

  :::note

  The CKB is mature 4 [epochs](https://docs.nervos.org/docs/basics/glossary#epoch "An epoch is a period of time for a set of blocks. ") after it is mined. In Nervos, an epoch is approximately four hours. For DEV chain, the epoch length is defined by the `genesis_epoch_length` parameter in the **dev.toml** file. For more information about shortening the epoch length for DEV chain, see Step 4 of [Install a CKB node on DEV chain by using Tippy](../preparation/setupsystem#install-a-ckb-node-on-dev-chain-by-using-tippy).

  :::  

  - If the CKB node is installed by Tippy: Assign the lock args of the account to <b>Block Assembler Lock Arg</b> in the Edit Chain form and save the changes.

    <img src={useBaseUrl("img/editchain.png")} width="50%"/>

     After the miner is specified, restart the CKB node and start the CKB miner on the Tippy dashboard.

  - If the CKB node is installed by the pre-built installer package: Assign the lock args of the account to `args` in the `block_assembler` section in ckb.toml.

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

### Step 6. Check the Balance for the Account of Alice.

To check the balance of an account on DEV chain or Testnet, execute the `ckb-cli wallet get-capacity --address <the Testnet address of the account>` command.

```shell {1}
ckb-cli wallet get-capacity --address "ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf"
immature: 8039446.8758295 (CKB)
total: 10451302.54823011 (CKB)
```

To check the balance of an account on Mainnet, execute the `ckb-cli wallet get-capacity --address <the Mainnet address of the account>` command.

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

### Step 8. Get the private key for the account of Bob.

The extended private key (a private key and a chain code) is exported to the <var>bob</var> file under the current working directory. The first line in the file is the private key of the account. The second line is the chain code.

```shell {1}
ckb-cli account export --extended-privkey-path bob --lock-arg 0xecbe30bcf5c6b2f2d8ec2dd229a4603a7e206b99
Password: 
message: "Success exported account as extended privkey to: \"bob\", please use this file carefully"
```

## Get Two Accounts Provided by Genesis Issued Cells

There is another option to get two accounts. DEV chain provides the two accounts from genesis issued cells. Each account has a considerable amount of capacity that can be used  for development and testing without extra configuration or mining settings. 

### Step 1. Get the private key, lock args from the specs/dev.toml file.

The **dev.toml** file is generated when the CKB node is initialized on DEV chain. 

```toml {1,5,8,12}
# issue for random generated private key: d00c06bfd800d27397002dca6fb0993d5ba6399b4238b2f29ee9deb97593d2bc
[[genesis.issued_cells]]
capacity = 20_000_000_000_00000000
lock.code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"
lock.args = "0xc8328aabcd9b9e8e64fbc566c4385c3bdeb219d7"
lock.hash_type = "type"

# issue for random generated private key: 63d86723e08f0f813a36ce6aa123bb2289d90680ae1e99d4de8cdb334553f24d
[[genesis.issued_cells]]
capacity = 5_198_735_037_00000000
lock.code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"
lock.args = "0x470dcdc5e44064909650113a274b3b36aecb6dc7"
lock.hash_type = "type"
```

### Step 2. Generate the addresses for the two accounts.

The addresses of the two accounts can be generated by importing the private keys by using the ckb-cli tool.

1. Save `d00c06bfd800d27397002dca6fb0993d5ba6399b4238b2f29ee9deb97593d2bc` to the <var>genesis1</var> file.

2. Save `63d86723e08f0f813a36ce6aa123bb2289d90680ae1e99d4de8cdb334553f24d` to the <var>genesis2</var> file.

3. Generate the addresses for the two accounts.

   ```shell {1,7}
   ckb-cli account import --privkey-path "genesis1"
   Password: 
   address:
     mainnet: ckb1qyqvsv5240xeh85wvnau2eky8pwrhh4jr8ts6f6daz
     testnet: ckt1qyqvsv5240xeh85wvnau2eky8pwrhh4jr8ts8vyj37
   lock_arg: 0xc8328aabcd9b9e8e64fbc566c4385c3bdeb219d7
   ckb-cli account import --privkey-path "genesis2"
   Password: 
   address:
     mainnet: ckb1qyqywrwdchjyqeysjegpzw38fvandtktdhrsj8renf
     testnet: ckt1qyqywrwdchjyqeysjegpzw38fvandtktdhrs0zaxl4
   lock_arg: 0x470dcdc5e44064909650113a274b3b36aecb6dc7
   ```