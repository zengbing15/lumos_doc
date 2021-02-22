(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{110:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),b=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=b(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=b(n),u=a,m=p["".concat(o,".").concat(u)]||p[u]||d[u]||i;return n?r.a.createElement(m,c(c({ref:t},s),{},{components:n})):r.a.createElement(m,c({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var s=2;s<i;s++)o[s]=n[s];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},80:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return b}));var a=n(3),r=n(7),i=(n(0),n(110)),o={id:"installckb",title:"Install and Configure a CKB DEV Blockchain"},c={unversionedId:"tutorials/installckb",id:"tutorials/installckb",isDocsHomePage:!1,title:"Install and Configure a CKB DEV Blockchain",description:"Nervos CKB can be installed on all major platforms, including Linux, Windows and macOS.",source:"@site/docs\\tutorials\\install.md",slug:"/tutorials/installckb",permalink:"/lumos_doc/docs/tutorials/installckb",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/tutorials/install.md",version:"current",sidebar:"someSidebar",previous:{title:"Workflow",permalink:"/lumos_doc/docs/quickstart/workflow"},next:{title:"Add Lumos Packages for a Node Project",permalink:"/lumos_doc/docs/tutorials/installlumos"}},l=[{value:"<strong>Steps</strong>",id:"steps",children:[{value:"<strong>Step 1. Download the latest CKB binary file from the CKB releases page on GitHub.</strong>",id:"step-1-download-the-latest-ckb-binary-file-from-the-ckb-releases-page-on-github",children:[]},{value:"<strong>Step 2. Verify the binaries are working and check versions.</strong>",id:"step-2-verify-the-binaries-are-working-and-check-versions",children:[]},{value:"<strong>Step 3. Initialize the development blockchain.</strong>",id:"step-3-initialize-the-development-blockchain",children:[]},{value:"<strong>Step 4. (Optional) Adjust the parameters to shorten the block interval.</strong>",id:"step-4-optional-adjust-the-parameters-to-shorten-the-block-interval",children:[]},{value:"<strong>Step 5. Specify the args (public key)  in the <code>block_assembler</code> section for receiving mining rewards.</strong>",id:"step-5-specify-the-args-public-key--in-the-block_assembler-section-for-receiving-mining-rewards",children:[]},{value:"<strong>Step 6. Start the CKB node with the dev chain.</strong>",id:"step-6-start-the-ckb-node-with-the-dev-chain",children:[]},{value:"<strong>Step 7. Start the CKB miner in a different terminal.</strong>",id:"step-7-start-the-ckb-miner-in-a-different-terminal",children:[]}]}],s={toc:l};function b(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Nervos CKB can be installed on all major platforms, including Linux, Windows and macOS. "),Object(i.b)("p",null,"This guide introduces how to install and configure a CKB DEV Blockchain on Linux. For more information about the installation and configuration of Nervos CKB, see the guides in ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://docs.nervos.org/"}),"Nervos Doc site"),"."),Object(i.b)("h2",{id:"steps"},Object(i.b)("strong",{parentName:"h2"},"Steps")),Object(i.b)("p",null,"To install and configure a CKB DEV Blockchain on Linux:"),Object(i.b)("h3",{id:"step-1-download-the-latest-ckb-binary-file-from-the-ckb-releases-page-on-github"},Object(i.b)("strong",{parentName:"h3"},"Step 1. Download the latest CKB binary file from the CKB releases page on ",Object(i.b)("a",Object(a.a)({parentName:"strong"},{href:"https://github.com/nervosnetwork/ckb/releases"}),"GitHub"),".")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-shell"}),"$ export TOP=$(pwd)\n$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz\n$ tar xzf ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz\n$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu\n")),Object(i.b)("h3",{id:"step-2-verify-the-binaries-are-working-and-check-versions"},Object(i.b)("strong",{parentName:"h3"},"Step 2. Verify the binaries are working and check versions.")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-shell"}),"$ ckb -V\nckb 0.39.0\n")),Object(i.b)("h3",{id:"step-3-initialize-the-development-blockchain"},Object(i.b)("strong",{parentName:"h3"},"Step 3. Initialize the development blockchain.")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-shell"}),"$ ckb init -C devnet -c dev\nWARN: mining feature is disabled because of lacking the block assembler config options\nInitialized CKB directory in devnet\ncreate specs/dev.toml\ncreate ckb.toml\ncreate ckb-miner.toml\ncreate default.db-options\n")),Object(i.b)("h3",{id:"step-4-optional-adjust-the-parameters-to-shorten-the-block-interval"},Object(i.b)("strong",{parentName:"h3"},"Step 4. (Optional) Adjust the parameters to shorten the block interval.")),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"Modify ",Object(i.b)("inlineCode",{parentName:"p"},"genesis_epoch_length")," and ",Object(i.b)("inlineCode",{parentName:"p"},"permanent_difficulty_in_dummy"),"  in the c:\\ckb\\specs","\\",Object(i.b)("inlineCode",{parentName:"p"},"dev.toml")," chain config file."),Object(i.b)("p",{parentName:"li"},"The default value for the ",Object(i.b)("inlineCode",{parentName:"p"},"genesis_epoch_length")," parameter is ",Object(i.b)("inlineCode",{parentName:"p"},"1000"),". That means each epoch contains 1000 blocks by default. The value 10 or 100 can be used for testing Nervos DAO operations."),Object(i.b)("p",{parentName:"li"},"When ",Object(i.b)("inlineCode",{parentName:"p"},"permanent_difficulty_in_dummy")," is set to ",Object(i.b)("inlineCode",{parentName:"p"},"true"),", all epochs skip the difficulty adjustment",". This parameter is typically used in combination with ",Object(i.b)("inlineCode",{parentName:"p"},"genesis_epoch_length"),"."),Object(i.b)("p",{parentName:"li"},"To modify ",Object(i.b)("inlineCode",{parentName:"p"},"genesis_epoch_length")," and ",Object(i.b)("inlineCode",{parentName:"p"},"permanent_difficulty_in_dummy"),":"),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-shell"}),'$ ed devnet/specs/dev.toml <<EOF\n91d\n90a\ngenesis_epoch_length = 10  # The unit of meansurement is "block".\npermanent_difficulty_in_dummy = true\n.\nwq\nEOF\n'))),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"Modify the ",Object(i.b)("inlineCode",{parentName:"p"},"value")," parameter under the ",Object(i.b)("inlineCode",{parentName:"p"},"miner.workers")," section  in the ",Object(i.b)("inlineCode",{parentName:"p"},"ckb-miner.toml")," file."),Object(i.b)("p",{parentName:"li"},"The default mining interval is 5000 milliseconds (5 seconds). That means a new block is generated at intervals of every 5 seconds."),Object(i.b)("p",{parentName:"li"},"To modify the value to generate a new block every second (1000 milliseconds):"),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-shell"}),"$ ed devnet/ckb-miner.toml <<EOF\n39s/5000/1000/\nwq\nEOF\n")))),Object(i.b)("h3",{id:"step-5-specify-the-args-public-key--in-the-block_assembler-section-for-receiving-mining-rewards"},Object(i.b)("strong",{parentName:"h3"},"Step 5. Specify the args (public key)  in the ",Object(i.b)("inlineCode",{parentName:"strong"},"block_assembler")," section for receiving mining rewards.")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-shell"}),'$ ed devnet/ckb.toml <<EOF\n143a\n[block_assembler]\ncode_hash = "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"\nargs = "0xeb0d26a5d9643333349f3d5bc5a06790b0bd62cd"\nhash_type = "type"\nmessage = "0x"\n.\nwq\nEOF\n')),Object(i.b)("h3",{id:"step-6-start-the-ckb-node-with-the-dev-chain"},Object(i.b)("strong",{parentName:"h3"},"Step 6. Start the CKB node with the dev chain.")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-shell"}),"$ ckb run -C devnet\n")),Object(i.b)("h3",{id:"step-7-start-the-ckb-miner-in-a-different-terminal"},Object(i.b)("strong",{parentName:"h3"},"Step 7. Start the CKB miner in a different terminal.")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-shell"}),"$ export TOP=$(pwd)\n$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu\n$ ckb miner -C devnet\n")))}b.isMDXComponent=!0}}]);