---
id: database
title: Database Setup
---
Lumos is designed based on the [`Index-Query-Assemble`](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern. The Lumos indexer polls blocks from a CKB node, indexes them and stores the indexed data in a local database to provide optimal query.

Dapps built with Lumos must have an indexer configured and running.

Lumos provides two types of indexer:

- A RocksDB backed indexer: The RocksDB backed indexer is contained in the  `@ckb-lumos/indexer` package.
- A SQL backed indexer: A separate package, the `@ckb-lumos/sql-indexer` package contains the SQL backed indexer. The SQL backed indexer is using the same interface as the RocksDB backed indexer. Now Lumos supports the SQL databases of the latest stable versions of PostgreSQL and MySQL.

**Note**:  The usage for the SQL backed indexer is not fully verified. It is still in the experimental stage.

<!--Note this issue is actually caused since we are still leveraging the old native node module solution. We are also evaluating other solutions, such as [N-API](https://medium.com/@atulanand94/beginners-guide-to-writing-nodejs-addons-using-c-and-n-api-node-addon-api-9b3b718a9a7f), which is based on a stable API, so there is no need to recompile everything for a different Node.js version. We do hope that in later versions, we can convert to N-API so there is not need to deal with inconsistent module versions.-->

## Operations

### Use the RocksDB Indexer

```javascript
const { Indexer, CellCollector, TransactionCollector } = require("@ckb-lumos/indexer");
const indexer = new Indexer("http://127.0.0.1:8114", "/tmp/indexed-data");
indexer.startForever();
```

### Use the SQL Backed Indexer

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