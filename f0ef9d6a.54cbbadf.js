(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{117:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return p})),n.d(t,"default",(function(){return d}));var a=n(3),l=n(7),o=(n(0),n(123)),c=n(126),r=n(138),b=n(139),i={id:"installckb",title:"Install a CKB Node"},s={unversionedId:"preparation/installckb",id:"preparation/installckb",isDocsHomePage:!1,title:"Install a CKB Node",description:"The CKB nodes used in the DApp development are full nodes that are the verifiers of the network. A CKB full node verifies new blocks and transactions, relays blocks and transactions, and selects the chain fork on which it agrees.",source:"@site/docs\\preparation\\installckb.md",slug:"/preparation/installckb",permalink:"/lumos_doc/docs/preparation/installckb",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/preparation/installckb.md",version:"current",lastUpdatedAt:1619188968,sidebar:"sidebar2",previous:{title:"Set Up the Development Environment",permalink:"/lumos_doc/docs/preparation/setupsystem"},next:{title:"Create Accounts",permalink:"/lumos_doc/docs/preparation/createaccount"}},p=[{value:"CKB Networks",id:"ckb-networks",children:[]},{value:"Installation Options",id:"installation-options",children:[]},{value:"Install a CKB Node by Using Tippy",id:"install-a-ckb-node-by-using-tippy",children:[]},{value:"Install a CKB Node by Using the Pre-built Installer Package",id:"install-a-ckb-node-by-using-the-pre-built-installer-package",children:[{value:"Step 1. Download the CKB Pre-built Installer Package.",id:"step-1-download-the-ckb-pre-built-installer-package",children:[]},{value:"Step 2. Verify the CKB tool are working and check versions.",id:"step-2-verify-the-ckb-tool-are-working-and-check-versions",children:[]},{value:"Step 3. Run the CKB node.",id:"step-3-run-the-ckb-node",children:[]}]}],u={toc:p};function d(e){var t=e.components,n=Object(l.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"The CKB nodes used in the DApp development are ",Object(o.b)("strong",{parentName:"p"},"full nodes")," that are the verifiers of the network. A CKB full node verifies new blocks and transactions, relays blocks and transactions, and selects the chain fork on which it agrees."),Object(o.b)("h2",{id:"ckb-networks"},"CKB Networks"),Object(o.b)("p",null,"A CKB node can be set up to connect and interact with one of the following CKB networks:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"Mainnet (Lina)"),": The Mainnet is the main CKB public network. The real-time information of the Lina Mainnet can be checked on the ",Object(o.b)("a",{parentName:"p",href:"https://explorer.nervos.org/"},"CKB Explorer")," page.")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"Testnet (Aggron4)"),": The Testnet is used to test applications integration and smart contracts in real environment with actual data. "),Object(o.b)("div",{parentName:"li",className:"admonition admonition-info alert alert--info"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"For the first time to run a node on the ",Object(o.b)("strong",{parentName:"p"},"Testnet"),", syncing data requires upwards of one hour for the current number (",Object(o.b)("strong",{parentName:"p"},"1,300,000+"),") of blocks depending on the network connection. The real-time block number on the Testnet can be checked on the ",Object(o.b)("a",{parentName:"p",href:"https://explorer.nervos.org/aggron"},"CKB Explorer")," page.",Object(o.b)("br",null))))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"DEV Chain"),":  The DEV chain is a local blockchain that provides an efficient and useful development mode for building and testing applications."," "))),Object(o.b)("h2",{id:"installation-options"},"Installation Options"),Object(o.b)("p",null,"There are two options for installing a CKB node:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("a",{parentName:"p",href:"../preparation/installckb#install-a-ckb-node-by-using-tippy"},Object(o.b)("strong",{parentName:"a"},"Install a CKB node by using Tippy"))),Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"Tippy")," is a tool that helps set up and manage CKB nodes. It can install and start running a CKB node by one simple click.")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("a",{parentName:"p",href:"../preparation/installckb#install-a-ckb-node-by-using-the-pre-built-installer-package"},Object(o.b)("strong",{parentName:"a"},"Install a CKB node by using the pre-built installer package"))),Object(o.b)("p",{parentName:"li"},"The pre-built installer package contains the following tools: "),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"ckb"),": The ckb tool is the main tool that initiates configurations, run CKB nodes, synching block data and mining. ")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("strong",{parentName:"p"},"ckb-cli"),": ckb-cli is a command line tool that provides the functions of RPC requests, creating CKB addresses, managing wallets, sending transactions, and depositing to Nervos DAO etc."))))),Object(o.b)("h2",{id:"install-a-ckb-node-by-using-tippy"},"Install a CKB Node by Using Tippy"),Object(o.b)("p",null,"Tippy supports to install and manage CKB nodes on all major platforms including Linux, macOS, and Windows. "),Object(o.b)(r.a,{defaultValue:"ubuntu",values:[{label:"Ubuntu 20.04",value:"ubuntu"},{label:"macOS",value:"macos"},{label:"Windows 10",value:"windows"}],mdxType:"Tabs"},Object(o.b)(b.a,{value:"ubuntu",mdxType:"TabItem"},Object(o.b)("p",null,Object(o.b)("b",null,"Step 1. Download Tippy.")),Object(o.b)("p",null,"Download the ",Object(o.b)("b",null,"tippy-linux-x64.tar.gz")," file and unzip the file. By default, the files are unzipped into the tippy-linux-x64 folder. All versions of Tippy can be found on the ",Object(o.b)("a",{href:"https://github.com/nervosnetwork/tippy/releases"},Object(o.b)("i",{class:"feather icon-download"}),"Tippy Releases")," page."),Object(o.b)("p",null,Object(o.b)("b",null,"Step 2. Make Tippy executable and run Tippy.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1-3}","{1-3}":!0},"$ chmod +x ./tippy-linux-x64/Tippy\n$ cd tippy-linux-x64\n$ ./tippy-linux-x64/Tippy\n")),Object(o.b)("p",null,"If a desktop GUI is installed, double click the Tippy file under the tippy-linux-x64 folder to run Tippy."),Object(o.b)("p",null,"A web page on ",Object(o.b)("a",null,"http://localhost:5000/Home")," will be opened in a browser after the execution or the double click. If the page is not opened, open the browser and type ",Object(o.b)("a",null,"http://localhost:5000/Home")," in the address field to access the Tippy web UI."),Object(o.b)("p",null,Object(o.b)("b",null,"Step 3. Create a CKB node.")),Object(o.b)("p",null,Object(o.b)("b",null,"DEV chain")," is the recommended network for the later examples and CKB starters. For more information about CKB networks, see ",Object(o.b)("a",{href:"../preparation/installckb#ckb-networks"},"CKB Networks"),"."),Object(o.b)("p",null,"To create a CKB node on ",Object(o.b)("b",null,"DEV chain"),", click the ",Object(o.b)("b",null,"Launch a CKB devnet instantly")," button on the home page."),Object(o.b)("img",{src:Object(c.a)("img/tippycreate.png")}),Object(o.b)("p",null,"To create a CKB node on the ",Object(o.b)("b",null,"other")," networks, click ",Object(o.b)("b",null,"Create a customized chain")," to choose the network in the ",Object(o.b)("b",null,"Chain Type")," dropdown list of the ",Object(o.b)("b",null,"Create Chain")," form."),Object(o.b)("p",null,"The CKB node starts running just after it is created. It can be stopped or restarted on the Tippy ",Object(o.b)("b",null,"Dashboard"),". Details of blocks and transactions of the chain can be checked on the ",Object(o.b)("b",null,"Blocks")," and ",Object(o.b)("b",null,"Transactions")," pages that are visible when the node is started.")),Object(o.b)(b.a,{value:"macos",mdxType:"TabItem"},Object(o.b)("p",null,Object(o.b)("b",null,"Step 1. Download Tippy.")),Object(o.b)("p",null,Object(o.b)("ul",null,Object(o.b)("li",null,"Download the ",Object(o.b)("b",null,"Tippy.dmg")," file. All versions of Tippy can be found on the ",Object(o.b)("a",{href:"https://github.com/nervosnetwork/tippy/releases"},Object(o.b)("i",{class:"feather icon-download"}),"Tippy Releases")," page."),Object(o.b)("li",null,"Open the Tippy.dmg file and drag Tippy.app to /Applications folder."))),Object(o.b)("p",null,Object(o.b)("b",null,"Step 2. Run Tippy.")),Object(o.b)("p",null,"Click Tippy.app in /Applications to run Tippy."),Object(o.b)("p",null,"A web page on ",Object(o.b)("a",null,"http://localhost:5000/Home")," will be opened in a browser after the execution or the double click. If the page is not opened, open the browser and type ",Object(o.b)("a",null,"http://localhost:5000/Home")," in the address field to access the Tippy web UI."),Object(o.b)("p",null,Object(o.b)("b",null,"Step 3. Create a CKB node.")),Object(o.b)("p",null,Object(o.b)("b",null,"DEV chain")," is the recommended network for the later examples and CKB starters. For more information about CKB networks, see ",Object(o.b)("a",{href:"../preparation/installckb#ckb-networks"},"CKB Networks"),"."),Object(o.b)("p",null,"To create a CKB node on ",Object(o.b)("b",null,"DEV chain"),", click the ",Object(o.b)("b",null,"Launch a CKB devnet instantly")," button on the home page."),Object(o.b)("img",{src:Object(c.a)("img/tippycreate.png")}),Object(o.b)("p",null,"To create a CKB node on the ",Object(o.b)("b",null,"other")," networks, click ",Object(o.b)("b",null,"Create a customized chain")," to choose the network in the ",Object(o.b)("b",null,"Chain Type")," dropdown list of the ",Object(o.b)("b",null,"Create Chain")," form."),Object(o.b)("p",null,"The CKB node starts running just after it is created. It can be stopped or restarted on the Dashboard. Details of blocks and transactions of the chain can be checked on the Blocks and Transaction pages.")),Object(o.b)(b.a,{value:"windows",mdxType:"TabItem"},Object(o.b)("p",null,Object(o.b)("b",null,"Step 1. Download Tippy.")),Object(o.b)("p",null,"Download the ",Object(o.b)("b",null,"tippy-win-x64.zip")," file and unzip the file. By default, the files are unzipped into the tippy-win-x64 folder. All versions can be found on the ",Object(o.b)("a",{href:"https://github.com/nervosnetwork/tippy/releases"},Object(o.b)("i",{class:"feather icon-download"}),"Tippy Releases")," page."),Object(o.b)("p",null,Object(o.b)("b",null,"Step 2. Run Tippy.")),Object(o.b)("p",null,"Double click the Tippy.exe file under the tippy-win-x64 folder to run Tippy."),Object(o.b)("p",null,"A web page on ",Object(o.b)("a",null,"http://localhost:5000/Home")," will be opened in a browser after the double click. If the page is not opened, open the browser and type ",Object(o.b)("a",null,"http://localhost:5000/Home")," in the address field to access the Tippy web UI."),Object(o.b)("p",null,Object(o.b)("b",null,"Step 3. Create a CKB node.")),Object(o.b)("p",null,Object(o.b)("b",null,"DEV chain")," is the recommended network for the later examples and CKB starters. For more information about CKB networks, see ",Object(o.b)("a",{href:"../preparation/installckb#ckb-networks"},"CKB Networks"),"."),Object(o.b)("p",null,"To create a CKB node on ",Object(o.b)("b",null,"DEV chain"),", click the ",Object(o.b)("b",null,"Launch a CKB devnet instantly")," button on the home page."),Object(o.b)("img",{src:Object(c.a)("img/tippycreate.png")}),Object(o.b)("p",null,"To create a CKB node on the ",Object(o.b)("b",null,"other")," networks, click ",Object(o.b)("b",null,"Create a customized chain")," to choose the network in the ",Object(o.b)("b",null,"Chain Type")," dropdown list of the ",Object(o.b)("b",null,"Create Chain")," form."),Object(o.b)("p",null,"The CKB node starts running just after it is created. It can be stopped or restarted on the Dashboard. Details of blocks and transactions of the chain can be checked on the Blocks and Transaction pages."))),Object(o.b)("h2",{id:"install-a-ckb-node-by-using-the-pre-built-installer-package"},"Install a CKB Node by Using the Pre-built Installer Package"),Object(o.b)("h3",{id:"step-1-download-the-ckb-pre-built-installer-package"},"Step 1. Download the CKB Pre-built Installer Package."),Object(o.b)(r.a,{defaultValue:"ubuntu",values:[{label:"Ubuntu 20.04",value:"ubuntu"},{label:"macOS",value:"macos"},{label:"Windows 10",value:"windows"}],mdxType:"Tabs"},Object(o.b)(b.a,{value:"ubuntu",mdxType:"TabItem"},Object(o.b)("p",null,"Download the ",Object(o.b)("b",null,"ckb_v0.",Object(o.b)("var",null,"xx.x"),"_x86_64-unknown-linux-gnu.tar.gz")," file and unzip the file."),Object(o.b)("p",null,"The following commands download the CKB version 0.39.0 and unzip the file into the ckb_v0.39.0_x86_64-unknown-linux-gnu folder. All releases can be found on the ",Object(o.b)("a",{title:"Download",href:"https://github.com/nervosnetwork/ckb/releases"},Object(o.b)("i",{class:"feather icon-download"}),"CKB releases")," page."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz\n$ tar xzf ckb_v0.39.0_x86_64-unknown-linux-gnu.tar.gz\n"))),Object(o.b)(b.a,{value:"macos",mdxType:"TabItem"},Object(o.b)("p",null,"Download the ",Object(o.b)("b",null,"ckb_v0.",Object(o.b)("var",null,"xx.x"),"_x86_64-unknown-apple-darwin.zip")," file."),Object(o.b)("p",null,"The following command downloads the CKB version 0.39.0. All releases can be found on the ",Object(o.b)("a",{title:"Download",href:"https://github.com/nervosnetwork/ckb/releases"},Object(o.b)("i",{class:"feather icon-download"}),"CKB releases")," page."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"$ curl -LO https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-apple-darwin.zip\n")),Object(o.b)("p",null,"Double-click the ckb_v0.39.0_x86_64-apple-darwin.zip file to unzip it.")),Object(o.b)(b.a,{value:"windows",mdxType:"TabItem"},Object(o.b)("p",null,"Download the ",Object(o.b)("b",null,"ckb_v0.",Object(o.b)("var",null,"xx.x"),"_x86_64-pc-windows-msvc.zip")," file and unzip the file."),Object(o.b)("p",null,"The example downloads the ",Object(o.b)("a",{href:"https://github.com/nervosnetwork/ckb/releases/download/v0.39.0/ckb_v0.39.0_x86_64-pc-windows-msvc.zip"},"ckb_v0.39.0_x86_64-pc-windows-msvc.zip")," file. All releases can be found on the ",Object(o.b)("a",{title:"Download",href:"https://github.com/nervosnetwork/ckb/releases"},Object(o.b)("i",{class:"feather icon-download"}),"CKB releases")," page."))),Object(o.b)("h3",{id:"step-2-verify-the-ckb-tool-are-working-and-check-versions"},"Step 2. Verify the CKB tool are working and check versions."),Object(o.b)("p",null,"To verify the CKB tool, navigate into the unzipped folder where the ckb tool locates and execute the following command:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"ckb -V\nckb 0.39.0\n")),Object(o.b)("h3",{id:"step-3-run-the-ckb-node"},"Step 3. Run the CKB node."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"DEV chain")," is the recommended network for the later examples and CKB starters. For more information about CKB networks, see ",Object(o.b)("a",{parentName:"p",href:"../preparation/installckb#ckb-networks"},"CKB Networks"),"."),Object(o.b)(r.a,{defaultValue:"dev",values:[{label:"DEV Chain",value:"dev"},{label:"Testnet",value:"testnet"},{label:"Mainnet",value:"mainnet"}],mdxType:"Tabs"},Object(o.b)(b.a,{value:"dev",mdxType:"TabItem"},Object(o.b)("p",null,Object(o.b)("b",null,"1. Initialize the CKB node on the DEV blockchain.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"ckb init -C devnet -c dev\nWARN: mining feature is disabled because of lacking the block assembler config options\nInitialized CKB directory in devnet\ncreate specs/dev.toml\ncreate ckb.toml\ncreate ckb-miner.toml\ncreate default.db-options\n")),Object(o.b)("p",null,Object(o.b)("b",null,"2. (Optional) Adjust the parameters to shorten the block interval.")),Object(o.b)("ul",null,Object(o.b)("li",null,Object(o.b)("p",null,"Modify ",Object(o.b)("code",null,"genesis_epoch_length")," and ",Object(o.b)("code",null,"permanent_difficulty_in_dummy")," in the ../devnet/specs/",Object(o.b)("b",null,"dev.toml")," config file."),Object(o.b)("p",null,"The default value for the ",Object(o.b)("code",null,"genesis_epoch_length")," parameter is ",Object(o.b)("var",null,"1000"),". That means each epoch contains 1000 blocks by default. The value 10 or 100 can be used for testing Nervos DAO operations."),Object(o.b)("p",null,"When ",Object(o.b)("code",null,"permanent_difficulty_in_dummy")," is set to ",Object(o.b)("code",null,"true"),", all epochs skip the difficulty adjustment. This parameter is typically used in combination with ",Object(o.b)("code",null,"genesis_epoch_length"),"."),Object(o.b)("p",null,"To modify ",Object(o.b)("code",null,"genesis_epoch_length")," and ",Object(o.b)("code",null,"permanent_difficulty_in_dummy"),":"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-toml",metastring:'title="devnet/specs/dev.toml"',title:'"devnet/specs/dev.toml"'},'genesis_epoch_length = 10  # The unit of meansurement is "block".\npermanent_difficulty_in_dummy = true\n'))),Object(o.b)("li",null,Object(o.b)("p",null,"Modify the ",Object(o.b)("code",null,"value")," parameter under the ",Object(o.b)("code",null,"miner.workers")," section  in the ",Object(o.b)("b",null,"ckb-miner.toml")," file."),Object(o.b)("p",null,"The default mining interval is 5000 milliseconds (5 seconds). That means a new block is generated at intervals of every 5 seconds."),Object(o.b)("p",null,"To modify the value in the [miner.workers] section to generate a new block every second (1000 milliseconds):"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-toml",metastring:'title="devnet/ckb-miner.toml" {4}',title:'"devnet/ckb-miner.toml"',"{4}":!0},'[[miner.workers]]\nworker_type = "Dummy"\ndelay_type = "Constant"\nvalue = 1000\n')))),Object(o.b)("p",null,Object(o.b)("b",null,"3. Start the CKB node with the dev chain.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"ckb run -C devnet\n"))),Object(o.b)(b.a,{value:"testnet",mdxType:"TabItem"},Object(o.b)("p",null,Object(o.b)("b",null,"1. Initialize the Testnet node.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"ckb init --chain testnet -C testnet\nWARN: mining feature is disabled because of lacking the block assembler config options\nInitialized CKB directory in testnet\ncreate ckb.toml\ncreate ckb-miner.toml\n")),Object(o.b)("p",null,Object(o.b)("b",null,"2. Start the CKB Testnet node.")),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"For the first time to run a node on the ",Object(o.b)("strong",{parentName:"p"},"Testnet"),", syncing data requires upwards of one hour for the current number (",Object(o.b)("strong",{parentName:"p"},"1,300,000+"),") of blocks depending on the network connection. The real-time block number on the Testnet can be checked on the ",Object(o.b)("a",{parentName:"p",href:"https://explorer.nervos.org/aggron"},"CKB Explorer")," page.",Object(o.b)("br",null)))),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"ckb run -C testnet\n"))),Object(o.b)(b.a,{value:"mainnet",mdxType:"TabItem"},Object(o.b)("p",null,Object(o.b)("b",null,"1. Initialize the Mainnet node.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"ckb init --chain mainnet -C mainnet\nWARN: mining feature is disabled because of lacking the block assembler config options\nInitialized CKB directory in mainnet\ncreate ckb.toml\ncreate ckb-miner.toml\n")),Object(o.b)("p",null,Object(o.b)("b",null,"2. Start the CKB Mainnet node.")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash",metastring:"{1}","{1}":!0},"ckb run -C mainnet\n")))))}d.isMDXComponent=!0},123:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return h}));var a=n(0),l=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var i=l.a.createContext({}),s=function(e){var t=l.a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=s(e.components);return l.a.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return l.a.createElement(l.a.Fragment,{},t)}},d=l.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,i=b(e,["components","mdxType","originalType","parentName"]),p=s(n),d=a,h=p["".concat(c,".").concat(d)]||p[d]||u[d]||o;return n?l.a.createElement(h,r(r({ref:t},i),{},{components:n})):l.a.createElement(h,r({ref:t},i))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,c=new Array(o);c[0]=d;var r={};for(var b in t)hasOwnProperty.call(t,b)&&(r[b]=t[b]);r.originalType=e,r.mdxType="string"==typeof e?e:a,c[1]=r;for(var i=2;i<o;i++)c[i]=n[i];return l.a.createElement.apply(null,c)}return l.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},124:function(e,t,n){"use strict";function a(e){var t,n,l="";if("string"==typeof e||"number"==typeof e)l+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(l&&(l+=" "),l+=n);else for(t in e)e[t]&&(l&&(l+=" "),l+=t);return l}t.a=function(){for(var e,t,n=0,l="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(l&&(l+=" "),l+=t);return l}},126:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return c}));var a=n(22),l=n(128);function o(){const{siteConfig:{baseUrl:e="/",url:t}={}}=Object(a.default)();return{withBaseUrl:(n,a)=>function(e,t,n,{forcePrependBaseUrl:a=!1,absolute:o=!1}={}){if(!n)return n;if(n.startsWith("#"))return n;if(Object(l.b)(n))return n;if(a)return t+n;const c=n.startsWith(t)?n:t+n.replace(/^\//,"");return o?e+c:c}(t,e,n,a)}}function c(e,t={}){const{withBaseUrl:n}=o();return n(e,t)}},128:function(e,t,n){"use strict";function a(e){return!0===/^(\w*:|\/\/)/.test(e)}function l(e){return void 0!==e&&!a(e)}n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return l}))},131:function(e,t,n){"use strict";var a=n(0),l=n(132);t.a=function(){const e=Object(a.useContext)(l.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},132:function(e,t,n){"use strict";var a=n(0);const l=Object(a.createContext)(void 0);t.a=l},138:function(e,t,n){"use strict";var a=n(0),l=n.n(a),o=n(131),c=n(124),r=n(55),b=n.n(r);const i=37,s=39;t.a=function(e){const{lazy:t,block:n,defaultValue:r,values:p,groupId:u,className:d}=e,{tabGroupChoices:h,setTabGroupChoices:m}=Object(o.a)(),[O,j]=Object(a.useState)(r),f=a.Children.toArray(e.children);if(null!=u){const e=h[u];null!=e&&e!==O&&p.some((t=>t.value===e))&&j(e)}const g=e=>{j(e),null!=u&&m(u,e)},k=[];return l.a.createElement("div",null,l.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(c.a)("tabs",{"tabs--block":n},d)},p.map((({value:e,label:t})=>l.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":O===e,className:Object(c.a)("tabs__item",b.a.tabItem,{"tabs__item--active":O===e}),key:e,ref:e=>k.push(e),onKeyDown:e=>{((e,t,n)=>{switch(n.keyCode){case s:((e,t)=>{const n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()})(e,t);break;case i:((e,t)=>{const n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()})(e,t)}})(k,e.target,e)},onFocus:()=>g(e),onClick:()=>{g(e)}},t)))),t?Object(a.cloneElement)(f.filter((e=>e.props.value===O))[0],{className:"margin-vert--md"}):l.a.createElement("div",{className:"margin-vert--md"},f.map(((e,t)=>Object(a.cloneElement)(e,{key:t,hidden:e.props.value!==O})))))}},139:function(e,t,n){"use strict";var a=n(3),l=n(0),o=n.n(l);t.a=function({children:e,hidden:t,className:n}){return o.a.createElement("div",Object(a.a)({role:"tabpanel"},{hidden:t,className:n}),e)}}}]);