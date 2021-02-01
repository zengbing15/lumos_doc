---
id: configmanager
title: Configuration Manager
---
The configuration manager deals with differences between chains, such as the mainnet, testnet, or numerous dev chains. Each chain is abstracted into an individual config file. 

When a config file is loaded, the configuration manager handles the chain specific logic that saves corresponding coding effort for configuration management.

The configuration  manager supports the node app to boot with a specific chain configuration, so other parts in Lumos can consult the configuration manager directly for information.

There are two options for setting up the configuration manager:

- Setup the configuration manager using pre-defined configurations specified by the `LUMOS_CONFIG_NAME` variable.

  Pre-defined configurations include:

  - `LINA`: mainnet configurations

  - `AGGRON4`: testnet configurations 

    **Note**: When the `AGGRON4` testnet network is reset, Lumos is upgraded with new testnet configurations.

  Example:

  ```
  $ LUMOS_CONFIG_NAME=LINA node --experimental-repl-await
  Welcome to Node.js v12.16.2.
  Type ".help" for more information.
  > const { initializeConfig, getConfig } = require("@ckb-lumos/config-manager");
  > initializeConfig();
  > getConfig();
  {
    PREFIX: 'ckb',
    SCRIPTS: {
      SECP256K1_BLAKE160: {
        CODE_HASH: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
        HASH_TYPE: 'type',
        TX_HASH: '0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c',
        INDEX: '0x0',
        DEP_TYPE: 'dep_group',
        SHORT_ID: 0
      },
      SECP256K1_BLAKE160_MULTISIG: {
        CODE_HASH: '0x5c5069eb0857efc65e1bca0c07df34c31663b3622fd3876c876320fc9634e2a8',
        HASH_TYPE: 'type',
        TX_HASH: '0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c',
        INDEX: '0x1',
        DEP_TYPE: 'dep_group',
        SHORT_ID: 1
      },
      DAO: {
        CODE_HASH: '0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e',
        HASH_TYPE: 'type',
        TX_HASH: '0xe2fb199810d49a4d8beec56718ba2593b665db9d52299a0f9e6e75416d73ff5c',
        INDEX: '0x2',
        DEP_TYPE: 'code'
      }
    }
  }
  ```

- Setup the configuration manager via a local config file.

  - The `LUMOS_CONFIG_FILE` variable can be set pointing to a config file from that Lumos reads the configurations.  

  - If the `LUMOS_CONFIG_FILE` variable is not set, Lumos reads configurations from the `config.json` file in the current directory.

  Example:

  ```
  $ cat <<EOF > config.json
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
  EOF
  $ LUMOS_CONFIG_FILE="config.json" node --experimental-repl-await
  Welcome to Node.js v12.16.2.
  Type ".help" for more information.
  > const { initializeConfig, getConfig } = require("@ckb-lumos/config-manager");
  > initializeConfig();
  ```

  