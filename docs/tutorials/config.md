---
id: config
title: Set Up the Config Manager
---
The config manager  (`@ckb-lumos/config-manager`) supports the DApp to boot with a specific chain configuration. All the other components in Lumos can leverage the configuration from the config manager directly.

A DApp can set up the config manger by using the <b><var>LUMOS_CONFIG_NAME</var></b> variable or the <b><var>LUMOS_CONFIG_FILE</var></b> variable.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="configname"
  values={[
    {label: 'LUMOS_CONFIG_NAME', value: 'configname'},
    {label: 'LUMOS_CONFIG_FILE', value: 'congfile'},
  ]}>
<TabItem value="configname">  <p><ul><li>The <var>LUMOS_CONFIG_NAME</var> variable can take the <code>LINA</code> value to boot the DApp with the pre-defined configurations of the <b>Mainnet</b> network.</li><li>The <var>LUMOS_CONFIG_NAME</var> variable can take the <code>AGGRON4</code> value to boot the DApp with the pre-defined configurations of the <b>Testnet</b> network.</li></ul></p><p>For more information, see <a href="../tutorials/config#set-up-the-config-manager-by-using-pre-defined-configurations">Set Up the Config Manager by Using Pre-defined Configurations</a>.</p>

</TabItem>
    <TabItem value="congfile"><p>The <var>LUMOS_CONFIG_FILE</var> variable can take the value of a local config file name, for example, <var>config.json</var>, to boot the DApp with the configurations of <b>DEV chain</b>.</p><p>For more information, see <a href="../tutorials/config#set-up-the-config-manager-by-using-a-local-config-file">Set Up the Config Manager by Using a Local Config File</a>.</p>

</TabItem>
</Tabs>

## Prerequisites

The following prerequisites apply for setting up the config manager:

- The development environment is set up.

  For more information, see [Set Up the Development Environment](../preparation/setupsystem).

- The `@ckb-lumos/config-manager` package is installed.

  For more information about how to install a Lumos package, see [Install Lumos Packages](../tutorials/installlumos).

## Set Up the Config Manager by Using Pre-defined Configurations

To boot the DApp with the pre-defined **Mainnet** configurations, assign <b>LINA</b> to the <var>LUMOS_CONFIG_NAME</var> variable.

Example:

```typescript {3}
import { env } from "process";
import { getConfig, initializeConfig } from "@ckb-lumos/config-manager";
env.LUMOS_CONFIG_NAME = "LINA";
initializeConfig();
export const CONFIG = getConfig();
```

To boot the DApp with the pre-defined **Testnet** configurations, assign **AGGRON4** to the <var>LUMOS_CONFIG_NAME</var> variable.

Example:

```typescript {3}
import { env } from "process";
import { getConfig, initializeConfig } from "@ckb-lumos/config-manager";
env.LUMOS_CONFIG_NAME = "AGGRON4";
initializeConfig();
export const CONFIG = getConfig();
```

## Set Up the Config Manager by Using a Local Config File

Lumos reads the configurations from the config file that is specified by the <var>LUMOS_CONFIG_FILE</var> variable. 

If the <var>LUMOS_CONFIG_FILE</var> variable is unsigned, Lumos reads configurations from the `config.json` file in the current directory.

To boot the DApp on **DEV chain**, the config file must contain the configurations of DEV chain.

To set up the config manager by using a local config file:

1. Prepare the `config.json` file with the configurations of **DEV chain** in the project root directory.

   ```json
   {
     "PREFIX": "ckt",
     "SCRIPTS": {
       "SECP256K1_BLAKE160": {
         "CODE_HASH": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
         "HASH_TYPE": "type",
         "TX_HASH": "0xace5ea83c478bb866edf122ff862085789158f5cbff155b7bb5f13058555b708",
         "INDEX": "0x0",
         "DEP_TYPE": "dep_group",
         "SHORT_ID": 0
       },
       "SECP256K1_BLAKE160_MULTISIG": {
         "CODE_HASH": "0x5c5069eb0857efc65e1bca0c07df34c31663b3622fd3876c876320fc9634e2a8",
         "HASH_TYPE": "type",
         "TX_HASH": "0xace5ea83c478bb866edf122ff862085789158f5cbff155b7bb5f13058555b708",
         "INDEX": "0x1",
         "DEP_TYPE": "dep_group",
         "SHORT_ID": 1
       },
       "DAO": {
         "CODE_HASH": "0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e",
         "HASH_TYPE": "type",
         "TX_HASH": "0xa563884b3686078ec7e7677a5f86449b15cf2693f3c1241766c6996f206cc541",
         "INDEX": "0x2",
         "DEP_TYPE": "code"
       }
     }
   }
   ```

2. Set up the config manager in the DApp.

   Example:

   ```typescript title="hellolumos/src/index.ts"
   import { env } from "process";
   import { getConfig, initializeConfig } from "@ckb-lumos/config-manager";
   env.LUMOS_CONFIG_FILE = env.LUMOS_CONFIG_FILE || "./config.json";
   initializeConfig();
   export const CONFIG = getConfig();
   ```