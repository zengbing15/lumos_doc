---
id: database
title: Set Up the SQL Database
---
Lumos is designed based on the [`Index-Query-Assemble`](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern. The Lumos indexer polls blocks from a CKB node, indexes them and stores the indexed data in a local database to provide optimal query.

<!--Dapps built with Lumos must have an indexer configured and running.-->

The Lumos indexer supports two types of databases:

- The RocksDB database: The RocksDB backed indexer is contained in the  `@ckb-lumos/indexer` package. After the `@ckb-lumos/indexer` package is installed, the RocksDB backed indexer can be used directly.
- The SQL database: The Lumos indexer supports the SQL database of the latest stable versions of PostgreSQL and MySQL. A separate package, the `@ckb-lumos/sql-indexer` package contains the SQL backed indexer. Specific SQL database settings are required before using the SQL backed indexer. 

**Note**:  The usage for the SQL backed indexer is not fully verified. It is still in the experimental stage.

<!--Note this issue is actually caused since we are still leveraging the old native node module solution. We are also evaluating other solutions, such as [N-API](https://medium.com/@atulanand94/beginners-guide-to-writing-nodejs-addons-using-c-and-n-api-node-addon-api-9b3b718a9a7f), which is based on a stable API, so there is no need to recompile everything for a different Node.js version. We do hope that in later versions, we can convert to N-API so there is not need to deal with inconsistent module versions.-->

## Steps

### Step 1. Create a PostgreSQL instance.

```shell
$ docker run --name postgres -e POSTGRES_USER=user -e POSTGRES_DB=lumos -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
```

### Step 2. Clone the Lumos repository to initialize the SQL database.

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
      user:     'postgres',
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

### Step 3. Check the Current Indexed Tip

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

### Install the Pre-built Native Module for Electron Applications

The Lumos indexer is based on the CKB indexer that is developed by Rust. To leverage the native Rust code without installing Rust, Lumos provides the Lumos indexer with a pre-built native module of the CKB indexer.

<!--Electron has a different application binary interface (ABI) from a given Node.js binary, that will cause different Node.js version errors for Electron applications. So the pre-built native module of the CKB indexer needs to be used.-->

<!--First, we do provide pre-built binaries linked with electron's node version.-->

To install the pre-built native module of the CKB indexer for Electron applications: 

<!--Install npm dependencies in your Electron app to make sure the pre-built native modules compiled for Electron to be downloaded.-->

```bash
$ LUMOS_NODE_RUNTIME=electron npm i
```

<!--You can also follow the [steps](https://neon-bindings.com/docs/electron-apps) in Neon's documentation to rebuild the modules.--><!--Note: This workaround requires to install Rust on the system.-->