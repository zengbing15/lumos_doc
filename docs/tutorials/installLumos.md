---
id: installlumos
title: Add Lumos Packages for a Node Project
---
The node project is used to run the JavaScript code developed for the DApp.

The following prerequisites apply for adding Lumos packages for a node project:

- NodeJS is installed.

### Steps

To add Lumos packages for a node project:

**Step 1. Create a new directory for the application and navigate into it.**

If you want to add Lumos packages for an existing Node project, navigate into the directory of the project and go to step 3.

```
$ mkdir mydapp
$ cd mydapp
```

**Step 2. Create a `package.json` file for the application by using the `yarn init` command.**

This command prompts questions about the name and version of the application and the name of the initial entry point file (by default this is **index.js**). Just accept the defaults by hitting enter or type answers for each of the questions.

```
$ yarn init
yarn init v1.22.10
question name (mydapp):
question version (1.0.0):
question description:
question entry point (index.js):
question repository url:
question author:
question license (MIT):
question private:
success Saved package.json
Done in 284.49s.
```

**Step 3. Add Lumos packages as dependencies for the application.**

The following example adds the indexer, the common-scripts, the config-manager packages and their dependencies for the application. You can add other required Lumos packages in this step according to the application requirements.

Note: If any gyp error about missing dependencies for node-gyp is encountered during this step, install the dependencies according to the instructions for [node-gyp](https://github.com/nodejs/node-gyp). Then execute the following command until it succeeds.

```shell
$ yarn add @ckb-lumos/indexer@0.15.0 @ckb-lumos/common-scripts@0.15.0 @ckb-lumos/config-manager@0.15.0
info No lockfile found.
[1/4] Resolving packages...
warning @ckb-lumos/indexer > request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
warning @ckb-lumos/indexer > neon-cli@0.4.2: Please upgrade to 0.5.0
warning @ckb-lumos/indexer > request > har-validator@5.1.5: this library is no longer supported
info There appears to be trouble with your network connection. Retrying...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 166 new dependencies.
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
├─ ajv@6.12.6
├─ ansi-escapes@4.3.1
├─ ...
├─ ...
├─ xxhash@0.3.0
└─ yallist@3.1.1
Done in 369.66s.
```
