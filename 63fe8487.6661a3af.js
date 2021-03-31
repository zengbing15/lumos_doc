(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{120:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),p=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},b=function(e){var t=p(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),b=p(n),u=a,d=b["".concat(i,".").concat(u)]||b[u]||m[u]||o;return n?r.a.createElement(d,c(c({ref:t},l),{},{components:n})):r.a.createElement(d,c({ref:t},l))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},91:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return p}));var a=n(3),r=n(7),o=(n(0),n(120)),i={id:"lumoscomponents",title:"Lumos Components"},c={unversionedId:"introduction/lumoscomponents",id:"introduction/lumoscomponents",isDocsHomePage:!1,title:"Lumos Components",description:"Lumos components (packages) can be classified into several groups according to their features:",source:"@site/docs\\introduction\\lumoscomponents.md",slug:"/introduction/lumoscomponents",permalink:"/lumos_doc/docs/introduction/lumoscomponents",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/introduction/lumoscomponents.md",version:"current",sidebar:"someSidebar",previous:{title:"Lumos Overview",permalink:"/lumos_doc/docs/introduction/intro"},next:{title:"Prerequisites",permalink:"/lumos_doc/docs/introduction/prerequisites"}},s=[],l={toc:s};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Lumos components (packages) can be classified into several groups according to their features:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Helper and Config"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"Base"),": The base component (",Object(o.b)("inlineCode",{parentName:"p"},"@ckb-lumos/base"),") includes the core definitions and stateless functions that can be used in the other components. The ",Object(o.b)("inlineCode",{parentName:"p"},"@ckb-lumos/base")," package can be used as a standalone library.")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"Helpers"),": The helpers component (",Object(o.b)("inlineCode",{parentName:"p"},"@ckb-lumos/helpers"),") defines interfaces, types "," and utilities that require to work under a CKB network. The network, testnet or mainnet, is specified by the config manager.")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"Config Manager"),": The config manager component  (",Object(o.b)("inlineCode",{parentName:"p"},"@ckb-lumos/config-manager"),") deals with differences between chains, such as the Mainnet, Testnet, or numerous DEV chains. Each chain is abstracted into an individual configuration file."),Object(o.b)("p",{parentName:"li"},"When a configuration file is loaded, the config manager handles the chain specific logic that saves corresponding coding effort for configuration management."),Object(o.b)("p",{parentName:"li"},"For more information, see ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"../tutorials/config"}),"Set Up the Config Manager"),".")))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Cell Provider"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"Lumos Indexer"),": The Lumos indexer (",Object(o.b)("inlineCode",{parentName:"p"},"@ckb-lumos/indexer")," and ",Object(o.b)("inlineCode",{parentName:"p"},"@ckb-lumos/sql-indexer"),") is a CKB cell indexer that fulfills the ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://docs.nervos.org/docs/reference/cell#index-query-assemble-pattern"}),"Index-Query-Assemble")," pattern. The Lumos indexer indexes cells and maintains a local database of the cells that provides an optimal way for querying cells."),Object(o.b)("p",{parentName:"li"},"For more information, see ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"../tutorials/indexer"}),"Set Up the Lumos Indexer"),".")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"Transaction Manager"),": The transaction manager (",Object(o.b)("inlineCode",{parentName:"p"},"@ckb-lumos/transaction-manager"),") can serve as an optional cell provider that enables the output cells of pending transactions to be usable for assembling new transactions.")))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Transaction Generator"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"Common Scripts"),": The common scripts component (",Object(o.b)("inlineCode",{parentName:"p"},"@ckb-lumos/common-scripts"),") integrates known scripts on CKB. The scripts use a cell provider (the Lumos indexer or ",Object(o.b)("inlineCode",{parentName:"p"},"transactionManager"),") to collect cells and assemble transactions. Each script implements a specific  ",Object(o.b)("inlineCode",{parentName:"p"},"TransactionSkeleton"),"  for building transactions that forms a unified workflow for transaction generation."),Object(o.b)("p",{parentName:"li"},"The common scripts component can also integrate and leverage user customized CKB scripts. An example is included in the ",Object(o.b)("inlineCode",{parentName:"p"},"@ckb-lumos/common-scripts")," package.")))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Communication"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"RPC"),": The RPC component (",Object(o.b)("inlineCode",{parentName:"li"},"@ckb-lumos/rpc"),") interacts with the CKB network, communicating block and transaction information with CKB nodes."))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Other Functions"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"HD cache manager"),": The HD cache manager (",Object(o.b)("inlineCode",{parentName:"p"},"@ckb-lumos/hd-cache"),") builds a memory cache for derived addresses and live cells of these addresses. It supports query functions, such as querying the balance of an HD wallet.")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"HD wallet manager"),": The HD wallet manager (",Object(o.b)("inlineCode",{parentName:"p"},"@ckb-lumos/hd"),") supports ",Object(o.b)("em",{parentName:"p"},"mnemonic")," and ",Object(o.b)("em",{parentName:"p"},"keystore")," that are compatible with ",Object(o.b)("inlineCode",{parentName:"p"},"Neuron")," and ",Object(o.b)("inlineCode",{parentName:"p"},"ckb-cli"),". "))))),Object(o.b)("p",null,"For information about the installation of Lumos components (packages), see ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"../tutorials/installlumos"}),"Install Lumos"),". "," "))}p.isMDXComponent=!0}}]);