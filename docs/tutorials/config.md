---
id: config
title: Set Up the Config Manager
---
The config manager  (`@ckb-lumos/config-manager`) supports the DApp to boot with a specific chain configuration. All the other components in Lumos can leverage the configuration from the config manager directly.

A DApp can set up the config manger by one of the following variables:

| Variable                     | Value                                                        |
| ---------------------------- | ------------------------------------------------------------ |
| <var>LUMOS_CONFIG_NAME</var> | <div><ul><li> `LINA`: To boot the DApp with the configurations of the ***Mainnet*** network.</li><li>`AGGRON4`: To boot the DApp with the configurations of the ***Testnet*** network</li></ul></div><p>For more information, see [Set Up the Config Manager by Using Pre-defined Configurations](../tutorials/config#set-up-the-config-manager-by-using-pre-defined-configurations).</p> |
| <var>LUMOS_CONFIG_FILE</var> | A local config file, for example, config.json: To boot the DApp with the configurations of the ***DEV chain***, specify the <var>LUMOS_CONFIG_FILE</var> variable with a local config file. <br/>For more information, see [Set Up the Config Manager by Using a Local Config File](../tutorials/config#set-up-the-config-manager-by-using-a-local-config-file). |

## Prerequisites

The following prerequisites apply for setting up the config manager:

- Node.js is installed.
- The @ckb-lumos/config-manager package is installed.

## Set Up the Config Manager by Using Pre-defined Configurations

To boot the DApp with the pre-defined Mainnet configurations, you can specify the <var>LUMOS_CONFIG_NAME</var> variable with <b>LINA</b>.

Example:

```typescript
import { env } from "process";
import { getConfig, initializeConfig } from "@ckb-lumos/config-manager";
env.LUMOS_CONFIG_NAME = "LINA";
initializeConfig();
export const CONFIG = getConfig();
```

To boot the DApp with the pre-defined Testnet configurations, you can specify the variable with <b>AGGRON4</b>.

Example:

```typescript
import { env } from "process";
import { getConfig, initializeConfig } from "@ckb-lumos/config-manager";
env.LUMOS_CONFIG_NAME = "AGGRON4";
initializeConfig();
export const CONFIG = getConfig();
```

## Set Up the Config Manager by Using a Local Config File

The <var>LUMOS_CONFIG_FILE</var> variable can be set pointing to a local configuration file. Lumos reads the configurations from that configuration file.  

:::note

If the <var>LUMOS_CONFIG_FILE</var> variable is not set, Lumos reads configurations from the `config.json` file in the current directory.

:::

### Step 1. Prepare the `config.json` file in the project root directory.

Prepare the file with the following content (the configurations of **DEV chain**):

```json title="hellolumos/config.json" {1-28}
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

### Step 2. Set up the config manager in the DApp.

Example:

```typescript title="hellolumos/src/index.ts"
import { env } from "process";
import { getConfig, initializeConfig } from "@ckb-lumos/config-manager";
env.LUMOS_CONFIG_FILE = env.LUMOS_CONFIG_FILE || "./config.json";
initializeConfig();
export const CONFIG = getConfig();
```
