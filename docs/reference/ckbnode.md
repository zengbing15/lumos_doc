---
id: ckbnode
title: CKB Nodes and Networks
---

<!--The Nervos CKB (Common Knowledge Base) is the bottom-most layer in the Nervos ecosystem. It serves as a foundation to build on and provides trust to all layers built on top.-->

<!--CKB nodes can be categorized into three types:--><!--**Full Nodes**: Full nodes verify new blocks and transactions, relay blocks and transactions, and select the chain fork on which they agree. Full nodes are the verifiers of the network. The CKB nodes used for the development and testing are **full nodes**.--><!--**Mining Nodes**: Mining nodes participate in the CKB consensus process. The mining nodes collect new transactions, package them into blocks and produce new blocks when they have found a Proof-of-Work. Mining nodes do not have to store the entire transaction history, only the current cell set.--><!--**Light Nodes**: Light nodes trust full nodes, only subscribe and store a subset of cells that they are concerned with. They use minimal resources. Users increasingly rely on mobile devices and mobile apps to access the Internet, the light node is designed to run on mobile devices.-->

import useBaseUrl from "@docusaurus/useBaseUrl";

The CKB nodes used in the DApp development are **full nodes** that are the verifiers of the CKB network. A CKB full node verifies new blocks and transactions, relays blocks and transactions, and selects the chain fork on which it agrees.

## CKB Networks

A CKB node can be set up to connect and interact with one of the following CKB networks:

