---
id: createnode
title: Create the Node Skeleton
---
The node skeleton is used to run the JavaScript code.

## Prerequisites

Node is installed.

## Steps

To create the node skeleton for the application:

**Step 1. Create a new directory for the application and navigate into it.**

```
$ mkdir mydapp
$ cd mydapp
```

**Step 2. Create a `package.json` file for the application.**

```
$ yarn init
```

**Step 3. Add required packages as dependencies for the application.**

Note: This example just add some of the Lumos packages as dependencies for the application. The other required dependencies, for example, Express for web applications, Electron for desktop applications, can also be added in this step.

```
$ yarn add @ckb-lumos/indexer@0.15.0 @ckb-lumos/common-scripts@0.15.0 @ckb-lumos/config-manager@0.15.0
```

**Step 4. Install all dependencies.**

```
$ yarn install
```

**Step 5. Enable async/await for the node shell**.

```
$ node --experimental-repl-await
Welcome to Node.js v12.16.2.
Type ".help" for more information.
>
```