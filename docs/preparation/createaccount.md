---
id: createaccount
title: Create Accounts
---
A CKB account is represented as a collection of live cells locked by a lock script. The ID of the account is the lock script args.

The following table lists the elements of an account that are useful for the DApp development.


| Element     | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| Lock&nbsp;script<br/> | The lock script consists of three key parameters, including *code_hash*, *hash_type* and *args*.<br/>Example:<br/><samp>{<br/>&nbsp;code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',<br/> &nbsp;hash_type:&nbsp;'type',<br/>&nbsp;args: '0x82be41cf167110e6c00e79009a3fd4d9abe8c65a'<br/>}</samp> |
| Address      | CKB address packages lock script into a single line, verifiable, and human read friendly format.<br/>Example:<br/><samp>ckt1qyqg90jpeut8zy8xcq88jqy68l2dn2lgcedqd7ye7n</samp> |
| Private&nbsp;key | A string of letters and numbers that is used to prove ownership of cryptocurrency or digital assets, allowing them to be sent to other payment addresses. A private key is normally stored in a wallet.<br/>A private key must be kept secret at all times. A private key works similarly to a key to a safe containing your cryptocurrency. Anyone with the key has the ability to open the safe and take the contents. |
| CKB&nbsp;capacity | The total CKB capacity of the live cells of an account.<br/>**Note**: If an account wants to perform transaction actions like transferring CKB to other accounts, generating tokens, the account must have enough CKB capacity that is equal or more than the minimal CKB requirement of a transaction.<br/>For example, the minimum CKB capacity requirement is 61 CKB (6100000000n) for one common transaction, and 102 CKB (10200000000n) for a DAO deposit transaction. |

This guide will prepare two CKB accounts, Alice and Bob for later usage in the [Hello Lumos](../preparation/hellolumos) example.<!--Create an account by using ckb-cli.--> <!--Get the private key of an account.--><!--Get CKB capacity for an account.--><!--Check the capacity of an account.-->

## Prerequisites 

The following prerequisites apply for creating accounts to be used in the [Hello Lumos](../preparation/hellolumos) example:

- The CKB node is installed and running. 

## Create the accounts by using ckb-cli.

ckb-cli is included in the CKB pre-built installer package. It is a command line tool that provides the functions of rpc requests, creating CKB addresses, managing wallets, sending transactions, and depositing to Nervos DAO etc. These functions can help with debugging and testing during the development process. For more information, see [ckb-cli Sub Commands](https://github.com/nervosnetwork/ckb-cli/wiki/Sub-Commands).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="ubuntu"
  values={[
    {label: 'Ubuntu 20.04', value: 'ubuntu'},
    {label: 'Windows 10', value: 'windows'},
 ]}>

<TabItem value="ubuntu"><p><b>Step 1. Download the CKB Pre-built Installer Package.</b></p><p>If the package is already downloaded, go to Step 2 directly.</p>

```shell
$ export TOP=$(pwd)
$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ tar xzf ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
```

<p>Verify the binaries are working and check versions.</p>

```shell
$ ckb-cli -V
ckb-cli 0.39.0
```

<b>Step 3. Create the account for Alice.</b>

```shell
$ ckb-cli account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Password: 
Repeat password: 
address:
  mainnet: ckb1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qxe85u4
  testnet: ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
lock_arg: 0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e
lock_hash: 0xf6ea009a4829de7aeecd75f3ae6bcdbaacf7328074ae52a48456a8793a4b1cca
```

<b>Step 4. Get the private key for the account of Alice.</b>

The extended private key is exported to the `$(pwd)/alice` file. The first line in the file is the private key of the account. The second line is the chain code.

```shell
$ ckb-cli account export --extended-privkey-path alice --lock-arg 0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e
Password: 
message: "Success exported account as extended privkey to: \"alice\", please use this file carefully"
```

<b>Step 5. Get CKB Capacity for the account of Alice.</b> (to be updated)

The process for getting CKB capacity is different for the accounts on different networks (chains). 

- To get CKB capacity for an account on **DEV chain**, specify the account as the miner for receiving mining rewards.

  - If the CKB node is installed by using the pre-built installer, specify the `args` in the `block_assembler` section in ckb.toml with the `lock_arg` of the account.

    ```shell
    $ ed devnet/ckb.toml <<EOF
    143a
    [block_assembler]
    code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"
    args = "0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e"
    hash_type = "type"
    message = "0x"
    .
    wq
    EOF
    ```

    After the miner is specified, restart the CKB node and start the CKB miner.

    To restart the CKB node, stop the CKB node by using the ctrl + C command in the terminal that runs the node and then start the node by executing `ckb run -C devnet`.

    To start the miner, open a new terminal and run the following commands:

    ```shell
    $ export TOP=$(pwd)
    $ export PATH=$PATH:$TOP/ckb_v0.40.0_x86_64-unknown-linux-gnu.tar.gz
    $ ckb miner -C devnet
    ```

  - If the CKB node is installed by Tippy, specify **Block Assembler Lock Arg** in the Edit Chain form with the `lock_arg` of the account.

    After the miner is specified, restart the CKB node and start the CKB miner on the Tippy dashboard.

- To get CKB capacity for an account on **Testnet**, go to https://faucet.nervos.org and paste the Testnet address of the account in the address inputbox, then click the **Claim** button.

  50,000 CKB can be claimed for each Testnet address from the [faucet](https://faucet.nervos.org/) per 24 hours. 

<b>Step 6. Check the Capacity of the Account of Alice.</b>

To check the capacity of the account, execute the `ckb-cli wallet get-capacity --address <the Testnet address of the account>` command as follows:

```shell
$ ckb-cli wallet get-capacity --address "ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf"
immature: 8039446.8758295 (CKB)
total: 10451302.54823011 (CKB)
```

<b>Step 7. Create an account for Bob.</b>

```shell
$ ckb-cli account new
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

```
$ ckb-cli account export --extended-privkey-path bob --lock-arg 0xecbe30bcf5c6b2f2d8ec2dd229a4603a7e206b99
Password: 
message: "Success exported account as extended privkey to: \"bob\", please use this file carefully"
```

</TabItem>
 <TabItem value="windows"><p><b>Step 1. Download the CKB Pre-built Installer Package and unzip the ckb-cli tool into C:\ckb.</b></p>

<p>This example downloads <a href="https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-pc-windows-msvc.zip">v0.39.0</a>. All releases can be found on the <a href="https://github.com/nervosnetwork/ckb/releases">CKB releases</a> page.</p>

<p>If the package is already downloaded, go to Step 2 directly.</p>

<p>Verify the binaries are working and check versions.</p>

```
cd C:\ckb 
C:\ckb> ckb-cli -V
ckb-cli 0.39.0
```

<b>Step 2. Create the account for Alice.</b>

```powershell
C:\ckb> ckb-cli account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Password: 
Repeat password: 
address:
  mainnet: ckb1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qxe85u4
  testnet: ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
lock_arg: 0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e
lock_hash: 0xf6ea009a4829de7aeecd75f3ae6bcdbaacf7328074ae52a48456a8793a4b1cca
```

<b>Step 3. Get the private key for the account of Alice.</b>

The extended private key is exported to the `C:/ckb/alice` file. The first line in the file is the private key of the account. The second line is the chain code.

```shell
C:\ckb> ckb-cli account export --extended-privkey-path alice --lock-arg 0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e
Password: 
message: "Success exported account as extended privkey to: \"alice\", please use this file carefully"
```

<b>Step 4. Get CKB Capacity for the account of Alice.</b> (to be updated)

The process for getting CKB capacity is different for the accounts on different networks (chains). 

- To get CKB capacity for an account on **DEV chain**, specify the account as the miner for receiving mining rewards.

  - If the CKB node is installed by using the pre-built installer, specify the `args` in the `block_assembler` section in ckb.toml with the `lock_arg` of the account.

    The ckb.toml file is under the ckb installation path, for example, /ckb_v0.39.0_x86_64-unknown-linux-gnu/devnet.

    ```toml title="../devnet/ckb.toml"
    [block_assembler]
    code_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"
    args = "0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e"
    hash_type = "type"
    message = "0x"
    ```

    After the miner is specified, restart the CKB node and start the CKB miner.

    To restart the CKB node, stop the CKB node by using the ctrl + C command in the terminal that runs the node and then start the node by executing `ckb run -C devnet`.

    To start the miner, open a new terminal and run the following commands:

    ```shell
    $ export TOP=$(pwd)
    $ export PATH=$PATH:$TOP/ckb_v0.40.0_x86_64-unknown-linux-gnu.tar.gz
    $ ckb miner -C devnet
    ```

  - If the CKB node is installed by Tippy, specify **Block Assembler Lock Arg** in the Edit Chain form with the `lock_arg` of the account.

    After the miner is specified, restart the CKB node and start the CKB miner on the Tippy dashboard.

- To get CKB capacity for an account on **Testnet**, go to https://faucet.nervos.org and paste the Testnet address of the account in the address inputbox, then click the **Claim** button.

  50,000 CKB can be claimed for each Testnet address from the [faucet](https://faucet.nervos.org/) per 24 hours. 

<b>Step 5. Check the Capacity of the Account of Alice.</b>

To check the capacity of the account, execute the `ckb-cli wallet get-capacity --address <the Testnet address of the account>` command as follows:

```shell
$ ckb-cli wallet get-capacity --address "ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf"
immature: 8039446.8758295 (CKB)
total: 10451302.54823011 (CKB)
```

<b>Step 6. Create an account for Bob.</b>

```shell
$ ckb-cli account new
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

```
$ ckb-cli account export --extended-privkey-path bob --lock-arg 0xecbe30bcf5c6b2f2d8ec2dd229a4603a7e206b99
Password: 
message: "Success exported account as extended privkey to: \"bob\", please use this file carefully"
```

</TabItem>
</Tabs>