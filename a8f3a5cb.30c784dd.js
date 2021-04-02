(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{102:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return i})),n.d(t,"default",(function(){return p}));var r=n(3),a=n(7),o=(n(0),n(119)),c={id:"common",title:"Common CKB Tasks"},s={unversionedId:"guides/common",id:"guides/common",isDocsHomePage:!1,title:"Common CKB Tasks",description:"Initialize Connections to a CKB Node",source:"@site/docs\\guides\\common.md",slug:"/guides/common",permalink:"/lumos_doc/docs/guides/common",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/guides/common.md",version:"current"},i=[{value:"Initialize Connections to a CKB Node",id:"initialize-connections-to-a-ckb-node",children:[{value:"Configure Environment",id:"configure-environment",children:[]},{value:"Set Up an RPC Connection to the CKB Node.",id:"set-up-an-rpc-connection-to-the-ckb-node",children:[]},{value:"Set Up and Start the Lumos Indexer with a Connection to the Same CKB Node.",id:"set-up-and-start-the-lumos-indexer-with-a-connection-to-the-same-ckb-node",children:[]}]},{value:"Set Up an Express Server",id:"set-up-an-express-server",children:[]},{value:"Get the Balance of an Account",id:"get-the-balance-of-an-account",children:[]},{value:"Transfer CKB from the Current Live Cells",id:"transfer-ckb-from-the-current-live-cells",children:[]}],l={toc:i};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"initialize-connections-to-a-ckb-node"},"Initialize Connections to a CKB Node"),Object(o.b)("h3",{id:"configure-environment"},"Configure Environment"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"},'import { initializeConfig } from "@ckb-lumos/config-manager";\n// Configure environment\ninitializeConfig();\n')),Object(o.b)("h3",{id:"set-up-an-rpc-connection-to-the-ckb-node"},"Set Up an RPC Connection to the CKB Node."),Object(o.b)("p",null,"The RPC connection is set up for handling standard RPC calls between the DApp and the CKB node. "),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"},'import { RPC } from "@ckb-lumos/rpc";\n\n// Initialize Services\nexport const rpc = new RPC("http://127.0.0.1:8114");\n')),Object(o.b)("h3",{id:"set-up-and-start-the-lumos-indexer-with-a-connection-to-the-same-ckb-node"},"Set Up and Start the Lumos Indexer with a Connection to the Same CKB Node."),Object(o.b)("p",null,"This step is to use the Lumos indexer to maintain a local database of cells for efficient transaction generation."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"},'import { Indexer } from "@ckb-lumos/indexer";\n\nexport const indexer = new Indexer(\n  "http://127.0.0.1:8114",\n  "/tmp/indexed-data"\n);\nindexer.startForever();\n')),Object(o.b)("h2",{id:"set-up-an-express-server"},"Set Up an Express Server"),Object(o.b)("p",null,"An ",Object(o.b)("a",{parentName:"p",href:"https://expressjs.com/"},"Express")," server can be used to convert API requests from the client into blockchain queries and transactions using Lumos."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Step 1. Set up the Express middleware for parsing JSON input and accepting cross-site requests from the local client.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"},'import express from "express";\nimport http from "http";\nimport bodyParser from "body-parser";\nimport cors from "cors";\n// Server Setup\nconst app = express();\napp.use(bodyParser.json());\n// Allow CORS for localhost\napp.use(\n  cors({\n    origin: "*",\n    credentials: true,\n  })\n);\n')),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Step 2. Bundle routes into files and include the routes at different base resources.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"},'import indexerRoutes from "./routes/indexer";\nimport ckbRoutes from "./routes/ckb";\nimport generalRoutes from "./routes/general";\nimport nftRoutes from "./routes/nft";\nimport sudtRoutes from "./routes/sudt";\nimport sudtSaleRoutes from "./routes/sudt-sale";\n\n// Routes\napp.use("/", generalRoutes);\napp.use("/indexer", indexerRoutes);\napp.use("/ckb", ckbRoutes);\napp.use("/nft", nftRoutes);\napp.use("/sudt", sudtRoutes);\napp.use("/sudt-sale", sudtSaleRoutes);\n')),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Step 3. Announce the server is running.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"},'app.listen(process.env.PORT, () => {\n  console.log(`The server is listening on port ${"http://localhost:3001/"}`);\n});\n')),Object(o.b)("h2",{id:"get-the-balance-of-an-account"},"Get the Balance of an Account"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Step 1. Find all the simple CKB cells for the user.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"},"let balance = BigInt(0);\n\nconst collector = indexer.collector({ lock: lockScript, type: null });\n\nconst cells: Cell[] = [];\nfor await (const cell of collector.collect()) {\n  cells.push(cell);\n}\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Step 2. Add the capacity of these cells up and return the result as the balance.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"},"return cells\n  .map((cell) =>\n    BigInt(\n      cell.cell_output.capacity\n    )\n  )\n  .reduce((balance, capacity) => (balance = balance += capacity));\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Step 3. Return the capacity result to the client.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"")),Object(o.b)("h2",{id:"transfer-ckb-from-the-current-live-cells"},"Transfer CKB from the Current Live Cells"),Object(o.b)("p",null,"To transfer CKB from the current set of live cells in response to a user request:"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Step 1. Create a transaction skeleton and  add the transfer operation.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"},"import {sealTransaction, TransactionSkeleton } from \"@ckb-lumos/helpers\";\nimport { common } from \"@ckb-lumos/common-scripts\";\n\nconst tipHeader = {\n  compact_target: '0x20010000',\n  dao: '0x49bfb20771031d556c8480d47f2a290059f0ac7e383b6509006f4a772ed50200',\n  epoch: '0xa0006002b18',\n  hash: '0x432451e23c26f45eaceeedcc261764d6485ea5c9a204ac55ad755bb8dec9a079',\n  nonce: '0x8199548f8a5ac7a0f0caef1620f37b79',\n  number: '0x1aef6',\n  parent_hash: '0x63594a64108f19f6aed53d0dca9ab4075aac4379cb80b2097b0deac8fc16fd3b',\n  proposals_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',\n  timestamp: '0x172f6b9a4cf',\n  transactions_root: '0x282dbadcd49f3e229d997875f37f4e4f19cb4f04fcf762e9639145aaa667b6f8',\n  uncles_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',\n  version: '0x0'\n}\n\nconst sender = ;\nconst recipient = ;\nconst amount = ;\nconst txFee = ;\n\nlet txSkeleton = TransactionSkeleton({\n    cellProvider: indexer,\n  });\n  txSkeleton = await common.transfer(\n    txSkeleton,\n    sender,\n    recipient,\n    BigInt(amount)\n  );\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Step 2. Add a fee for the transaction.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"},"  txSkeleton = await common.payFee(\n    txSkeleton,\n    sender,\n    BigInt(txFee)\n  );\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Note"),": It is also possible to have someone other than the sender to pay the fee."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Step 3. Prepare the signing entries.")," "),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"}," txSkeleton = common.prepareSigningEntries(txSkeleton);\n")),Object(o.b)("p",null,"The signing entries are the data that the user's wallet needs to sign to provide valid witnesses for the input lock scripts. "),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Step 4. Return the transaction skeleton to the client.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"},'const routes = express.Router();\nroutes.post("/build-transfer", async (req: any, res) => {\n  try {\n    //const txSkeleton = await buildTransferCkbTx(req.body);\n    return res\n      .status(200)\n      .json(JSON.stringify({ params: req.body, txSkeleton }));\n  } catch (error) {\n    return res.status(500).json({ error: error.message });\n  }\n});\n')),Object(o.b)("p",null,"The user signs the transaction in the wallet and then the signatures are returned to the DApp through the client."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Step 5. Seal the transaction with the required signatures.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"},"const tx = sealTransaction(txSkeleton, signatures);\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Step 6. Send this finalized transaction to the CKB network.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"},"const txHash = await rpc.send_transaction(tx);\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Step 7. (Optional) Get the Transaction Status.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"},"const tx = await rpc.get_transaction(txHash);\nreturn tx.tx_status.status;\n")),Object(o.b)("p",null,"A transaction can be in one of the three statuses: ",Object(o.b)("strong",{parentName:"p"},"pending"),", ",Object(o.b)("strong",{parentName:"p"},"proposed")," and ",Object(o.b)("strong",{parentName:"p"},"committed"),"."),Object(o.b)("p",null,"A ",Object(o.b)("strong",{parentName:"p"},"pending")," result means the node is aware of the transaction but the transaction is not confirmed yet. "),Object(o.b)("p",null,"A ",Object(o.b)("strong",{parentName:"p"},"proposed")," result means the node sees a transaction included in a block candidate that is not yet mined. "),Object(o.b)("p",null,"A ",Object(o.b)("strong",{parentName:"p"},"committed")," result means that the block involving the transaction has been mined and is officially on chain "))}p.isMDXComponent=!0},119:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),p=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=p(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,m=u["".concat(c,".").concat(d)]||u[d]||b[d]||o;return n?a.a.createElement(m,s(s({ref:t},l),{},{components:n})):a.a.createElement(m,s({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,c[1]=s;for(var l=2;l<o;l++)c[l]=n[l];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);