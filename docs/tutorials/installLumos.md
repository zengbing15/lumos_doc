---
id: installlumos
title: Install Lumos Packages for a Node Project
---
The node project is used to run the JavaScript code developed for the DApp.

## Prerequisites

The following prerequisites apply for installing Lumos packages for a node project:

- NodeJS and yarn are installed.

## Install Lumos Packages on Ubuntu 20.04

**Steps**

To install Lumos packages for a node project on Ubuntu 20.04:

### Step 1. Install Dependencies for node-gyp

node-gyp is a cross-platform command-line tool for compiling native addon modules for *Node*.js.

The following dependencies are required to be installed for node-gyp on Ubuntu 20.04:

- `GCC` (GNU Compiler Collection) 
- `make` 

For more information, see the instructions of [node-gyp](https://github.com/nodejs/node-gyp).

To install `GCC` and `make`, run the following command as root or user with sudo privileges:

```
$ sudo apt update
$ sudo apt install build-essential
```

### **Step 2. Create a new directory for the project and navigate into the directory.**

```
$ mkdir mydapp
$ cd mydapp
```

### **Step 3. Create a `package.json` file for the project by using the `yarn init` command.**

This command prompts questions about the name and version of the project and the name of the initial entry point file (by default this is **index.js**). Just accept the defaults by hitting enter or type answers for each of the questions.

```
$ yarn init
yarn init v1.22.5
question name (mydapp):
question version (1.0.0):
question description:
question entry point (index.js):
question repository url:
question author:
question license (MIT):
question private:
success Saved package.json
Done in 44.54s.
```

### **Step 4. Install Lumos packages as dependencies for the project.**

A Lumos packages can be installed according to the application requirements by using the `yarn add` command or the `npm install` command.

The following example installs the indexer, the common-scripts, the config-manager packages and their dependencies for the project.

```shell
$ yarn add @ckb-lumos/indexer@0.15.0 @ckb-lumos/common-scripts@0.15.0 @ckb-lumos/config-manager@0.15.0
yarn add v1.22.5
info No lockfile found.
[1/4] Resolving packages...
warning @ckb-lumos/indexer > neon-cli@0.4.2: Please upgrade to 0.5.0
warning @ckb-lumos/indexer > request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
warning @ckb-lumos/indexer > node-pre-gyp@0.14.0: Please upgrade to @mapbox/node-pre-gyp: the non-scoped node-pre-gyp package is deprecated and only the @mapbox scoped package will recieve updates in the future
warning @ckb-lumos/indexer > request > har-validator@5.1.5: this library is no longer supported
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 167 new dependencies.
info Direct dependencies
├─ @ckb-lumos/common-scripts@0.15.0
├─ @ckb-lumos/config-manager@0.15.0
└─ @ckb-lumos/indexer@0.15.0
info All dependencies
├─ @ckb-lumos/common-scripts@0.15.0
├─ @ckb-lumos/config-manager@0.15.0
├─ @ckb-lumos/helpers@0.15.0
├─ @ckb-lumos/indexer@0.15.0
├─ @ckb-lumos/rpc@0.15.0
├─ abbrev@1.1.1
├─ ...
├─ ...
├─ wide-align@1.1.3
├─ wordwrap@1.0.0
├─ wordwrapjs@4.0.0
├─ xxhash@0.3.0
└─ yallist@3.1.1
Done in 125.02s.
```

## Install Lumos Packages on Windows 10

**Steps**

To install Lumos packages for a node project on Windows 10:

### Step 1.  Install node-gyp

```
C:\Users\username> npm install -g node-gyp
```

### Step 2. Install and Configure Dependencies for node-gyp

The following dependencies are required for node-gyp on Windows:

- [Python 3](https://www.python.org/downloads/)
- [Visual Studio 2019 Community](https://visualstudio.microsoft.com/pl/thank-you-downloading-visual-studio/?sku=Community) (using the "Desktop development with C++" workload)

After the installation of python and Visual Studio, run the following commands:

```
C:\Users\username> npm config set msvs_version 2019
C:\Users\username> npm config set python /path/to/executable/python
```

For more information about the installation of the dependencies, see the instructions for [node-gyp](https://github.com/nodejs/node-gyp).

### **Step 2. Create a new directory for the project and navigate into the directory.**

```
C:\Users\username> mkdir mydapp
C:\Users\username> cd mydapp
```

### **Step 3. Create a `package.json` file for the project by using the `yarn init` command.**

This command prompts questions about the name and version of the project and the name of the initial entry point file (by default this is **index.js**). Just accept the defaults by hitting enter or type answers for each of the questions.

```
C:\Users\username\mydapp> yarn init
yarn init v1.22.5
question name (mydapp):
question version (1.0.0):
question description:
question entry point (index.js):
question repository url:
question author:
question license (MIT):
question private:
success Saved package.json
Done in 44.54s.
```

### **Step 4. Install Lumos packages as dependencies for the project.**

A Lumos packages can be installed according to the application requirements by using the `yarn add` command or the `npm install` command.

The following example installs the indexer, the common-scripts, the config-manager packages and their dependencies for the project.

```shell
C:\Users\username> yarn add @ckb-lumos/indexer@0.15.0 @ckb-lumos/common-scripts@0.15.0 @ckb-lumos/config-manager@0.15.0
yarn add v1.22.5
info No lockfile found.
[1/4] Resolving packages...
warning @ckb-lumos/indexer > neon-cli@0.4.2: Please upgrade to 0.5.0
warning @ckb-lumos/indexer > request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
warning @ckb-lumos/indexer > node-pre-gyp@0.14.0: Please upgrade to @mapbox/node-pre-gyp: the non-scoped node-pre-gyp package is deprecated and only the @mapbox scoped package will recieve updates in the future
warning @ckb-lumos/indexer > request > har-validator@5.1.5: this library is no longer supported
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 167 new dependencies.
info Direct dependencies
├─ @ckb-lumos/common-scripts@0.15.0
├─ @ckb-lumos/config-manager@0.15.0
└─ @ckb-lumos/indexer@0.15.0
info All dependencies
├─ @ckb-lumos/common-scripts@0.15.0
├─ @ckb-lumos/config-manager@0.15.0
├─ @ckb-lumos/helpers@0.15.0
├─ @ckb-lumos/indexer@0.15.0
├─ @ckb-lumos/rpc@0.15.0
├─ abbrev@1.1.1
├─ ...
├─ ...
├─ wide-align@1.1.3
├─ wordwrap@1.0.0
├─ wordwrapjs@4.0.0
├─ xxhash@0.3.0
└─ yallist@3.1.1
Done in 125.02s.
```

## Troubleshooting

### gyp Error About Missing Dependencies for node-gyp

If any gyp error about missing dependencies for node-gyp is encountered when running the `yarn add` or `npm install` command, go to check the details in the instructions for [node-gyp](https://github.com/nodejs/node-gyp) to fix the error.

### Error While Rebuilding the xxhash Package

node-gyp rebuilds the xxhash package during the `yarn add` or `npm install` process. Incompatible NodeJS may cause the rebuild failure. Reinstall a lower version of NodeJS, for example, NodeJS 12, and then install Lumos packages.

### node-pre-gyp ERR! stack Error: read ECONNRESET

If `npm install` is used to install Lumos packages, and the installation fails raising an error of "node-pre-gyp ERR! stack Error: read ECONNRESET", try the `yarn add` command instead to install the Lumos packages.