---
id: config
title: Set Up the Config Manager
---
## Config Manager

The config manager deals with differences between chains, such as the Mainnet, Testnet, or numerous DEV chains. Each chain is abstracted into an individual configuration file. 

When a configuration file is loaded, the config manager handles the chain specific logic that saves corresponding coding effort for configuration management.

The config manager supports the DApp to boot with a specific chain configuration. All the other components in Lumos can leverage the configuration from the config manager directly.

There are two options for setting up the config manager:

- For a DApp to connect to a ***Mainnet*** or ***Testnet*** node, **setup the config manager by using pre-defined configurations**. The pre-defined configurations is specified by the `LUMOS_CONFIG_NAME` variable.
- For a DApp to connect to a CKB node on ***DEV chain***, **setup the configuration manager by using a local config file**. The local config file is specified by the `LUMOS_CONFIG_FILE` variable. 

## Prerequisites

The following prerequisites apply for setting up the config manager:

- Node.js is installed.
- Lumos packages are installed.

## Set Up the Config Manager by Using Pre-defined Configurations

For the DApp to connect a *Mainnet* or *Testnet* node, choose corresponding pre-defined configurations for setting up the config manager:

- `LINA`: Mainnet pre-defined configurations

- `AGGRON4`: Testnet pre-defined configurations 

  **Note**: When Testnet is reset, the Lumos config manager must be upgraded with the new Testnet configurations.

The following example sets up the config manager for a CKB **Mainnet** node by specifying the variable <code>LUMOS_CONFIG_NAME</code> with <b>LINA</b>. You can specify the variable with <b>AGGRON4</b> for a CKB **Testnet** node.

Example:

```typescript title="/mydapp/src/index.ts"
import { env } from "process";
import { getConfig, initializeConfig } from "@ckb-lumos/config-manager";
env.LUMOS_CONFIG_NAME = "LINA";
initializeConfig();
export const CONFIG = getConfig();
```

## Set Up the Config Manager by Using a Local Config File

For the DApp to connect a CKB node on **DEV chain**, use a local configuration file for setting up the config manager.

The `LUMOS_CONFIG_FILE` variable can be set pointing to a configuration file. Lumos reads the configurations from that configuration file.  

**Note**: If the `LUMOS_CONFIG_FILE` variable is not set, Lumos reads configurations from the `config.json` file in the current directory.

The following example sets up the config manager for a CKB node on **DEV chain**.

Step 1. Prepare the config.json file in the DApp root directory, for example, hellolumos/config.json.

```json title="hellolumos/config.json"
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

Step 2. Set up the config manager in the DApp as follows.

```typescript title="hellolumos/src/index.ts"
import { env } from "process";
import { getConfig, initializeConfig } from "@ckb-lumos/config-manager";
env.LUMOS_CONFIG_FILE = env.LUMOS_CONFIG_FILE || "./config.json";
initializeConfig();
export const CONFIG = getConfig();
```

