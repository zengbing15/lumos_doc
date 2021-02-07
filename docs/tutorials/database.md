---
id: database
title: Set Up the Database
---
Lumos is designed based on the [`Index-Query-Assemble`](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern. The Lumos indexer polls blocks from a CKB node, indexes them and stores the indexed data in a local database to provide optimal query.

<!--Dapps built with Lumos must have an indexer configured and running.-->

The Lumos indexer supports two types of databases:

- The RocksDB database: The RocksDB backed indexer is contained in the  `@ckb-lumos/indexer` package.
- The SQL database: The Lumos indexer supports the SQL database of the latest stable versions of PostgreSQL and MySQL. A separate package, the `@ckb-lumos/sql-indexer` package contains the SQL backed indexer. The SQL backed indexer is using the same interface as the RocksDB backed indexer. 

**Note**:  The usage for the SQL backed indexer is not fully verified. It is still in the experimental stage.

<!--Note this issue is actually caused since we are still leveraging the old native node module solution. We are also evaluating other solutions, such as [N-API](https://medium.com/@atulanand94/beginners-guide-to-writing-nodejs-addons-using-c-and-n-api-node-addon-api-9b3b718a9a7f), which is based on a stable API, so there is no need to recompile everything for a different Node.js version. We do hope that in later versions, we can convert to N-API so there is not need to deal with inconsistent module versions.-->

## Operations

### Set Up the RocksDB Database

```javascript
const { Indexer, CellCollector, TransactionCollector } = require("@ckb-lumos/indexer");
const indexer = new Indexer("http://127.0.0.1:8114", "/tmp/indexed-data");
indexer.startForever();
```

### Set Up the SQL Database

**Step 1. Create a PostgreSQL instance.**

```
$ docker run --name postgres -e POSTGRES_USER=user -e POSTGRES_DB=lumos -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
```

**Step 2. Clone the Lumos repository to initialize the SQL database.**

```
$ cd $TOP
$ git clone --recursive https://github.com/nervosnetwork/lumos
$ cd lumos && git checkout v0.14.2-rc6
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

**Step 3. Start the SQL Indexer.**

```
const { Indexer, CellCollector, TransactionCollector } = require("@ckb-lumos/sql-indexer");
const indexer = new Indexer("http://127.0.0.1:5432", "/tmp/indexed-data");
indexer.startForever();
```

### Install the Pre-built Native Module for Electron Applications

The Lumos indexer is based on the CKB indexer that is developed by Rust. To leverage the native Rust code without installing Rust, Lumos provides the Lumos indexer with a pre-built native module of the CKB indexer.

<!--Electron has a different application binary interface (ABI) from a given Node.js binary, that will cause different Node.js version errors for Electron applications. So the pre-built native module of the CKB indexer needs to be used.-->

<!--First, we do provide pre-built binaries linked with electron's node version.-->

To install the pre-built native module of the CKB indexer that is compiled for Electron: 

<!--Install npm dependencies in your Electron app to make sure the pre-built native modules compiled for Electron to be downloaded.-->

```bash
$ LUMOS_NODE_RUNTIME=electron npm i
```

<!--You can also follow the [steps](https://neon-bindings.com/docs/electron-apps) in Neon's documentation to rebuild the modules.--><!--Note: This workaround requires to install Rust on the system.-->