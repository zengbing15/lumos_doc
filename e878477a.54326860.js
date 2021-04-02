(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{108:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return b}));var o=n(3),a=n(7),l=(n(0),n(119)),s=n(134),r=n(135),i={id:"setupsystem",title:"Set Up the Development Environment"},c={unversionedId:"preparation/setupsystem",id:"preparation/setupsystem",isDocsHomePage:!1,title:"Set Up the Development Environment",description:"This guide will help you get your system set up for building DApps with Lumos. If you already have everything installed, read the other guides and walk through the examples to learn the usage of Lumos.",source:"@site/docs\\preparation\\setupsystem.md",slug:"/preparation/setupsystem",permalink:"/lumos_doc/docs/preparation/setupsystem",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/preparation/setupsystem.md",version:"current",sidebar:"sidebar2",previous:{title:"Prerequisites",permalink:"/lumos_doc/docs/introduction/prerequisites"},next:{title:"Install a CKB Node",permalink:"/lumos_doc/docs/preparation/installckb"}},u=[{value:"System Recommendations",id:"system-recommendations",children:[]},{value:"Install Node.js",id:"install-nodejs",children:[]},{value:"Install Yarn",id:"install-yarn",children:[]},{value:"Install Dependencies for node-gyp",id:"install-dependencies-for-node-gyp",children:[]}],d={toc:u};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(l.b)("wrapper",Object(o.a)({},d,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("p",null,"This guide will help you get your system set up for building DApps with Lumos. If you already have everything installed, read the other guides and walk through the examples to learn the usage of Lumos."),Object(l.b)("h2",{id:"system-recommendations"},"System Recommendations"),Object(l.b)("p",null,"CKB DApps can be developed on all major platforms including Linux, Windows, and Mac. "),Object(l.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(l.b)("div",{parentName:"div",className:"admonition-heading"},Object(l.b)("h5",{parentName:"div"},Object(l.b)("span",{parentName:"h5",className:"admonition-icon"},Object(l.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(l.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(l.b)("div",{parentName:"div",className:"admonition-content"},Object(l.b)("p",{parentName:"div"},"CKB nodes are required during the development process. The support on Windows for CKB nodes is experimental. To be more performant, we recommend to use a Linux or Unix-based (Mac) operating system. For more information, see ",Object(l.b)("a",{parentName:"p",href:"https://docs.nervos.org/docs/basics/guides/ckb-on-windows"},"Get CKB Binary on Windows (experimental)"),"."))),Object(l.b)("h2",{id:"install-nodejs"},"Install Node.js"),Object(l.b)("p",null,"Node.js is the runtime environment that must be installed on the system before using Lumos. The following sections explain the easiest way to install the Long Term Supported (LTS) version of Node.js on Ubuntu Linux 20.04, macOS, and Windows 10."),Object(l.b)(s.a,{defaultValue:"ubuntu",values:[{label:"Ubuntu 20.04",value:"ubuntu"},{label:"macOS and Windows 10",value:"macoswin"}],mdxType:"Tabs"},Object(l.b)(r.a,{value:"ubuntu",mdxType:"TabItem"},Object(l.b)("p",null,"Install Node.js with Apt by Using a NodeSource PPA:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-bash"},"$ curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh\n$ sudo apt install nodejs\n"))),Object(l.b)(r.a,{value:"macoswin",mdxType:"TabItem"},"Download and install ",Object(l.b)("a",{href:"https://nodejs.org/en/"},"the LTS version")," that is Recommended For Most Users.")),Object(l.b)("h2",{id:"install-yarn"},"Install Yarn"),Object(l.b)("p",null,"It is recommended to install Yarn through the NPM package manager, which comes bundled with ",Object(l.b)("a",{parentName:"p",href:"https://nodejs.org/"},"Node.js")," when it is installed on the system."),Object(l.b)("p",null,"To install Yarn through NPM:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-bash"},"npm install --global yarn\n")),Object(l.b)("h2",{id:"install-dependencies-for-node-gyp"},"Install Dependencies for node-gyp"),Object(l.b)("p",null,"Lumos depends on ",Object(l.b)("strong",{parentName:"p"},"node-gyp")," that is a cross-platform command-line tool for compiling native addon modules for ",Object(l.b)("em",{parentName:"p"},"Node"),".js. "),Object(l.b)("p",null,"node-gyp has a few additional system requirements and dependencies that have different installation steps on different operating systems."),Object(l.b)(s.a,{defaultValue:"ubuntu",values:[{label:"Ubuntu 20.04",value:"ubuntu"},{label:"macOS",value:"macos"},{label:"Windows 10",value:"windows"}],mdxType:"Tabs"},Object(l.b)(r.a,{value:"ubuntu",mdxType:"TabItem"},"The development dependencies for Ubuntu 20.04 LTS are as follows:",Object(l.b)("ul",null,Object(l.b)("li",null,"Python v3.6, v3.7, v3.8, or v3.9 (Ubuntu 20.04 and other versions of Debian Linux ship with Python 3 pre-installed)"),Object(l.b)("li",null,"make"),Object(l.b)("li",null,"A proper C/C++ compiler toolchain, like ",Object(l.b)("a",{href:"https://gcc.gnu.org/"},"GCC"))),Object(l.b)("p",null,"To install ",Object(l.b)("code",null,"GCC")," and ",Object(l.b)("code",null,"make")," on Ubuntu 20.04, run the following command as root or user with sudo privileges:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},"$ sudo apt update\n$ sudo apt install build-essential\n"))),Object(l.b)(r.a,{value:"macos",mdxType:"TabItem"},"The development dependencies for macOS are as follows:",Object(l.b)("ul",null,Object(l.b)("li",null,"Python v3.6, v3.7, v3.8, or v3.9"),Object(l.b)("li",null,Object(l.b)("a",{href:"https://developer.apple.com/xcode/download/"},"Xcode")," and Xcode command line tools"))),Object(l.b)(r.a,{value:"windows",mdxType:"TabItem"},"The development dependencies for Windows are as follows:",Object(l.b)("ul",null,Object(l.b)("li",null,"The current version of Python."),Object(l.b)("li",null,"Visual C++ Build Environment")),Object(l.b)("b",null,"Installation Options"),Object(l.b)("ul",null,Object(l.b)("li",null,"Option 1: Install all the required tools and configurations using Microsoft's windows-build-tools by running ",Object(l.b)("code",null,"npm install -g windows-build-tools -vs2019")," from an elevated PowerShell (run as Administrator).",Object(l.b)("p",null,Object(l.b)("b",null,"Note"),": This command installs all the system dependencies without conflicting with any software already installed on the system. Depending on the build tools' version, the installation requires 3 to 8 gigabytes space to get all dependencies installed. It can take at least 30 minutes depending on the network connection.")),Object(l.b)("li",null,"Option 2: Install dependencies and configure the tools manually.",Object(l.b)("ul",null,Object(l.b)("li",null,"Install Visual C++ Build Environment: Tools for Visual Studio 2019 -> ",Object(l.b)("a",{href:"https://visualstudio.microsoft.com/downloads/"},"Visual Studio 2019 Build Tools"),' (using "Visual C++ build tools" workload) and run ',Object(l.b)("code",null,"npm config set msvs_version 2019")," in a cmd terminal."),Object(l.b)("li",null,"Install the current version of Python from the ",Object(l.b)("a",{href:"https://docs.python.org/3/using/windows.html#the-microsoft-store-package"},"Microsoft Store package"),", and run ",Object(l.b)("code",null,"npm config set python /path/to/python"),".")))))),"For more information, see the instructions of ",Object(l.b)("a",{href:"https://github.com/nodejs/node-gyp"},"node-gyp"),".")}b.isMDXComponent=!0},119:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m}));var o=n(0),a=n.n(o);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),u=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=u(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},p=a.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=u(n),p=o,m=d["".concat(s,".").concat(p)]||d[p]||b[p]||l;return n?a.a.createElement(m,r(r({ref:t},c),{},{components:n})):a.a.createElement(m,r({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,s=new Array(l);s[0]=p;var r={};for(var i in t)hasOwnProperty.call(t,i)&&(r[i]=t[i]);r.originalType=e,r.mdxType="string"==typeof e?e:o,s[1]=r;for(var c=2;c<l;c++)s[c]=n[c];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},120:function(e,t,n){"use strict";function o(e){var t,n,a="";if("string"==typeof e||"number"==typeof e)a+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=o(e[t]))&&(a&&(a+=" "),a+=n);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}t.a=function(){for(var e,t,n=0,a="";n<arguments.length;)(e=arguments[n++])&&(t=o(e))&&(a&&(a+=" "),a+=t);return a}},126:function(e,t,n){"use strict";var o=n(0),a=n(127);t.a=function(){const e=Object(o.useContext)(a.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},127:function(e,t,n){"use strict";var o=n(0);const a=Object(o.createContext)(void 0);t.a=a},134:function(e,t,n){"use strict";var o=n(0),a=n.n(o),l=n(126),s=n(120),r=n(55),i=n.n(r);const c=37,u=39;t.a=function(e){const{lazy:t,block:n,defaultValue:r,values:d,groupId:b,className:p}=e,{tabGroupChoices:m,setTabGroupChoices:h}=Object(l.a)(),[f,O]=Object(o.useState)(r),v=o.Children.toArray(e.children);if(null!=b){const e=m[b];null!=e&&e!==f&&d.some((t=>t.value===e))&&O(e)}const y=e=>{O(e),null!=b&&h(b,e)},j=[];return a.a.createElement("div",null,a.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(s.a)("tabs",{"tabs--block":n},p)},d.map((({value:e,label:t})=>a.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":f===e,className:Object(s.a)("tabs__item",i.a.tabItem,{"tabs__item--active":f===e}),key:e,ref:e=>j.push(e),onKeyDown:e=>{((e,t,n)=>{switch(n.keyCode){case u:((e,t)=>{const n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()})(e,t);break;case c:((e,t)=>{const n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()})(e,t)}})(j,e.target,e)},onFocus:()=>y(e),onClick:()=>{y(e)}},t)))),t?Object(o.cloneElement)(v.filter((e=>e.props.value===f))[0],{className:"margin-vert--md"}):a.a.createElement("div",{className:"margin-vert--md"},v.map(((e,t)=>Object(o.cloneElement)(e,{key:t,hidden:e.props.value!==f})))))}},135:function(e,t,n){"use strict";var o=n(3),a=n(0),l=n.n(a);t.a=function({children:e,hidden:t,className:n}){return l.a.createElement("div",Object(o.a)({role:"tabpanel"},{hidden:t,className:n}),e)}}}]);