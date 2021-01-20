(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{107:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return p})),n.d(t,"default",(function(){return u}));var r=n(3),a=n(7),o=(n(0),n(115)),c={id:"hd",title:"HD Wallet Manager"},i={unversionedId:"package/hd",id:"package/hd",isDocsHomePage:!1,title:"HD Wallet Manager",description:"The HD wallet manager for CKB supports mnemonic and keystore that are compatible with Neuron and ckb-cli.",source:"@site/docs\\package\\hd.md",slug:"/package/hd",permalink:"/lumos_doc/docs/package/hd",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/package/hd.md",version:"current",sidebar:"someSidebar",previous:{title:"Config Manager",permalink:"/lumos_doc/docs/package/configmanager"},next:{title:"HD Cache Manager",permalink:"/lumos_doc/docs/package/hdcache"}},p=[{value:"Examples",id:"examples",children:[{value:"Create a New HD Wallet",id:"create-a-new-hd-wallet",children:[]},{value:"Support XPub",id:"support-xpub",children:[]}]}],l={toc:p};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"The HD wallet manager for CKB supports ",Object(o.b)("em",{parentName:"p"},"mnemonic")," and ",Object(o.b)("em",{parentName:"p"},"keystore")," that are compatible with ",Object(o.b)("inlineCode",{parentName:"p"},"Neuron")," and ",Object(o.b)("inlineCode",{parentName:"p"},"ckb-cli"),". "),Object(o.b)("p",null,"The HD wallet manager can import ",Object(o.b)("em",{parentName:"p"},"mnemonic")," generated by ",Object(o.b)("inlineCode",{parentName:"p"},"Neuron")," and load the ",Object(o.b)("em",{parentName:"p"},"keystore")," file generated from ",Object(o.b)("inlineCode",{parentName:"p"},"Neuron")," or ",Object(o.b)("inlineCode",{parentName:"p"},"ckb-cli")," directly."),Object(o.b)("h2",{id:"examples"},"Examples"),Object(o.b)("h3",{id:"create-a-new-hd-wallet"},"Create a New HD Wallet"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-javascript"}),'const { mnemonic, ExtendedPrivateKey, Keystore } = require("@ckb-lumos/hd")\nconst m = mnemonic.generateMnemonic()\nconst seed = mnemonic.mnemonicToSeedSync(m)\nconst extendedPrivateKey = ExtendedPrivateKey.fromSeed(seed)\nconst keystore = Keystore.create(extendedPrivateKey, "Your password")\n// save keystore file\nkeystore.save("you path, only dir")\n\n// load keystore file\nconst keystore = Keystore.load("you file path, with file name")\n')),Object(o.b)("h3",{id:"support-xpub"},"Support XPub"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-javascript"}),'const { XPubStore } = require("@ckb-lumos/hd")\n\n// load from xpub file.\nconst xpub = XPubStore.load("you path")\n\n// to AccountExtendedPublicKey\nconst accountExtendedPublicKey = xpub.toAccountExtendedPublicKey()\n\n// save xpub file.\nxpub.save("your path")\n')))}u.isMDXComponent=!0},115:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return b}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),d=u(n),m=r,b=d["".concat(c,".").concat(m)]||d[m]||s[m]||o;return n?a.a.createElement(b,i(i({ref:t},l),{},{components:n})):a.a.createElement(b,i({ref:t},l))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var l=2;l<o;l++)c[l]=n[l];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);