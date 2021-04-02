(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{115:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return i})),t.d(r,"metadata",(function(){return a})),t.d(r,"toc",(function(){return l})),t.d(r,"default",(function(){return s}));var n=t(3),o=t(7),c=(t(0),t(119)),i={id:"blocks",title:"Blocks"},a={unversionedId:"guides/blocks",id:"guides/blocks",isDocsHomePage:!1,title:"Blocks",description:"Use the denormalizers Module",source:"@site/docs\\guides\\blocks.md",slug:"/guides/blocks",permalink:"/lumos_doc/docs/guides/blocks",editUrl:"https://github.com/xying21/lumos_doc/tree/master/docs/guides/blocks.md",version:"current"},l=[{value:"Use the <code>denormalizers</code> Module",id:"use-the-denormalizers-module",children:[]}],u={toc:l};function s(e){var r=e.components,t=Object(o.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},u,t,{components:r,mdxType:"MDXLayout"}),Object(c.b)("h2",{id:""}),Object(c.b)("h3",{id:"use-the-denormalizers-module"},"Use the ",Object(c.b)("inlineCode",{parentName:"h3"},"denormalizers")," Module"),Object(c.b)("p",null,"The following example shows how to use the ",Object(c.b)("inlineCode",{parentName:"p"},"denormalizers")," module:"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-javascript"},'const { normalizers } = require("ckb-js-toolkit");\n\nconst core = require("../lib/core");\nconst denormalizers = require("../lib/denormalizers");\n\n\n')))}s.isMDXComponent=!0},119:function(e,r,t){"use strict";t.d(r,"a",(function(){return p})),t.d(r,"b",(function(){return m}));var n=t(0),o=t.n(n);function c(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){c(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)t=c[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)t=c[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=o.a.createContext({}),s=function(e){var r=o.a.useContext(u),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},p=function(e){var r=s(e.components);return o.a.createElement(u.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},b=o.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,c=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=s(t),b=n,m=p["".concat(i,".").concat(b)]||p[b]||d[b]||c;return t?o.a.createElement(m,a(a({ref:r},u),{},{components:t})):o.a.createElement(m,a({ref:r},u))}));function m(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var c=t.length,i=new Array(c);i[0]=b;var a={};for(var l in r)hasOwnProperty.call(r,l)&&(a[l]=r[l]);a.originalType=e,a.mdxType="string"==typeof e?e:n,i[1]=a;for(var u=2;u<c;u++)i[u]=t[u];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);