---
id: database
title: Database
---
Lumos is designed based on the [`Index-Query-Assemble`](https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern) pattern. The Lumos indexer polls blocks from a CKB node, indexes them and stores the indexed data in a local database to provide optimal query.

<!--Dapps built with Lumos must have an indexer configured and running.-->

The Lumos indexer supports two types of databases:

- The RocksDB database: The RocksDB backed indexer is contained in the  `@ckb-lumos/indexer` package. After the `@ckb-lumos/indexer` package is installed, the RocksDB backed indexer can be used directly.
- The SQL database: The Lumos indexer supports the SQL database of the latest stable versions of PostgreSQL and MySQL. A separate package, the `@ckb-lumos/sql-indexer` package contains the SQL backed indexer. Specific SQL database settings are required before using the SQL backed indexer. 

**Note**:  The usage for the SQL backed indexer is not fully verified. It is still in the experimental stage.

For more information about the setup of the database, see [Set Up the Database](../tutorials/database).