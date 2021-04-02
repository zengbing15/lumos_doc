(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{110:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return b})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return u}));var a=n(3),l=n(7),o=(n(0),n(119)),r=n(134),i=n(135),c={imid:"installckb",title:"Install a CKB Node"},b={unversionedId:"preparation/installckb",id:"preparation/installckb",isDocsHomePage:!1,title:"Install a CKB Node",description:"The CKB nodes used in the DApp development are full nodes that are the verifiers of the network. A CKB full node verifies new blocks and transactions, relays blocks and transactions, and selects the chain fork on which it agrees.",source:"@site/docs\\preparation\\installckb.md",slug:"/preparation/installckb",permalink:"/lumos_doc/docs/preparation/installckb",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/preparation/installckb.md",version:"current",sidebar:"sidebar2",previous:{title:"Set Up the Development Environment",permalink:"/lumos_doc/docs/preparation/setupsystem"},next:{title:"Create Accounts",permalink:"/lumos_doc/docs/preparation/createaccount"}},s=[{value:"CKB Networks",id:"ckb-networks",children:[]},{value:"Installation Options",id:"installation-options",children:[]},{value:"Install a CKB Node by Using the Pre-built Installer Package",id:"install-a-ckb-node-by-using-the-pre-built-installer-package",children:[{value:"<strong>Step 1. Download the CKB Pre-built Installer Package.</strong>",id:"step-1-download-the-ckb-pre-built-installer-package",children:[]},{value:"<strong>Step 2. Verify the binaries are working and check versions.</strong>",id:"step-2-verify-the-binaries-are-working-and-check-versions",children:[]},{value:"<strong>Step 3. Choose a CKB network and run the CKB node.</strong>",id:"step-3-choose-a-ckb-network-and-run-the-ckb-node",children:[]}]},{value:"Install a CKB Node by Using Tippy",id:"install-a-ckb-node-by-using-tippy",children:[]}],p={toc:s};function u(e){var t=e.components,n=Object(l.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"The CKB nodes used in the DApp development are ",Object(o.b)("strong",{parentName:"p"},"full nodes")," that are the verifiers of the network. A CKB full node verifies new blocks and transactions, relays blocks and transactions, and selects the chain fork on which it agrees."),Object(o.b)("h2",{id:"ckb-networks"},"CKB Networks"),Object(o.b)("p",null,"A CKB node can be set up to connect and interact with one of the following CKB networks:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"Mainnet (Lina)"),": The Mainnet is the main CKB public network. The real-time information of the Lina Mainnet can be checked on the ",Object(o.b)("a",{parentName:"p",href:"https://explorer.nervos.org/"},"CKB Explorer")," page.")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"Testnet (Aggron4)"),": The Testnet is used to test applications integration and smart contracts in real environment with actual data. To get CKB capacity for an account on the Testnet, go to ",Object(o.b)("a",{parentName:"p",href:"https://faucet.nervos.org/"},"https://faucet.nervos.org")," and paste the Testnet address of the address in the address input box, then click the ",Object(o.b)("strong",{parentName:"p"},"Claim")," button. For more information, see ",Object(o.b)("a",{parentName:"p",href:"../preparation/createaccount"},"Create Accounts"),"."),Object(o.b)("div",{parentName:"li",className:"admonition admonition-info alert alert--info"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"For the first time to start running a node on the ",Object(o.b)("strong",{parentName:"p"},"Testnet"),", syncing data requires upwards of one hour for the current number (",Object(o.b)("strong",{parentName:"p"},"1,300,000+"),") of blocks depending on the network connection. The real-time block number on the Testnet can be checked on the ",Object(o.b)("a",{parentName:"p",href:"https://explorer.nervos.org/aggron"},"CKB Explorer")," page.",Object(o.b)("br",null))))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"DEV Chain"),":  The DEV chain is a local blockchain that provides an efficient and useful development mode for building and testing applications. To get CKB capacity for an account on the ",Object(o.b)("strong",{parentName:"p"},"DEV")," chain, specify the account as the miner in the chain configurations for receiving mining rewards. For more information, see ",Object(o.b)("a",{parentName:"p",href:"../preparation/createaccount"},"Create Accounts"),"."," "))),Object(o.b)("h2",{id:"installation-options"},"Installation Options"),Object(o.b)("p",null,"There are two options for installing a CKB node:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"Install a CKB node by using the pre-built installer package.")),Object(o.b)("p",{parentName:"li"},"The pre-built installer package contains the following tools: "),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"ckb"),": The ckb tool is the main tool that initiates configurations, run CKB nodes, synching block data and mining. ")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"ckb-cli"),": ckb-cli is a command line tool that provides the functions of rpc requests, creating CKB addresses, managing wallets, sending transactions, and depositing to Nervos DAO etc.")))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"Install a CKB node by using Tippy.")),Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"Tippy")," is a tool that helps set up and manage CKB nodes. It can install and start running a CKB node by one simple click."),Object(o.b)("div",{parentName:"li",className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"Tippy is currently in the development and experimental stage. (To be updated)"))))),Object(o.b)("h2",{id:"install-a-ckb-node-by-using-the-pre-built-installer-package"},"Install a CKB Node by Using the Pre-built Installer Package"),Object(o.b)("p",null,"The following examples are verified on ",Object(o.b)("strong",{parentName:"p"},"Ubuntu 20.04.2"),". Steps on the other platforms can be adjusted accordingly."),Object(o.b)("h3",{id:"step-1-download-the-ckb-pre-built-installer-package"},Object(o.b)("strong",{parentName:"h3"},"Step 1. Download the CKB Pre-built Installer Package.")),Object(o.b)("p",null,"The following example downloads the CKB version 0.39.0. All releases can be found on the ",Object(o.b)("a",{parentName:"p",href:"https://github.com/nervosnetwork/ckb/releases"},"CKB releases")," page."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"$ export TOP=$(pwd)\n$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz\n$ tar xzf ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz\n$ export PATH=$PATH:$TOP/ckb_v0.39.0_x86_64-unknown-linux-gnu\n")),Object(o.b)("h3",{id:"step-2-verify-the-binaries-are-working-and-check-versions"},Object(o.b)("strong",{parentName:"h3"},"Step 2. Verify the binaries are working and check versions.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"$ ckb -V\nckb 0.39.0\n")),Object(o.b)("h3",{id:"step-3-choose-a-ckb-network-and-run-the-ckb-node"},Object(o.b)("strong",{parentName:"h3"},"Step 3. Choose a CKB network and run the CKB node.")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"DEV chain")," is the recommended network for the later examples and CKB starters. For more information about CKB networks, see ",Object(o.b)("a",{parentName:"p",href:"../preparation/installckb#ckb-networks"},"CKB Networks"),"."),Object(o.b)(r.a,{defaultValue:"dev",values:[{label:"DEV Chain",value:"dev"},{label:"Testnet",value:"testnet"},{label:"Mainnet",value:"mainnet"}],mdxType:"Tabs"},Object(o.b)(i.a,{value:"dev",mdxType:"TabItem"},Object(o.b)("p",null,Object(o.b)("b",null,"1. Initialize the CKB node on the DEV blockchain.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"$ ckb init -C devnet -c dev\nWARN: mining feature is disabled because of lacking the block assembler config options\nInitialized CKB directory in devnet\ncreate specs/dev.toml\ncreate ckb.toml\ncreate ckb-miner.toml\ncreate default.db-options\n")),Object(o.b)("p",null,Object(o.b)("b",null,"2. (Optional) Adjust the parameters to shorten the block interval.")),Object(o.b)("ul",null,Object(o.b)("li",null,Object(o.b)("p",null,"Modify ",Object(o.b)("code",null,"genesis_epoch_length")," and ",Object(o.b)("code",null,"permanent_difficulty_in_dummy"),"  in the /ckb_v0.39.0_x86_64-unknown-linux-gnu/specs/",Object(o.b)("b",null,"dev.toml")," config file."),Object(o.b)("p",null,"The default value for the ",Object(o.b)("code",null,"genesis_epoch_length")," parameter is ",Object(o.b)("code",null,"1000"),". That means each epoch contains 1000 blocks by default. The value 10 or 100 can be used for testing Nervos DAO operations."),Object(o.b)("p",null,"When ",Object(o.b)("code",null,"permanent_difficulty_in_dummy")," is set to ",Object(o.b)("code",null,"true"),", all epochs skip the difficulty adjustment. This parameter is typically used in combination with ",Object(o.b)("code",null,"genesis_epoch_length"),"."),Object(o.b)("p",null,"To modify ",Object(o.b)("code",null,"genesis_epoch_length")," and ",Object(o.b)("code",null,"permanent_difficulty_in_dummy"),":"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1-8}","{1-8}":!0},'$ ed devnet/specs/dev.toml <<EOF\n91d\n90a\ngenesis_epoch_length = 10  # The unit of meansurement is "block".\npermanent_difficulty_in_dummy = true\n.\nwq\nEOF\n'))),Object(o.b)("li",null,Object(o.b)("p",null,"Modify the ",Object(o.b)("code",null,"value")," parameter under the ",Object(o.b)("code",null,"miner.workers")," section  in the ",Object(o.b)("b",null,"ckb-miner.toml")," file."),Object(o.b)("p",null,"The default mining interval is 5000 milliseconds (5 seconds). That means a new block is generated at intervals of every 5 seconds."),Object(o.b)("p",null,"To modify the value to generate a new block every second (1000 milliseconds):"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1-4}","{1-4}":!0},"$ ed devnet/ckb-miner.toml <<EOF\n39s/5000/1000/\nwq\nEOF\n")))),Object(o.b)("p",null,Object(o.b)("b",null,"3. Start the CKB node with the dev chain.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"$ ckb run -C devnet\n"))),Object(o.b)(i.a,{value:"testnet",mdxType:"TabItem"},Object(o.b)("p",null,Object(o.b)("b",null,"1. Initialize the Testnet node.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"$ ckb init --chain testnet -C testnet\nWARN: mining feature is disabled because of lacking the block assembler config options\nInitialized CKB directory in testnet\ncreate ckb.toml\ncreate ckb-miner.toml\n")),Object(o.b)("p",null,Object(o.b)("b",null,"2. Start the CKB Testnet node.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"$ ckb run -C testnet\n"))),Object(o.b)(i.a,{value:"mainnet",mdxType:"TabItem"},Object(o.b)("p",null,Object(o.b)("b",null,"1. Initialize the Mainnet node.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"$ ckb init --chain mainnet -C mainnet\nWARN: mining feature is disabled because of lacking the block assembler config options\nInitialized CKB directory in mainnet\ncreate ckb.toml\ncreate ckb-miner.toml\n")),Object(o.b)("p",null,Object(o.b)("b",null,"2. Start the CKB Mainnet node.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"$ ckb run -C mainnet\n")))),Object(o.b)("h2",{id:"install-a-ckb-node-by-using-tippy"},"Install a CKB Node by Using Tippy"),Object(o.b)("p",null,"CKB nodes can be installed by using Tippy on all major platforms including Linux, Windows, and Mac. The following installation steps are verified on Ubuntu 20.04 LTS and Windows 10."),Object(o.b)(r.a,{defaultValue:"ubuntu",values:[{label:"Ubuntu 20.04",value:"ubuntu"},{label:"Windows 10",value:"windows"}],mdxType:"Tabs"},Object(o.b)(i.a,{value:"ubuntu",mdxType:"TabItem"},Object(o.b)("p",null,Object(o.b)("b",null,"Step 1. Install Tippy")),Object(o.b)("p",null,"Tippy can be installed by using the pre-built installer or built from ",Object(o.b)("a",{href:"https://github.com/nervosnetwork/tippy"},"source"),". The following example installs Tippy version 0.1.6 by using the pre-built installer. For more information about the installation from source, see the ",Object(o.b)("a",{href:"https://github.com/nervosnetwork/tippy"},"Readme")," of Tippy."),Object(o.b)("p",null,"To install Tippy by using the pre-built installer on Ubuntu 20.04:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"$ curl -LO https://github.com/nervosnetwork/tippy/releases/download/v0.1.6/tippy-linux-x64.tar.gz\n  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current\n                                 Dload  Upload   Total   Spent    Left  Speed\n100   625  100   625    0     0    625      0  0:00:01 --:--:--  0:00:01  1481\n100 61.4M  100 61.4M    0     0  1612k      0  0:00:39  0:00:39 --:--:-- 1642k\n")),Object(o.b)("p",null,Object(o.b)("b",null,"Step 2. Run the Tippy tool")),Object(o.b)("p",null,"To run the Tippy tool in the command line:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1-3}","{1-3}":!0},"$ chmod +x ./tippy-linux-x64/Tippy\n$ cd tippy-linux-x64\n$ ./tippy-linux-x64/Tippy\n")),Object(o.b)("p",null,"If a desktop GUI is installed, double click the Tippy file under the tippy-linux-x64 folder to run Tippy."),Object(o.b)("p",null,"A web page on ",Object(o.b)("a",null,"http://localhost:5000/Home")," will be opened in a browser after the execution or the double click. If the page is not opened, open the browser and type ",Object(o.b)("a",null,"http://localhost:5000/Home")," in the address field to open it."),Object(o.b)("p",null,Object(o.b)("b",null,"Step 3. Create a CKB node.")),Object(o.b)("p",null,"To create a CKB node on ",Object(o.b)("b",null,"DEV chain"),", click the ",Object(o.b)("b",null,"Launch a CKB devnet instantly")," button on the home page."),Object(o.b)("img",{src:"../../img/tippycreate.png"}),Object(o.b)("p",null,"To create a CKB node on the ",Object(o.b)("b",null,"other")," networks, click ",Object(o.b)("b",null,"Create a customized chain")," to choose the network in the ",Object(o.b)("b",null,"Chain Type")," dropdown list of the ",Object(o.b)("b",null,"Create Chain")," form."),Object(o.b)("p",null,"The CKB node starts running just after it is created. It can be stopped or restarted on the Dashboard. Details of blocks and transactions of the chain can be checked on the Blocks and Transaction pages.")),Object(o.b)(i.a,{value:"windows",mdxType:"TabItem"},Object(o.b)("p",null,Object(o.b)("b",null,"Step 1. Download the Pre-built Installer.")),Object(o.b)("p",null,"The following example downloads the 0.1.6 version. You can find all versions on the ",Object(o.b)("a",{href:"https://github.com/nervosnetwork/tippy/releases"},"Tippy Releases")," page."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"C:> curl -LO https://github.com/nervosnetwork/tippy/releases/download/v0.1.6/tippy-win-x64.zip\n  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current\n                                 Dload  Upload   Total   Spent    Left  Speed\n100   625  100   625    0     0    625      0  0:00:01 --:--:--  0:00:01  1481\n100 61.4M  100 61.4M    0     0  1612k      0  0:00:39  0:00:39 --:--:-- 1642k\n")),Object(o.b)("p",null,Object(o.b)("b",null,"Step 2. Unzip the tippy-win-x64.zip file.")),Object(o.b)("p",null,Object(o.b)("b",null,"Step 3. Double click the Tippy file under the tippy-win-x64 folder to run Tippy.")),Object(o.b)("p",null,"A web page on ",Object(o.b)("a",null,"http://localhost:5000/Home")," will be opened in a browser after the double click. If the page is not opened, open the browser and type ",Object(o.b)("a",null,"http://localhost:5000/Home")," in the address field to open it."),Object(o.b)("p",null,Object(o.b)("b",null,"Step 4. Create a CKB node.")),Object(o.b)("img",{src:"../../../img/tippycreate.png"}),Object(o.b)("p",null,"To create a CKB node on the ",Object(o.b)("b",null,"other")," networks, click ",Object(o.b)("b",null,"Create a customized chain")," to choose the network in the ",Object(o.b)("b",null,"Chain Type")," dropdown list of the ",Object(o.b)("b",null,"Create Chain")," form."),Object(o.b)("p",null,"The CKB node starts running just after it is created. It can be stopped or restarted on the Dashboard. Details of blocks and transactions of the chain can be checked on the Blocks and Transaction pages."))))}u.isMDXComponent=!0},119:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var a=n(0),l=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var b=l.a.createContext({}),s=function(e){var t=l.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return l.a.createElement(b.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return l.a.createElement(l.a.Fragment,{},t)}},d=l.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,r=e.parentName,b=c(e,["components","mdxType","originalType","parentName"]),p=s(n),d=a,m=p["".concat(r,".").concat(d)]||p[d]||u[d]||o;return n?l.a.createElement(m,i(i({ref:t},b),{},{components:n})):l.a.createElement(m,i({ref:t},b))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,r=new Array(o);r[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,r[1]=i;for(var b=2;b<o;b++)r[b]=n[b];return l.a.createElement.apply(null,r)}return l.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},120:function(e,t,n){"use strict";function a(e){var t,n,l="";if("string"==typeof e||"number"==typeof e)l+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(l&&(l+=" "),l+=n);else for(t in e)e[t]&&(l&&(l+=" "),l+=t);return l}t.a=function(){for(var e,t,n=0,l="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(l&&(l+=" "),l+=t);return l}},126:function(e,t,n){"use strict";var a=n(0),l=n(127);t.a=function(){const e=Object(a.useContext)(l.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},127:function(e,t,n){"use strict";var a=n(0);const l=Object(a.createContext)(void 0);t.a=l},134:function(e,t,n){"use strict";var a=n(0),l=n.n(a),o=n(126),r=n(120),i=n(55),c=n.n(i);const b=37,s=39;t.a=function(e){const{lazy:t,block:n,defaultValue:i,values:p,groupId:u,className:d}=e,{tabGroupChoices:m,setTabGroupChoices:h}=Object(o.a)(),[O,g]=Object(a.useState)(i),j=a.Children.toArray(e.children);if(null!=u){const e=m[u];null!=e&&e!==O&&p.some((t=>t.value===e))&&g(e)}const f=e=>{g(e),null!=u&&h(u,e)},v=[];return l.a.createElement("div",null,l.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(r.a)("tabs",{"tabs--block":n},d)},p.map((({value:e,label:t})=>l.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":O===e,className:Object(r.a)("tabs__item",c.a.tabItem,{"tabs__item--active":O===e}),key:e,ref:e=>v.push(e),onKeyDown:e=>{((e,t,n)=>{switch(n.keyCode){case s:((e,t)=>{const n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()})(e,t);break;case b:((e,t)=>{const n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()})(e,t)}})(v,e.target,e)},onFocus:()=>f(e),onClick:()=>{f(e)}},t)))),t?Object(a.cloneElement)(j.filter((e=>e.props.value===O))[0],{className:"margin-vert--md"}):l.a.createElement("div",{className:"margin-vert--md"},j.map(((e,t)=>Object(a.cloneElement)(e,{key:t,hidden:e.props.value!==O})))))}},135:function(e,t,n){"use strict";var a=n(3),l=n(0),o=n.n(l);t.a=function({children:e,hidden:t,className:n}){return o.a.createElement("div",Object(a.a)({role:"tabpanel"},{hidden:t,className:n}),e)}}}]);