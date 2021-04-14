(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{121:function(e,t,o){"use strict";o.d(t,"a",(function(){return l})),o.d(t,"b",(function(){return d}));var r=o(0),n=o.n(r);function i(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function c(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){i(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function s(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)o=i[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)o=i[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var u=n.a.createContext({}),p=function(e){var t=n.a.useContext(u),o=t;return e&&(o="function"==typeof e?e(t):c(c({},t),e)),o},l=function(e){var t=p(e.components);return n.a.createElement(u.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},m=n.a.forwardRef((function(e,t){var o=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),l=p(o),m=r,d=l["".concat(a,".").concat(m)]||l[m]||b[m]||i;return o?n.a.createElement(d,c(c({ref:t},u),{},{components:o})):n.a.createElement(d,c({ref:t},u))}));function d(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=o.length,a=new Array(i);a[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var u=2;u<i;u++)a[u]=o[u];return n.a.createElement.apply(null,a)}return n.a.createElement.apply(null,o)}m.displayName="MDXCreateElement"},98:function(e,t,o){"use strict";o.r(t),o.d(t,"frontMatter",(function(){return a})),o.d(t,"metadata",(function(){return c})),o.d(t,"toc",(function(){return s})),o.d(t,"default",(function(){return p}));var r=o(3),n=o(7),i=(o(0),o(121)),a={id:"intro",title:"What is Lumos?",sidebar_label:"Lumos Overview"},c={unversionedId:"introduction/intro",id:"introduction/intro",isDocsHomePage:!1,title:"What is Lumos?",description:"Lumos is an open-source framework that was developed by the Nervos Developer Tools team for building Nervos CKB DApps.",source:"@site/docs\\introduction\\intro.md",slug:"/introduction/intro",permalink:"/lumos_doc/docs/introduction/intro",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/introduction/intro.md",version:"current",sidebar_label:"Lumos Overview",sidebar:"sidebar2",previous:{title:"About This Guide",permalink:"/lumos_doc/docs/introduction/about"},next:{title:"Lumos Components",permalink:"/lumos_doc/docs/introduction/lumoscomponents"}},s=[{value:"How It Works?",id:"how-it-works",children:[]},{value:"Stable Version",id:"stable-version",children:[]},{value:"Contact &amp; Support",id:"contact--support",children:[]}],u={toc:s};function p(e){var t=e.components,o=Object(n.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},u,o,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Lumos is an open-source framework that was developed by the Nervos Developer Tools team for building Nervos CKB DApps. "),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Lumos enables to free the DApp developers from most of the hassles for dealing with CKB. So the developers can focus on the specific logic in the DApps.")),Object(i.b)("h2",{id:"how-it-works"},"How It Works?"),Object(i.b)("p",null,"According to ",Object(i.b)("a",{parentName:"p",href:"https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md#4-programming-model"},"the programming model of CKB"),", DApps running on CKB separate functionally into two parts: computation and verification. "),Object(i.b)("p",null,"The applications that run in the Node.js environment and serve as the ",Object(i.b)("strong",{parentName:"p"},"off-chain computation")," part can be developed on top of Lumos. The DApp built upon Lumos polls the block information from the CKB network,  indexes cells locally, and provides the cells for queries and transactions corresponding to user requests."),Object(i.b)("p",null,"For more information, see ",Object(i.b)("a",{parentName:"p",href:"../introduction/lumoscomponents"},"Lumos Components"),"."),Object(i.b)("img",{src:"../../../img/how.svg",width:"70%"}),Object(i.b)("p",null,"Figure 1 Architecture of a CKB DApp Built with Lumos"),Object(i.b)("h2",{id:"stable-version"},"Stable Version"),Object(i.b)("img",{src:"https://img.shields.io/badge/%40ckb--lumos-v0.16.0-brightgreen"}),Object(i.b)("h2",{id:"contact--support"},"Contact & Support"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Create a ",Object(i.b)("a",{parentName:"li",href:"https://github.com/nervosnetwork/lumos/issues"},"GitHub issue")," for bug reports, feature requests, or questions"),Object(i.b)("li",{parentName:"ul"},"Star \u2b50\ufe0f Lumos on ",Object(i.b)("a",{parentName:"li",href:"https://github.com/nervosnetwork/lumos"},"GitHub")," to support the project!")))}p.isMDXComponent=!0}}]);