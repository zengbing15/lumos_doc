(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{120:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=a.a.createContext({}),p=function(e){var t=a.a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return a.a.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,c=e.originalType,s=e.parentName,i=l(e,["components","mdxType","originalType","parentName"]),u=p(n),b=r,m=u["".concat(s,".").concat(b)]||u[b]||d[b]||c;return n?a.a.createElement(m,o(o({ref:t},i),{},{components:n})):a.a.createElement(m,o({ref:t},i))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var c=n.length,s=new Array(c);s[0]=b;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,s[1]=o;for(var i=2;i<c;i++)s[i]=n[i];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},80:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return o})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return p}));var r=n(3),a=n(7),c=(n(0),n(120)),s={id:"manageaccounts",title:"Manage Accounts"},o={unversionedId:"tutorials/manageaccounts",id:"tutorials/manageaccounts",isDocsHomePage:!1,title:"Manage Accounts",description:"The ownership of CKB is established through keys, the lock script and addresses.",source:"@site/docs\\tutorials\\manageaccounts.md",slug:"/tutorials/manageaccounts",permalink:"/lumos_doc/docs/tutorials/manageaccounts",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/tutorials/manageaccounts.md",version:"current",sidebar:"someSidebar",previous:{title:"Assemble Transactions",permalink:"/lumos_doc/docs/tutorials/buildtransactions"},next:{title:"DApps on CKB Workshop Code",permalink:"/lumos_doc/docs/tutorials/integratenft"}},l=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Examples",id:"examples",children:[{value:"Generate Keys",id:"generate-keys",children:[]},{value:"Recover Public Keys from Signatures",id:"recover-public-keys-from-signatures",children:[]},{value:"Convert a Private Key to a Public Key",id:"convert-a-private-key-to-a-public-key",children:[]},{value:"Generate the Mainnet Address from a Lock Script",id:"generate-the-mainnet-address-from-a-lock-script",children:[]},{value:"Generate the Testnet Address from a Lock Script",id:"generate-the-testnet-address-from-a-lock-script",children:[]},{value:"Generate the Testnet Address from a Public Key",id:"generate-the-testnet-address-from-a-public-key",children:[]},{value:"Get the Lock Script from an Address",id:"get-the-lock-script-from-an-address",children:[]},{value:"Generate the Lock Hash from a Lock Script",id:"generate-the-lock-hash-from-a-lock-script",children:[]},{value:"Generate an Account from a Private Key",id:"generate-an-account-from-a-private-key",children:[]}]}],i={toc:l};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(c.b)("wrapper",Object(r.a)({},i,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("blockquote",null,Object(c.b)("p",{parentName:"blockquote"},"The ownership of CKB is established through keys, the lock script and addresses.")),Object(c.b)("p",null,"Lumos also provides the functions to manage the keys, addresses and the lock script of an account."),Object(c.b)("h2",{id:"prerequisites"},"Prerequisites"),Object(c.b)("p",null,"The following prerequisites apply for managing keys by using Lumos:"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},"Node.js is installed."),Object(c.b)("li",{parentName:"ul"},"The Lumos packages are installed as dependencies for the project.")),Object(c.b)("h2",{id:"examples"},"Examples"),Object(c.b)("h3",{id:"generate-keys"},"Generate Keys"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript",metastring:'title="hellolumos/src/manageaccounts.ts"',title:'"hellolumos/src/manageaccounts.ts"'}),'import { mnemonic, ExtendedPrivateKey } from "@ckb-lumos/hd";\n\nexport async function generateKey(){\n  const m = mnemonic.generateMnemonic();\n  console.log("The mnemonic is",m);\n  const seed = mnemonic.mnemonicToSeedSync(m);\n  const extendedPrivateKey = ExtendedPrivateKey.fromSeed(seed);\n  console.log(extendedPrivateKey);\n  \n  const publickey = extendedPrivateKey.toExtendedPublicKey().publicKey;\n  console.log("The public key is", publickey);\n}\n')),Object(c.b)("p",null,"Try the ",Object(c.b)("inlineCode",{parentName:"p"},"generateKey")," function in the Node.js REPL mode:"),Object(c.b)("details",null,Object(c.b)("summary",null,"CLICK ME"),Object(c.b)("p",null,Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"$ node --experimental-repl-await\nWelcome to Node.js v14.0.0.\nType \".help\" for more information.\n> const { accounts, manageaccounts}=require(\".\");\nThe server is started.\n> await manageaccounts.generateKey();\nThe mnemonic is put sweet bomb route thrive version evoke about excite pumpkin voyage tragic\nExtendedPrivateKey {\n  privateKey: '0xb0551ab24a366ae15fe8cbf450d275ed5c5dd72f2a8de0fbc74072230c05aa6c',\n  chainCode: '0x821f8011f21b00a82c832f1208367e31456bc81a7c1909e01d337a240bd629ed'\n}\nThe public key is 0x022186277d6626f615ec926d1a5c79ba7d6dd459e27597b68c4797e45336a2ba20\n")))),Object(c.b)("h3",{id:"recover-public-keys-from-signatures"},"Recover Public Keys from Signatures"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript",metastring:'title="hellolumos/src/manageaccounts.ts"',title:'"hellolumos/src/manageaccounts.ts"'}),'export async function signature2PublicKey (\n  message: HexString,\n  signature: HexString\n):Promise<HexString> {\n  const pubkey = key.recoverFromSignature(message,signature);\n  \n  console.log("The public key is",pubkey);\n  return pubkey;\n  \n}\n')),Object(c.b)("h3",{id:"convert-a-private-key-to-a-public-key"},"Convert a Private Key to a Public Key"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript",metastring:'title="hellolumos/src/manageaccounts.ts"',title:'"hellolumos/src/manageaccounts.ts"'}),'export async function private2Public (\n  privatekey: HexString\n):Promise<HexString> {\n  const pubkey = key.privateToPublic(privatekey);\n  \n  console.log("The public key is",pubkey);\n  return pubkey;\n}\n')),Object(c.b)("h3",{id:"generate-the-mainnet-address-from-a-lock-script"},"Generate the Mainnet Address from a Lock Script"),Object(c.b)("p",null,"The ",Object(c.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/helpers/src/index.ts#L89"}),"generateAddress")," function of the @ckb-lumos/helpers package can be used to generate address from a specific lock script."),Object(c.b)("p",null,"The following example generates the Mainnet address from a lock script."),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript",metastring:'title="hellolumos/src/manageaccounts.ts"',title:'"hellolumos/src/manageaccounts.ts"'}),'import {predefined} from "@ckb-lumos/config-manager";\nimport { generateAddress } from "@ckb-lumos/helpers";\n\nexport async function generateMainnetAddress(\n  lockScript:Script,\n)  {\n  const config = undefined || predefined.LINA;\n  const mainnetAddress = generateAddress(lockScript,{config});\n  console.log("The mainnet address for the lockscript is", mainnetAddress);  \n}\n')),Object(c.b)("p",null,"Try the ",Object(c.b)("inlineCode",{parentName:"p"},"generateMainnetAddress")," function in the Node.js REPL mode:"),Object(c.b)("details",null,Object(c.b)("summary",null,"CLICK ME"),Object(c.b)("p",null,Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"> const mainnet = await manageaccounts.generateMainnetAddress(script);\nThe mainnet address for the lockscript is ckb1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qxe85u4\n")))),Object(c.b)("h3",{id:"generate-the-testnet-address-from-a-lock-script"},"Generate the Testnet Address from a Lock Script"),Object(c.b)("p",null,"The following example generates the Testnet address from a lock script."),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript",metastring:'title="hellolumos/src/manageaccounts.ts"',title:'"hellolumos/src/manageaccounts.ts"'}),'export async function generateTestnetAddress(\n  lockScript:Script,\n)  {\n  const config = undefined || predefined.AGGRON4;\n  const testnetAddress = generateAddress(lockScript, {config});\n  console.log("The testnet address for the lockscript is", testnetAddress);  \n}\n')),Object(c.b)("p",null,"Try the ",Object(c.b)("inlineCode",{parentName:"p"},"generateTestnetAddress")," function in the Node.js REPL mode:"),Object(c.b)("details",null,Object(c.b)("summary",null,"CLICK ME"),Object(c.b)("p",null,Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"> const mainnet = await manageaccounts.generateTestnetAddress(script);\nThe testnet address for the lockscript is ckt1qyq8uqrxpw9tzg4u5waydrzmdmh8raqt0k8qmuetsf\n")))),Object(c.b)("h3",{id:"generate-the-testnet-address-from-a-public-key"},"Generate the Testnet Address from a Public Key"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript",metastring:'title="hellolumos/src/manageaccounts.ts"',title:'"hellolumos/src/manageaccounts.ts"'}),'import { pubkeyToAddress } from "@nervosnetwork/ckb-sdk-utils";\n\nexport const publicKeyToTestnetAddress = (\n  publicKey: string,\n  prefix = AddressPrefix.Testnet\n) => {\n  const pubkey = publicKey.startsWith("0x") ? publicKey : `0x${publicKey}`;\n  return pubkeyToAddress(pubkey, {\n    prefix,\n    type: Type.HashIdx,\n    codeHashOrCodeHashIndex: "0x00",\n  });\n};\n')),Object(c.b)("h3",{id:"get-the-lock-script-from-an-address"},"Get the Lock Script from an Address"),Object(c.b)("p",null,"The ",Object(c.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/helpers/src/index.ts#L145"}),"parseAddress")," function of the @ckb-lumos/helpers package can be used to get the lock script from an address."),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Example"),":"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript",metastring:'title="hellolumos/src/manageaccounts.ts"',title:'"hellolumos/src/manageaccounts.ts"'}),'import { parseAddress } from "@ckb-lumos/helpers";\n\nexport async function generatelockFromAddress (\n  address:Address\n)  {\n  const lockscript = parseAddress(address);\n  console.log("The lockscript of the address is", lockscript);  \n}\n')),Object(c.b)("p",null,"Try the ",Object(c.b)("inlineCode",{parentName:"p"},"generatelockFromAddress")," function in the Node.js REPL mode: "),Object(c.b)("details",null,Object(c.b)("summary",null,"CLICK ME"),Object(c.b)("p",null,Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"$ node --experimental-repl-await\nWelcome to Node.js v14.0.0.\nType \".help\" for more information.\n> const { accounts, manageaccounts }=require(\".\");\nThe server is started.\n> const alice = accounts.ALICE;\n> await manageaccounts.generatelockFromAddress(alice.ADDRESS);\nThe lockscript of the address is {\n  code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',\n  hash_type: 'type',\n  args: '0x7e00660b8ab122bca3ba468c5b6eee71f40b7d8e'\n}\n")))),Object(c.b)("h3",{id:"generate-the-lock-hash-from-a-lock-script"},"Generate the Lock Hash from a Lock Script"),Object(c.b)("p",null,"The ",Object(c.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/nervosnetwork/lumos/blob/c3bd18e6baac9c283995f25d226a689970dc9537/packages/base/lib/utils.js#L73"}),"computeScriptHash")," function generates hash value for a specific lock script."),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript",metastring:'title="hellolumos/src/manageaccounts.ts"',title:'"hellolumos/src/manageaccounts.ts"'}),'import { utils } from "@ckb-lumos/base";\nconst {  computeScriptHash } = utils;\n\nexport async function generateLockHash(\n  lock:Script\n  ){\n    const lockHash = computeScriptHash(lock);\n    console.log("The lockHash is", lockHash);\n}\n')),Object(c.b)("h3",{id:"generate-an-account-from-a-private-key"},"Generate an Account from a Private Key"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript",metastring:'title="hellolumos/src/manageaccounts.ts"',title:'"hellolumos/src/manageaccounts.ts"'}),'import * as ckbUtils from "@nervosnetwork/ckb-sdk-utils";\nimport { parseAddress} from "@ckb-lumos/helpers";\nimport { utils, Address, Hash, Script, HexString } from "@ckb-lumos/base";\nconst { computeScriptHash } = utils;\n\nexport type Account = {\n  lockScript: Script;\n  lockHash: Hash;\n  address: Address;\n  pubKey: HexString;\n  lockScriptMeta?: any;\n};\n\nexport const generateAccountFromPrivateKey = (privKey: HexString): Account => {\n  const pubKey = ckbUtils.privateKeyToPublicKey(privKey);\n  const address = publicKeyToTestnetAddress(pubKey);\n  const lockScript = parseAddress(address);\n  const lockHash = computeScriptHash(lockScript);\n  return {\n    lockScript,\n    lockHash,\n    address,\n    pubKey,\n  };\n};\n')))}p.isMDXComponent=!0}}]);