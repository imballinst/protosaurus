"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[199],{5318:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var o=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,f=d["".concat(l,".").concat(m)]||d[m]||p[m]||a;return n?o.createElement(f,i(i({ref:t},u),{},{components:n})):o.createElement(f,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5113:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return u},default:function(){return d}});var o=n(5773),r=n(808),a=(n(7378),n(5318)),i=["components"],s={},l="Test Codeblock Validation 2",c={unversionedId:"test-2",id:"test-2",title:"Test Codeblock Validation 2",description:"Now, we will be testing invalid validations.",source:"@site/docs/test-2.mdx",sourceDirName:".",slug:"/test-2",permalink:"/protosaurus/pr-39/docs/test-2",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/test-2.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Test Annotations",permalink:"/protosaurus/pr-39/docs/metastring"},next:{title:"Test Codeblock Validation 1",permalink:"/protosaurus/pr-39/docs/test"}},u=[],p={toc:u};function d(e){var t=e.components,n=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"test-codeblock-validation-2"},"Test Codeblock Validation 2"),(0,a.kt)("div",{className:"protosaurus-code-container "},(0,a.kt)("pre",{parentName:"div"},(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"console.log('test');\n"))),(0,a.kt)("div",{className:"protosaurus-code-container has-validation"},(0,a.kt)("div",{parentName:"div",className:"protosaurus-code-validation"},"This code block is valid."),(0,a.kt)("pre",{parentName:"div"},(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'validationId="js-log-2" outputLines={2}',validationId:'"js-log-2"',outputLines:"{2}"},"console.log('Hello from js-log-2');\n// Hello from js-log-2\n"))),(0,a.kt)("div",{className:"protosaurus-code-container has-validation"},(0,a.kt)("div",{parentName:"div",className:"protosaurus-code-validation"},"This code block is valid."),(0,a.kt)("pre",{parentName:"div"},(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'validationId="js-log-3" outputLines={2}',validationId:'"js-log-3"',outputLines:"{2}"},"console.log('Hello from js-log-3');\n// Hello from js-log-3\n"))),(0,a.kt)("p",null,"Now, we will be testing invalid validations."),(0,a.kt)("div",{className:"protosaurus-code-container has-validation"},(0,a.kt)("div",{parentName:"div",className:"protosaurus-code-validation"},"This code block is invalid."),(0,a.kt)("pre",{parentName:"div"},(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'validationId="js-log-4" outputLines={2}',validationId:'"js-log-4"',outputLines:"{2}"},"console.log('Hello from js-log-4');\n// Hello from js-log-3\n"))))}d.isMDXComponent=!0}}]);