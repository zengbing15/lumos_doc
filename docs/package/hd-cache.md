---
id: hdcache
title: HD Cache Manager
---
The HD cache manager builds a memory cache for derived addresses and live cells of these addresses.

## Examples

### Sync Cache from Indexer

```javascript
const { CacheManager, CellCollector, CellCollectorWithQueryOptions, getBalance } = require("@ckb-lumos/hd-cache")
const { Indexer } = require("@ckb-lumos/indexer")
const indexer = new Indexer("http://localhost:8114", "./indexer-data")
const cacheManger = CacheManager.loadFromKeystore(indexer, "You keystore path", "You password")
// start to sync cache from indexer
cacheManager.startForever()
```

### Get Master Public Key

```javascript
// if your keystore is from ckb-cli or you set needMasterPublicKey to true, you can get you master public key info by
cacheManager.getMasterPublicKeyInfo() // ckb-cli using this key by default

// now you can use the following methods
cacheManager.getNextReceivingPublicKeyInfo()
cacheManager.getNextChangePublicKeyInfo()
```

### Collect Cells

```javascript
// collect cells  by CellCollectors
const cellCollector = new CellCollector(cacheManager)
// or with queryOptions
const cellCollector = new CellCollectorWithQueryOptions(
  new CellCollector(cacheManger),
  queryOptions,
)

for await (const cell of cellCollector.collect()) {
  console.log(cell)
}
```

### Get the HD Wallet Balance

```javascript
// get HD wallet balance
await getBalance(cellCollector)
```

