---
id: createaccount
title: Create Accounts
---
A CKB account is represented as a collection of live cells locked by a lock script. The ID of the account is the lock script args.

The following elements of an account are useful during the DApp development:


| Element     | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| Lock&nbsp;script<br/> | The lock script consists of three key parameters, including *code_hash*, *hash_type* and *args*.<br/>Example:<br/>{<br/>code_hash:<br/>&nbsp;'0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',<br/> hash_type:&nbsp;'type',<br/>args: '0x82be41cf167110e6c00e79009a3fd4d9abe8c65a'<br/>} |
| Address      | CKB address packages lock script into a single line, verifiable, and human read friendly format.<br/>Example:<br/>ckt1qyqg90jpeut8zy8xcq88jqy68l2dn2lgcedqd7ye7n |
| Private&nbsp;key | A string of letters and numbers that is used to prove ownership of cryptocurrency or digital assets, allowing them to be sent to other payment addresses. A private key is normally stored in a wallet.<br/>A private key must be kept secret at all times. A private key works similarly to a key to a safe containing your cryptocurrency. Anyone with the key has the ability to open the safe and take the contents. |
| CKB&nbsp;capacity | The total CKB capacity of the live cells of an account.<br/>**Note**: If an account wants to perform transaction actions like transferring CKB to other accounts, generating tokens, the account must have enough CKB capacity. The minimum CKB capacity requirement is 61 CKB (6100000000n) for one common transaction, and 102 CKB (10200000000n) for a DAO deposit transaction. |

The following methods are described in this guide to prepare CKB accounts for the DApp development:

- Create an account by using ckb-cli. 
- Get the private key of an account.
- Get CKB capacity for an account.
- Check the capacity of an account.

## Prerequisites 

The following prerequisites apply for creating an account by using ckb-cli:

- The CKB node is installed by using the pre-built installer package. 
- The CKB node is running.

## Steps

### Step 1. Create an account by using ckb-cli.

ckb-cli is available in the CKB pre-built installer package. For more information, see [Install a CKB Node by Using the Pre-built Installer Package](../preparation/installckb#install-a-ckb-node-by-using-the-pre-built-installer-package).

```shell
$ export TOP=$(pwd)
$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu
$ ckb-cli account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Password: 
Repeat password: 
```
<details><summary>CLICK ME</summary>
<p>

```shell
address:
  mainnet: ckb1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qxe85u4
  testnet: ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
lock_arg: 0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e
lock_hash: 0xf6ea009a4829de7aeecd75f3ae6bcdbaacf7328074ae52a48456a8793a4b1cca
```
</p>
</details>

### Step 2. Get the private key of an account.

To get the private key of an account:

```
$ ckb-cli account export --extended-privkey-path wallet --lock-arg 0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e
Password: 
```
<details><summary>CLICK ME</summary>
<p>

```shell
message: "Success exported account as extended privkey to: \"wallet\", please use this file carefully"
```
</p>
</details>

The extended private key is exported to the wallet file. The first line in the file is the private key of the account. The second line is the chain code.

### Step 3. Get CKB Capacity for an Account

The process for getting CKB capacity is different for the accounts on different networks (chains). 

- To get CKB capacity for an account on **DEV chain**, specify the account as the miner for receiving mining rewards.
  - If the CKB node is installed by using the pre-built installer, specify the `args` in the `block_assembler` section in ckb.toml with the `lock_arg` of the account.

    ```
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

    To start the CKB miner:

    ```
    $ export TOP=$(pwd)
    $ export PATH=$PATH:$TOP/ckb_v0.40.0_x86_64-unknown-linux-gnu.tar.gz
    $ ckb miner -C devnet
    ```

  - If the CKB node is installed by Tippy, specify **Block Assembler Lock Arg** in the Edit Chain form with the `lock_arg` of the account.

    After the miner is specified, restart the CKB node and start the CKB miner in the Tippy dashboard.

- To get CKB capacity for an account on **Testnet**, go to https://faucet.nervos.org and paste the Testnet address of the account in the address inputbox, then click the **Claim** button.

  50,000 CKB can be claimed for each Testnet address from the [faucet](https://faucet.nervos.org/) per 24 hours. 

### Step 4. Check the Capacity of the Account

To check the capacity of the account, execute the `ckb-cli wallet get-capacity --address <the Testnet address of the account>` command as follows:

```shell
$ ckb-cli wallet get-capacity --address "ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf"
immature: 8039446.8758295 (CKB)
total: 10451302.54823011 (CKB)
```

### Step 5. Deposit CKB to DAO

```shell
$ ckb-cli dao deposit --from-account 0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e --tx-fee 0.1 --capacity 200
Password:
0x4a08e1609cd2f85ba33b4edf3c40ced779150925796ccea1441cad2b0a95395c
$ ckb-cli wallet get-capacity --address ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf
dao: 200.0 (CKB)
free: 37784393.96564889 (CKB)
immature: 8039070.66628093 (CKB)
total: 37784593.96564889 (CKB)
```

