---
id: troubleshooting
title: Recompiling Native Modules for Electron Applications
---
The Lumos indexer is based on the CKB indexer that is developed by Rust. To leverage the native Rust code without installing Rust, Lumos provides the Lumos indexer with a pre-built native module of the CKB indexer.

For Electron applications, the native module needs to be recompiled. Because Electron has a different application binary interface (ABI) from a given Node.js binary that will cause errors for the Electron applications.

<!--First, we do provide pre-built binaries linked with electron's node version.-->

To fix or avoid the error: 

Install npm dependencies in your Electron app to make sure the pre-built native modules compiled for Electron to be downloaded.

```bash
$ LUMOS_NODE_RUNTIME=electron npm i
```

You can also follow the [steps](https://neon-bindings.com/docs/electron-apps) in Neon's documentation to rebuild the modules. 

Note: this workaround requires to install Rust on system.