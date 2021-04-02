(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{119:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return f}));var a=n(0),c=n.n(a);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,c=function(e,t){if(null==e)return{};var n,a,c={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}var l=c.a.createContext({}),b=function(e){var t=c.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},u=function(e){var t=b(e.components);return c.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return c.a.createElement(c.a.Fragment,{},t)}},d=c.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,o=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=b(n),d=a,f=u["".concat(o,".").concat(d)]||u[d]||p[d]||s;return n?c.a.createElement(f,r(r({ref:t},l),{},{components:n})):c.a.createElement(f,r({ref:t},l))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=d;var r={};for(var i in t)hasOwnProperty.call(t,i)&&(r[i]=t[i]);r.originalType=e,r.mdxType="string"==typeof e?e:a,o[1]=r;for(var l=2;l<s;l++)o[l]=n[l];return c.a.createElement.apply(null,o)}return c.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},89:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return r})),n.d(t,"toc",(function(){return i})),n.d(t,"default",(function(){return b}));var a=n(3),c=n(7),s=(n(0),n(119)),o={id:"querytransactions",title:"Query on Transactions"},r={unversionedId:"tutorials/querytransactions",id:"tutorials/querytransactions",isDocsHomePage:!1,title:"Query on Transactions",description:"Transactions are the most fundamental entities for a DApp to interact with Nervos CKB. For more information about CKB transactions, see Transaction and CKB RFC.",source:"@site/docs\\tutorials\\querytransactions.md",slug:"/tutorials/querytransactions",permalink:"/lumos_doc/docs/tutorials/querytransactions",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/tutorials/querytransactions.md",version:"current",sidebar:"sidebar2",previous:{title:"Query on Cells",permalink:"/lumos_doc/docs/tutorials/querycells"},next:{title:"Assemble Transactions",permalink:"/lumos_doc/docs/tutorials/buildtransactions"}},i=[{value:"Environment",id:"environment",children:[]},{value:"Examples",id:"examples",children:[{value:"Query Transactions by a Lock Script",id:"query-transactions-by-a-lock-script",children:[]},{value:"Query Transactions between Given Block Numbers",id:"query-transactions-between-given-block-numbers",children:[]},{value:"Skip Transactions",id:"skip-transactions",children:[]},{value:"Order Transactions by Block Number",id:"order-transactions-by-block-number",children:[]},{value:"Prefix Search on <var>args</var>",id:"prefix-search-on-args",children:[]},{value:"Fine Grained Query for Transactions",id:"fine-grained-query-for-transactions",children:[]},{value:"Get Transaction Status and Block Hash",id:"get-transaction-status-and-block-hash",children:[]}]}],l={toc:i};function b(e){var t=e.components,n=Object(c.a)(e,["components"]);return Object(s.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("blockquote",null,Object(s.b)("p",{parentName:"blockquote"},"Transactions are the most fundamental entities for a DApp to interact with Nervos CKB. For more information about CKB transactions, see ",Object(s.b)("a",{parentName:"p",href:"https://docs.nervos.org/docs/reference/transaction#docsNav"},"Transaction")," and ",Object(s.b)("a",{parentName:"p",href:"https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md#transaction"},"CKB RFC"),".")),Object(s.b)("p",null,"Lumos provides the ",Object(s.b)("a",{parentName:"p",href:"https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/indexer/lib/index.js#L479"},"TransactionCollector")," class to support querying on transactions according to specific query options."),Object(s.b)("h2",{id:"environment"},"Environment"),Object(s.b)("p",null,"The following examples are verified on Ubuntu 20.04.2. Steps on the other platforms can be adjusted accordingly."),Object(s.b)("h2",{id:"examples"},"Examples"),Object(s.b)("h3",{id:"query-transactions-by-a-lock-script"},"Query Transactions by a Lock Script"),Object(s.b)("p",null,"The following example creates a new TransactionCollector to collect transactions for a specific lock script and returns the result with status."),Object(s.b)("p",null,"Example:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="hellolumos/src/querytransactions.ts/getTxsbyLock()" {9}',title:'"hellolumos/src/querytransactions.ts/getTxsbyLock()"',"{9}":!0},'import {INDEXER} from "./index";\nimport { Script, Transaction } from "@ckb-lumos/base";\nimport { TransactionCollector } from "@ckb-lumos/indexer";\n\nexport async function getTxsbyLock (\n  lockScript: Script,\n) {\n  console.log("Get transactions by lock script:");\n  const txCollector = new TransactionCollector(INDEXER,{lock:lockScript});\n  const txs:Transaction[]= [];\n  for await (const txWithStatus of txCollector.collect()) {\n    \n    const tx = txWithStatus.transaction; \n    const txStatus=txWithStatus.tx_status.status;\n    txs.push(tx);\n    //console.log(txStatus);\n  }\n  return txs;\n}\n\n')),Object(s.b)("p",null,"Try the ",Object(s.b)("inlineCode",{parentName:"p"},"getTxsbyLock")," function in the Node.js REPL mode:"),Object(s.b)("details",null,Object(s.b)("summary",null,"CLICK ME"),Object(s.b)("p",null,Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-shell"},"$ node --experimental-repl-await\nWelcome to Node.js v14.0.0.\nType \".help\" for more information.\n> const { accounts, querytransactions }=require(\".\");\nThe server is started.\n> const alice = accounts.ALICE;\n> const script={\n  code_hash: \"0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8\",\n  hash_type: \"type\",\n  args: alice.ARGS,\n };\n> await querytransactions.getTxsbyLock(script);\nGet transactions by lock script:\n[\n  {\n    cell_deps: [],\n    hash: '0x84a1ff885e82f1d48813968994f63eae22df5baf65519240fc74811ba3b31e92',\n    header_deps: [],\n    inputs: [ [Object] ],\n    outputs: [ [Object] ],\n    outputs_data: [ '0x' ],\n    version: '0x0',\n    witnesses: [\n      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'\n    ]\n  },\n  {\n    cell_deps: [],\n    hash: '0xbdc50e04c88978fe53debe989863855b2e3e4be02dd989c6f8771a2b263ef213',\n    header_deps: [],\n    inputs: [ [Object] ],\n    outputs: [ [Object] ],\n    outputs_data: [ '0x' ],\n    version: '0x0',\n    witnesses: [\n      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'\n    ]\n  },\n...\n")))),Object(s.b)("h3",{id:"query-transactions-between-given-block-numbers"},"Query Transactions between Given Block Numbers"),Object(s.b)("p",null,"The following example fetches the transactions between ",Object(s.b)("inlineCode",{parentName:"p"},"[fromBlock, toBlock]"),". Both ",Object(s.b)("inlineCode",{parentName:"p"},"fromBlock")," and ",Object(s.b)("inlineCode",{parentName:"p"},"toBlock")," are included in the queryOptions."),Object(s.b)("p",null,"Example:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="hellolumos/src/querytransactions.ts/getTxsbetweenBlocks()" {6}',title:'"hellolumos/src/querytransactions.ts/getTxsbetweenBlocks()"',"{6}":!0},'export async function getTxsbetweenBlocks (\n    lockScript: Script,\n    fromBlock: string,\n    toBlock: string\n  )  {\n    const txCollector = new TransactionCollector(INDEXER,{lock:lockScript,fromBlock,toBlock});\n    console.log("Get transactions between given blocks:");\n    for await (const txWithStatus of txCollector.collect()) {\n        console.log(txWithStatus);\n    }\n}\n')),Object(s.b)("p",null,"Try the ",Object(s.b)("inlineCode",{parentName:"p"},"getTxsbetweenBlocks")," function in the Node.js REPL mode:"),Object(s.b)("details",null,Object(s.b)("summary",null,"CLICK ME"),Object(s.b)("p",null,Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-shell"},"> const from=\"0x801\";\n> const to=\"0x804\";\n> await querytransactions.getTxsbetweenBlocks(script,from,to);\nGet transactions between given blocks:\n{\n  transaction: {\n    cell_deps: [],\n    hash: '0x5457bae99ab4cea79c78d4b239a92b5e30580cd1dda6637a7a661991704020cd',\n    header_deps: [],\n    inputs: [ [Object] ],\n    outputs: [ [Object] ],\n    outputs_data: [ '0x' ],\n    version: '0x0',\n    witnesses: [\n      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'\n    ]\n  },\n  tx_status: {\n    block_hash: '0x0c6c197f43b4a27b6c881a2f01d9c4ba8abf2244e2284afa0f1b737979500fbe',\n    status: 'committed'\n  }\n}\n{\n  transaction: {\n    cell_deps: [],\n    hash: '0xb2bf608b9e0499fb8679af8b4126c4921fadfdb6efa0a5375e3aaa0676fc65ae',\n    header_deps: [],\n    inputs: [ [Object] ],\n    outputs: [ [Object] ],\n    outputs_data: [ '0x' ],\n    version: '0x0',\n    witnesses: [\n      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'\n    ]\n  },\n  tx_status: {\n    block_hash: '0x40c9b99ebb5da3888efb6fbc63fd13b4425a1b81b2a4271fb99a3ba29de9a55c',\n    status: 'committed'\n  }\n}\n{\n  transaction: {\n    cell_deps: [],\n    hash: '0x59dd00d1444d346b71b8a0c94ea0d418b8a4c85d86040485c145a8a60725cad0',\n    header_deps: [],\n    inputs: [ [Object] ],\n    outputs: [ [Object] ],\n    outputs_data: [ '0x' ],\n    version: '0x0',\n    witnesses: [\n      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'\n    ]\n  },\n  tx_status: {\n    block_hash: '0xd0c09a6615b30f685dd0b0e627021f89e0f35e9b59c575001d8a11f63436b76c',\n    status: 'committed'\n  }\n}\n{\n  transaction: {\n    cell_deps: [ [Object] ],\n    hash: '0xe332fb6efba38e16b8fd20a4f47d5fffcf8fcac0c863b0eb30ef75067847936d',\n    header_deps: [],\n    inputs: [ [Object] ],\n    outputs: [ [Object], [Object] ],\n    outputs_data: [ '0x', '0x' ],\n    version: '0x0',\n    witnesses: [\n      '0x5500000010000000550000005500000041000000709026a75b82aca580d758c62eceaa9982b81057146a6c0205db3ee7b5581e3201d3ccd5845ea6d25b9b977f98f7c1c74efe4c38292b654d03fa2d037fa0777b01'\n    ]\n  },\n  tx_status: {\n    block_hash: '0xd0c09a6615b30f685dd0b0e627021f89e0f35e9b59c575001d8a11f63436b76c',\n    status: 'committed'\n  }\n}\n{\n  transaction: {\n    cell_deps: [],\n    hash: '0xea8f658e6ea08c38f58f6a0af3530396aba0e51e1064db8626ecd38976625c34',\n    header_deps: [],\n    inputs: [ [Object] ],\n    outputs: [ [Object] ],\n    outputs_data: [ '0x' ],\n    version: '0x0',\n    witnesses: [\n      '0x590000000c00000055000000490000001000000030000000310000009bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce801140000007e00660b8ab122bca3ba468c5b6eee71f40b7d8e00000000'\n    ]\n  },\n  tx_status: {\n    block_hash: '0xbae60c9c4f54d6f6a970fb76c2fdd226a83dd8724cff082157da559ce6cf507f',\n    status: 'committed'\n  }\n}\n")))),Object(s.b)("h3",{id:"skip-transactions"},"Skip Transactions"),Object(s.b)("p",null,"The ",Object(s.b)("var",null,"skip")," query option represents the number of transactions being skipped."),Object(s.b)("p",null,"Example:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="hellolumos/src/querytransactions.ts/getTxsandSkip()" {5}',title:'"hellolumos/src/querytransactions.ts/getTxsandSkip()"',"{5}":!0},'export async function getTxsandSkip (\n    lock: Script,\n    skip: number\n  )  {\n    const txCollector = new TransactionCollector(INDEXER,{lock,skip});\n    console.log("Get transactions and skip the first", skip, "trasactions");\n    for await (const txWithStatus of txCollector.collect()) {\n        console.log(txWithStatus);\n    }\n}\n')),Object(s.b)("h3",{id:"order-transactions-by-block-number"},"Order Transactions by Block Number"),Object(s.b)("p",null,'The following example creates a new TransactionCollector and uses the TransactionCollector to collect transactions in order of block numbers for a specific lock script. If the order is not specified, the default order is "asc" for the returned result.'),Object(s.b)("p",null,"Example:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="hellolumos/src/querytransactions.ts/getTxsandOrder()" {5}',title:'"hellolumos/src/querytransactions.ts/getTxsandOrder()"',"{5}":!0},'export async function getTxsandOrder (\n    lock: Script,\n    order: "asc"|"desc"\n  )  {\n    const txCollector = new TransactionCollector(INDEXER,{lock,order});\n    console.log("Get transactions in order of", order);\n    for await (const txWithStatus of txCollector.collect()) {\n        console.log(txWithStatus);\n    }\n}\n')),Object(s.b)("h3",{id:"prefix-search-on-args"},"Prefix Search on ",Object(s.b)("var",null,"args")),Object(s.b)("p",null,"The default value of ",Object(s.b)("var",null,"argsLen")," is -1 for the query on a full slice of the args of a lock script."),Object(s.b)("p",null,"You can specify ",Object(s.b)("var",null,"argsLen")," with a value other than the default value to enable the prefix search on the args of a lock script."),Object(s.b)("div",{className:"admonition admonition-info alert alert--info"},Object(s.b)("div",{parentName:"div",className:"admonition-heading"},Object(s.b)("h5",{parentName:"div"},Object(s.b)("span",{parentName:"h5",className:"admonition-icon"},Object(s.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(s.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(s.b)("div",{parentName:"div",className:"admonition-content"},Object(s.b)("p",{parentName:"div"},"It is recommended to specify an explicit length for the ",Object(s.b)("var",null,"argsLen")," parameter. For example, the length is ",Object(s.b)("strong",{parentName:"p"},"20")," in normal scenarios and ",Object(s.b)("strong",{parentName:"p"},"28")," in the multisig scenario for the lock script. When the length is not certain, the ",Object(s.b)("var",null,"argsLen")," parameter can be set as ",Object(s.b)("inlineCode",{parentName:"p"},"any"),". But there is performance lost when using ",Object(s.b)("inlineCode",{parentName:"p"},"any")," rather than an explicit length."))),Object(s.b)("p",null,"Example:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="hellolumos/src/querytransactions.ts/findTXsbyPrefix()" {5}',title:'"hellolumos/src/querytransactions.ts/findTXsbyPrefix()"',"{5}":!0},'export async function findTXsbyPrefix  (\n    lock: Script,\n    argsLen : number\n  )  {\n    const txCollector = new TransactionCollector(INDEXER,{lock,argsLen});\n    console.log("Prefix Search");\n    for await (const txWithStatus of txCollector.collect()) {\n        console.log(txWithStatus);\n    }\n}\n')),Object(s.b)("h3",{id:"fine-grained-query-for-transactions"},"Fine Grained Query for Transactions"),Object(s.b)("p",null,"Fine Grained Query for Transactions can be achieved by using ",Object(s.b)("a",{parentName:"p",href:"https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/base/index.d.ts#L351"},"ScriptWrapper")," with customized options like ",Object(s.b)("var",null,"ioType"),", ",Object(s.b)("var",null,"argsLen"),"."),Object(s.b)("p",null,"The value for the ",Object(s.b)("var",null,"ioType")," field is among ",Object(s.b)("inlineCode",{parentName:"p"},"input | output | both"),"."),Object(s.b)("p",null,"Example:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="hellolumos/src/querytransactions.ts/finegrainedSearch()" {9-13}',title:'"hellolumos/src/querytransactions.ts/finegrainedSearch()"',"{9-13}":!0},'import { ScriptWrapper} from "@ckb-lumos/base";\n\nexport async function finegrainedSearch  (\n    lockScript: Script,\n    typescript : Script,\n    argslen: number,\n    iotype:"output"|"input"|"both"\n    ) {\n    const type:ScriptWrapper = {\n      script:typescript,\n      ioType:iotype,\n      argsLen: argslen\n    }\n    const txCollector = new TransactionCollector(INDEXER,{lock:lockScript,type:type});\n    console.log("Fine Grained Query");\n    for await (const txWithStatus of txCollector.collect()) {\n        console.log(txWithStatus);\n    }\n}\n')),Object(s.b)("h3",{id:"get-transaction-status-and-block-hash"},"Get Transaction Status and Block Hash"),Object(s.b)("p",null,"A transaction can be in one of the following status:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"A ",Object(s.b)("strong",{parentName:"li"},"pending")," result means the node is aware of the transaction but the transaction is not confirmed yet."),Object(s.b)("li",{parentName:"ul"},"A ",Object(s.b)("strong",{parentName:"li"},"proposed")," result means the node sees a transaction included in a block candidate that is not yet mined."),Object(s.b)("li",{parentName:"ul"},"A ",Object(s.b)("strong",{parentName:"li"},"committed")," result means that the block involving the transaction has been mined and is officially on chain.")),Object(s.b)("p",null,"The following example uses the get_transaction function to get the transaction information (status, block_hash) for a specific transaction hash."),Object(s.b)("p",null,"Example: "),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="hellolumos/src/querytransactions.ts/getTxsbyHash()" {7}',title:'"hellolumos/src/querytransactions.ts/getTxsbyHash()"',"{7}":!0},'import { RPC } from "@ckb-lumos/RPC";\nconst rpc = new RPC("http://127.0.0.1:8114");\n\nexport async function getTxsbyHash  (\n  txHash: string\n)   {\n  const txWithStatus = await rpc.get_transaction(txHash);\n  \n  const status = txWithStatus?.tx_status.status;\n  const blockhash = txWithStatus?.tx_status.block_hash;\n  console.log("The transaction status is",status);\n  console.log("The block hash for the transaction is",blockhash);\n}\n')))}b.isMDXComponent=!0}}]);