(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{113:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),d=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=d(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=d(n),u=a,m=p["".concat(s,".").concat(u)]||p[u]||b[u]||i;return n?r.a.createElement(m,o(o({ref:t},c),{},{components:n})):r.a.createElement(m,o({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,s=new Array(i);s[0]=u;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:a,s[1]=o;for(var c=2;c<i;c++)s[c]=n[c];return r.a.createElement.apply(null,s)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},115:function(e,t,n){"use strict";function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}t.a=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}},121:function(e,t,n){"use strict";var a=n(0),r=n(122);t.a=function(){const e=Object(a.useContext)(r.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},122:function(e,t,n){"use strict";var a=n(0);const r=Object(a.createContext)(void 0);t.a=r},123:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(121),s=n(115),o=n(55),l=n.n(o);const c=37,d=39;t.a=function(e){const{lazy:t,block:n,defaultValue:o,values:p,groupId:b,className:u}=e,{tabGroupChoices:m,setTabGroupChoices:h}=Object(i.a)(),[f,O]=Object(a.useState)(o),j=a.Children.toArray(e.children);if(null!=b){const e=m[b];null!=e&&e!==f&&p.some((t=>t.value===e))&&O(e)}const v=e=>{O(e),null!=b&&h(b,e)},x=[];return r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(s.a)("tabs",{"tabs--block":n},u)},p.map((({value:e,label:t})=>r.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":f===e,className:Object(s.a)("tabs__item",l.a.tabItem,{"tabs__item--active":f===e}),key:e,ref:e=>x.push(e),onKeyDown:e=>{((e,t,n)=>{switch(n.keyCode){case d:((e,t)=>{const n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()})(e,t);break;case c:((e,t)=>{const n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()})(e,t)}})(x,e.target,e)},onFocus:()=>v(e),onClick:()=>{v(e)}},t)))),t?Object(a.cloneElement)(j.filter((e=>e.props.value===f))[0],{className:"margin-vert--md"}):r.a.createElement("div",{className:"margin-vert--md"},j.map(((e,t)=>Object(a.cloneElement)(e,{key:t,hidden:e.props.value!==f})))))}},124:function(e,t,n){"use strict";var a=n(0),r=n.n(a);t.a=function({children:e,hidden:t,className:n}){return r.a.createElement("div",{role:"tabpanel",hidden:t,className:n},e)}},85:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return d})),n.d(t,"default",(function(){return b}));var a=n(3),r=n(7),i=(n(0),n(113)),s=n(123),o=n(124),l={id:"indexer",title:"Set Up the Lumos Indexer"},c={unversionedId:"guides/indexer",id:"guides/indexer",isDocsHomePage:!1,title:"Set Up the Lumos Indexer",description:"Lumos is designed based on the Index-Query-Assemble pattern. The Lumos indexer polls blocks from a CKB node, indexes them and stores the indexed data in a local database to provide optimal queries.",source:"@site/docs\\guides\\indexer.md",slug:"/guides/indexer",permalink:"/lumos_doc/docs/guides/indexer",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/guides/indexer.md",version:"current",lastUpdatedAt:1620473087,sidebar:"sidebar2",previous:{title:"Set Up the Config Manager",permalink:"/lumos_doc/docs/guides/config"},next:{title:"Query on Cells",permalink:"/lumos_doc/docs/guides/querycells"}},d=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Environment",id:"environment",children:[]},{value:"Set Up the RocksDB Backed Indexer",id:"set-up-the-rocksdb-backed-indexer",children:[{value:"Step 1. Install the indexer package.",id:"step-1-install-the-indexer-package",children:[]},{value:"Step 2. Start the indexer.",id:"step-2-start-the-indexer",children:[]}]},{value:"Set Up the SQL Backed Indexer",id:"set-up-the-sql-backed-indexer",children:[{value:"Step 1. Install Docker.",id:"step-1-install-docker",children:[]},{value:"Step 2. Create a PostgreSQL instance.",id:"step-2-create-a-postgresql-instance",children:[]},{value:"Step 3. Install dependencies for the DApp project.",id:"step-3-install-dependencies-for-the-dapp-project",children:[]},{value:"Step 3. Initialize the SQL database.",id:"step-3-initialize-the-sql-database",children:[]},{value:"Step 4. Start the Indexer.",id:"step-4-start-the-indexer",children:[]}]}],p={toc:d};function b(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Lumos is designed based on the ",Object(i.b)("a",{parentName:"p",href:"https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern"},"Index-Query-Assemble")," pattern. The Lumos indexer polls blocks from a CKB node, indexes them and stores the indexed data in a local database to provide optimal queries."),Object(i.b)("p",null,"Lumos provides the following two types of indexers:"),Object(i.b)(s.a,{defaultValue:"rocksdb",values:[{label:"RocksDB Backed Indexer",value:"rocksdb"},{label:"SQL Backed Indexer",value:"sql"}],mdxType:"Tabs"},Object(i.b)(o.a,{value:"rocksdb",mdxType:"TabItem"},Object(i.b)("p",null,"The RocksDB backed indexer is contained in the  ",Object(i.b)("code",null,"@ckb-lumos/indexer")," package. After the ",Object(i.b)("code",null,"@ckb-lumos/indexer")," package is installed, the RocksDB backed indexer can be used directly.")),Object(i.b)(o.a,{value:"sql",mdxType:"TabItem"},Object(i.b)("p",null,"The Lumos indexer supports the SQL database of the latest stable versions of PostgreSQL and MySQL. A separate package, the ",Object(i.b)("code",null,"@ckb-lumos/sql-indexer")," package, contains the SQL backed indexer. Specific SQL database settings are required before using the SQL backed indexer."),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",{parentName:"div",className:"admonition-heading"},Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",{parentName:"h5",className:"admonition-icon"},Object(i.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(i.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(i.b)("div",{parentName:"div",className:"admonition-content"},Object(i.b)("p",{parentName:"div"},"The usage for the SQL backed indexer is not fully verified. It is still in the experimental stage."))))),Object(i.b)("div",{className:"admonition admonition-info alert alert--info"},Object(i.b)("div",{parentName:"div",className:"admonition-heading"},Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",{parentName:"h5",className:"admonition-icon"},Object(i.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(i.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(i.b)("div",{parentName:"div",className:"admonition-content"},Object(i.b)("p",{parentName:"div"},"The Lumos indexer is based on the CKB indexer that is developed by Rust. To leverage the native Rust code without installing Rust, Lumos provides the Lumos indexer with a pre-built native module of the CKB indexer."),Object(i.b)("p",{parentName:"div"},"For native desktop applications written in ",Object(i.b)("em",{parentName:"p"},"Electron.js"),", you can install the pre-built native module of the CKB indexer by running the ",Object(i.b)("b",null,"LUMOS_NODE_RUNTIME=electron npm i")," command."))),Object(i.b)("h2",{id:"prerequisites"},"Prerequisites"),Object(i.b)("p",null,"The following prerequisites apply for setting up the Lumos indexer:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"The development environment is set up. "),Object(i.b)("p",{parentName:"li"},"For more information, see ",Object(i.b)("a",{parentName:"p",href:"../preparation/setupsystem"},"Set Up the Development Environment"),"."))),Object(i.b)("h2",{id:"environment"},"Environment"),Object(i.b)("p",null,"The following examples are verified on Ubuntu 20.04.2. Steps on the other platforms can be adjusted accordingly."),Object(i.b)("h2",{id:"set-up-the-rocksdb-backed-indexer"},"Set Up the RocksDB Backed Indexer"),Object(i.b)("h3",{id:"step-1-install-the-indexer-package"},"Step 1. Install the indexer package."),Object(i.b)("p",null,"To install the RocksDB backed indexer as a dependency for a project:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-shell"},"cd mydapp\nyarn add @ckb-lumos/indexer\n")),Object(i.b)("h3",{id:"step-2-start-the-indexer"},"Step 2. Start the indexer."),Object(i.b)("p",null,"The Indexer URI, for example, ",Object(i.b)("a",{parentName:"p",href:"http://127.0.0.1:8114"},"http://127.0.0.1:8114")," (the default RPC URL), is the ",Object(i.b)("var",null,"listen_address")," configuration in the ",Object(i.b)("inlineCode",{parentName:"p"},"ckb.toml")," file of the CKB node."),Object(i.b)("p",null,"To initialize and start the RocksDB backed indexer:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-typescript"},'import { Indexer } from "@ckb-lumos/indexer";\nconst CKB_RPC = "http://127.0.0.1:8114";\nexport const INDEXER = new Indexer(CKB_RPC, "./indexed-data");\nINDEXER.startForever();\n')),Object(i.b)("h2",{id:"set-up-the-sql-backed-indexer"},"Set Up the SQL Backed Indexer"),Object(i.b)("h3",{id:"step-1-install-docker"},"Step 1. Install Docker."),Object(i.b)("p",null,"Docker is required for setting up the SQL backed indexer. For more information about Docker installation, see ",Object(i.b)("a",{parentName:"p",href:"https://docs.docker.com/engine/install/"},"Install Docker Engine"),"."),Object(i.b)("h3",{id:"step-2-create-a-postgresql-instance"},"Step 2. Create a PostgreSQL instance."),Object(i.b)("p",null,"To create a postgreSQL instance: "),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-shell"},"docker run --name postgres -e POSTGRES_USER=user -e POSTGRES_DB=lumos -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres\n")),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"--name ",Object(i.b)("var",null,"postgres"),": The container is named as ",Object(i.b)("var",null,"postgres"),"."),Object(i.b)("li",{parentName:"ul"},"-e POSTGRES_USER=",Object(i.b)("var",null,"user"),": Name the superuser account as ",Object(i.b)("var",null,"user"),"."),Object(i.b)("li",{parentName:"ul"},"-e POSTGRES_DB=",Object(i.b)("var",null,"lumos"),": Name the default database as ",Object(i.b)("var",null,"lumos"),"."),Object(i.b)("li",{parentName:"ul"},"-e POSTGRES_PASSWORD=",Object(i.b)("var",null,"mypassword"),": The password for the user account is ",Object(i.b)("var",null,"mypassword"),"."),Object(i.b)("li",{parentName:"ul"},"-p 5432:5432: Publish the container's 5432 port to the whole network of the host machine."),Object(i.b)("li",{parentName:"ul"},"-d: Run the container in the background with ",Object(i.b)("inlineCode",{parentName:"li"},"--detach"),".")),Object(i.b)("h3",{id:"step-3-install-dependencies-for-the-dapp-project"},"Step 3. Install dependencies for the DApp project."),Object(i.b)("p",null,"To install the SQL backed indexer as a dependency for a project:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-shell"},"cd mydapp\nyarn add @ckb-lumos/sql-indexer@0.16.0 knex pg\n")),Object(i.b)("h3",{id:"step-3-initialize-the-sql-database"},"Step 3. Initialize the SQL database."),Object(i.b)("p",null,"Create the knexfile.js file under the ",Object(i.b)("var",null,"projectName"),"/node-modules/@ckb-lumos/packages/sql-indexer folder."),Object(i.b)("p",null,"Example:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-javascript",metastring:'title="mydapp/node-modules/@ckb-lumos/packages/sql-indexer/knexfile.js"',title:'"mydapp/node-modules/@ckb-lumos/packages/sql-indexer/knexfile.js"'},"module.exports = {\n  development: {\n    client: 'postgresql',\n    connection: {\n      database: 'lumos',\n      user:     'user',\n      password: 'mypassword'\n    },\n    pool: {\n      min: 2,\n      max: 10\n    },\n    migrations: {\n      tableName: 'knex_migrations'\n    }\n  }\n};\n")),Object(i.b)("p",null,"Run the following command to migrate and update the local database:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"npx knex migrate:up\n")),Object(i.b)("h3",{id:"step-4-start-the-indexer"},"Step 4. Start the Indexer."),Object(i.b)("p",null,"The Indexer URI, for example, ",Object(i.b)("a",{parentName:"p",href:"http://127.0.0.1:8114"},"http://127.0.0.1:8114")," (the default RPC URL), is the ",Object(i.b)("var",null,"listen_address")," configuration in the ",Object(i.b)("inlineCode",{parentName:"p"},"ckb.toml")," file of the CKB node."),Object(i.b)("p",null,"To initialize and start the SQL backed indexer:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-typescript"},'import { Indexer } from "@ckb-lumos/sql-indexer";\nimport { Knex } from "knex";\n\nconst knex = Knex({\n    client: "postgresql",\n    connection: {\n        host: "127.0.0.1",\n        database: "lumos",\n        password: "mypassword",\n        user: "user",\n    },\n});\nconst sqlindexer = new Indexer("http://127.0.0.1:8114", knex);\nsqlindexer.startForever();\n')))}b.isMDXComponent=!0}}]);