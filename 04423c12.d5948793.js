(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{110:function(e,n,t){"use strict";t.d(n,"a",(function(){return d})),t.d(n,"b",(function(){return f}));var l=t(0),c=t.n(l);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,l,c=function(e,n){if(null==e)return{};var t,l,c={},a=Object.keys(e);for(l=0;l<a.length;l++)t=a[l],n.indexOf(t)>=0||(c[t]=e[t]);return c}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(l=0;l<a.length;l++)t=a[l],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(c[t]=e[t])}return c}var i=c.a.createContext({}),b=function(e){var n=c.a.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},d=function(e){var n=b(e.components);return c.a.createElement(i.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return c.a.createElement(c.a.Fragment,{},n)}},u=c.a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,a=e.originalType,r=e.parentName,i=s(e,["components","mdxType","originalType","parentName"]),d=b(t),u=l,f=d["".concat(r,".").concat(u)]||d[u]||p[u]||a;return t?c.a.createElement(f,o(o({ref:n},i),{},{components:t})):c.a.createElement(f,o({ref:n},i))}));function f(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var a=t.length,r=new Array(a);r[0]=u;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o.mdxType="string"==typeof e?e:l,r[1]=o;for(var i=2;i<a;i++)r[i]=t[i];return c.a.createElement.apply(null,r)}return c.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},67:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return r})),t.d(n,"metadata",(function(){return o})),t.d(n,"toc",(function(){return s})),t.d(n,"default",(function(){return b}));var l=t(3),c=t(7),a=(t(0),t(110)),r={id:"querycells",title:"Query on Cells"},o={unversionedId:"guides/querycells",id:"guides/querycells",isDocsHomePage:!1,title:"Query on Cells",description:"Cells are the primary state units in CKB and are assets owned by users. A cell is the most basic structure that represents a single piece of data in Nervos. The data contained in a cell can take many forms, including CKBytes, tokens, code like JavaScript code, or even serialized data like JSON strings. For more information about the cell model, see Nervos Docs CKB Cell.",source:"@site/docs\\guides\\queryCells.md",slug:"/guides/querycells",permalink:"/lumos_doc/docs/guides/querycells",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/guides/queryCells.md",version:"current",lastUpdatedAt:1621578951,sidebar:"sidebar2",previous:{title:"Set Up the Lumos Indexer",permalink:"/lumos_doc/docs/guides/indexer"},next:{title:"Query on CKB Capacity",permalink:"/lumos_doc/docs/guides/querycapacity"}},s=[{value:"Query Options",id:"query-options",children:[]},{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Environment",id:"environment",children:[]},{value:"Examples",id:"examples",children:[{value:"Query Cells by a Lock Script",id:"query-cells-by-a-lock-script",children:[]},{value:"Query Cells by Specific Lock and Type Script",id:"query-cells-by-specific-lock-and-type-script",children:[]},{value:"Query Cells between Given Block Numbers",id:"query-cells-between-given-block-numbers",children:[]},{value:"Skip Cells",id:"skip-cells",children:[]},{value:"Prefix Search on <var>args</var>",id:"prefix-search-on-args",children:[]},{value:"Fine-grained Query for Cells",id:"fine-grained-query-for-cells",children:[]},{value:"Order Cells by Block Number",id:"order-cells-by-block-number",children:[]},{value:"Fetch Cells in Locktime Pool",id:"fetch-cells-in-locktime-pool",children:[]}]}],i={toc:s};function b(e){var n=e.components,t=Object(c.a)(e,["components"]);return Object(a.b)("wrapper",Object(l.a)({},i,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"Cells are the primary state units in CKB and are assets owned by users. A cell is the most basic structure that represents a single piece of data in Nervos. The data contained in a cell can take many forms, including CKBytes, tokens, code like JavaScript code, or even serialized data like JSON strings. For more information about the cell model, see ",Object(a.b)("a",{parentName:"p",href:"https://docs.nervos.org/docs/reference/cell"},"Nervos Docs: Cell")," and ",Object(a.b)("a",{parentName:"p",href:"https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#42-cell"},"CKB RFC: CKB Cell"),".")),Object(a.b)("p",null,"Querying on cells are the fundamental functions for a DApp to respond to user queries and transaction requests. Lumos provides functions for the queries on cells with specific query options."),Object(a.b)("p",null,"The following example is a cell retrieved by Lumos query functions:"),Object(a.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(a.b)("div",{parentName:"div",className:"admonition-heading"},Object(a.b)("h5",{parentName:"div"},Object(a.b)("span",{parentName:"h5",className:"admonition-icon"},Object(a.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(a.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(a.b)("div",{parentName:"div",className:"admonition-content"},Object(a.b)("p",{parentName:"div"},"Lumos enriches the cell structure defined in ",Object(a.b)("a",{parentName:"p",href:"https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#42-cell"},"CKB RFC: Cell")," with some customized fields (",Object(a.b)("inlineCode",{parentName:"p"},"out_point"),", ",Object(a.b)("inlineCode",{parentName:"p"},"block_hash")," and ",Object(a.b)("inlineCode",{parentName:"p"},"block_number"),"). "))),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"{\n  cell_output: {\n    capacity: '0x2ecbd7d7dc',\n    lock: {\n      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',\n      hash_type: 'type',\n      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'\n    },\n    type: undefined\n  },\n  out_point: {\n    tx_hash: '0x0db73acbbbb04bb1b52153d30ef7486b191b5e376dcc6bc1439b3a6ed2a451d8',\n    index: '0x0'\n  },\n  block_hash: '0x353b8153561400ed623ef295edb7488025ff517a119770cf0c9dca886f193c5a',\n  block_number: '0x16',\n  data: '0x'\n}\n")),Object(a.b)("h2",{id:"query-options"},"Query Options"),Object(a.b)("p",null,"Lumos supports query options on cells, including ",Object(a.b)("var",null,"lock"),", ",Object(a.b)("var",null,"type"),", ",Object(a.b)("var",null,"argsLen"),", ",Object(a.b)("var",null,"data"),", ",Object(a.b)("var",null,"fromBlock"),", ",Object(a.b)("var",null,"toBlock"),", ",Object(a.b)("var",null,"skip")," and ",Object(a.b)("var",null,"order"),"."),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("var",null,"lock"),": A lock script or a ScriptWrapper of a lock script."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("var",null,"type"),": A type script or a ScriptWrapper of a type script.",Object(a.b)("p",{parentName:"li"},"For more information about ",Object(a.b)("a",{parentName:"p",href:"https://nervosnetwork.github.io/lumos/interfaces/base.scriptwrapper.html"},"ScriptWrapper"),", see ",Object(a.b)("a",{parentName:"p",href:"../guides/querycells#fine-grained-query-for-cells"},"Fine-grained Query for Cells"),".")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("var",null,"argsLen"),": The lock or type args length. The default value of ",Object(a.b)("var",null,"argsLen")," is -1 for the query on a full slice of the args."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("var",null,"data"),": The cell data field."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("var",null,"fromBlock"),": The starting block number that the query returns."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("var",null,"toBlock"),": The ending block number that the query returns."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("var",null,"skip"),": The number of cells being skipped for the Lumos indexer."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("var",null,"order"),": The query result can be returned in order of block numbers. The default value is ",Object(a.b)("var",null,"asc")," (ascending) for the returned result.")),Object(a.b)("h2",{id:"prerequisites"},"Prerequisites"),Object(a.b)("p",null,"The following prerequisites apply for the examples of this guide:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"The development environment is set up. For more information, see ",Object(a.b)("a",{parentName:"li",href:"http://localhost:3000/lumos_doc/docs/preparation/setupsystem"},"Set Up the Development Environment"),"."),Object(a.b)("li",{parentName:"ul"},"The Lumos packages are installed. For more information, see ",Object(a.b)("a",{parentName:"li",href:"../guides/installlumos"},"Install Lumos Packages"),".")),Object(a.b)("h2",{id:"environment"},"Environment"),Object(a.b)("p",null,"The following examples are verified on Ubuntu 20.04.2. Steps on the other platforms can be adjusted accordingly."),Object(a.b)("h2",{id:"examples"},"Examples"),Object(a.b)("h3",{id:"query-cells-by-a-lock-script"},"Query Cells by a Lock Script"),Object(a.b)("p",null,"The following example collects the cells for a specific lock script."),Object(a.b)("p",null,"Example:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="hellolumos/src/querycells.ts/findCellsbyLock" {5}',title:'"hellolumos/src/querycells.ts/findCellsbyLock"',"{5}":!0},'import { INDEXER } from "./index";\nimport { Cell, Script } from "@ckb-lumos/base";\n\nexport const findCellsbyLock = async (lockScript: Script): Promise<Cell[]> => {\n  const collector = INDEXER.collector({ lock: lockScript });\n  const cells: Cell[] = [];\n  console.log("Find the cells by lock script:");\n  for await (const cell of collector.collect()) {\n    cells.push(cell);\n  }\n  return cells;\n};\n')),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"INDEXER")," of the example is a RockDB backed indexer that is initialized and started in the ",Object(a.b)("var",null,"hellolumos/src/index.ts")," file. For more information about setting up the Lumos indexer, see ",Object(a.b)("a",{parentName:"p",href:"../guides/indexer#set-up-the-rocksdb-backed-indexer"},"Set Up the RocksDB Backed Indexer"),"."),Object(a.b)("p",null,"Try the ",Object(a.b)("inlineCode",{parentName:"p"},"findCellsbyLock")," function in the Node.js REPL mode:"),Object(a.b)("details",null,Object(a.b)("summary",null,"CLICK ME"),Object(a.b)("p",null,Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell",metastring:"{1,2,5,7-13}","{1,2,5,7-13}":!0},"$ cd hellolumos\n$ node --experimental-repl-await\nWelcome to Node.js v14.0.0.\nType \".help\" for more information.\n> const { accounts, querycells } = require(\".\");\nThe server is started.\n> const alice = accounts.ALICE;\n> const script = {\n code_hash: \"0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8\",\n hash_type: \"type\",\n args: alice.ARGS,\n };\n> await querycells.findCellsbyLock(script);\nFind the cells by lock script:\n[\n  {\n    cell_output: { capacity: '0x12479ca35838', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0xf8c0964b90a4cb6e148e13d28ff945e83577ed1aa0bba3304068f418951d9ad9',\n      index: '0x0'\n    },\n    block_hash: '0x06cb6adb0737838fb3982ff98084efd643ee426e167ab5dd96688008a19371f3',\n    block_number: '0x14',\n    data: '0x'\n  },\n  {\n    cell_output: { capacity: '0x12479c398188', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0x65d86b9695fcbd376c245ad5566ea6c65c7fa8c61e485293e55c2dc236866c68',\n      index: '0x0'\n    },\n    block_hash: '0x72bf246cae9d776f8db37ba27c80b1c65e56063ddc9663ca690033bc6647edce',\n    block_number: '0x15',\n    data: '0x'\n  },\n  {\n    cell_output: { capacity: '0x12479bcfab3f', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0xfea673fcbff06b7a85a6aea80f9ca7e5f6d8ff2750070b49c1afce3d518c7789',\n      index: '0x0'\n    },\n    block_hash: '0x42cb31ce51f37d85cc52b369135148f13fa22d1c89bc501c6acd536d3a7b676f',\n    block_number: '0x16',\n    data: '0x'\n  },\n  ...\n]\n")))),Object(a.b)("h3",{id:"query-cells-by-specific-lock-and-type-script"},"Query Cells by Specific Lock and Type Script"),Object(a.b)("p",null,"The following example collects the cells for a specific lock script and a type script, and returns the cells as the result."),Object(a.b)("p",null,"Example:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="hellolumos/src/querycells.ts/findCellsbyLockandType" {8}',title:'"hellolumos/src/querycells.ts/findCellsbyLockandType"',"{8}":!0},'import { INDEXER } from "./index";\nimport { Cell, Script } from "@ckb-lumos/base";\n\nexport async function findCellsbyLockandType(\n  lockScript: Script,\n  typeScript: Script\n): Promise<Cell[]> {\n  const collector = INDEXER.collector({ lock: lockScript, type: typeScript });\n  const cells: Cell[] = [];\n  console.log("Find the cells by Lock and Type script");\n  for await (const cell of collector.collect()) {\n    cells.push(cell);\n  }\n  return cells;\n}\n')),Object(a.b)("p",null,"Try the ",Object(a.b)("inlineCode",{parentName:"p"},"findCellsbyLockandType")," function in the Node.js REPL mode:"),Object(a.b)("details",null,Object(a.b)("summary",null,"CLICK ME"),Object(a.b)("p",null,Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell",metastring:"{1-2,5,7-15,18}","{1-2,5,7-15,18}":!0},"$ cd hellolumos\n$ node --experimental-repl-await\nWelcome to Node.js v14.0.0.\nType \".help\" for more information.\n> const { accounts, querycells, CONFIG } = require(\".\");\nThe server is started.\n> const alice = accounts.ALICE;\n> const { parseAddress } = require(\"@ckb-lumos/helpers\");\n> const script = parseAddress(alice.ADDRESS);\n> const template = CONFIG.SCRIPTS[\"DAO\"];\n> const typescript = {\n code_hash: template.CODE_HASH,\n hash_type: template.HASH_TYPE,\n args: \"0x\",\n };\n# The example finds the DAO cells that Alice owns.\n# For more information about DAO operations, see Build Transactions.\n> await querycells.findCellsbyLockandType(script, typescript);\nFind the cells by Lock and Type script\n[\n  {\n    cell_output: { capacity: '0x4a817c800', lock: [Object], type: [Object] },\n    out_point: {\n      tx_hash: '0x6d9a12180755791eaf61d070d8d5112513cfd671d14434bec5b57c91fef17ee8',\n      index: '0x0'\n    },\n    block_hash: '0x23b5e3299f50305f76ad55789e1958a9e26b2145cc9eef464cd14006b8c01304',\n    block_number: '0x77b',\n    data: '0x2b07000000000000'\n  }\n]\n")))),Object(a.b)("h3",{id:"query-cells-between-given-block-numbers"},"Query Cells between Given Block Numbers"),Object(a.b)("p",null,"The following example fetches the cells between ","[",Object(a.b)("var",null,"fromblock"),", ",Object(a.b)("var",null,"toblock"),"]",". "),Object(a.b)("p",null,"Example:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="hellolumos/src/querycells.ts/findCellsBetweenBlocks" {9}',title:'"hellolumos/src/querycells.ts/findCellsBetweenBlocks"',"{9}":!0},'import { INDEXER } from "./index";\nimport { Cell, Script } from "@ckb-lumos/base";\n\nexport async function findCellsBetweenBlocks(\n  lockScript: Script,\n  fromBlock: string,\n  toBlock: string\n): Promise<Cell[]> {\n  const collector = INDEXER.collector({ lock: lockScript, fromBlock, toBlock });\n  const cells: Cell[] = [];\n  console.log("Find cells from block", fromBlock, "to block", toBlock);\n  for await (const cell of collector.collect()) {\n    cells.push(cell);\n    // console.log(cell);\n  }\n  return cells;\n}\n')),Object(a.b)("p",null,"Try the ",Object(a.b)("inlineCode",{parentName:"p"},"findCellsBetweenBlocks")," function in the Node.js REPL mode:"),Object(a.b)("details",null,Object(a.b)("summary",null,"CLICK ME"),Object(a.b)("p",null,Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell",metastring:"{1,2,5,7-12}","{1,2,5,7-12}":!0},"$ cd hellolumos\n$ node --experimental-repl-await\nWelcome to Node.js v14.0.0.\nType \".help\" for more information.\n> const { accounts, querycells } = require(\".\");\nThe server is started.\n> const alice = accounts.ALICE;\n> const { parseAddress } = require(\"@ckb-lumos/helpers\");\n> const script = parseAddress(alice.ADDRESS);\n> const from = \"0x11\";\n> const to = \"0x15\";\n> await querycells.findCellsBetweenBlocks(script, from, to);\nFind cells from block 0x11 to block 0x15\n[\n  {\n    cell_output: { capacity: '0x2ecbd7e568', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0xa4e46a4d656c849ecee9b80fb2490967b0a89a6fd767acddc59ddd7d1013d1a9',\n      index: '0x0'\n    },\n    block_hash: '0xe87b33e3b499ede1390cf12ec1f2df772762fa7cc981c55fe3753a01fcc52d14',\n    block_number: '0x11',\n    data: '0x'\n  },\n  {\n    cell_output: { capacity: '0x2ecbd7e2b3', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0x8e4eded5087d8341e739885d4dd39b78661fde80c711a42b4aeee856de4d5d1c',\n      index: '0x0'\n    },\n    block_hash: '0xf410bc8b58e5edcc0f6f9277a3d4c1ada599884b7395ad2a57f65643051c5752',\n    block_number: '0x12',\n    data: '0x'\n  },\n  {\n    cell_output: { capacity: '0x2ecbd7dffd', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0x4b4e37eda430c4c288398b518e00a93eae0fa979f65dc4f874feb2f4c8b5ae0b',\n      index: '0x0'\n    },\n    block_hash: '0xb8166998d66f21d8b2b46c30a935a66c9f13ed6fb0dafa43679d6b781046f1eb',\n    block_number: '0x13',\n    data: '0x'\n  },\n  {\n    cell_output: { capacity: '0x2ecbd7dd47', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0xc5e1990313383e57bbd7954808731c35666fe73b58a8c2c6bd5531a59af95e22',\n      index: '0x0'\n    },\n    block_hash: '0xb0b006d8b1df2bbd67a0effabc9a018874f45eed06f9e299b169e2f17ef62b20',\n    block_number: '0x14',\n    data: '0x'\n  },\n  {\n    cell_output: { capacity: '0x2ecbd7da92', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0xeb37d08d17356435bc52dedcea5780b282ab40979ed0321cde12c91b9325ac86',\n      index: '0x0'\n    },\n    block_hash: '0x6a6c07981e60d3a0e021c14c61d0962947724a616c64ff64a6e583f4e3409c5d',\n    block_number: '0x15',\n    data: '0x'\n  }\n]\n")))),Object(a.b)("h3",{id:"skip-cells"},"Skip Cells"),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"skip")," parameter represents the number of cells being skipped for the Lumos indexer. "),Object(a.b)("p",null,"Example:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="hellolumos/src/querycells.ts/findCellsandSkip" {8}',title:'"hellolumos/src/querycells.ts/findCellsandSkip"',"{8}":!0},'import { INDEXER } from "./index";\nimport { Cell, Script } from "@ckb-lumos/base";\n\nexport async function findCellsandSkip(\n  lockScript: Script,\n  skip: number\n): Promise<Cell[]> {\n  const collector = INDEXER.collector({ lock: lockScript, skip: skip });\n  const cells: Cell[] = [];\n  console.log("Find Cells and Skip the first", skip, "cells:");\n  for await (const cell of collector.collect()) {\n    cells.push(cell);\n    console.log(cell);\n  }\n  return cells;\n}\n')),Object(a.b)("p",null,"Try the ",Object(a.b)("inlineCode",{parentName:"p"},"findCellsandSkip")," function in the Node.js REPL mode: "),Object(a.b)("details",null,Object(a.b)("summary",null,"CLICK ME"),Object(a.b)("p",null,Object(a.b)("p",null,"The example skips the first 10 cells and get the result from the 11",Object(a.b)("sup",null,"th.")," cell."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell",metastring:"{1,2,5,7-10}","{1,2,5,7-10}":!0},"$ cd hellolumos\n$ node --experimental-repl-await\nWelcome to Node.js v14.0.0.\nType \".help\" for more information.\n> const { accounts, querycells } = require(\".\");\nThe server is started.\n> const alice = accounts.ALICE;\n> const { parseAddress } = require(\"@ckb-lumos/helpers\");\n> const script = parseAddress(alice.ADDRESS);\n> await querycells.findCellsandSkip(script1, 10);\nFind Cells and Skip the first 10 cells:\n{\n  cell_output: {\n    capacity: '0x2ecbd7d7dc',\n    lock: {\n      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',\n      hash_type: 'type',\n      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'\n    },\n    type: undefined\n  },\n  out_point: {\n    tx_hash: '0x0db73acbbbb04bb1b52153d30ef7486b191b5e376dcc6bc1439b3a6ed2a451d8',\n    index: '0x0'\n  },\n  block_hash: '0x353b8153561400ed623ef295edb7488025ff517a119770cf0c9dca886f193c5a',\n  block_number: '0x16',\n  data: '0x'\n}\n{\n  cell_output: {\n    capacity: '0x2ecbd7d526',\n    lock: {\n      code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',\n      hash_type: 'type',\n      args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'\n    },\n    type: undefined\n  },\n  out_point: {\n    tx_hash: '0x90085bb7d249ef4794bcb2d4114b62e4b94e24b02282fd2985ab5ebe36ff8769',\n    index: '0x0'\n  },\n  block_hash: '0x406d16483b941b38bf95bd9e5188f719807007f16293b86c15ae5e6e5f63a717',\n  block_number: '0x17',\n  data: '0x'\n}\n...\n")))),Object(a.b)("h3",{id:"prefix-search-on-args"},"Prefix Search on ",Object(a.b)("var",null,"args")),Object(a.b)("p",null,"To enable the prefix search on the args of a lock script or a type script, you can specify a value for ",Object(a.b)("var",null,"argsLen")," instead of the default value of ",Object(a.b)("strong",{parentName:"p"},"-1"),". The default value is used for a query on a full slice of the args of a lock script."),Object(a.b)("p",null,"The lock script args length is ",Object(a.b)("strong",{parentName:"p"},"20")," in normal scenarios and ",Object(a.b)("strong",{parentName:"p"},"28")," in the multisig scenario. When the length is uncertain, the ",Object(a.b)("var",null,"argsLen")," parameter can be set as ",Object(a.b)("inlineCode",{parentName:"p"},"any"),". "),Object(a.b)("div",{className:"admonition admonition-info alert alert--info"},Object(a.b)("div",{parentName:"div",className:"admonition-heading"},Object(a.b)("h5",{parentName:"div"},Object(a.b)("span",{parentName:"h5",className:"admonition-icon"},Object(a.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(a.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(a.b)("div",{parentName:"div",className:"admonition-content"},Object(a.b)("p",{parentName:"div"},"It is recommended to specify an explicit length for the ",Object(a.b)("var",null,"argsLen")," parameter in a prefix search, that has better performance than using ",Object(a.b)("inlineCode",{parentName:"p"},"any"),"."))),Object(a.b)("p",null,"Example:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="hellolumos/src/querycells.ts/findCellsbyPrefix" {8}',title:'"hellolumos/src/querycells.ts/findCellsbyPrefix"',"{8}":!0},'import { INDEXER } from "./index";\nimport { Cell, Script } from "@ckb-lumos/base";\n\nexport async function findCellsbyPrefix(\n  lockScript: Script,\n  argslen: number\n): Promise<Cell[]> {\n  const collector = INDEXER.collector({ lock: lockScript, argsLen: argslen });\n  const cells: Cell[] = [];\n  console.log("Find Cells by prefix of args");\n  for await (const cell of collector.collect()) {\n    cells.push(cell);\n  }\n  return cells;\n}\n')),Object(a.b)("p",null,"Try the ",Object(a.b)("inlineCode",{parentName:"p"},"findCellsbyPrefix")," function in the Node.js REPL mode: "),Object(a.b)("details",null,Object(a.b)("summary",null,"CLICK ME"),Object(a.b)("p",null,Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell",metastring:"{1,2,5,8-13}","{1,2,5,8-13}":!0},"$ cd hellolumos\n$ node --experimental-repl-await\nWelcome to Node.js v14.0.0.\nType \".help\" for more information.\n> const { querycells } = require(\".\");\nThe server is started.\n# Truncate the lock args of Bob's account by removing the last 11 bytes and run prefix search on the truncated lock args.\n> const script = {\n code_hash: \"0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8\",\n hash_type: \"type\",\n args: \"0xecbe30bcf5c6b2f2d8\",\n };\n> await querycells.findCellsbyPrefix(script, 20);\nFind Cells by prefix of args\n[\n  {\n    cell_output: { capacity: '0x4a817c800', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0x22cc789bdaa8e021caa303cf20cfa4063b46a17abd62b31aa2cf712844f984cb',\n      index: '0x0'\n    },\n    block_hash: '0x6d60ae47167a78fbcf254c81b1d6356aceef2feeb4e039fed693c274a83faac1',\n    block_number: '0xf',\n    data: '0x'\n  }\n  ...\n]\n")))),Object(a.b)("h3",{id:"fine-grained-query-for-cells"},"Fine-grained Query for Cells"),Object(a.b)("p",null,"Fine-grained query can query on cells at the granularity of a lock or type script, and the args length of the lock or type script by using ",Object(a.b)("a",{parentName:"p",href:"https://nervosnetwork.github.io/lumos/interfaces/base.scriptwrapper.html"},"ScriptWrapper"),". "),Object(a.b)("p",null,"The query gets the cells with a specific lock or type script, and specific args length of the script. The  ",Object(a.b)("var",null,"argsLen")," config in the ScriptWrapper takes priority over the ",Object(a.b)("var",null,"argsLen")," config outside of the ScriptWrapper. If ",Object(a.b)("var",null,"argsLen")," is not specified in the ScriptWrapper, the ",Object(a.b)("var",null,"argsLen")," config outside of the ScriptWrapper or the default value -1 will be used."),Object(a.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(a.b)("div",{parentName:"div",className:"admonition-heading"},Object(a.b)("h5",{parentName:"div"},Object(a.b)("span",{parentName:"h5",className:"admonition-icon"},Object(a.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(a.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(a.b)("div",{parentName:"div",className:"admonition-content"},Object(a.b)("var",null,"ioType")," is inapplicable in the fine-grained query for cells.")),Object(a.b)("p",null,"The following example is the fine-grained query for cells on a ScriptWrapper that wraps a lock script and a lock args length. "),Object(a.b)("p",null,"Example:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="hellolumos/src/querycells.ts/finegrainedSearch()" {8-11}',title:'"hellolumos/src/querycells.ts/finegrainedSearch()"',"{8-11}":!0},'import { INDEXER } from "./index";\nimport { Cell, Script, ScriptWrapper } from "@ckb-lumos/base";\n\nexport async function finegrainedSearch(\n  lockScript: Script,\n  argslen: number,\n): Promise<Cell[]> {\n  const lock: ScriptWrapper = {\n    script: lockScript,\n    argsLen: argslen,\n  };\n  const collector = INDEXER.collector({ lock: lock });\n  const cells: Cell[] = [];\n  console.log("Fine-Grained Query:");\n  for await (const cell of collector.collect()) {\n    cells.push(cell);\n  }\n  return cells;\n}\n')),Object(a.b)("p",null,"Try the ",Object(a.b)("inlineCode",{parentName:"p"},"finegrainedSearch")," function in Node.js REPL mode:"),Object(a.b)("details",null,Object(a.b)("summary",null,"CLICK ME"),Object(a.b)("p",null,Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell",metastring:"{1,2,5,7-14}","{1,2,5,7-14}":!0},"$ cd hellolumos\n$ node --experimental-repl-await\nWelcome to Node.js v14.0.0.\nType \".help\" for more information.\n> const { accounts, querycells } = require(\".\");\nThe server is started.\n> const bob = accounts.BOB;\n> const script = {\n code_hash: \"0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8\",\n hash_type: \"type\",\n args: bob.ARGS,\n };\n> const argslen = 20;\n> await querycells.finegrainedSearch(script, argslen);\n# The result shows the cells with Bob's lock script and the lock args length is 20 bytes.\nFine-Grained Query:\n[\n  {\n    cell_output: { capacity: '0x4a817c800', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0x22cc789bdaa8e021caa303cf20cfa4063b46a17abd62b31aa2cf712844f984cb',\n      index: '0x0'\n    },\n    block_hash: '0x6d60ae47167a78fbcf254c81b1d6356aceef2feeb4e039fed693c274a83faac1',\n    block_number: '0xf',\n    data: '0x'\n  }\n  ...\n]\n")))),Object(a.b)("h3",{id:"order-cells-by-block-number"},"Order Cells by Block Number"),Object(a.b)("p",null,"The following example creates a new ",Object(a.b)("a",{parentName:"p",href:"https://nervosnetwork.github.io/lumos/classes/indexer.cellcollector.html"},"CellCollector")," and uses the CellCollector to collect cells in order of block numbers for a specific lock script."),Object(a.b)("p",null,"Example:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="hellolumos/src/querycells.ts/findCellsandOrder" {11}',title:'"hellolumos/src/querycells.ts/findCellsandOrder"',"{11}":!0},'import { INDEXER } from "./index";\nimport { Cell, Script } from "@ckb-lumos/base";\nimport { CellCollector } from "@ckb-lumos/indexer";\n\nexport async function findCellsandOrder(\n  lockScript: Script,\n  order: "asc" | "desc"\n): Promise<Cell[]> {\n  const collector = new CellCollector(INDEXER, {\n    lock: lockScript,\n    order: order,\n  });\n  const cells: Cell[] = [];\n  console.log("Find Cells in", order, "order of block numbers:");\n  for await (const cell of collector.collect()) {\n    cells.push(cell);\n  }\n  return cells;\n}\n')),Object(a.b)("p",null,"Try the ",Object(a.b)("inlineCode",{parentName:"p"},"findCellsandOrder")," function in Node.js REPL mode: "),Object(a.b)("details",null,Object(a.b)("summary",null,"CLICK ME"),Object(a.b)("p",null,"The following example gets the live cells for Alice and returns the result in descending order of block numbers.",Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell",metastring:"{1,2,5,7-10}","{1,2,5,7-10}":!0},"$ cd hellolumos\n$ node --experimental-repl-await\nWelcome to Node.js v14.0.0.\nType \".help\" for more information.\n> const { accounts, querycells } = require(\".\");\nThe server is started.\n> const alice = accounts.ALICE;\n> const { parseAddress } = require(\"@ckb-lumos/helpers\");\n> const script = parseAddress(alice.ADDRESS);\n> await querycells.findCellsandOrder(script, \"desc\");\nFind Cells in desc order of block numbers:\n[\n  ...\n  {\n    cell_output: { capacity: '0x2ecbd7d526', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0x90085bb7d249ef4794bcb2d4114b62e4b94e24b02282fd2985ab5ebe36ff8769',\n      index: '0x0'\n    },\n    block_hash: '0x406d16483b941b38bf95bd9e5188f719807007f16293b86c15ae5e6e5f63a717',\n    block_number: '0x17',\n    data: '0x'\n  },\n  {\n    cell_output: { capacity: '0x2ecbd7d7dc', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0x0db73acbbbb04bb1b52153d30ef7486b191b5e376dcc6bc1439b3a6ed2a451d8',\n      index: '0x0'\n    },\n    block_hash: '0x353b8153561400ed623ef295edb7488025ff517a119770cf0c9dca886f193c5a',\n    block_number: '0x16',\n    data: '0x'\n  },\n  {\n    cell_output: { capacity: '0x2ecbd7da92', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0xeb37d08d17356435bc52dedcea5780b282ab40979ed0321cde12c91b9325ac86',\n      index: '0x0'\n    },\n    block_hash: '0x6a6c07981e60d3a0e021c14c61d0962947724a616c64ff64a6e583f4e3409c5d',\n    block_number: '0x15',\n    data: '0x'\n  },\n  {\n    cell_output: { capacity: '0x2ecbd7dd47', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0xc5e1990313383e57bbd7954808731c35666fe73b58a8c2c6bd5531a59af95e22',\n      index: '0x0'\n    },\n    block_hash: '0xb0b006d8b1df2bbd67a0effabc9a018874f45eed06f9e299b169e2f17ef62b20',\n    block_number: '0x14',\n    data: '0x'\n  },\n  {\n    cell_output: { capacity: '0x2ecbd7dffd', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0x4b4e37eda430c4c288398b518e00a93eae0fa979f65dc4f874feb2f4c8b5ae0b',\n      index: '0x0'\n    },\n    block_hash: '0xb8166998d66f21d8b2b46c30a935a66c9f13ed6fb0dafa43679d6b781046f1eb',\n    block_number: '0x13',\n    data: '0x'\n  },\n  {\n    cell_output: { capacity: '0x2ecbd7e2b3', lock: [Object], type: undefined },\n    out_point: {\n      tx_hash: '0x8e4eded5087d8341e739885d4dd39b78661fde80c711a42b4aeee856de4d5d1c',\n      index: '0x0'\n    },\n    block_hash: '0xf410bc8b58e5edcc0f6f9277a3d4c1ada599884b7395ad2a57f65643051c5752',\n    block_number: '0x12',\n    data: '0x'\n  },\n  ...\n]\n")))),Object(a.b)("h3",{id:"fetch-cells-in-locktime-pool"},"Fetch Cells in Locktime Pool"),Object(a.b)("p",null,"Lumos provides the ",Object(a.b)("inlineCode",{parentName:"p"},"locktimepool")," module for the cells with a lock period. Now the ",Object(a.b)("inlineCode",{parentName:"p"},"locktimepool")," module supports DAO withdrawn cells and Multisig cells. "),Object(a.b)("p",null,"The following example collects all the ",Object(a.b)("strong",{parentName:"p"},"withdrawn")," cells and ",Object(a.b)("strong",{parentName:"p"},"Multisig")," cells that with a lock period for an account and returns the collected cells as the result. "),Object(a.b)("p",null,"Example:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="hellolumos/src/querycells.ts/locktimePoolCells" {4}',title:'"hellolumos/src/querycells.ts/locktimePoolCells"',"{4}":!0},'import { locktimePool } from "@ckb-lumos/common-scripts";\n\nexport async function locktimePoolCells(frominfo: string): Promise<Cell[]> {\n  const collector = new locktimePool.CellCollector(frominfo, INDEXER);\n  const cells: Cell[] = [];\n  for await (const cell of collector.collect()) {\n    cells.push(cell);\n    console.log(cell);\n  }\n  return cells;\n}\n')),Object(a.b)("p",null,"For more information, see the ",Object(a.b)("a",{parentName:"p",href:"../guides/buildtransactions#transfer-ckb-with-locktime-pool"},"Transfer CKB with Locktime Pool")," example."))}b.isMDXComponent=!0}}]);