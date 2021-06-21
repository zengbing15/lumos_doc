---
id: setupsystem
title: Set Up the Development Environment
---
This guide will help you set up your system for building DApps with Lumos. If you already have everything installed, feel free to read the other guides, and walk through the examples to learn the usage of Lumos.

## System Requirements

- Operating System:  CKB DApps can be developed upon Lumos on all major platforms, including Linux, Windows, and macOS.
- JavaScript runtime environment: [Node.js](https://nodejs.org/en/download/) LTS Version (>=12)
- Development tools to build native addons: GCC and make
- JavaScript package manager: Yarn or npm

## Install Node.js

Node.js is the runtime environment that must be installed on the system before using Lumos. The following sections explain the easiest way to install the Long Term Supported (LTS) version of Node.js on Ubuntu Linux 20.04, macOS, and Windows 10.

<Tabs
  defaultValue="ubuntu"
  values={[
    {label: 'Ubuntu 20.04', value: 'ubuntu'},
    {label: 'macOS and Windows 10', value: 'macoswin'},
  ]}>
<TabItem value="ubuntu"><p>Install Node.js with Apt by Using a NodeSource PPA:</p><p>The following commands installs Node.js 14.x.</p>

```bash
$ curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
$ sudo apt install nodejs
```

</TabItem>
    <TabItem value="macoswin">Download and install <a href="https://nodejs.org/en/">the LTS version</a> that is Recommended For Most Users.
</TabItem>
</Tabs>

## Install Yarn

It is recommended to install Yarn through the NPM package manager, which comes bundled with [Node.js](https://nodejs.org/) when it is installed on the system.

To install Yarn through NPM:

```bash
npm install --global yarn
```

## Install dependencies for node-gyp

Lumos relies on **node-gyp**, a cross-platform command-line tool for compiling native addon modules for *Node*.js. 

node-gyp has a few additional system requirements and dependencies that have different installation steps on different operating systems.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="ubuntu"
  values={[
    {label: 'Ubuntu 20.04', value: 'ubuntu'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows 10', value: 'windows'},
  ]}>
    <TabItem value="ubuntu">The development dependencies for Ubuntu 20.04 LTS are as follows:<ul><li>Python v3.6, v3.7, v3.8, or v3.9 (Ubuntu 20.04 and other versions of Debian Linux ship with Python 3 pre-installed)</li><li>make</li><li>A proper C/C++ compiler toolchain, like <a href="https://gcc.gnu.org/">GCC</a></li></ul><p>To install <code>GCC</code> and <code>make</code> on Ubuntu 20.04, run the following command as root or user with sudo privileges:</p>

```
$ sudo apt update
$ sudo apt install build-essential
```

</TabItem>

<TabItem value="macos">The development dependencies for macOS are as follows:<ul><li>Python v3.6, v3.7, v3.8, or v3.9</li><li><a href="https://developer.apple.com/xcode/download/">Xcode</a> and Xcode command line tools</li></ul>

</TabItem>

 <TabItem value="windows">The development dependencies for Windows are as follows:<ul><li>The current version of Python.</li><li>Visual C++ Build Environment</li></ul><b>Installation Options</b>

<ul><li>Option 1: Install all the required tools and configurations using Microsoft's windows-build-tools by running <code>npm install -g windows-build-tools -vs2019</code> from an elevated PowerShell (run as Administrator).<p><b>Note</b>: This command installs all the system dependencies without conflicting with any software already installed on the system. Depending on the build tools' version, the installation requires 3 to 8 gigabytes space to get all dependencies installed. It can take at least 30 minutes depending on the network connection.</p></li><li>Option 2: Install dependencies and configure the tools manually.<ul><li>Install Visual C++ Build Environment: Tools for Visual Studio 2019 -> <a href="https://visualstudio.microsoft.com/downloads/"><i class="feather icon-download"></i>Visual Studio 2019 Build Tools</a> (using "Visual C++ build tools" workload) and run <code>npm config set msvs_version 2019</code> in a cmd terminal.</li><li>Install the current version of Python from the <a href="https://docs.python.org/3/using/windows.html#the-microsoft-store-package">Microsoft Store package</a>, and run <code>npm config set python /path/to/python</code>.</li></ul></li></ul>

</TabItem>

</Tabs>
For more information, see the instructions of <a href="https://github.com/nodejs/node-gyp">node-gyp</a>.

## Install a CKB node on DEV chain by using Tippy

**Tippy** is a tool to help set up and manage CKB nodes. It can install and start running a CKB node by one simple click. **DEV chain** is the recommended network for the later examples and CKB starters. 

For more information about the concepts of CKB nodes, CKB networks, and the methods to install a CKB node, see [CKB Nodes and Networks](../reference/ckbnode).

import useBaseUrl from "@docusaurus/useBaseUrl";

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

<p><b>Step 3. Create a CKB node on DEV chain.</b></p>

<p><b>DEV chain</b> is the recommended network for the later examples and CKB starters. For more information about CKB networks, see <a href="../reference/ckbnode#ckb-networks">CKB Networks</a>.</p>
<p>To create a CKB node on <b>DEV chain</b>, click the <b>Launch a CKB devnet instantly</b> button on the home page.</p>

<img src={useBaseUrl("img/tippycreate.png")}/>

<p>The CKB node starts running just after it is created. It can be stopped or restarted on the Tippy <b>Dashboard</b>. Details of blocks and transactions of the chain can be checked on the <b>Blocks</b> and <b>Transactions</b> pages that are visible when the node is started.</p>

<b>Step 4. Shorten DEV chain epoch and block interval.</b>

<p>To shorten DEV chain epoch and block interval:</p>

<ol><li><p>Stop the DEV chain and delete the data files of the chain.</p><p>$HOME/.config/Tippy/chain-<var>number</var>/data</p><p>$HOME/.config/Tippy/chain-<var>number</var>/indexer-data</p></li><li><p>Modify the value for <code>genesis_epoch_length</code> and <code>permanent_difficulty_in_dummy</code> in the dev.toml file.</p>



```toml title="$HOME/.config/Tippy/chain-number/specs/dev.toml"
genesis_epoch_length = 10  # The unit of meansurement is "block".
permanent_difficulty_in_dummy = true
```

</li><li><p>Modify the value for <code>value</code> under the <code>miner.workers</code> section  in the <b>ckb-miner.toml</b> file.</p>

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

<p><b>Step 3. Create a CKB node on DEV chain.</b></p>

<p>To create a CKB node on <b>DEV chain</b>, click the <b>Launch a CKB devnet instantly</b> button on the home page.</p>

<img src={useBaseUrl("img/tippycreate.png")}/>

<p>The CKB node starts running just after it is created. It can be stopped or restarted on the Dashboard. Details of blocks and transactions of the chain can be checked on the Blocks and Transaction pages.</p>

<b>Step 4. Shorten DEV chain epoch and block interval.</b>

<p>To shorten DEV chain epoch and block interval:</p>

<ol><li><p>Stop the DEV chain and delete the data files of the chain.</p><p>~/Libary/Application Support/Tippy/chain-<var>number</var>/data</p><p>~/Libary/Application Support/Tippy/chain-<var>number</var>/indexer-data</p></li><li><p>Modify the value for <code>genesis_epoch_length</code> and <code>permanent_difficulty_in_dummy</code> in the dev.toml file.</p>



```toml title="~/Libary/Application Support/Tippy/chain-number/specs/dev.toml"
genesis_epoch_length = 10  # The unit of meansurement is "block".
permanent_difficulty_in_dummy = true
```

</li><li><p>Modify the value for <code>value</code> under the <code>miner.workers</code> section  in the <b>ckb-miner.toml</b> file.</p>

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
<p>To create a CKB node on <b>DEV chain</b>, click the <b>Launch a CKB devnet instantly</b> button on the home page.</p>

<img src={useBaseUrl("img/tippycreate.png")}/>

<p>The CKB node starts running just after it is created. It can be stopped or restarted on the Dashboard. Details of blocks and transactions of the chain can be checked on the Blocks and Transaction pages.</p>

<b>Step 4. Shorten DEV chain epoch and block interval.</b>

<p>To shorten DEV chain epoch and block interval:</p>

<ol><li><p>Stop the DEV chain and delete the data files of the chain.</p><p>C:/Users/<var>username</var>/AppData/Roaming/Tippy/chain-<var>number</var>/data</p><p>C:/Users/<var>username</var>/AppData/Roaming/Tippy/chain-<var>number</var>/indexer-data</p></li><li><p>Modify the value for <code>genesis_epoch_length</code> and <code>permanent_difficulty_in_dummy</code> in the dev.toml file.</p>


```toml title="C:/Users/username/AppData/Roaming/Tippy/chain-number/specs/dev.toml"
genesis_epoch_length = 10  # The unit of meansurement is "block".
permanent_difficulty_in_dummy = true
```

</li><li><p>Modify the value for <code>value</code> under the <code>miner.workers</code> section  in the <b>ckb-miner.toml</b> file.</p>

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