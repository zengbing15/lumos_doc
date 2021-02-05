(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{108:function(e,n,t){"use strict";t.d(n,"a",(function(){return l})),t.d(n,"b",(function(){return s}));var a=t(0),r=t.n(a);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function f(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var b=r.a.createContext({}),p=function(e){var n=r.a.useContext(b),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},l=function(e){var n=p(e.components);return r.a.createElement(b.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},d=r.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,b=f(e,["components","mdxType","originalType","parentName"]),l=p(t),d=a,s=l["".concat(c,".").concat(d)]||l[d]||u[d]||i;return t?r.a.createElement(s,o(o({ref:n},b),{},{components:t})):r.a.createElement(s,o({ref:n},b))}));function s(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,c=new Array(i);c[0]=d;var o={};for(var f in n)hasOwnProperty.call(n,f)&&(o[f]=n[f]);o.originalType=e,o.mdxType="string"==typeof e?e:a,c[1]=o;for(var b=2;b<i;b++)c[b]=t[b];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},63:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return o})),t.d(n,"toc",(function(){return f})),t.d(n,"default",(function(){return p}));var a=t(3),r=t(7),i=(t(0),t(108)),c={id:"configmanager",title:"Configuration Manager"},o={unversionedId:"package/configmanager",id:"package/configmanager",isDocsHomePage:!1,title:"Configuration Manager",description:"The configuration manager deals with differences between chains, such as the mainnet, testnet, or numerous dev chains. Each chain is abstracted into an individual config file.",source:"@site/docs\\package\\config-manager.md",slug:"/package/configmanager",permalink:"/lumos_doc/docs/package/configmanager",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/package/config-manager.md",version:"current"},f=[],b={toc:f};function p(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},b,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("p",null,"The configuration manager deals with differences between chains, such as the mainnet, testnet, or numerous dev chains. Each chain is abstracted into an individual config file. "),Object(i.b)("p",null,"When a config file is loaded, the configuration manager handles the chain specific logic that saves corresponding coding effort for configuration management."),Object(i.b)("p",null,"The configuration  manager supports the node app to boot with a specific chain configuration, so other parts in Lumos can consult the configuration manager directly for information."),Object(i.b)("p",null,"There are two options for setting up the configuration manager:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"Setup the configuration manager using pre-defined configurations specified by the ",Object(i.b)("inlineCode",{parentName:"p"},"LUMOS_CONFIG_NAME")," variable."),Object(i.b)("p",{parentName:"li"},"Pre-defined configurations include:"),Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"p"},"LINA"),": mainnet configurations")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"p"},"AGGRON4"),": testnet configurations "),Object(i.b)("p",{parentName:"li"},Object(i.b)("strong",{parentName:"p"},"Note"),": When the ",Object(i.b)("inlineCode",{parentName:"p"},"AGGRON4")," testnet network is reset, Lumos is upgraded with new testnet configurations."))),Object(i.b)("p",{parentName:"li"},"Example:"),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"$ LUMOS_CONFIG_NAME=LINA node --experimental-repl-await\nWelcome to Node.js v12.16.2.\nType \".help\" for more information.\n> const { initializeConfig, getConfig } = require(\"@ckb-lumos/config-manager\");\n> initializeConfig();\n> getConfig();\n{\n  PREFIX: 'ckb',\n  SCRIPTS: {\n    SECP256K1_BLAKE160: {\n      CODE_HASH: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',\n      HASH_TYPE: 'type',\n      TX_HASH: '0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c',\n      INDEX: '0x0',\n      DEP_TYPE: 'dep_group',\n      SHORT_ID: 0\n    },\n    SECP256K1_BLAKE160_MULTISIG: {\n      CODE_HASH: '0x5c5069eb0857efc65e1bca0c07df34c31663b3622fd3876c876320fc9634e2a8',\n      HASH_TYPE: 'type',\n      TX_HASH: '0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c',\n      INDEX: '0x1',\n      DEP_TYPE: 'dep_group',\n      SHORT_ID: 1\n    },\n    DAO: {\n      CODE_HASH: '0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e',\n      HASH_TYPE: 'type',\n      TX_HASH: '0xe2fb199810d49a4d8beec56718ba2593b665db9d52299a0f9e6e75416d73ff5c',\n      INDEX: '0x2',\n      DEP_TYPE: 'code'\n    }\n  }\n}\n"))),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"Setup the configuration manager via a local config file."),Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"The ",Object(i.b)("inlineCode",{parentName:"p"},"LUMOS_CONFIG_FILE")," variable can be set pointing to a config file from that Lumos reads the configurations.  ")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"If the ",Object(i.b)("inlineCode",{parentName:"p"},"LUMOS_CONFIG_FILE")," variable is not set, Lumos reads configurations from the ",Object(i.b)("inlineCode",{parentName:"p"},"config.json")," file in the current directory."))),Object(i.b)("p",{parentName:"li"},"Example:"),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'$ cat <<EOF > config.json\n{\n  "PREFIX": "ckt",\n  "SCRIPTS": {\n    "SECP256K1_BLAKE160": {\n      "CODE_HASH": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",\n      "HASH_TYPE": "type",\n      "TX_HASH": "0xace5ea83c478bb866edf122ff862085789158f5cbff155b7bb5f13058555b708",\n      "INDEX": "0x0",\n      "DEP_TYPE": "dep_group",\n      "SHORT_ID": 0\n    },\n    "SECP256K1_BLAKE160_MULTISIG": {\n      "CODE_HASH": "0x5c5069eb0857efc65e1bca0c07df34c31663b3622fd3876c876320fc9634e2a8",\n      "HASH_TYPE": "type",\n      "TX_HASH": "0xace5ea83c478bb866edf122ff862085789158f5cbff155b7bb5f13058555b708",\n      "INDEX": "0x1",\n      "DEP_TYPE": "dep_group",\n      "SHORT_ID": 1\n    },\n    "DAO": {\n      "CODE_HASH": "0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e",\n      "HASH_TYPE": "type",\n      "TX_HASH": "0xa563884b3686078ec7e7677a5f86449b15cf2693f3c1241766c6996f206cc541",\n      "INDEX": "0x2",\n      "DEP_TYPE": "code"\n    }\n  }\n}\nEOF\n$ LUMOS_CONFIG_FILE="config.json" node --experimental-repl-await\nWelcome to Node.js v12.16.2.\nType ".help" for more information.\n> const { initializeConfig, getConfig } = require("@ckb-lumos/config-manager");\n> initializeConfig();\n')))))}p.isMDXComponent=!0}}]);