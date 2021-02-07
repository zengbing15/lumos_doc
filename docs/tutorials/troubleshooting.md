---
id: nativemodule
title: Install the Pre-built Native Module for Electron Applications
---
The Lumos indexer is based on the CKB indexer that is developed by Rust. To leverage the native Rust code without installing Rust, Lumos provides the Lumos indexer with a pre-built native module of the CKB indexer.

<!--Electron has a different application binary interface (ABI) from a given Node.js binary, that will cause different Node.js version errors for Electron applications. So the pre-built native module of the CKB indexer needs to be used.-->

<!--First, we do provide pre-built binaries linked with electron's node version.-->

To install the pre-built native module of the CKB indexer that is compiled for Electron: 

<!--Install npm dependencies in your Electron app to make sure the pre-built native modules compiled for Electron to be downloaded.-->

```bash
$ LUMOS_NODE_RUNTIME=electron npm i
```

<!--You can also follow the [steps](https://neon-bindings.com/docs/electron-apps) in Neon's documentation to rebuild the modules.--><!--Note: This workaround requires to install Rust on the system.-->