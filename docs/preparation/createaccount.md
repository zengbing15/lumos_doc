---
id: createaccount
title: Create Accounts
---
import useBaseUrl from "@docusaurus/useBaseUrl";

In this guide, we will prepare two CKB accounts, Alice and Bob, that will be used in the <var>accounts.ts</var> file in the later [Hello Lumos](../preparation/hellolumos) example. For more information about the concepts of CKB accounts, CKB capacity, and the methods to create accounts, see [CKB Accounts and Capacity](../reference/ckbaccount).

## Prerequisites 

The following prerequisites apply for creating the accounts:

- The CKB node is installed and running on DEV chain. For more information, see [Install a CKB node on DEV Chain by Using Tippy](../preparation/setupsystem#install-a-ckb-node-on-dev-chain-by-using-tippy). 

## Create the Accounts by Using ckb-cli

### Step 1. Download the CKB pre-built installer package.

The CKB pre-built installer package includes the ckb-cli tool. For more information, see [Download the CKB Pre-built Installer Package](../reference/ckbnode#step-1-download-the-ckb-pre-built-installer-package).

This guide uses the CKB 0.39.0 version. All releases can be found on the <a title="Download" href="https://github.com/nervosnetwork/ckb/releases"><i class="feather icon-download"></i>CKB releases</a> page. If the package is already downloaded, go to step 2 directly.

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

For more information about CKB capacity, see [CKB Capacity of an Account](../reference/ckbaccount#ckb-capacity-of-an-account).

To get CKB capacity for Alice on **DEV chain**, specify Alice as the miner who receives mining rewards.

Assign the lock args of Alice to <b>Block Assembler Lock Arg</b> in the Edit Chain form and save the changes.

<img src={useBaseUrl("img/editchain.png")} width="50%"/>

 After the miner is specified, restart the CKB node and start the CKB miner on the Tippy dashboard.

:::note

CKB is mature 4 [epochs](https://docs.nervos.org/docs/basics/glossary#epoch "An epoch is a period of time for a set of blocks. ") after being mined. In Nervos, an epoch is approximately four hours. For DEV chain, the epoch length is defined by the `genesis_epoch_length` parameter in the **dev.toml** file. For more information about shortening the epoch length for DEV chain, see Step 4 of [Install a CKB node on DEV chain by using Tippy](../preparation/setupsystem#install-a-ckb-node-on-dev-chain-by-using-tippy).

:::  

### Step 6. Check the Balance for the Account of Alice.

To check the balance of Alice, execute the `ckb-cli wallet get-capacity --address <the Testnet address of the account>` command.

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

### Step 8. Get the private key for the account of Bob.

The extended private key (a private key and a chain code) is exported to the <var>bob</var> file under the current working directory. The first line in the file is the private key of the account. The second line is the chain code.

```shell {1}
ckb-cli account export --extended-privkey-path bob --lock-arg 0xecbe30bcf5c6b2f2d8ec2dd229a4603a7e206b99
Password: 
message: "Success exported account as extended privkey to: \"bob\", please use this file carefully"
```