---
id: indexer
title: Set Up the Lumos Indexer
---
Lumos was designed on the basis of the [Index-Query-Assemble](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern. The Lumos indexer polls blocks from a CKB node, indexes them and stores the indexed data in a local database to provide optimal queries.

<!--Dapps built with Lumos must have an indexer configured and running.-->

Lumos provides the following two types of indexers:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="rocksdb"
  values={[
    {label: 'RocksDB Backed Indexer', value: 'rocksdb'},
    {label: 'SQL Backed Indexer', value: 'sql'},
  ]}>
<TabItem value="rocksdb"><p>The RocksDB backed indexer is contained in the  <code>@ckb-lumos/indexer</code> package. After the <code>@ckb-lumos/indexer</code> package is installed, the RocksDB backed indexer can be used directly.</p>

</TabItem>
    <TabItem value="sql"><p>The Lumos indexer supports the latest stable versions of SQL databases for PostgreSQL and MySQL. A separate package, the <code>@ckb-lumos/sql-indexer</code> package, contains the SQL backed indexer. Specific SQL database settings are required before using the SQL backed indexer.</p>

:::note

The usage for the SQL backed indexer is not fully verified. It is still in the experimental stage.

:::

</TabItem>
</Tabs>

<!--Note this issue is actually caused since we are still leveraging the old native node module solution. We are also evaluating other solutions, such as [N-API](https://medium.com/@atulanand94/beginners-guide-to-writing-nodejs-addons-using-c-and-n-api-node-addon-api-9b3b718a9a7f), which is based on a stable API, so there is no need to recompile everything for a different Node.js version. We do hope that in later versions, we can convert to N-API so there is not need to deal with inconsistent module versions.-->

:::info

The Lumos indexer is based on the CKB indexer that is developed by Rust. To leverage the native Rust code without installing Rust, Lumos provides the Lumos indexer with a pre-built native module of the CKB indexer.

For native desktop applications written in *Electron.js*, you can install the pre-built native module of the CKB indexer by running the <b>LUMOS_NODE_RUNTIME=electron npm i</b> command.

:::

## Prerequisites

The following prerequisites apply for setting up the Lumos indexer:

- The development environment is set up. 

  For more information, see [Set Up the Development Environment](../preparation/setupsystem).

## Environment

The following examples are verified on Ubuntu 20.04.2. Steps on the other platforms can be adjusted accordingly.

## Set Up the RocksDB Backed Indexer

### Step 1. Install the indexer package.

To install the RocksDB backed indexer as a project dependency:

```shell
cd mydapp
yarn add @ckb-lumos/indexer
```

### Step 2. Start the indexer.

The Indexer URI is the <var>listen_address</var> configuration in the `ckb.toml` file of the CKB node. The default indexer URI is http://127.0.0.1:8114.

To initialize and start the RocksDB backed indexer:

```typescript
import { Indexer } from "@ckb-lumos/indexer";
const CKB_RPC = "http://127.0.0.1:8114";
export const INDEXER = new Indexer(CKB_RPC, "./indexed-data");
INDEXER.startForever();
```

## Set Up the SQL Backed Indexer

### Step 1. Install Docker.

Docker is required for setting up the SQL backed indexer. For more information about Docker installation, see [Install Docker Engine](https://docs.docker.com/engine/install/).

### Step 2. Create a PostgreSQL instance.

To create a postgreSQL instance: 

```shell
docker run --name postgres -e POSTGRES_USER=user -e POSTGRES_DB=lumos -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres
```

- --name <var>postgres</var>: The container is named as <var>postgres</var>.
- -e POSTGRES_USER=<var>user</var>: Name the superuser account as <var>user</var>.
-  -e POSTGRES_DB=<var>lumos</var>: Name the default database as <var>lumos</var>.
- -e POSTGRES_PASSWORD=<var>mypassword</var>: The password for the user account is <var>mypassword</var>.
- -p 5432:5432: Publish the container's 5432 port to the whole network of the host machine.
- -d: Run the container in the background with `--detach`.

### Step 3. Install dependencies for the DApp project.

To install the SQL backed indexer as a dependency for a project:

```shell
cd mydapp
yarn add @ckb-lumos/sql-indexer@0.16.0 knex pg
```

### Step 4. Initialize the SQL database.

Create the knexfile.js file under the <var>projectName</var>/node-modules/@ckb-lumos/packages/sql-indexer folder.

Example:

```javascript title="mydapp/node-modules/@ckb-lumos/packages/sql-indexer/knexfile.js"
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'lumos',
      user:     'user',
      password: 'mypassword'
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
```

Run the following command to migrate and update the local database:

```
npx knex migrate:up
```

### Step 5. Start the Indexer.

The Indexer URI is the <var>listen_address</var> configuration in the `ckb.toml` file of the CKB node. The default indexer URI is http://127.0.0.1:8114.

To initialize and start the SQL backed indexer:

```typescript
import { Indexer } from "@ckb-lumos/sql-indexer";
import { Knex } from "knex";

const knex = Knex({
	client: "postgresql",
	connection: {
  		host: "127.0.0.1",
  		database: "lumos",
  		password: "mypassword",
  		user: "user",
  	},
});
const sqlindexer = new Indexer("http://127.0.0.1:8114", knex);
sqlindexer.startForever();
```

<!--Electron has a different application binary interface (ABI) from a given Node.js binary, that will cause different Node.js version errors for Electron applications. So the pre-built native module of the CKB indexer needs to be used.-->

<!--First, we do provide pre-built binaries linked with electron's node version.-->

<!--Install npm dependencies in your Electron app to make sure the pre-built native modules compiled for Electron to be downloaded.-->

<!--You can also follow the [steps](https://neon-bindings.com/docs/electron-apps) in Neon's documentation to rebuild the modules.--><!--Note: This workaround requires to install Rust on the system.-->