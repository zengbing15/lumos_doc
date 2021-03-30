---
id: indexer
title: Set Up the Lumos Indexer
---
Lumos is designed based on the [`Index-Query-Assemble`](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern. The Lumos indexer polls blocks from a CKB node, indexes them and stores the indexed data in a local database to provide optimal queries.

<!--Dapps built with Lumos must have an indexer configured and running.-->

Lumos provides the following two types of indexers:

- The RocksDB backed indexer: The RocksDB backed indexer is contained in the  `@ckb-lumos/indexer` package. After the `@ckb-lumos/indexer` package is installed, the RocksDB backed indexer can be used directly.

- The SQL backed indexer: The Lumos indexer supports the SQL database of the latest stable versions of PostgreSQL and MySQL. A separate package, the `@ckb-lumos/sql-indexer` package contains the SQL backed indexer. Specific SQL database settings are required before using the SQL backed indexer. 

  :::note

  The usage for the SQL backed indexer is not fully verified. It is still in the experimental stage.

  :::

<!--Note this issue is actually caused since we are still leveraging the old native node module solution. We are also evaluating other solutions, such as [N-API](https://medium.com/@atulanand94/beginners-guide-to-writing-nodejs-addons-using-c-and-n-api-node-addon-api-9b3b718a9a7f), which is based on a stable API, so there is no need to recompile everything for a different Node.js version. We do hope that in later versions, we can convert to N-API so there is not need to deal with inconsistent module versions.-->

:::tip

The Lumos indexer is based on the CKB indexer that is developed by Rust. To leverage the native Rust code without installing Rust, Lumos provides the Lumos indexer with a pre-built native module of the CKB indexer.

For Electron applications, you can install the pre-built native module of the CKB indexer by running the <b>LUMOS_NODE_RUNTIME=electron npm i</b> command.

:::

## Environment

The following examples are verified on Ubuntu 20.04.2. Steps on the other platforms can be adjusted accordingly.

## Set Up the RocksDB Backed Indexer

The following prerequisites apply for setting up the RocksDB backed indexer:

- Node.js and Yarn are installed.
- Dependencies for build tools are installed.

### Step 1. Install the indexer package.

The following example installs the RocksDB backed indexer as a dependency for a project.

```shell
$ cd mydapp
$ yarn add @ckb-lumos/indexer
```

### Step 2. Start the indexer.

The following example starts the RocksDB backed indexer. The default RPC URL of the local CKB node is http://127.0.0.1:8114. 

```typescript title="mydapp/src/index.ts"
import { Indexer } from "@ckb-lumos/indexer";
const CKB_RPC = "http://127.0.0.1:8114";
const INDEXER = new Indexer(CKB_RPC, "./indexed-data");
INDEXER.startForever();
```

## Set Up the SQL Backed Indexer

To be Updated...

The following prerequisites apply for setting up the SQL backed indexer:

- Node.js and Yarn are installed.
- Dependencies for build tools are installed.

### Step 1. Install Docker.

For more information about Docker installation, see [Install Docker Engine](https://docs.docker.com/engine/install/).

### Step 2. Create a PostgreSQL instance.

```shell
$ docker run --name postgres -e POSTGRES_USER=user -e POSTGRES_DB=lumos -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
```

### Step 3. Clone the Lumos repository to initialize the SQL database.

```shell
$ cd $TOP
$ git clone --recursive https://github.com/nervosnetwork/lumos
$ cd lumos && git checkout v0.15.0
$ yarn
$ cd packages/sql-indexer
$ cat << EOF > knexfile.js
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'lumos',
      user:     'user',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
EOF
$ npx knex migrate:up
```

### Step 4. Check the Current Indexed Tip

To check the current indexed tip after the indexer is started:

```
> const { Indexer, CellCollector, TransactionCollector } = require("@ckb-lumos/sql-indexer");
> const indexer = new Indexer("http://127.0.0.1:5432", "/tmp/indexed-data");
> indexer.startForever();
> await indexer.tip()
{
  block_number: '0x0',
  block_hash: '0x120ab9abd48e3b82f93b88eba8c50a0e1304cc2fffb5573fb14b56c6348f2305'
}
```

<!--Electron has a different application binary interface (ABI) from a given Node.js binary, that will cause different Node.js version errors for Electron applications. So the pre-built native module of the CKB indexer needs to be used.-->

<!--First, we do provide pre-built binaries linked with electron's node version.-->

<!--Install npm dependencies in your Electron app to make sure the pre-built native modules compiled for Electron to be downloaded.-->

<!--You can also follow the [steps](https://neon-bindings.com/docs/electron-apps) in Neon's documentation to rebuild the modules.--><!--Note: This workaround requires to install Rust on the system.-->