---
id: installlumos
title: Install Lumos
---
This guide shows how to install Lumos packages that a DApp requires as dependencies. <!--For the projects that have already listed Lumos packages as dependencies, just run `yarn install` in the projects directly to install the packages.--> 

## Prerequisites

The following prerequisites apply for installing Lumos packages as dependencies for a project:

- The development environment is set up. 

  For more information, see [Set Up the Development Environment](../preparation/setupsystem).

## Environment

The following examples are verified on Ubuntu 20.04.2. Steps on the other platforms can be adjusted accordingly.

## Steps

### **Step 1. Navigate into the directory of the project.**

```
$ cd mydapp
```

### **Step 2. If this is a new project, initialize the project by using the `yarn init` command.**

This command prompts questions about the name and version of the project and the name of the initial entry point file (by default this is **index.js**). Just accept the defaults by hitting enter or type answers for each of the questions.

```
$ yarn init
```

<details><summary>OUTPUT</summary>
<p>




```shell
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

</p>
</details>

### **Step 3. Install Lumos packages as dependencies for the project.**

A Lumos package can be installed by using the `yarn add` command or the `npm install` command according to the application requirements.

The following example installs the indexer, the common-scripts, the config-manager packages and their dependencies for the project.

```shell
$ yarn add @ckb-lumos/indexer@0.15.0 @ckb-lumos/common-scripts@0.15.0 @ckb-lumos/config-manager@0.15.0
```

<details><summary>OUTPUT</summary>
<p>

```shell
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

</p>
</details>

## Troubleshooting

### gyp Error About Missing Dependencies for node-gyp

If any gyp error about missing dependencies for node-gyp is encountered, go to check the details in [Install Dependencies for node-gyp](../preparation/setupsystem#install-dependencies-for-node-gyp) or the instructions on [node-gyp](https://github.com/nodejs/node-gyp) to fix the error.

### Error While Rebuilding the xxhash Package

node-gyp rebuilds the xxhash package during the `yarn add` process. Incompatible Node.js may cause the rebuilding failure. Reinstall a lower version of Node.js, for example, Node.js 12, and then install Lumos packages.
