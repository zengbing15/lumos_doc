(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{102:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return a})),t.d(n,"metadata",(function(){return s})),t.d(n,"toc",(function(){return c})),t.d(n,"default",(function(){return p}));var r=t(3),o=t(7),i=(t(0),t(120)),a={id:"installlumos",title:"Install Lumos"},s={unversionedId:"tutorials/installlumos",id:"tutorials/installlumos",isDocsHomePage:!1,title:"Install Lumos",description:"This guide shows how to install Lumos packages that a DApp requires as dependencies.",source:"@site/docs\\tutorials\\installLumos.md",slug:"/tutorials/installlumos",permalink:"/lumos_doc/docs/tutorials/installlumos",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/tutorials/installLumos.md",version:"current",sidebar:"someSidebar",previous:{title:"Hello Lumos",permalink:"/lumos_doc/docs/preparation/hellolumos"},next:{title:"Set Up the Config Manager",permalink:"/lumos_doc/docs/tutorials/config"}},c=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Environment",id:"environment",children:[]},{value:"Steps",id:"steps",children:[{value:"<strong>Step 1. Navigate into the directory of the project.</strong>",id:"step-1-navigate-into-the-directory-of-the-project",children:[]},{value:"<strong>Step 2. If this is a new project, initialize the project by using the <code>yarn init</code> command.</strong>",id:"step-2-if-this-is-a-new-project-initialize-the-project-by-using-the-yarn-init-command",children:[]},{value:"<strong>Step 3. Install Lumos packages as dependencies for the project.</strong>",id:"step-3-install-lumos-packages-as-dependencies-for-the-project",children:[]}]},{value:"Troubleshooting",id:"troubleshooting",children:[{value:"gyp Error About Missing Dependencies for node-gyp",id:"gyp-error-about-missing-dependencies-for-node-gyp",children:[]},{value:"Error While Rebuilding the xxhash Package",id:"error-while-rebuilding-the-xxhash-package",children:[]}]}],l={toc:c};function p(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("p",null,"This guide shows how to install Lumos packages that a DApp requires as dependencies. "," "),Object(i.b)("h2",{id:"prerequisites"},"Prerequisites"),Object(i.b)("p",null,"The following prerequisites apply for installing Lumos packages as dependencies for a project:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Node.js and Yarn are installed."),Object(i.b)("li",{parentName:"ul"},"Dependencies for build tools are installed.")),Object(i.b)("h2",{id:"environment"},"Environment"),Object(i.b)("p",null,"The following examples are verified on Ubuntu 20.04.2. Steps on the other platforms can be adjusted accordingly."),Object(i.b)("h2",{id:"steps"},"Steps"),Object(i.b)("h3",{id:"step-1-navigate-into-the-directory-of-the-project"},Object(i.b)("strong",{parentName:"h3"},"Step 1. Navigate into the directory of the project.")),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{}),"$ cd mydapp\n")),Object(i.b)("h3",{id:"step-2-if-this-is-a-new-project-initialize-the-project-by-using-the-yarn-init-command"},Object(i.b)("strong",{parentName:"h3"},"Step 2. If this is a new project, initialize the project by using the ",Object(i.b)("inlineCode",{parentName:"strong"},"yarn init")," command.")),Object(i.b)("p",null,"This command prompts questions about the name and version of the project and the name of the initial entry point file (by default this is ",Object(i.b)("strong",{parentName:"p"},"index.js"),"). Just accept the defaults by hitting enter or type answers for each of the questions."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{}),"$ yarn init\n")),Object(i.b)("details",null,Object(i.b)("summary",null,"CLICK ME"),Object(i.b)("p",null,Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"yarn init v1.22.5\nquestion name (mydapp):\nquestion version (1.0.0):\nquestion description:\nquestion entry point (index.js):\nquestion repository url:\nquestion author:\nquestion license (MIT):\nquestion private:\nsuccess Saved package.json\nDone in 44.54s.\n")))),Object(i.b)("h3",{id:"step-3-install-lumos-packages-as-dependencies-for-the-project"},Object(i.b)("strong",{parentName:"h3"},"Step 3. Install Lumos packages as dependencies for the project.")),Object(i.b)("p",null,"A Lumos package can be installed by using the ",Object(i.b)("inlineCode",{parentName:"p"},"yarn add")," command or the ",Object(i.b)("inlineCode",{parentName:"p"},"npm install")," command according to the application requirements."),Object(i.b)("p",null,"The following example installs the indexer, the common-scripts, the config-manager packages and their dependencies for the project."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"$ yarn add @ckb-lumos/indexer@0.15.0 @ckb-lumos/common-scripts@0.15.0 @ckb-lumos/config-manager@0.15.0\n")),Object(i.b)("details",null,Object(i.b)("summary",null,"CLICK ME"),Object(i.b)("p",null,Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"yarn add v1.22.5\ninfo No lockfile found.\n[1/4] Resolving packages...\nwarning @ckb-lumos/indexer > neon-cli@0.4.2: Please upgrade to 0.5.0\nwarning @ckb-lumos/indexer > request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142\nwarning @ckb-lumos/indexer > node-pre-gyp@0.14.0: Please upgrade to @mapbox/node-pre-gyp: the non-scoped node-pre-gyp package is deprecated and only the @mapbox scoped package will recieve updates in the future\nwarning @ckb-lumos/indexer > request > har-validator@5.1.5: this library is no longer supported\n[2/4] Fetching packages...\n[3/4] Linking dependencies...\n[4/4] Building fresh packages...\nsuccess Saved lockfile.\nsuccess Saved 167 new dependencies.\ninfo Direct dependencies\n\u251c\u2500 @ckb-lumos/common-scripts@0.15.0\n\u251c\u2500 @ckb-lumos/config-manager@0.15.0\n\u2514\u2500 @ckb-lumos/indexer@0.15.0\ninfo All dependencies\n\u251c\u2500 @ckb-lumos/common-scripts@0.15.0\n\u251c\u2500 @ckb-lumos/config-manager@0.15.0\n\u251c\u2500 @ckb-lumos/helpers@0.15.0\n\u251c\u2500 @ckb-lumos/indexer@0.15.0\n\u251c\u2500 @ckb-lumos/rpc@0.15.0\n\u251c\u2500 abbrev@1.1.1\n\u251c\u2500 ...\n\u251c\u2500 ...\n\u251c\u2500 wide-align@1.1.3\n\u251c\u2500 wordwrap@1.0.0\n\u251c\u2500 wordwrapjs@4.0.0\n\u251c\u2500 xxhash@0.3.0\n\u2514\u2500 yallist@3.1.1\nDone in 125.02s.\n")))),Object(i.b)("h2",{id:"troubleshooting"},"Troubleshooting"),Object(i.b)("h3",{id:"gyp-error-about-missing-dependencies-for-node-gyp"},"gyp Error About Missing Dependencies for node-gyp"),Object(i.b)("p",null,"If any gyp error about missing dependencies for node-gyp is encountered, go to check the details in ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"../preparation/setupsystem#install-dependencies-for-node-gyp"}),"Install Dependencies for node-gyp")," or the instructions on ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/nodejs/node-gyp"}),"node-gyp")," to fix the error."),Object(i.b)("h3",{id:"error-while-rebuilding-the-xxhash-package"},"Error While Rebuilding the xxhash Package"),Object(i.b)("p",null,"node-gyp rebuilds the xxhash package during the ",Object(i.b)("inlineCode",{parentName:"p"},"yarn add")," or ",Object(i.b)("inlineCode",{parentName:"p"},"npm install")," process. Incompatible Node.js may cause the rebuilding failure. Reinstall a lower version of Node.js, for example, Node.js 12, and then install Lumos packages."))}p.isMDXComponent=!0},120:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return m}));var r=t(0),o=t.n(r);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=o.a.createContext({}),p=function(e){var n=o.a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=p(e.components);return o.a.createElement(l.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},b=o.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=p(t),b=r,m=u["".concat(a,".").concat(b)]||u[b]||d[b]||i;return t?o.a.createElement(m,s(s({ref:n},l),{},{components:t})):o.a.createElement(m,s({ref:n},l))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,a=new Array(i);a[0]=b;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var l=2;l<i;l++)a[l]=t[l];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);