- **Mainnet (Lina)**: Mainnet is the main CKB public network. The real-time information of the Lina Mainnet can be checked on the [CKB Explorer](https://explorer.nervos.org/) page.

- **Testnet (Aggron4)**: Testnet is used to test applications integration and smart contracts in real environment with actual data. <!--To get CKB capacity for an account on the Testnet, go to [https://faucet.nervos.org](https://faucet.nervos.org/) and paste the Testnet address of the account in the address input box, then click the **Claim** button. For more information, see [Create Accounts](../preparation/createaccount).-->

  :::info

  For the first time to run a node on the **Testnet**, syncing data requires upwards of one hour for the current number (**1,300,000+**) of blocks depending on the network connection. The real-time block number on the Testnet can be checked on the [CKB Explorer](https://explorer.nervos.org/aggron) page.<br/>
  :::

- **DEV Chain**:  DEV chain is a local blockchain that provides an efficient and useful development mode for building and testing applications.<!-- To get CKB capacity for an account on the **DEV** chain, specify the account as the miner in the chain configurations for receiving mining rewards. For more information, see [Create Accounts](../preparation/createaccount). This is the recommended network for starters and DApp developers.--> 

## Installation Options

There are two options for installing a CKB node:

- [**Install a CKB node by using Tippy**](../reference/ckbnode#install-a-ckb-node-by-using-tippy)

  **Tippy** is a tool that helps set up and manage CKB nodes. It can install and start running a CKB node by one simple click.

- [**Install a CKB node by using the pre-built installer package**](../reference/ckbnode#install-a-ckb-node-by-using-the-pre-built-installer-package)

  The pre-built installer package contains the following tools: 

  - **ckb**: The ckb tool is the main tool that initiates configurations, run CKB nodes, synching block data and mining. 

  - **ckb-cli**: ckb-cli is a command line tool that provides the functions of RPC requests, creating CKB addresses, managing wallets, sending transactions, and depositing to Nervos DAO etc.
## Install a CKB Node by Using Tippy

Tippy supports to install and manage CKB nodes on all major platforms including Linux, macOS, and Windows. <!--The following installation steps are verified on Ubuntu 20.04 LTS and Windows 10.-->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="ubuntu"
  values={[
    {label: 'Ubuntu 20.04', value: 'ubuntu'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows 10', value: 'windows'},
  ]}>
<TabItem value="ubuntu"><p><b>Step 1. Download Tippy.</b></p>

<p>Download the <b>tippy-linux-x64.tar.gz</b> file and unzip it. By default, the files are unzipped into the tippy-linux-x64 folder. All versions of Tippy can be found on the <a href="https://github.com/nervosnetwork/tippy/releases"><i class="feather icon-download"></i>Tippy Releases</a> page.</p>

<p><b>Step 2. Make Tippy executable and run Tippy.</b></p>

```bash {1-3}
$ chmod +x ./tippy-linux-x64/Tippy
$ cd tippy-linux-x64
$ ./Tippy
```

<p>If a desktop GUI is installed, double click the Tippy file under the tippy-linux-x64 folder to run Tippy.</p>

<p>A web page on <a>http://localhost:5000/Home</a> will be opened in a browser after the execution or the double click. If the page is not opened, open the browser and type <a>http://localhost:5000/Home</a> in the address field to access the Tippy web UI.</p>

<p><b>Step 3. Create a CKB chain.</b></p>

<p><b>DEV chain</b> is the recommended network for the later examples and CKB starters. For more information about CKB networks, see <a href="../reference/ckbnode#ckb-networks">CKB Networks</a>.</p>
<p>To create a CKB node on <b>DEV chain</b>, click the <b>Launch a CKB devnet instantly</b> button on the home page.</p>

<img src={useBaseUrl("img/tippycreate.png")}/>

<p>To create a CKB node on the <b>other</b> networks, click <b>Create a customized chain</b> to choose the network in the <b>Chain Type</b> dropdown list of the <b>Create Chain</b> form.</p>

<p>The CKB node starts running just after it is created. It can be stopped or restarted on the Tippy <b>Dashboard</b>. Details of blocks and transactions of the chain can be checked on the <b>Blocks</b> and <b>Transactions</b> pages that are visible when the node is started.</p>

<b>Step 4. Shorten DEV chain epoch and block interval.</b>

<p>An epoch is a period of time for a set of blocks. To develop and test transactions with lock period like DAO operations, the <code>genesis_epoch_length</code> and the <code>permanent_difficulty_in_dummy</code> parameters in the <b>dev.toml</b> file can be adjusted to shorten the chain epoch.</p>

<p>The default value for the <code>genesis_epoch_length</code> parameter is 1000 meaning that an epoch is the time for producing 1,000 blocks.</p>

<p>When <code>permanent_difficulty_in_dummy</code> is set to <var>true</var>, all epochs skip the difficulty adjustment. This parameter is typically used in combination with <code>genesis_epoch_length</code>.</p>

:::info

The chain specific configuration files like dev.toml and data files are located in Home/.config/Tippy/chain-<var>number</var>.

:::

<p>To shorten DEV chain epoch and block interval:</p>

<ol><li><p>Stop the DEV chain and delete the data files of the chain.</p><p>$HOME/.config/Tippy/chain-<var>number</var>/data</p><p>$HOME/.config/Tippy/chain-<var>number</var>/indexer-data</p></li><li><p>Modify the value for <code>genesis_epoch_length</code> and <code>permanent_difficulty_in_dummy</code> in the dev.toml file.</p>


```toml title="$HOME/.config/Tippy/chain-number/specs/dev.toml"
genesis_epoch_length = 10  # The unit of meansurement is "block".
permanent_difficulty_in_dummy = true
```

</li><li><p>Modify the value for <code>value</code> under the <code>miner.workers</code> section  in the <b>ckb-miner.toml</b> file.</p>

<p>The default mining interval is 5,000 milliseconds (5 seconds). That means a new block is generated at intervals of every 5 seconds.</p>

<p>To modify the value in the [miner.workers] section to generate a new block every second (1,000 milliseconds):</p>

```toml title="$HOME/.config/Tippy/chain-number/ckb-miner.toml" {4}
[[miner.workers]]
worker_type = "Dummy"
delay_type = "Constant"
value = 1000
```

</li><li><p>Restart the DEV chain on Tippy Dashboard.</p></li></ol>

</TabItem><TabItem value="macos"><p><b>Step 1. Download Tippy.</b></p>

<p><ul><li>Download the <b>Tippy.dmg</b> file. All versions of Tippy can be found on the <a href="https://github.com/nervosnetwork/tippy/releases"><i class="feather icon-download"></i>Tippy Releases</a> page.</li><li>Open the Tippy.dmg file and drag <b>Tippy.app</b> to the Applications folder.</li></ul></p>

<p><b>Step 2. Run Tippy.</b></p>

<p>Click Tippy.app in the Applications folder to run Tippy.</p>

<p>A web page on <a>http://localhost:5000/Home</a> will be opened in a browser after the execution or the double click. If the page is not opened, open the browser and type <a>http://localhost:5000/Home</a> in the address field to access the Tippy web UI.</p>

<p><b>Step 3. Create a CKB chain.</b></p>

<p><b>DEV chain</b> is the recommended network for the later examples and CKB starters. For more information about CKB networks, see <a href="../reference/ckbnode#ckb-networks">CKB Networks</a>.</p>
<p>To create a CKB node on <b>DEV chain</b>, click the <b>Launch a CKB devnet instantly</b> button on the home page.</p>

<img src={useBaseUrl("img/tippycreate.png")}/>

<p>To create a CKB node on the <b>other</b> networks, click <b>Create a customized chain</b> to choose the network in the <b>Chain Type</b> dropdown list of the <b>Create Chain</b> form.</p>

<p>The CKB node starts running just after it is created. It can be stopped or restarted on the Dashboard. Details of blocks and transactions of the chain can be checked on the Blocks and Transaction pages.</p>

<b>Step 4. Shorten DEV chain epoch and block interval.</b>

<p>An epoch is a period of time for a set of blocks. To develop and test transactions with lock period like DAO operations, the <code>genesis_epoch_length</code> and the <code>permanent_difficulty_in_dummy</code> parameters in the <b>dev.toml</b> file can be adjusted to shorten the chain epoch.</p>

<p>The default value for the <code>genesis_epoch_length</code> parameter is 1000 meaning that an epoch is the time for producing 1,000 blocks.</p>

<p>When <code>permanent_difficulty_in_dummy</code> is set to <var>true</var>, all epochs skip the difficulty adjustment. This parameter is typically used in combination with <code>genesis_epoch_length</code>.</p>

<p>To shorten DEV chain epoch and block interval:</p>

<ol><li><p>Stop the DEV chain and delete the data files of the chain.</p><p>~/Libary/Application Support/Tippy/chain-<var>number</var>/data</p><p>~/Libary/Application Support/Tippy/chain-<var>number</var>/indexer-data</p></li><li><p>Modify the value for <code>genesis_epoch_length</code> and <code>permanent_difficulty_in_dummy</code> in the dev.toml file.</p>


```toml title="~/Libary/Application Support/Tippy/chain-number/specs/dev.toml"
genesis_epoch_length = 10  # The unit of meansurement is "block".
permanent_difficulty_in_dummy = true
```

</li><li><p>Modify the value for <code>value</code> under the <code>miner.workers</code> section  in the <b>ckb-miner.toml</b> file.</p>

<p>The default mining interval is 5,000 milliseconds (5 seconds). That means a new block is generated at intervals of every 5 seconds.</p>

<p>To modify the value in the [miner.workers] section to generate a new block every second (1,000 milliseconds):</p>

```toml title="~/Libary/Application Support/Tippy/chain-number/ckb-miner.toml" {4}
[[miner.workers]]
worker_type = "Dummy"
delay_type = "Constant"
value = 1000
```

</li><li><p>Restart the DEV chain on Tippy Dashboard.</p></li></ol>

</TabItem>

<TabItem value="windows"><p><b>Step 1. Download Tippy.</b></p>

<p>Download the <b>tippy-win-x64.zip</b> file and unzip the file. By default, the files are unzipped into the tippy-win-x64 folder. All versions can be found on the <a href="https://github.com/nervosnetwork/tippy/releases"><i class="feather icon-download"></i>Tippy Releases</a> page.</p>

<p><b>Step 2. Run Tippy.</b></p><p>Double click the Tippy.exe file under the tippy-win-x64 folder to run Tippy.</p>

<p>A web page on <a>http://localhost:5000/Home</a> will be opened in a browser after the double click. If the page is not opened, open the browser and type <a>http://localhost:5000/Home</a> in the address field to access the Tippy web UI.</p>

<p><b>Step 3. Create a CKB chain.</b></p>
<p><b>DEV chain</b> is the recommended network for the later examples and CKB starters. For more information about CKB networks, see <a href="../reference/ckbnode#ckb-networks">CKB Networks</a>.</p>
<p>To create a CKB node on <b>DEV chain</b>, click the <b>Launch a CKB devnet instantly</b> button on the home page.</p>

<img src={useBaseUrl("img/tippycreate.png")}/>

<p>To create a CKB node on the <b>other</b> networks, click <b>Create a customized chain</b> to choose the network in the <b>Chain Type</b> dropdown list of the <b>Create Chain</b> form.</p>

<p>The CKB node starts running just after it is created. It can be stopped or restarted on the Dashboard. Details of blocks and transactions of the chain can be checked on the Blocks and Transaction pages.</p>

<b>Step 4. Shorten DEV chain epoch and block interval.</b>

<p>An epoch is a period of time for a set of blocks. To develop and test transactions with lock period like DAO operations, the <code>genesis_epoch_length</code> and the <code>permanent_difficulty_in_dummy</code> parameters in the <b>dev.toml</b> file can be adjusted to shorten the chain epoch.</p>

<p>The default value for the <code>genesis_epoch_length</code> parameter is 1000 meaning that an epoch is the time for producing 1,000 blocks.</p>

<p>When <code>permanent_difficulty_in_dummy</code> is set to <var>true</var>, all epochs skip the difficulty adjustment. This parameter is typically used in combination with <code>genesis_epoch_length</code>.</p>

:::info

The chain specific configuration files and data files are located in C:/Users/<var>username</var>/AppData/Roaming/Tippy/chain-<var>number</var>. 

:::

<p>To shorten DEV chain epoch and block interval:</p>

<ol><li><p>Stop the DEV chain and delete the data files of the chain.</p><p>C:/Users/<var>username</var>/AppData/Roaming/Tippy/chain-<var>number</var>/data</p><p>C:/Users/<var>username</var>/AppData/Roaming/Tippy/chain-<var>number</var>/indexer-data</p></li><li><p>Modify the value for <code>genesis_epoch_length</code> and <code>permanent_difficulty_in_dummy</code> in the dev.toml file.</p>

```toml title="C:/Users/username/AppData/Roaming/Tippy/chain-number/specs/dev.toml"
genesis_epoch_length = 10  # The unit of meansurement is "block".
permanent_difficulty_in_dummy = true
```

</li><li><p>Modify the value for <code>value</code> under the <code>miner.workers</code> section  in the <b>ckb-miner.toml</b> file.</p>

<p>The default mining interval is 5,000 milliseconds (5 seconds). That means a new block is generated at intervals of every 5 seconds.</p>

<p>To modify the value in the [miner.workers] section to generate a new block every second (1,000 milliseconds):</p>

```toml title="C:/Users/username/AppData/Roaming/Tippy/chain-number/ckb-miner.toml" {4}
[[miner.workers]]
worker_type = "Dummy"
delay_type = "Constant"
value = 1000
```

</li><li><p>Restart the DEV chain on Tippy Dashboard.</p></li></ol>

</TabItem>
</Tabs>

## Install a CKB Node by Using the Pre-built Installer Package

### Step 1. Download the CKB Pre-built Installer Package.

<Tabs
  defaultValue="ubuntu"
  values={[
    {label: 'Ubuntu 20.04', value: 'ubuntu'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows 10', value: 'windows'},
  ]}>
<TabItem value="ubuntu"><p>Download the <b>ckb_v0.<var>xx.x</var>_x86_64-unknown-linux-gnu.tar.gz</b> file and unzip the file.</p><p>The following commands download the 0.39.0 version and unzip the file into the ckb_v0.39.0_x86_64-unknown-linux-gnu folder. All releases can be found on the <a title="Download" href="https://github.com/nervosnetwork/ckb/releases"><i class="feather icon-download"></i>CKB releases</a> page.</p>

```bash
$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
$ tar xzf ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz
```

</TabItem><TabItem value="macos">

<p>Download the <b>ckb_v0.<var>xx.x</var>_x86_64-unknown-apple-darwin.zip</b> file.</p>
<p>The following command downloads the 0.39.0 version. All releases can be found on the <a title="Download" href="https://github.com/nervosnetwork/ckb/releases"><i class="feather icon-download"></i>CKB releases</a> page.</p>

```bash {1}
$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-apple-darwin.zip
```

<p>Double-click the ckb_v0.39.0_x86_64-apple-darwin.zip file to unzip it.</p>

</TabItem>

<TabItem value="windows"><p>Download the <b>ckb_v0.<var>xx.x</var>_x86_64-pc-windows-msvc.zip</b> file and unzip the file.</p>

<p>This guide downloads and uses the 0.39.0 version. All releases can be found on the <a title="Download" href="https://github.com/nervosnetwork/ckb/releases"><i class="feather icon-download"></i>CKB releases</a> page.</p>

</TabItem>
</Tabs>

### Step 2. Verify the CKB tool are working and check versions.

To verify the CKB tool, navigate into the unzipped folder where the ckb tool locates and execute the following command:

```bash {1}
ckb -V
ckb 0.39.0
```

### Step 3. Run the CKB node.

**DEV chain** is the recommended network for the later examples and CKB starters. For more information about CKB networks, see [CKB Networks](../reference/ckbnode#ckb-networks).

<Tabs
  defaultValue="dev"
  values={[
    {label: 'DEV Chain', value: 'dev'},
    {label: 'Testnet', value: 'testnet'},
    {label: 'Mainnet', value: 'mainnet'}, 
  ]}>
<TabItem value="dev"><p><b>1. Initialize the CKB node on the DEV blockchain.</b></p>

```bash {1}
ckb init -C devnet -c dev
WARN: mining feature is disabled because of lacking the block assembler config options
Initialized CKB directory in devnet
create specs/dev.toml
create ckb.toml
create ckb-miner.toml
create default.db-options
```

<p><b>2. Shorten DEV chain epoch and block interval.</b></p>

<ul><li><p>Modify <code>genesis_epoch_length</code> and <code>permanent_difficulty_in_dummy</code> in the devnet/specs/<b>dev.toml</b> config file that was created in the initialization step.</p>

<p>To modify <code>genesis_epoch_length</code> and <code>permanent_difficulty_in_dummy</code>:</p>

```toml title="devnet/specs/dev.toml"
genesis_epoch_length = 10  # The unit of meansurement is "block".
permanent_difficulty_in_dummy = true
```

</li><li><p>Modify the <code>value</code> parameter under the <code>miner.workers</code> section  in the <b>ckb-miner.toml</b> file.</p>

<p>The default mining interval is 5,000 milliseconds (5 seconds). That means a new block is generated at intervals of every 5 seconds.</p>

<p>To modify the value in the [miner.workers] section to generate a new block every second (1,000 milliseconds):</p>

```toml title="devnet/ckb-miner.toml" {4}
[[miner.workers]]
worker_type = "Dummy"
delay_type = "Constant"
value = 1000
```

</li></ul>

<p><b>3. Start the CKB node on DEV chain.</b></p>

```bash {1}
ckb run -C devnet
```

</TabItem>
    <TabItem value="testnet"><p><b>1. Initialize the Testnet node.</b></p>

```bash {1}
ckb init --chain testnet -C testnet
WARN: mining feature is disabled because of lacking the block assembler config options
Initialized CKB directory in testnet
create ckb.toml
create ckb-miner.toml
```

<p><b>2. Start the CKB Testnet node.</b></p>

:::note

For the first time to run a node on the **Testnet**, syncing data requires upwards of one hour for the current number (**1,300,000+**) of blocks depending on the network connection. The real-time block number on the Testnet can be checked on the [CKB Explorer](https://explorer.nervos.org/aggron) page.<br/>
:::

```bash {1}
ckb run -C testnet
```

</TabItem>
    <TabItem value="mainnet"><p><b>1. Initialize the Mainnet node.</b></p>

```bash {1}
ckb init --chain mainnet -C mainnet
WARN: mining feature is disabled because of lacking the block assembler config options
Initialized CKB directory in mainnet
create ckb.toml
create ckb-miner.toml
```

<p><b>2. Start the CKB Mainnet node.</b></p>

```bash {1}
ckb run -C mainnet
```

</TabItem>
</Tabs>