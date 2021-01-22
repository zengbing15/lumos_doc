(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{80:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return i})),a.d(t,"metadata",(function(){return c})),a.d(t,"toc",(function(){return l})),a.d(t,"default",(function(){return b}));var n=a(3),r=a(7),o=(a(0),a(93)),i={id:"intro",title:"Overview",sidebar_label:"Overview"},c={unversionedId:"quickstart/intro",id:"quickstart/intro",isDocsHomePage:!1,title:"Overview",description:"Lumos is a framework for the development of Nervos CKB DApps.",source:"@site/docs\\quickstart\\intro.md",slug:"/quickstart/intro",permalink:"/lumos_doc/docs/quickstart/intro",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/quickstart/intro.md",version:"current",sidebar_label:"Overview",sidebar:"someSidebar",next:{title:"Getting Started",permalink:"/lumos_doc/docs/quickstart/getstarted"}},l=[{value:"How Lumos Fits in with CKB DApps",id:"how-lumos-fits-in-with-ckb-dapps",children:[]},{value:"Resources",id:"resources",children:[]}],s={toc:l};function b(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},s,a,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Lumos is a framework for the development of Nervos CKB DApps. "),Object(o.b)("p",null,"The Lumos framework provides a list of powerful and high-performance features and utilities in JavaScript and TypeScript:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"../package/commonscripts"}),Object(o.b)("strong",{parentName:"a"},"Common Scripts")),": The known scripts on CKB that includes the ",Object(o.b)("inlineCode",{parentName:"li"},"common")," script and ",Object(o.b)("inlineCode",{parentName:"li"},"locktime pool")," script to enable a unified cell manager in Lumos."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"../package/configmanager"}),Object(o.b)("strong",{parentName:"a"},"Configuration Manager")),": The configuration manager to connect to Nervos networks and deploy contracts, to a locally running instance, or one of Nervos's public networks."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"../package/hdcache"}),Object(o.b)("strong",{parentName:"a"},"HD Cache Manager")),": The HD cache manager builds a memory cache for derived addresses and live cells of these addresses."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"../package/hd"}),Object(o.b)("strong",{parentName:"a"},"HD Wallet Manager")),": The HD wallet manager for CKB supports ",Object(o.b)("em",{parentName:"li"},"mnemonic")," and ",Object(o.b)("em",{parentName:"li"},"keystore")," that are compatible with ",Object(o.b)("inlineCode",{parentName:"li"},"Neuron")," and ",Object(o.b)("inlineCode",{parentName:"li"},"ckb-cli"),". "),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"../package/helpers"}),Object(o.b)("strong",{parentName:"a"},"Helpers")),": The utilities for working with CKB transactions. The ",Object(o.b)("inlineCode",{parentName:"li"},"@ckb-lumos/helpers")," package is used in a framework sense that requires to setup the ",Object(o.b)("strong",{parentName:"li"},"configuration manager"),"."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"../package/indexer"}),Object(o.b)("strong",{parentName:"a"},"Lumos Indexer")),": The Lumos indexer is a CKB cell indexer that fulfills the ",Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern"}),"Index-Query-Assemble")," pattern."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"../package/transactionmanager"}),Object(o.b)("strong",{parentName:"a"},"Transaction Manager")),": Transaction Manager is a tool for managing uncommitted cells. The ",Object(o.b)("inlineCode",{parentName:"li"},"send_transaction")," method can be used to send a transaction to a CKB Node.  The ",Object(o.b)("inlineCode",{parentName:"li"},"collector")," method can be used to get uncommitted outputs.")),Object(o.b)("p",null,"For more information, see the details about each feature or utility in the Features and Utilities sections."),Object(o.b)("h2",{id:"how-lumos-fits-in-with-ckb-dapps"},"How Lumos Fits in with CKB DApps"),Object(o.b)("p",null,"CKB DApps are designed based on the ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern"}),"index-query-assemble")," pattern including a cell indexer, a cell querier and a transaction generator."),Object(o.b)("p",null,"The Lumos framework wraps up the functionalities that a CKB DApp requires:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"Cell Indexer"),": The Lumos indexer (",Object(o.b)("inlineCode",{parentName:"li"},"@ckb-lumos/indexer")," or",Object(o.b)("inlineCode",{parentName:"li"},"@ckb-lumos/sql-indexer"),") is used to maintain a local database of cells."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"Cell Querier"),": The Lumos cell manager (",Object(o.b)("inlineCode",{parentName:"li"},"@ckb-lumos/common-scripts"),") query cells by using the Lumos indexer. The cells satisfying some criteria are collected from the local database through ",Object(o.b)("inlineCode",{parentName:"li"},"CellCollector"),"."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"Transaction Generator"),": Lumos provides the ",Object(o.b)("inlineCode",{parentName:"li"},"TransactionSkeleton")," in the ",Object(o.b)("inlineCode",{parentName:"li"},"@ckb-lumos/helpers")," package. A new transaction can be assembled based on the queried cells through the ",Object(o.b)("inlineCode",{parentName:"li"},"TransactionSkeleton")," object. Transactions can be sent to the CKB node through the Lumos transaction manager.")),Object(o.b)("img",{src:"../../img/CKB dapp with Lumos.png"}),Object(o.b)("h2",{id:"resources"},"Resources"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Resource"),Object(o.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Link"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Website"),Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"API Documentation"),Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(o.b)("a",Object(n.a)({parentName:"td"},{href:"https://nervosnetwork.github.io/lumos/globals.html"}),"https://nervosnetwork.github.io/lumos/globals.html"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Source Code"),Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(o.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/nervosnetwork/lumos"}),"https://github.com/nervosnetwork/lumos"))))))}b.isMDXComponent=!0},93:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return d}));var n=a(0),r=a.n(n);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=r.a.createContext({}),b=function(e){var t=r.a.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},p=function(e){var t=b(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=b(a),m=n,d=p["".concat(i,".").concat(m)]||p[m]||u[m]||o;return a?r.a.createElement(d,c(c({ref:t},s),{},{components:a})):r.a.createElement(d,c({ref:t},s))}));function d(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var s=2;s<o;s++)i[s]=a[s];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,a)}m.displayName="MDXCreateElement"}}]);