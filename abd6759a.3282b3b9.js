(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{106:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"toc",(function(){return l})),r.d(t,"default",(function(){return p}));var n=r(3),o=r(7),a=(r(0),r(126)),i={id:"workflow",title:"Workflow"},c={unversionedId:"introduction/workflow",id:"introduction/workflow",isDocsHomePage:!1,title:"Workflow",description:"The DApp development generally follows the following basic steps:",source:"@site/docs\\introduction\\workflow.md",slug:"/introduction/workflow",permalink:"/lumos_doc/docs/introduction/workflow",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/introduction/workflow.md",version:"current",lastUpdatedAt:1618925233,sidebar:"sidebar2",previous:{title:"Lumos Components",permalink:"/lumos_doc/docs/introduction/lumoscomponents"},next:{title:"Set Up the Development Environment",permalink:"/lumos_doc/docs/preparation/setupsystem"}},l=[],s={toc:l};function p(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"The DApp development generally follows the following basic steps:"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",{parentName:"li"},"Prepare the basic skills:"),Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"The basic knowledge on Nervos CKB. For more information, see ",Object(a.b)("a",{parentName:"p",href:"https://docs.nervos.org/docs/basics/introduction"},"Nervos CKB Basics"),".")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"The knowledge of CKB Data Model. For more information, see ",Object(a.b)("a",{parentName:"p",href:"https://docs.nervos.org/docs/reference/introduction"},"Nervos CKB Reference")," and ",Object(a.b)("a",{parentName:"p",href:"https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md"},"CKB Data Structure"),".")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"Programming skills of Node.js projects for desktop applications or server applications")))),Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",null,"Set up the development environment.",Object(a.b)("p",{parentName:"li"},"For more information, see ",Object(a.b)("a",{href:"../preparation/setupsystem"},"Set Up the Development Environment"),"."))),Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",null,"Install and start the CKB node.",Object(a.b)("p",{parentName:"li"},"For more information, see ",Object(a.b)("a",{href:"../preparation/installckb"},"Install a CKB Node"),"."))),Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",null,"Create CKB accounts for the development and testing.",Object(a.b)("p",{parentName:"li"},"For more information, see ",Object(a.b)("a",{href:"../preparation/createaccount"},"Create Accounts"),"."))),Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",null,"Initialize a project and add Lumos packages as dependencies to the project.",Object(a.b)("p",{parentName:"li"},"For more information about how to add Lumos packages to a project, see ",Object(a.b)("a",{href:"../tutorials/installlumos"},"Install Lumos Packages"),"."))),Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",null,"Establish the connection with the CKB network by the setup of the config manager and the Lumos indexer.",Object(a.b)("p",{parentName:"li"},"For more information about how to set up the config manager, see ",Object(a.b)("a",{href:"../tutorials/config"},"Set Up the Config Manger"),"."),Object(a.b)("p",{parentName:"li"},"For more information about how to set up the Lumos indexer, see ",Object(a.b)("a",{href:"../tutorials/indexer"},"Set Up the Lumos Indexer"),"."))),Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",null,"Program the DApp functions by using Lumos to deal with user queries and transaction requests.",Object(a.b)("p",{parentName:"li"},"For more information about the usage of Lumos, see the sections in the Guides and Examples.")))))}p.isMDXComponent=!0},126:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return f}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=o.a.createContext({}),p=function(e){var t=o.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=p(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},m=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(r),m=n,f=u["".concat(i,".").concat(m)]||u[m]||b[m]||a;return r?o.a.createElement(f,c(c({ref:t},s),{},{components:r})):o.a.createElement(f,c({ref:t},s))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var s=2;s<a;s++)i[s]=r[s];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);