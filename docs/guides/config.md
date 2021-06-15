---
id: config
title: Set Up the Config Manager
---
The config manager  (`@ckb-lumos/config-manager`) supports to launch a DApp with a specific chain configuration. All the other components in Lumos can leverage the configuration from the config manager directly.

A DApp can set up the config manger by using **pre-defined configurations** with the <var>LUMOS_CONFIG_NAME</var> variable or **a local configuration file** with the <var>LUMOS_CONFIG_FILE</var> variable.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="configname"
  values={[
    {label: 'Pre-defined Configurations', value: 'configname'},
    {label: 'A Local Configuration File', value: 'congfile'},
  ]}>
<TabItem value="configname">  <p><ul><li>The <var>LUMOS_CONFIG_NAME</var> variable can take the <code>LINA</code> value to launch the DApp with the pre-defined configurations of the <b>Mainnet</b> network.</li><li>The <var>LUMOS_CONFIG_NAME</var> variable can take the <code>AGGRON4</code> value to launch the DApp with the pre-defined configurations of the <b>Testnet</b> network.</li></ul></p><p>For more information, see <a href="../guides/config#set-up-the-config-manager-by-using-pre-defined-configurations">Set Up the Config Manager by Using Pre-defined Configurations</a>.</p>

</TabItem>
    <TabItem value="congfile"><p>The <var>LUMOS_CONFIG_FILE</var> variable can take the value of a local config file name, for example, <var>config.json</var>, to launch the DApp with the configurations of <b>DEV chain</b>.</p><p>For more information, see <a href="../guides/config#set-up-the-config-manager-by-using-a-local-config-file">Set Up the Config Manager by Using a Local Config File</a>.</p>

</TabItem>
</Tabs>

## Prerequisites

The following prerequisites apply for setting up the config manager:

- The development environment is set up.

  For more information, see [Set Up the Development Environment](../preparation/setupsystem).

- The `@ckb-lumos/config-manager` package is installed.

  For more information about how to install a Lumos package, see [Install Lumos Packages](../guides/installlumos).

## Set Up the Config Manager by Using Pre-defined Configurations

To launch the DApp with the pre-defined **Mainnet** configurations, assign <b>LINA</b> to the <var>LUMOS_CONFIG_NAME</var> variable.

Example:

```typescript {3}
import { env } from "process";
import { getConfig, initializeConfig } from "@ckb-lumos/config-manager";
env.LUMOS_CONFIG_NAME = "LINA";
initializeConfig();
export const CONFIG = getConfig();
```

To launch the DApp with the pre-defined **Testnet** configurations, assign **AGGRON4** to the <var>LUMOS_CONFIG_NAME</var> variable.

Example:

```typescript {3}
import { env } from "process";
import { getConfig, initializeConfig } from "@ckb-lumos/config-manager";
env.LUMOS_CONFIG_NAME = "AGGRON4";
initializeConfig();
export const CONFIG = getConfig();
```

## Set Up the Config Manager by Using a Local Config File

To launch the DApp on **DEV chain**, assign a local config file to the <var>LUMOS_CONFIG_FILE</var> variable. Lumos can read the configurations from the config file that is specified by the <var>LUMOS_CONFIG_FILE</var> variable. 

If the <var>LUMOS_CONFIG_FILE</var> variable is unsigned, Lumos reads configurations from the `config.json` file in the current directory.

### Step 1. Generate the config.json file for the DEV chain.

<Tabs
  defaultValue="ubuntu"
  values={[
    {label: 'Ubuntu 20.04', value: 'ubuntu'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows 10', value: 'windows'},
  ]}>
<TabItem value="ubuntu"><p>Download the config generator tool, <a href="https://github.com/classicalliu/lumos-config-generator/releases/download/v0.1.1/lumos-config-generator-linux-amd64">lumos-config-generator-linux-amd64</a> for Linux platforms.</p>

```shell
$ wget https://github.com/classicalliu/lumos-config-generator/releases/download/v0.1.1/lumos-config-generator-linux-amd64
```

<p>Run the <b>lumos-config-generator-linux-amd64</b> file to generate the config.json file in the project root directory.</p>

:::note

The CKB node must be running when executing the generator to generate the config file.

:::

```shell
$ ./lumos-config-generator-linux-amd64 ../hellolumos/config.json http://127.0.0.1:8114
```

<p>For more information, see the <a href="https://github.com/classicalliu/lumos-config-generator">Readme</a> of the generator.</p>

</TabItem><TabItem value="macos"><p>Download the config generator tool, <a href="https://github.com/classicalliu/lumos-config-generator/releases/download/v0.1.1/lumos-config-generator-macos-amd64">lumos-config-generator-macos-amd64</a> for macOS platforms.</p>

<p>Run the <b>lumos-config-generator-macos-amd64</b> file to generate the config.json file.</p>

:::note

The CKB node must be running on DEV chain when executing the generator to generate the config file.

:::

```shell
$ ./lumos-config-generator ../hellolumos/config.json http://127.0.0.1:8114
```

<p>For more information, see the <a href="https://github.com/classicalliu/lumos-config-generator">Readme</a> of the generator.</p>

</TabItem>

<TabItem value="windows"><p>Download the config generator tool, <a href="https://github.com/classicalliu/lumos-config-generator/releases/download/v0.1.1/lumos-config-generator-windows-amd64.exe">lumos-config-generator-windows-amd64.exe</a> for Windows platforms.</p>

<p>Run the <b>lumos-config-generator-linux-amd64</b> file to generate the config.json file.</p>

:::note

The CKB node must be running when executing the generator to generate the config file.

:::

```shell
> lumos-config-generator-windows-amd64 C:\hellolumos\config.json http://127.0.0.1:8114
```

<p>For more information, see the <a href="https://github.com/classicalliu/lumos-config-generator">Readme</a> of the generator.</p>

</TabItem>
</Tabs>

### **Step 2. Set up the config manager in the DApp.**

Example:

```typescript title="hellolumos/src/index.ts"
import { env } from "process";
import { getConfig, initializeConfig } from "@ckb-lumos/config-manager";
env.LUMOS_CONFIG_FILE = env.LUMOS_CONFIG_FILE || "./config.json";
initializeConfig();
export const CONFIG = getConfig();
```