(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[518],{9135:function(t,M,e){"use strict";var A=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(M,"__esModule",{value:!0});var u=A(e(7378)),a=A(e(9450));M.default=function(t){var M=t.children;return u.default.createElement("div",{className:a.default.definition},M)}},342:function(t,M,e){"use strict";var A=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(M,"__esModule",{value:!0});var u=A(e(7378)),a=A(e(9450));M.default=function(t){var M=t.name,e=t.children;return u.default.createElement("div",{className:a.default["definition-title"]},u.default.createElement("span",null,M),e)}},1488:function(t,M,e){"use strict";var A=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(M,"__esModule",{value:!0});var u=A(e(7378)),a=A(e(8413));M.default=function(t){var M=t.children;return u.default.createElement("div",{className:a.default.description},u.default.createElement("div",{className:a.default["description-title"]},"Description"),u.default.createElement("div",null,M))}},775:function(t,M,e){"use strict";var A=this&&this.__createBinding||(Object.create?function(t,M,e,A){void 0===A&&(A=e),Object.defineProperty(t,A,{enumerable:!0,get:function(){return M[e]}})}:function(t,M,e,A){void 0===A&&(A=e),t[A]=M[e]}),u=this&&this.__setModuleDefault||(Object.create?function(t,M){Object.defineProperty(t,"default",{enumerable:!0,value:M})}:function(t,M){t.default=M}),a=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var M={};if(null!=t)for(var e in t)"default"!==e&&Object.prototype.hasOwnProperty.call(t,e)&&A(M,t,e);return u(M,t),M},n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(M,"__esModule",{value:!0});var i=a(e(7378)),s=n(e(1403)),N=n(e(6915));function D(){return i.default.createElement("svg",{viewBox:"0 0 24 24",focusable:"false",className:N.default["close-icon"]},i.default.createElement("path",{fill:"currentColor",d:"M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"}))}s.default.setAppElement("#__docusaurus"),M.default=function(){var t=(0,i.useState)(void 0),M=t[0],A=t[1];if((0,i.useEffect)((function(){var t=document.getElementsByClassName("__button-protosaurus-image-toggle__"),M=[],u=0;function a(t){var M=t.target,u=M.dataset.imageSrc||"",a=M.dataset.imageAlt||"";A({src:e(2181)("./static".concat(u)).default,alt:a,id:"dialog-id-".concat(u.replace(/\//g,""))})}for(;u<t.length;){var n=t.item(u);n.addEventListener("click",a),M.push(n),u++}return function(){for(var t=0,e=M;t<e.length;t++){e[t].removeEventListener("click",a)}}}),[]),M){var u=M.alt,a=M.id,n=M.src;return i.default.createElement(s.default,{isOpen:!0,onRequestClose:function(){A(void 0)},overlayClassName:N.default.backdrop,className:N.default["modal-content"],shouldCloseOnOverlayClick:!0,aria:{labelledby:a}},i.default.createElement("h2",{id:a,className:N.default["hidden-label"]},"Overlay modal to show ",u,'. Press "Escape" key or click the close button to close the modal.'),i.default.createElement("div",{className:N.default["close-button-container"]},i.default.createElement("button",{type:"button",className:N.default["close-button"],"aria-label":"Close modal",tabIndex:0,onClick:function(){return A(void 0)},autoFocus:!0},i.default.createElement(D,null))),i.default.createElement("a",{href:n,target:"_blank",rel:"noopener"},i.default.createElement("img",{src:n,alt:u,className:N.default.image})))}return null}},4395:function(t,M,e){"use strict";var A=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(M,"__esModule",{value:!0});var u=A(e(7378)),a=A(e(9450));M.default=function(t){var M=t.children;return u.default.createElement("div",{className:a.default["rpc-definition"]},M)}},6989:function(t,M,e){"use strict";var A=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(M,"__esModule",{value:!0});var u=A(e(7378)),a=A(e(9450));M.default=function(t){var M=t.children;return u.default.createElement("div",{className:a.default["rpc-definition-description"]},M)}},1289:function(t,M,e){"use strict";var A=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(M,"__esModule",{value:!0});var u=A(e(7378)),a=A(e(9450));function n(t){var M,e=t.prefix,A=t.children;return e&&(M=u.default.createElement(u.default.Fragment,null,u.default.createElement("span",null,e)," ")),u.default.createElement("div",null,"(",M,A,")")}M.default=function(t){var M=t.requestTypePrefix,e=t.requestType,A=t.responseTypePrefix,i=t.responseType,s=t.children;return u.default.createElement("div",{className:a.default["rpc-definition-title"]},u.default.createElement("div",{className:a.default["rpc-definition-name"]},u.default.createElement("span",null,"rpc")," ",s),u.default.createElement(n,{prefix:M},e),u.default.createElement("span",null," returns"),u.default.createElement(n,{prefix:A},i))}},5401:function(t,M,e){"use strict";var A=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(M,"__esModule",{value:!0});var u=A(e(7378)),a=A(e(9450));M.default=function(t){var M=t.type,e=t.isStream,A=t.children;return u.default.createElement("div",{className:a.default["rpc-method"]},u.default.createElement("span",{className:a.default["rpc-method-options"]},M),A,e?u.default.createElement("span",{className:a.default["rpc-method-options-stream"]},"stream"):null)}},8559:function(t,M,e){"use strict";e.r(M),e.d(M,{frontMatter:function(){return c},contentTitle:function(){return g},metadata:function(){return j},toc:function(){return o},default:function(){return f}});var A=e(5773),u=e(808),a=(e(7378),e(5318)),n=(e(1488),e(9135)),i=e.n(n),s=e(342),N=e.n(s),D=(e(4395),e(1289),e(6989),e(5401),e(775)),r=e.n(D),L=["components"],c={},g=void 0,j={unversionedId:"location.v1",id:"location.v1",title:"location.v1",description:"Messages",source:"@site/docs/location.v1.mdx",sourceDirName:".",slug:"/location.v1",permalink:"/protosaurus/pr-29/docs/location.v1",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/location.v1.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"booking.v1",permalink:"/protosaurus/pr-29/docs/booking.v1"},next:{title:"google.protobuf.compiler",permalink:"/protosaurus/pr-29/docs/wkt/google.protobuf.compiler"}},o=[{value:"Messages",id:"messages",children:[{value:"Location",id:"location",children:[],level:3}],level:2}],z={toc:o};function f(t){var M=t.components,e=(0,u.Z)(t,L);return(0,a.kt)("wrapper",(0,A.Z)({},z,e,{components:M,mdxType:"MDXLayout"}),(0,a.kt)(r(),{mdxType:"ProtosaurusImage"}),(0,a.kt)("h2",{id:"messages"},"Messages"),(0,a.kt)(i(),{mdxType:"Definition"},(0,a.kt)(N(),{name:"message",mdxType:"DefinitionHeader"},(0,a.kt)("h3",{id:"location"},"Location")),(0,a.kt)("p",null,"Sample location."),(0,a.kt)("precustom",null,"",(0,a.kt)("span",{parentName:"precustom",className:"type"},"message")," Location {\n",(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // Latitude of the location.\n"),"  ",(0,a.kt)("span",{parentName:"precustom",className:"type"},"int32")," latitude = 1;\n","\u200b\n",(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // Longitude of the location.\n"),"  ",(0,a.kt)("span",{parentName:"precustom",className:"type"},"int32")," longitude = 2;\n","\u200b\n",(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // Address (human-friendly string) of the location.\n"),(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // This line tests a <html> tag comment.\n"),(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // This line tests for a ",(0,a.kt)("a",{parentName:"span",href:"https://github.com"},"link inside comment"),".\n"),(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // ",(0,a.kt)("a",{parentName:"span",href:"https://github.com"},"https://github.com")," tests line at the start.\n"),(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // This line tests for a link ",(0,a.kt)("a",{parentName:"span",href:"https://github.com"},"https://github.com")," at the middle.\n"),(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // This line tests for a ",(0,a.kt)("a",{parentName:"span",href:"https://github.com"},"link inside comment")," and ",(0,a.kt)("a",{parentName:"span",href:"https://github.com"},"https://github.com"),".\n"),(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // This line tests for a ",(0,a.kt)("a",{parentName:"span",href:"https://github.com"},"multi-line link inside a comment"),".\n"),(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // Beware!\n"),"  ",(0,a.kt)("span",{parentName:"precustom",className:"type"},"string")," address = 3;\n","\u200b\n","  ",(0,a.kt)("span",{parentName:"precustom",className:"type"},"message")," InnerMessage {\n",(0,a.kt)("span",{parentName:"precustom",className:"comment"},"    // Sample integer.\n"),"    ",(0,a.kt)("span",{parentName:"precustom",className:"type"},"int32")," hello = 1;\n","  }\n","\u200b\n",(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // Sample message.\n"),"  ",(0,a.kt)("span",{parentName:"precustom",className:"type"},"InnerMessage")," inner_message = 4;\n","\u200b\n",(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // Sample message yet again.\n"),"  ",(0,a.kt)("span",{parentName:"precustom",className:"type"},"InnerMessage")," second_inner = 5;\n","\u200b\n","  ",(0,a.kt)("span",{parentName:"precustom",className:"type"},"InnerMessage")," empty_comment = 6;\n","\u200b\n","  map<",(0,a.kt)("span",{parentName:"precustom",className:"type"},"string"),", ",(0,a.kt)("span",{parentName:"precustom",className:"type"},"InnerMessage"),">"," test_map = 7;\n","\u200b\n","  ",(0,a.kt)("span",{parentName:"precustom",className:"type"},"repeated "),(0,a.kt)("span",{parentName:"precustom",className:"type"},"InnerMessage")," test_repeated = 8;\n","\u200b\n",(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // This is an ",(0,a.kt)("button",{parentName:"span","data-image-src":"/img/protosaurus.jpeg","data-image-alt":"example image",className:"button-text __button-protosaurus-image-toggle__"},"example image",(0,a.kt)("svg",{parentName:"button",stroke:"currentColor",fill:"currentColor",strokeWidth:"0",viewBox:"0 0 512 512",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg"},(0,a.kt)("path",{parentName:"svg",d:"M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"}))),".\n"),"  ",(0,a.kt)("span",{parentName:"precustom",className:"type"},"InnerMessage")," test_image = 9;\n","\u200b\n",(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // This line tests for a ",(0,a.kt)("a",{parentName:"span",href:"http://example.com"},"link without https")," as well as\n"),(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // ",(0,a.kt)("a",{parentName:"span",href:"ftp://example.com"},"link that is not http"),", another ",(0,a.kt)("a",{parentName:"span",href:"intro"},"link"),", and\n"),(0,a.kt)("span",{parentName:"precustom",className:"comment"},"  // ",(0,a.kt)("a",{parentName:"span",href:"./intro"},"another relative link"),".\n"),"  ",(0,a.kt)("span",{parentName:"precustom",className:"type"},"InnerMessage")," test_non_https_link = 10;\n","}")))}f.isMDXComponent=!0},9450:function(t,M,e){"use strict";e.r(M),M.default={definition:"definition_r3VA","definition-title":"definition-title_x0IZ","rpc-definition":"rpc-definition_bHiy","rpc-definition-title":"rpc-definition-title_xubB","rpc-definition-name":"rpc-definition-name_lsDZ","rpc-definition-description":"rpc-definition-description_QwMi","rpc-method":"rpc-method_CORY","rpc-method-options":"rpc-method-options_gDqj","rpc-method-options-stream":"rpc-method-options-stream_VF3q"}},8413:function(t,M,e){"use strict";e.r(M),M.default={description:"description_hlow","description-title":"description-title_vJlM"}},6915:function(t,M,e){"use strict";e.r(M),M.default={"hidden-label":"hidden-label_P0WL",image:"image_lBN7","toggle-button":"toggle-button_V6DB","close-button-container":"close-button-container_cElY","close-icon":"close-icon_oJCk","close-button":"close-button_OjQ_",backdrop:"backdrop_vzB1","modal-content":"modal-content_xkPQ"}},4450:function(t,M,e){"use strict";e.r(M),M.default="data:image/png;base64,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"},7716:function(t,M,e){"use strict";e.r(M),M.default="data:image/vnd.microsoft.icon;base64,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"},3007:function(t,M,e){"use strict";e.r(M),M.default=e.p+"assets/images/protosaurus-4c12b3287ff07cb324be28139729f8c4.jpeg"},3791:function(t,M,e){"use strict";e.r(M),M.default=e.p+"assets/images/docsVersionDropdown-dda80f009a926fb2dd92bab8faa6c4d8.png"},4448:function(t,M,e){"use strict";e.r(M),M.default=e.p+"assets/images/localeDropdown-0052c3f08ccaf802ac733b23e655f498.png"},2940:function(t,M,e){"use strict";e.r(M),M.default="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjRkZGIiBkPSJNOTkgNTJoODR2MzRIOTl6Ii8+PHBhdGggZD0iTTIzIDE2M2MtNy4zOTggMC0xMy44NDMtNC4wMjctMTcuMzAzLTEwQTE5Ljg4NiAxOS44ODYgMCAwIDAgMyAxNjNjMCAxMS4wNDYgOC45NTQgMjAgMjAgMjBoMjB2LTIwSDIzeiIgZmlsbD0iIzNFQ0M1RiIvPjxwYXRoIGQ9Ik0xMTIuOTggNTcuMzc2TDE4MyA1M1Y0M2MwLTExLjA0Ni04Ljk1NC0yMC0yMC0yMEg3M2wtMi41LTQuMzNjLTEuMTEyLTEuOTI1LTMuODg5LTEuOTI1LTUgMEw2MyAyM2wtMi41LTQuMzNjLTEuMTExLTEuOTI1LTMuODg5LTEuOTI1LTUgMEw1MyAyM2wtMi41LTQuMzNjLTEuMTExLTEuOTI1LTMuODg5LTEuOTI1LTUgMEw0MyAyM2MtLjAyMiAwLS4wNDIuMDAzLS4wNjUuMDAzbC00LjE0Mi00LjE0MWMtMS41Ny0xLjU3MS00LjI1Mi0uODUzLTQuODI4IDEuMjk0bC0xLjM2OSA1LjEwNC01LjE5Mi0xLjM5MmMtMi4xNDgtLjU3NS00LjExMSAxLjM4OS0zLjUzNSAzLjUzNmwxLjM5IDUuMTkzLTUuMTAyIDEuMzY3Yy0yLjE0OC41NzYtMi44NjcgMy4yNTktMS4yOTYgNC44M2w0LjE0MiA0LjE0MmMwIC4wMjEtLjAwMy4wNDItLjAwMy4wNjRsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgNTNsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgNjNsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgNzNsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgODNsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgOTNsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgMTAzbC00LjMzIDIuNWMtMS45MjUgMS4xMTEtMS45MjUgMy44ODkgMCA1TDIzIDExM2wtNC4zMyAyLjVjLTEuOTI1IDEuMTExLTEuOTI1IDMuODg5IDAgNUwyMyAxMjNsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgMTMzbC00LjMzIDIuNWMtMS45MjUgMS4xMTEtMS45MjUgMy44ODkgMCA1TDIzIDE0M2wtNC4zMyAyLjVjLTEuOTI1IDEuMTExLTEuOTI1IDMuODg5IDAgNUwyMyAxNTNsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgMTYzYzAgMTEuMDQ2IDguOTU0IDIwIDIwIDIwaDEyMGMxMS4wNDYgMCAyMC04Ljk1NCAyMC0yMFY4M2wtNzAuMDItNC4zNzZBMTAuNjQ1IDEwLjY0NSAwIDAgMSAxMDMgNjhjMC01LjYyMSA0LjM3LTEwLjI3MyA5Ljk4LTEwLjYyNCIgZmlsbD0iIzNFQ0M1RiIvPjxwYXRoIGZpbGw9IiMzRUNDNUYiIGQ9Ik0xNDMgMTgzaDMwdi00MGgtMzB6Ii8+PHBhdGggZD0iTTE5MyAxNThjLS4yMTkgMC0uNDI4LjAzNy0uNjM5LjA2NC0uMDM4LS4xNS0uMDc0LS4zMDEtLjExNi0uNDUxQTUgNSAwIDAgMCAxOTAuMzIgMTQ4YTQuOTYgNC45NiAwIDAgMC0zLjAxNiAxLjAzNiAyNi41MzEgMjYuNTMxIDAgMCAwLS4zMzUtLjMzNiA0Ljk1NSA0Ljk1NSAwIDAgMCAxLjAxMS0yLjk4NyA1IDUgMCAwIDAtOS41OTktMS45NTljLS4xNDgtLjA0Mi0uMjk3LS4wNzctLjQ0NS0uMTE1LjAyNy0uMjExLjA2NC0uNDIuMDY0LS42MzlhNSA1IDAgMCAwLTUtNSA1IDUgMCAwIDAtNSA1YzAgLjIxOS4wMzcuNDI4LjA2NC42MzktLjE0OC4wMzgtLjI5Ny4wNzMtLjQ0NS4xMTVhNC45OTggNC45OTggMCAwIDAtOS41OTkgMS45NTljMCAxLjEyNS4zODQgMi4xNTEgMS4wMTEgMi45ODctMy43MTcgMy42MzItNi4wMzEgOC42OTMtNi4wMzEgMTQuMyAwIDExLjA0NiA4Ljk1NCAyMCAyMCAyMCA5LjMzOSAwIDE3LjE2LTYuNDEgMTkuMzYxLTE1LjA2NC4yMTEuMDI3LjQyLjA2NC42MzkuMDY0YTUgNSAwIDAgMCA1LTUgNSA1IDAgMCAwLTUtNSIgZmlsbD0iIzQ0RDg2MCIvPjxwYXRoIGZpbGw9IiMzRUNDNUYiIGQ9Ik0xNTMgMTIzaDMwdi0yMGgtMzB6Ii8+PHBhdGggZD0iTTE5MyAxMTUuNWEyLjUgMi41IDAgMSAwIDAtNWMtLjEwOSAwLS4yMTQuMDE5LS4zMTkuMDMyLS4wMi0uMDc1LS4wMzctLjE1LS4wNTgtLjIyNWEyLjUwMSAyLjUwMSAwIDAgMC0uOTYzLTQuODA3Yy0uNTY5IDAtMS4wODguMTk3LTEuNTA4LjUxOGE2LjY1MyA2LjY1MyAwIDAgMC0uMTY4LS4xNjhjLjMxNC0uNDE3LjUwNi0uOTMxLjUwNi0xLjQ5NGEyLjUgMi41IDAgMCAwLTQuOC0uOTc5QTkuOTg3IDkuOTg3IDAgMCAwIDE4MyAxMDNjLTUuNTIyIDAtMTAgNC40NzgtMTAgMTBzNC40NzggMTAgMTAgMTBjLjkzNCAwIDEuODMzLS4xMzggMi42OS0uMzc3YTIuNSAyLjUgMCAwIDAgNC44LS45NzljMC0uNTYzLS4xOTItMS4wNzctLjUwNi0xLjQ5NC4wNTctLjA1NS4xMTMtLjExMS4xNjgtLjE2OC40Mi4zMjEuOTM5LjUxOCAxLjUwOC41MThhMi41IDIuNSAwIDAgMCAuOTYzLTQuODA3Yy4wMjEtLjA3NC4wMzgtLjE1LjA1OC0uMjI1LjEwNS4wMTMuMjEuMDMyLjMxOS4wMzIiIGZpbGw9IiM0NEQ4NjAiLz48cGF0aCBkPSJNNjMgNTUuNWEyLjUgMi41IDAgMCAxLTIuNS0yLjVjMC00LjEzNi0zLjM2NC03LjUtNy41LTcuNXMtNy41IDMuMzY0LTcuNSA3LjVhMi41IDIuNSAwIDEgMS01IDBjMC02Ljg5MyA1LjYwNy0xMi41IDEyLjUtMTIuNVM2NS41IDQ2LjEwNyA2NS41IDUzYTIuNSAyLjUgMCAwIDEtMi41IDIuNSIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0xMDMgMTgzaDYwYzExLjA0NiAwIDIwLTguOTU0IDIwLTIwVjkzaC02MGMtMTEuMDQ2IDAtMjAgOC45NTQtMjAgMjB2NzB6IiBmaWxsPSIjRkZGRjUwIi8+PHBhdGggZD0iTTE2OC4wMiAxMjRoLTUwLjA0YTEgMSAwIDEgMSAwLTJoNTAuMDRhMSAxIDAgMSAxIDAgMm0wIDIwaC01MC4wNGExIDEgMCAxIDEgMC0yaDUwLjA0YTEgMSAwIDEgMSAwIDJtMCAyMGgtNTAuMDRhMSAxIDAgMSAxIDAtMmg1MC4wNGExIDEgMCAxIDEgMCAybTAtNDkuODE0aC01MC4wNGExIDEgMCAxIDEgMC0yaDUwLjA0YTEgMSAwIDEgMSAwIDJtMCAxOS44MTRoLTUwLjA0YTEgMSAwIDEgMSAwLTJoNTAuMDRhMSAxIDAgMSAxIDAgMm0wIDIwaC01MC4wNGExIDEgMCAxIDEgMC0yaDUwLjA0YTEgMSAwIDEgMSAwIDJNMTgzIDYxLjYxMWMtLjAxMiAwLS4wMjItLjAwNi0uMDM0LS4wMDUtMy4wOS4xMDUtNC41NTIgMy4xOTYtNS44NDIgNS45MjMtMS4zNDYgMi44NS0yLjM4NyA0LjcwMy00LjA5MyA0LjY0Ny0xLjg4OS0uMDY4LTIuOTY5LTIuMjAyLTQuMTEzLTQuNDYtMS4zMTQtMi41OTQtMi44MTQtNS41MzYtNS45NjMtNS40MjYtMy4wNDYuMTA0LTQuNTEzIDIuNzk0LTUuODA3IDUuMTY3LTEuMzc3IDIuNTI4LTIuMzE0IDQuMDY1LTQuMTIxIDMuOTk0LTEuOTI3LS4wNy0yLjk1MS0xLjgwNS00LjEzNi0zLjgxMy0xLjMyMS0yLjIzNi0yLjg0OC00Ljc1LTUuOTM2LTQuNjY0LTIuOTk0LjEwMy00LjQ2NSAyLjM4NS01Ljc2MyA0LjQtMS4zNzMgMi4xMy0yLjMzNSAzLjQyOC00LjE2NSAzLjM1MS0xLjk3My0uMDctMi45OTItMS41MS00LjE3MS0zLjE3Ny0xLjMyNC0xLjg3My0yLjgxNi0zLjk5My01Ljg5NS0zLjg5LTIuOTI4LjEtNC4zOTkgMS45Ny01LjY5NiAzLjYxOC0xLjIzMiAxLjU2NC0yLjE5NCAyLjgwMi00LjIyOSAyLjcyNGExIDEgMCAwIDAtLjA3MiAyYzMuMDE3LjEwMSA0LjU0NS0xLjggNS44NzItMy40ODcgMS4xNzctMS40OTYgMi4xOTMtMi43ODcgNC4xOTMtMi44NTUgMS45MjYtLjA4MiAyLjgyOSAxLjExNSA0LjE5NSAzLjA0NSAxLjI5NyAxLjgzNCAyLjc2OSAzLjkxNCA1LjczMSA0LjAyMSAzLjEwMy4xMDQgNC41OTYtMi4yMTUgNS45MTgtNC4yNjcgMS4xODItMS44MzQgMi4yMDItMy40MTcgNC4xNS0zLjQ4NCAxLjc5My0uMDY3IDIuNzY5IDEuMzUgNC4xNDUgMy42ODEgMS4yOTcgMi4xOTcgMi43NjYgNC42ODYgNS43ODcgNC43OTYgMy4xMjUuMTA4IDQuNjM0LTIuNjIgNS45NDktNS4wMzUgMS4xMzktMi4wODggMi4yMTQtNC4wNiA0LjExOS00LjEyNiAxLjc5My0uMDQyIDIuNzI4IDEuNTk1IDQuMTExIDQuMzMgMS4yOTIgMi41NTMgMi43NTcgNS40NDUgNS44MjUgNS41NTZsLjE2OS4wMDNjMy4wNjQgMCA0LjUxOC0zLjA3NSA1LjgwNS01Ljc5NCAxLjEzOS0yLjQxIDIuMjE3LTQuNjggNC4wNjctNC43NzN2LTJ6IiBmaWxsPSIjMDAwIi8+PHBhdGggZmlsbD0iIzNFQ0M1RiIgZD0iTTgzIDE4M2g0MHYtNDBIODN6Ii8+PHBhdGggZD0iTTE0MyAxNThjLS4yMTkgMC0uNDI4LjAzNy0uNjM5LjA2NC0uMDM4LS4xNS0uMDc0LS4zMDEtLjExNi0uNDUxQTUgNSAwIDAgMCAxNDAuMzIgMTQ4YTQuOTYgNC45NiAwIDAgMC0zLjAxNiAxLjAzNiAyNi41MzEgMjYuNTMxIDAgMCAwLS4zMzUtLjMzNiA0Ljk1NSA0Ljk1NSAwIDAgMCAxLjAxMS0yLjk4NyA1IDUgMCAwIDAtOS41OTktMS45NTljLS4xNDgtLjA0Mi0uMjk3LS4wNzctLjQ0NS0uMTE1LjAyNy0uMjExLjA2NC0uNDIuMDY0LS42MzlhNSA1IDAgMCAwLTUtNSA1IDUgMCAwIDAtNSA1YzAgLjIxOS4wMzcuNDI4LjA2NC42MzktLjE0OC4wMzgtLjI5Ny4wNzMtLjQ0NS4xMTVhNC45OTggNC45OTggMCAwIDAtOS41OTkgMS45NTljMCAxLjEyNS4zODQgMi4xNTEgMS4wMTEgMi45ODctMy43MTcgMy42MzItNi4wMzEgOC42OTMtNi4wMzEgMTQuMyAwIDExLjA0NiA4Ljk1NCAyMCAyMCAyMCA5LjMzOSAwIDE3LjE2LTYuNDEgMTkuMzYxLTE1LjA2NC4yMTEuMDI3LjQyLjA2NC42MzkuMDY0YTUgNSAwIDAgMCA1LTUgNSA1IDAgMCAwLTUtNSIgZmlsbD0iIzQ0RDg2MCIvPjxwYXRoIGZpbGw9IiMzRUNDNUYiIGQ9Ik04MyAxMjNoNDB2LTIwSDgzeiIvPjxwYXRoIGQ9Ik0xMzMgMTE1LjVhMi41IDIuNSAwIDEgMCAwLTVjLS4xMDkgMC0uMjE0LjAxOS0uMzE5LjAzMi0uMDItLjA3NS0uMDM3LS4xNS0uMDU4LS4yMjVhMi41MDEgMi41MDEgMCAwIDAtLjk2My00LjgwN2MtLjU2OSAwLTEuMDg4LjE5Ny0xLjUwOC41MThhNi42NTMgNi42NTMgMCAwIDAtLjE2OC0uMTY4Yy4zMTQtLjQxNy41MDYtLjkzMS41MDYtMS40OTRhMi41IDIuNSAwIDAgMC00LjgtLjk3OUE5Ljk4NyA5Ljk4NyAwIDAgMCAxMjMgMTAzYy01LjUyMiAwLTEwIDQuNDc4LTEwIDEwczQuNDc4IDEwIDEwIDEwYy45MzQgMCAxLjgzMy0uMTM4IDIuNjktLjM3N2EyLjUgMi41IDAgMCAwIDQuOC0uOTc5YzAtLjU2My0uMTkyLTEuMDc3LS41MDYtMS40OTQuMDU3LS4wNTUuMTEzLS4xMTEuMTY4LS4xNjguNDIuMzIxLjkzOS41MTggMS41MDguNTE4YTIuNSAyLjUgMCAwIDAgLjk2My00LjgwN2MuMDIxLS4wNzQuMDM4LS4xNS4wNTgtLjIyNS4xMDUuMDEzLjIxLjAzMi4zMTkuMDMyIiBmaWxsPSIjNDREODYwIi8+PHBhdGggZD0iTTE0MyA0MS43NWMtLjE2IDAtLjMzLS4wMi0uNDktLjA1YTIuNTIgMi41MiAwIDAgMS0uNDctLjE0Yy0uMTUtLjA2LS4yOS0uMTQtLjQzMS0uMjMtLjEzLS4wOS0uMjU5LS4yLS4zOC0uMzEtLjEwOS0uMTItLjIxOS0uMjQtLjMwOS0uMzhzLS4xNy0uMjgtLjIzMS0uNDNhMi42MTkgMi42MTkgMCAwIDEtLjE4OS0uOTZjMC0uMTYuMDItLjMzLjA1LS40OS4wMy0uMTYuMDgtLjMxLjEzOS0uNDcuMDYxLS4xNS4xNDEtLjI5LjIzMS0uNDMuMDktLjEzLjItLjI2LjMwOS0uMzguMTIxLS4xMS4yNS0uMjIuMzgtLjMxLjE0MS0uMDkuMjgxLS4xNy40MzEtLjIzLjE0OS0uMDYuMzEtLjExLjQ3LS4xNC4zMi0uMDcuNjUtLjA3Ljk4IDAgLjE1OS4wMy4zMi4wOC40Ny4xNC4xNDkuMDYuMjkuMTQuNDMuMjMuMTMuMDkuMjU5LjIuMzguMzEuMTEuMTIuMjIuMjUuMzEuMzguMDkuMTQuMTcuMjguMjMuNDMuMDYuMTYuMTEuMzEuMTQuNDcuMDI5LjE2LjA1LjMzLjA1LjQ5IDAgLjY2LS4yNzEgMS4zMS0uNzMgMS43Ny0uMTIxLjExLS4yNS4yMi0uMzguMzEtLjE0LjA5LS4yODEuMTctLjQzLjIzYTIuNTY1IDIuNTY1IDAgMCAxLS45Ni4xOW0yMC0xLjI1Yy0uNjYgMC0xLjMtLjI3LTEuNzcxLS43M2EzLjgwMiAzLjgwMiAwIDAgMS0uMzA5LS4zOGMtLjA5LS4xNC0uMTctLjI4LS4yMzEtLjQzYTIuNjE5IDIuNjE5IDAgMCAxLS4xODktLjk2YzAtLjY2LjI3LTEuMy43MjktMS43Ny4xMjEtLjExLjI1LS4yMi4zOC0uMzEuMTQxLS4wOS4yODEtLjE3LjQzMS0uMjMuMTQ5LS4wNi4zMS0uMTEuNDctLjE0LjMyLS4wNy42Ni0uMDcuOTggMCAuMTU5LjAzLjMyLjA4LjQ3LjE0LjE0OS4wNi4yOS4xNC40My4yMy4xMy4wOS4yNTkuMi4zOC4zMS40NTkuNDcuNzMgMS4xMS43MyAxLjc3IDAgLjE2LS4wMjEuMzMtLjA1LjQ5LS4wMy4xNi0uMDguMzItLjE0LjQ3LS4wNy4xNS0uMTQuMjktLjIzLjQzLS4wOS4xMy0uMi4yNi0uMzEuMzgtLjEyMS4xMS0uMjUuMjItLjM4LjMxLS4xNC4wOS0uMjgxLjE3LS40My4yM2EyLjU2NSAyLjU2NSAwIDAgMS0uOTYuMTkiIGZpbGw9IiMwMDAiLz48L2c+PC9zdmc+"},4261:function(t,M,e){"use strict";e.r(M),M.default=e.p+"assets/images/undraw_docusaurus_mountain-92989bc69aed8241aa3f59b1477f0e56.svg"},3706:function(t,M,e){"use strict";e.r(M),M.default=e.p+"assets/images/undraw_docusaurus_react-88f6652b4608b0eaded2f55452ba6aab.svg"},7627:function(t,M,e){"use strict";e.r(M),M.default=e.p+"assets/images/undraw_docusaurus_tree-1a17af96e3c13c3b6a5c862c0e13d742.svg"},2181:function(t,M,e){var A={"./static/img/docusaurus.png":4450,"./static/img/favicon.ico":7716,"./static/img/logo.svg":2940,"./static/img/protosaurus.jpeg":3007,"./static/img/tutorial/docsVersionDropdown.png":3791,"./static/img/tutorial/localeDropdown.png":4448,"./static/img/undraw_docusaurus_mountain.svg":4261,"./static/img/undraw_docusaurus_react.svg":3706,"./static/img/undraw_docusaurus_tree.svg":7627};function u(t){var M=a(t);return e(M)}function a(t){if(!e.o(A,t)){var M=new Error("Cannot find module '"+t+"'");throw M.code="MODULE_NOT_FOUND",M}return A[t]}u.keys=function(){return Object.keys(A)},u.resolve=a,t.exports=u,u.id=2181}}]);