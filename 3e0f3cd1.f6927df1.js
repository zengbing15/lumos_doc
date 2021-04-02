(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{119:function(e,n,t){"use strict";t.d(n,"a",(function(){return b})),t.d(n,"b",(function(){return m}));var r=t(0),a=t.n(r);function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){c(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=a.a.createContext({}),d=function(e){var n=a.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},b=function(e){var n=d(e.components);return a.a.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},u=a.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,c=e.originalType,o=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),b=d(t),u=r,m=b["".concat(o,".").concat(u)]||b[u]||p[u]||c;return t?a.a.createElement(m,l(l({ref:n},s),{},{components:t})):a.a.createElement(m,l({ref:n},s))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var c=t.length,o=new Array(c);o[0]=u;var l={};for(var i in n)hasOwnProperty.call(n,i)&&(l[i]=n[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var s=2;s<c;s++)o[s]=t[s];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},84:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return o})),t.d(n,"metadata",(function(){return l})),t.d(n,"toc",(function(){return i})),t.d(n,"default",(function(){return d}));var r=t(3),a=t(7),c=(t(0),t(119)),o={id:"indexer",title:"Lumos Indexer"},l={unversionedId:"package/indexer",id:"package/indexer",isDocsHomePage:!1,title:"Lumos Indexer",description:"Lumos is designed based on the Index-Query-Assemble pattern. The Lumos indexer polls blocks from a CKB node, indexes them and stores the indexed data in a local database to provide optimal query.",source:"@site/docs\\package\\indexer.md",slug:"/package/indexer",permalink:"/lumos_doc/docs/package/indexer",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/package/indexer.md",version:"current"},i=[{value:"Examples",id:"examples",children:[{value:"Use the RocksDB Backed Indexer",id:"use-the-rocksdb-backed-indexer",children:[]},{value:"Use the SQL Backed Indexer",id:"use-the-sql-backed-indexer",children:[]},{value:"Query Existing Cells",id:"query-existing-cells",children:[]},{value:"Specify <code>lock</code> and <code>type</code> Script",id:"specify-lock-and-type-script",children:[]},{value:"Query Cells between Given block_numbers",id:"query-cells-between-given-block_numbers",children:[]},{value:"EventEmitter",id:"eventemitter",children:[]}]}],s={toc:i};function d(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(c.b)("wrapper",Object(r.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(c.b)("p",null,"Lumos is designed based on the ",Object(c.b)("a",{parentName:"p",href:"https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern"},Object(c.b)("inlineCode",{parentName:"a"},"Index-Query-Assemble"))," pattern. The Lumos indexer polls blocks from a CKB node, indexes them and stores the indexed data in a local database to provide optimal query."),Object(c.b)("p",null,"Dapps built with Lumos must have an indexer configured and running."),Object(c.b)("p",null,"Lumos provides two types of indexer:"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},"A RocksDB backed indexer: The RocksDB backed indexer is contained in the  ",Object(c.b)("inlineCode",{parentName:"li"},"@ckb-lumos/indexer")," package."),Object(c.b)("li",{parentName:"ul"},"A SQL backed indexer: A separate package, the ",Object(c.b)("inlineCode",{parentName:"li"},"@ckb-lumos/sql-indexer")," package contains the SQL backed indexer. The SQL backed indexer is using the same interface as the RocksDB backed indexer. Now Lumos supports the SQL databases of the latest stable versions of PostgreSQL and MySQL.")),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Note"),":  The usage for the SQL backed indexer is not fully verified. It is still in the experimental stage."),Object(c.b)("h2",{id:"examples"},"Examples"),Object(c.b)("h3",{id:"use-the-rocksdb-backed-indexer"},"Use the RocksDB Backed Indexer"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-javascript"},'const { Indexer, CellCollector, TransactionCollector } = require("@ckb-lumos/indexer");\nconst indexer = new Indexer("http://127.0.0.1:8114", "/tmp/indexed-data");\nindexer.startForever();\n')),Object(c.b)("h3",{id:"use-the-sql-backed-indexer"},"Use the SQL Backed Indexer"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Step 1. Create a PostgreSQL instance.")),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre"},"$ docker run --name postgres -e POSTGRES_USER=user -e POSTGRES_DB=lumos -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres\n")),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Step 2. Clone the Lumos repository to initialize the SQL database.")),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre"},"$ cd $TOP\n$ git clone --recursive https://github.com/nervosnetwork/lumos\n$ cd lumos && git checkout v0.14.2-rc6\n$ yarn\n$ cd packages/sql-indexer\n$ cat << EOF > knexfile.js\nmodule.exports = {\n  development: {\n    client: 'postgresql',\n    connection: {\n      database: 'lumos',\n      user:     'user',\n      password: 'password'\n    },\n    pool: {\n      min: 2,\n      max: 10\n    },\n    migrations: {\n      tableName: 'knex_migrations'\n    }\n  }\n};\nEOF\n$ npx knex migrate:up\n")),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Step 3. Start the SQL Indexer.")),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre"},'const { Indexer, CellCollector, TransactionCollector } = require("@ckb-lumos/sql-indexer");\nconst indexer = new Indexer("http://127.0.0.1:5432", "/tmp/indexed-data");\nindexer.startForever();\n')),Object(c.b)("h3",{id:"query-existing-cells"},"Query Existing Cells"),Object(c.b)("p",null,"To query existing cells, create a CellCollector:"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-javascript"},'cellCollector = new CellCollector(indexer, {\n  lock: {\n    code_hash:\n      "0x0000000000000000000000000000000000000000000000000000000000000000",\n    hash_type: "data",\n    args: "0x62e907b15cbf27d5425399ebf6f0fb50ebb88f18",\n  },\n});\n\nfor await (const cell of cellCollector.collect()) {\n  console.log(cell);\n}\n')),Object(c.b)("h3",{id:"specify-lock-and-type-script"},"Specify ",Object(c.b)("inlineCode",{parentName:"h3"},"lock")," and ",Object(c.b)("inlineCode",{parentName:"h3"},"type")," Script"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-javascript"},'cellCollector = new CellCollector(indexer, {\n    lock: {\n        args: "0x92aad3bbab20f225cff28ec1d856c6ab63284c7a",\n        code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",\n        hash_type: "type"\n    },\n    type: {\n        args: "0x",\n        code_hash: "0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e",\n        hash_type: "type"\n    }\n})\n\nfor await (const cell of cellCollector.collect()) {\n  console.log(cell);\n}\n')),Object(c.b)("h3",{id:"query-cells-between-given-block_numbers"},"Query Cells between Given block_numbers"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-javascript"},'cellCollector = new CellCollector(indexer, {\n  lock: {\n    code_hash: \n      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",\n    hash_type: "type",\n    args: "0xa528f2b9a51118b193178db4cf2f3db92e7df323",\n  },\n  fromBlock: "0x225510", // "0x" + 2250000n.toString(16)\n  toBlock: "0x225ce0", // "0x" + 2252000n.toString(16)\n});\n\nfor await (const cell of cellCollector.collect()) {\n  console.log(cell);\n}\n')),Object(c.b)("p",null,"It will fetch cells between ",Object(c.b)("inlineCode",{parentName:"p"},"[fromBlock, toBlock]"),", which means both ",Object(c.b)("inlineCode",{parentName:"p"},"fromBlock")," and ",Object(c.b)("inlineCode",{parentName:"p"},"toBlock")," are included in query range."),Object(c.b)("h3",{id:"eventemitter"},"EventEmitter"),Object(c.b)("p",null,"Event-driven pattern is also supported besides the above polling pattern. After subscribing for certain ",Object(c.b)("inlineCode",{parentName:"p"},"lock|type")," script, it will emit a ",Object(c.b)("inlineCode",{parentName:"p"},"changed")," event when a block containing the subscribed script is indexed or rollbacked. "),Object(c.b)("p",null,"The principle of the design is unreliable notification queue, so developers are supposed to pull from the data sources via ",Object(c.b)("inlineCode",{parentName:"p"},"CellCollector|TransactionCollector"),", to find out what might happened: cell consumed, new cell generated, new transaction generated, or a chain fork happened, etc; and take the next step accordingly."),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-javascript"},'eventEmitter = indexer.subscribe({\n  lock: {\n    code_hash:\n      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",\n    hash_type: "type",\n    args: "0xa528f2b9a51118b193178db4cf2f3db92e7df323",\n  },\n});\n\neventEmitter.on("changed",  () => {\n  console.log("States changed with the script, please pull the data sources from the indexer to find out what happend");\n})\n\n')),Object(c.b)("p",null,"Other query options like ",Object(c.b)("inlineCode",{parentName:"p"},"fromBlock|argsLen|data")," are also supported."),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-javascript"},'eventEmitter = indexer.subscribe({\n  lock: {\n    code_hash:\n      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",\n    hash_type: "type",\n    // the args bytes length is 18, truncate the last 2 bytes.\n    args: "0xa528f2b9a51118b193178db4cf2f3db92e7d",\n  },\n  // default value is -1\n  argsLen: 20,\n  // default value is "any"\n  data: "0x",\n  // default value is 0\n  fromBlock: 0x3e8, // "0x" + 1000n.toString(16)\n});\n')),Object(c.b)("p",null,"Listen to median time change when blocks changed."),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-javascript"},'const medianTimeEmitter = indexer.subscribeMedianTime();\nmedianTimeEmitter.on("changed", (medianTime) => {\n  console.log(medianTime);\n});\n')))}d.isMDXComponent=!0}}]);