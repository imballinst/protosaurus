"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[206],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=c(n),d=o,f=m["".concat(l,".").concat(d)]||m[d]||u[d]||i;return n?r.createElement(f,a(a({ref:t},p),{},{components:n})):r.createElement(f,a({ref:t},p))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9568:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return m}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=["components"],s={sidebar_position:1},l="Tutorial Intro",c={unversionedId:"intro",id:"intro",title:"Tutorial Intro",description:"Hello world. Adding this snippet for proto message color testing.",source:"@site/docs/intro.mdx",sourceDirName:".",slug:"/intro",permalink:"/protosaurus/pr-21/docs/intro",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/intro.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"booking.v1",permalink:"/protosaurus/pr-21/docs/booking.v1"}},p=[],u={toc:p};function m(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"tutorial-intro"},"Tutorial Intro"),(0,i.kt)("p",null,"Hello world. Adding this snippet for proto message color testing."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-protobuf"},'// Location\n//\n// This file is really just an example. The data model is completely fictional.\nsyntax = "proto3";\n\nimport "google/api/field_behavior.proto";\nimport "validate/validate.proto";\n\npackage location.v1;\n\n// Sample location.\nmessage Location {\n  // Latitude of the location.\n  int32 latitude = 1 [(google.api.field_behavior) = REQUIRED];\n  // Longitude of the location.\n  int32 longitude = 2 [(google.api.field_behavior) = REQUIRED];\n\n  // Address (human-friendly string) of the location.\n  // This line tests a <html> tag comment.\n  // This line tests for a [link inside comment](https://github.com).\n  // https://github.com tests line at the start.\n  // This line tests for a link https://github.com at the middle.\n  // This line tests for a [link inside comment](https://github.com) and https://github.com.\n  string address = 3 [(google.api.field_behavior) = REQUIRED, (validate.rules).string.min_len = 1];\n\n  // Sample InnerMessage to test submessages.\n  message InnerMessage {\n    // Sample integer.\n    int32 hello = 1;\n  }\n\n  // Sample message.\n  InnerMessage inner_message = 4;\n\n  // Sample message yet again.\n  InnerMessage second_inner = 5;\n\n  //\n  InnerMessage empty_comment = 6;\n\n  // This is a sample map test.\n  map<string, InnerMessage> test_map = 7;\n}\n')))}m.isMDXComponent=!0}}]);