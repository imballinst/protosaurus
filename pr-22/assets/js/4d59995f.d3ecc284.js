(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[15],{3267:function(e,t,M){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var n=a(M(7378)),u=a(M(403));t.default=function(e){var t=e.children;return n.default.createElement("div",{className:u.default.definition},t)}},8389:function(e,t,M){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var n=a(M(7378)),u=a(M(403));t.default=function(e){var t=e.name,M=e.children;return n.default.createElement("div",{className:u.default["definition-title"]},n.default.createElement("span",null,t),M)}},8577:function(e,t,M){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var n=a(M(7378)),u=a(M(8869));t.default=function(e){var t=e.children;return n.default.createElement("div",{className:u.default.description},n.default.createElement("div",{className:u.default["description-title"]},"Description"),n.default.createElement("div",null,t))}},3162:function(e,t,M){"use strict";var a=this&&this.__createBinding||(Object.create?function(e,t,M,a){void 0===a&&(a=M),Object.defineProperty(e,a,{enumerable:!0,get:function(){return t[M]}})}:function(e,t,M,a){void 0===a&&(a=M),e[a]=t[M]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),u=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var M in e)"default"!==M&&Object.prototype.hasOwnProperty.call(e,M)&&a(t,e,M);return n(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var s=u(M(7378)),o=i(M(1403)),A=i(M(5934));function r(){return s.default.createElement("svg",{viewBox:"0 0 24 24",focusable:"false",className:A.default["close-icon"]},s.default.createElement("path",{fill:"currentColor",d:"M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"}))}o.default.setAppElement("#__docusaurus"),t.default=function(){var e=(0,s.useState)(void 0),t=e[0],a=e[1];if((0,s.useEffect)((function(){var e=document.getElementsByClassName("__button-protosaurus-image-toggle__"),t=[],n=0;function u(e){var t=e.target,n=t.dataset.imageSrc||"",u=t.dataset.imageAlt||"";a({src:M(2181)("./static".concat(n)).default,alt:u,id:"dialog-id-".concat(n.replace(/\//g,""))})}for(;n<e.length;){var i=e.item(n);i.addEventListener("click",u),t.push(i),n++}return function(){for(var e=0,M=t;e<M.length;e++){M[e].removeEventListener("click",u)}}}),[]),t){var n=t.alt,u=t.id,i=t.src;return s.default.createElement(o.default,{isOpen:!0,onRequestClose:function(){console.log("heh"),a(void 0)},overlayClassName:A.default.backdrop,className:A.default["modal-content"],shouldCloseOnOverlayClick:!0,aria:{labelledby:u}},s.default.createElement("h2",{id:u,className:A.default["hidden-label"]},"Overlay modal to show ",n,'. Press "Escape" key or click the close button to close the modal.'),s.default.createElement("div",{className:A.default["close-button-container"]},s.default.createElement("button",{type:"button",className:A.default["close-button"],"aria-label":"Close modal",tabIndex:0,onClick:function(){return a(void 0)},autoFocus:!0},s.default.createElement(r,null))),s.default.createElement("a",{href:i,target:"_blank",rel:"noopener"},s.default.createElement("img",{src:i,alt:n,className:A.default.image})))}return null}},909:function(e,t,M){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var n=a(M(7378)),u=a(M(403));t.default=function(e){var t=e.children;return n.default.createElement("div",{className:u.default["rpc-definition"]},t)}},9769:function(e,t,M){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var n=a(M(7378)),u=a(M(403));t.default=function(e){var t=e.children;return n.default.createElement("div",{className:u.default["rpc-definition-description"]},t)}},5916:function(e,t,M){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var n=a(M(7378)),u=a(M(403));function i(e){var t,M=e.prefix,a=e.children;return M&&(t=n.default.createElement(n.default.Fragment,null,n.default.createElement("span",null,M)," ")),n.default.createElement("div",null,"(",t,a,")")}t.default=function(e){var t=e.requestTypePrefix,M=e.requestType,a=e.responseTypePrefix,s=e.responseType,o=e.children;return n.default.createElement("div",{className:u.default["rpc-definition-title"]},n.default.createElement("div",{className:u.default["rpc-definition-name"]},n.default.createElement("span",null,"rpc")," ",o),n.default.createElement(i,{prefix:t},M),n.default.createElement("span",null," returns"),n.default.createElement(i,{prefix:a},s))}},7571:function(e,t,M){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var n=a(M(7378)),u=a(M(403));t.default=function(e){var t=e.type,M=e.isStream,a=e.children;return n.default.createElement("div",{className:u.default["rpc-method"]},n.default.createElement("span",{className:u.default["rpc-method-options"]},t),a,M?n.default.createElement("span",{className:u.default["rpc-method-options-stream"]},"stream"):null)}},1420:function(e,t,M){"use strict";M.r(t),M.d(t,{frontMatter:function(){return z},contentTitle:function(){return d},metadata:function(){return T},toc:function(){return w},default:function(){return y}});var a=M(5773),n=M(808),u=(M(7378),M(5318)),i=(M(8577),M(3267)),s=M.n(i),o=M(8389),A=M.n(o),r=M(909),c=M.n(r),N=M(5916),D=M.n(N),g=M(9769),L=M.n(g),m=M(7571),l=M.n(m),j=M(3162),f=M.n(j),p=["components"],z={},d=void 0,T={unversionedId:"booking.v1",id:"booking.v1",title:"booking.v1",description:"Services",source:"@site/docs/booking.v1.mdx",sourceDirName:".",slug:"/booking.v1",permalink:"/protosaurus/pr-22/docs/booking.v1",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/booking.v1.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Tutorial Intro",permalink:"/protosaurus/pr-22/docs/intro"},next:{title:"location.v1",permalink:"/protosaurus/pr-22/docs/location.v1"}},w=[{value:"Services",id:"services",children:[{value:"BookingService",id:"bookingservice",children:[{value:"BookVehicle",id:"bookvehicle",children:[],level:4},{value:"BookingUpdates",id:"bookingupdates",children:[],level:4}],level:3}],level:2},{value:"Messages",id:"messages",children:[{value:"Booking",id:"booking",children:[],level:3},{value:"BookingStatus",id:"bookingstatus",children:[],level:3},{value:"BookingStatusID",id:"bookingstatusid",children:[],level:3},{value:"EmptyBookingMessage",id:"emptybookingmessage",children:[],level:3}],level:2}],I={toc:w};function y(e){var t=e.components,M=(0,n.Z)(e,p);return(0,u.kt)("wrapper",(0,a.Z)({},I,M,{components:t,mdxType:"MDXLayout"}),(0,u.kt)(f(),{mdxType:"ProtosaurusImage"}),(0,u.kt)("h2",{id:"services"},"Services"),(0,u.kt)(s(),{mdxType:"Definition"},(0,u.kt)(A(),{name:"service",mdxType:"DefinitionHeader"},(0,u.kt)("h3",{id:"bookingservice"},"BookingService")),(0,u.kt)("p",null,"Service for handling vehicle bookings."),(0,u.kt)(c(),{mdxType:"RpcDefinition"},(0,u.kt)(D(),{requestTypePrefix:"",requestType:"Booking",responseTypePrefix:"",responseType:"BookingStatus",mdxType:"RpcDefinitionHeader"},(0,u.kt)("h4",{id:"bookvehicle"},"BookVehicle")),(0,u.kt)(L(),{mdxType:"RpcDefinitionDescription"},(0,u.kt)("p",null,"Used to book a vehicle. Pass in a Booking and a BookingStatus will be\nreturned."),(0,u.kt)(l(),{type:"request",isStream:!1,mdxType:"RpcMethodText"},"Booking"),(0,u.kt)("precustom",null,"",(0,u.kt)("span",{parentName:"precustom",className:"type"},"message")," Booking {\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // ID of booked vehicle.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"int32")," vehicle_id = 1;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Customer that booked the vehicle.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"int32")," customer_id = 2;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Status of the booking.\n"),"  ",(0,u.kt)("a",{parentName:"precustom",href:"/docs/booking.v1#bookingstatus"},"BookingStatus")," status = 3;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Has booking confirmation been sent.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"bool")," confirmation_sent = 4;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Has payment been received.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"bool")," payment_received = 5;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Color preference of the customer.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"string")," color_preference = 6;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Pick-up location.\n"),(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // This is a coordinate.\n"),"  ",(0,u.kt)("a",{parentName:"precustom",href:"/docs/location.v1#location"},"Location")," pickup_location = 7;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Destination location.\n"),(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // This is a coordinate.\n"),"  ",(0,u.kt)("a",{parentName:"precustom",href:"/docs/location.v1#location"},"Location")," destination_location = 8;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Intermediate locations.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"repeated "),(0,u.kt)("a",{parentName:"precustom",href:"/docs/location.v1#location"},"Location")," intermediate_locations = 9;\n","}"),(0,u.kt)(l(),{type:"response",isStream:!1,mdxType:"RpcMethodText"},"BookingStatus"),(0,u.kt)("precustom",null,"",(0,u.kt)("span",{parentName:"precustom",className:"type"},"message")," BookingStatus {\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Unique booking status ID.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"int32")," id = 1;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},'  // Booking status description. E.g. "Active".\n'),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"string")," description = 2;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Duration.\n"),"  ",(0,u.kt)("a",{parentName:"precustom",href:"/docs/wkt/google.protobuf#duration"},"Duration")," duration = 3;\n","}"))),(0,u.kt)(c(),{mdxType:"RpcDefinition"},(0,u.kt)(D(),{requestTypePrefix:"",requestType:"BookingStatusID",responseTypePrefix:"stream",responseType:"BookingStatus",mdxType:"RpcDefinitionHeader"},(0,u.kt)("h4",{id:"bookingupdates"},"BookingUpdates")),(0,u.kt)(L(),{mdxType:"RpcDefinitionDescription"},(0,u.kt)("p",null,"Used to subscribe to updates of the BookingStatus."),(0,u.kt)(l(),{type:"request",isStream:!1,mdxType:"RpcMethodText"},"BookingStatusID"),(0,u.kt)("precustom",null,"",(0,u.kt)("span",{parentName:"precustom",className:"type"},"message")," BookingStatusID {\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Unique booking status ID.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"int32")," id = 1;\n","}"),(0,u.kt)(l(),{type:"response",isStream:!0,mdxType:"RpcMethodText"},"BookingStatus"),(0,u.kt)("precustom",null,"",(0,u.kt)("span",{parentName:"precustom",className:"type"},"message")," BookingStatus {\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Unique booking status ID.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"int32")," id = 1;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},'  // Booking status description. E.g. "Active".\n'),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"string")," description = 2;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Duration.\n"),"  ",(0,u.kt)("a",{parentName:"precustom",href:"/docs/wkt/google.protobuf#duration"},"Duration")," duration = 3;\n","}")))),(0,u.kt)("h2",{id:"messages"},"Messages"),(0,u.kt)(s(),{mdxType:"Definition"},(0,u.kt)(A(),{name:"message",mdxType:"DefinitionHeader"},(0,u.kt)("h3",{id:"booking"},"Booking")),(0,u.kt)("p",null,"Represents the booking of a vehicle."),(0,u.kt)("p",null,"Vehicles are some cool shit. But drive carefully."),(0,u.kt)("precustom",null,"",(0,u.kt)("span",{parentName:"precustom",className:"type"},"message")," Booking {\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // ID of booked vehicle.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"int32")," vehicle_id = 1;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Customer that booked the vehicle.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"int32")," customer_id = 2;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Status of the booking.\n"),"  ",(0,u.kt)("a",{parentName:"precustom",href:"/docs/booking.v1#bookingstatus"},"BookingStatus")," status = 3;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Has booking confirmation been sent.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"bool")," confirmation_sent = 4;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Has payment been received.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"bool")," payment_received = 5;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Color preference of the customer.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"string")," color_preference = 6;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Pick-up location.\n"),(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // This is a coordinate.\n"),"  ",(0,u.kt)("a",{parentName:"precustom",href:"/docs/location.v1#location"},"Location")," pickup_location = 7;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Destination location.\n"),(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // This is a coordinate.\n"),"  ",(0,u.kt)("a",{parentName:"precustom",href:"/docs/location.v1#location"},"Location")," destination_location = 8;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Intermediate locations.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"repeated "),(0,u.kt)("a",{parentName:"precustom",href:"/docs/location.v1#location"},"Location")," intermediate_locations = 9;\n","}")),(0,u.kt)(s(),{mdxType:"Definition"},(0,u.kt)(A(),{name:"message",mdxType:"DefinitionHeader"},(0,u.kt)("h3",{id:"bookingstatus"},"BookingStatus")),(0,u.kt)("p",null,"Represents the status of a vehicle booking."),(0,u.kt)("precustom",null,"",(0,u.kt)("span",{parentName:"precustom",className:"type"},"message")," BookingStatus {\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Unique booking status ID.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"int32")," id = 1;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},'  // Booking status description. E.g. "Active".\n'),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"string")," description = 2;\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Duration.\n"),"  ",(0,u.kt)("a",{parentName:"precustom",href:"/docs/wkt/google.protobuf#duration"},"Duration")," duration = 3;\n","}")),(0,u.kt)(s(),{mdxType:"Definition"},(0,u.kt)(A(),{name:"message",mdxType:"DefinitionHeader"},(0,u.kt)("h3",{id:"bookingstatusid"},"BookingStatusID")),(0,u.kt)("p",null,"Represents the booking status ID."),(0,u.kt)("precustom",null,"",(0,u.kt)("span",{parentName:"precustom",className:"type"},"message")," BookingStatusID {\n",(0,u.kt)("span",{parentName:"precustom",className:"comment"},"  // Unique booking status ID.\n"),"  ",(0,u.kt)("span",{parentName:"precustom",className:"type"},"int32")," id = 1;\n","}")),(0,u.kt)(s(),{mdxType:"Definition"},(0,u.kt)(A(),{name:"message",mdxType:"DefinitionHeader"},(0,u.kt)("h3",{id:"emptybookingmessage"},"EmptyBookingMessage")),(0,u.kt)("p",null,"An empty message for testing"),(0,u.kt)("precustom",null,"",(0,u.kt)("span",{parentName:"precustom",className:"type"},"message")," EmptyBookingMessage {}\n")))}y.isMDXComponent=!0},403:function(e,t,M){"use strict";M.r(t),t.default={definition:"definition_Ji1T","definition-title":"definition-title_r7d9","rpc-definition":"rpc-definition_Q_Ky","rpc-definition-title":"rpc-definition-title_m4i7","rpc-definition-name":"rpc-definition-name_j5L2","rpc-definition-description":"rpc-definition-description_jMCA","rpc-method":"rpc-method_yn3S","rpc-method-options":"rpc-method-options_Wpxx","rpc-method-options-stream":"rpc-method-options-stream_kbmk"}},8869:function(e,t,M){"use strict";M.r(t),t.default={description:"description_TV9y","description-title":"description-title_Xww_"}},5934:function(e,t,M){"use strict";M.r(t),t.default={"hidden-label":"hidden-label_Usqy",image:"image_d9jJ","toggle-button":"toggle-button_jGgg","close-button-container":"close-button-container_oD6m","close-icon":"close-icon_pWOx","close-button":"close-button_TogF",backdrop:"backdrop_o27H","modal-content":"modal-content_PRbX"}},4450:function(e,t,M){"use strict";M.r(t),t.default="data:image/png;base64,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"},7716:function(e,t,M){"use strict";M.r(t),t.default="data:image/vnd.microsoft.icon;base64,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"},3007:function(e,t,M){"use strict";M.r(t),t.default=M.p+"assets/images/protosaurus-4c12b3287ff07cb324be28139729f8c4.jpeg"},3791:function(e,t,M){"use strict";M.r(t),t.default=M.p+"assets/images/docsVersionDropdown-dda80f009a926fb2dd92bab8faa6c4d8.png"},4448:function(e,t,M){"use strict";M.r(t),t.default=M.p+"assets/images/localeDropdown-0052c3f08ccaf802ac733b23e655f498.png"},2940:function(e,t,M){"use strict";M.r(t),t.default="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjRkZGIiBkPSJNOTkgNTJoODR2MzRIOTl6Ii8+PHBhdGggZD0iTTIzIDE2M2MtNy4zOTggMC0xMy44NDMtNC4wMjctMTcuMzAzLTEwQTE5Ljg4NiAxOS44ODYgMCAwIDAgMyAxNjNjMCAxMS4wNDYgOC45NTQgMjAgMjAgMjBoMjB2LTIwSDIzeiIgZmlsbD0iIzNFQ0M1RiIvPjxwYXRoIGQ9Ik0xMTIuOTggNTcuMzc2TDE4MyA1M1Y0M2MwLTExLjA0Ni04Ljk1NC0yMC0yMC0yMEg3M2wtMi41LTQuMzNjLTEuMTEyLTEuOTI1LTMuODg5LTEuOTI1LTUgMEw2MyAyM2wtMi41LTQuMzNjLTEuMTExLTEuOTI1LTMuODg5LTEuOTI1LTUgMEw1MyAyM2wtMi41LTQuMzNjLTEuMTExLTEuOTI1LTMuODg5LTEuOTI1LTUgMEw0MyAyM2MtLjAyMiAwLS4wNDIuMDAzLS4wNjUuMDAzbC00LjE0Mi00LjE0MWMtMS41Ny0xLjU3MS00LjI1Mi0uODUzLTQuODI4IDEuMjk0bC0xLjM2OSA1LjEwNC01LjE5Mi0xLjM5MmMtMi4xNDgtLjU3NS00LjExMSAxLjM4OS0zLjUzNSAzLjUzNmwxLjM5IDUuMTkzLTUuMTAyIDEuMzY3Yy0yLjE0OC41NzYtMi44NjcgMy4yNTktMS4yOTYgNC44M2w0LjE0MiA0LjE0MmMwIC4wMjEtLjAwMy4wNDItLjAwMy4wNjRsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgNTNsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgNjNsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgNzNsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgODNsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgOTNsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgMTAzbC00LjMzIDIuNWMtMS45MjUgMS4xMTEtMS45MjUgMy44ODkgMCA1TDIzIDExM2wtNC4zMyAyLjVjLTEuOTI1IDEuMTExLTEuOTI1IDMuODg5IDAgNUwyMyAxMjNsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgMTMzbC00LjMzIDIuNWMtMS45MjUgMS4xMTEtMS45MjUgMy44ODkgMCA1TDIzIDE0M2wtNC4zMyAyLjVjLTEuOTI1IDEuMTExLTEuOTI1IDMuODg5IDAgNUwyMyAxNTNsLTQuMzMgMi41Yy0xLjkyNSAxLjExMS0xLjkyNSAzLjg4OSAwIDVMMjMgMTYzYzAgMTEuMDQ2IDguOTU0IDIwIDIwIDIwaDEyMGMxMS4wNDYgMCAyMC04Ljk1NCAyMC0yMFY4M2wtNzAuMDItNC4zNzZBMTAuNjQ1IDEwLjY0NSAwIDAgMSAxMDMgNjhjMC01LjYyMSA0LjM3LTEwLjI3MyA5Ljk4LTEwLjYyNCIgZmlsbD0iIzNFQ0M1RiIvPjxwYXRoIGZpbGw9IiMzRUNDNUYiIGQ9Ik0xNDMgMTgzaDMwdi00MGgtMzB6Ii8+PHBhdGggZD0iTTE5MyAxNThjLS4yMTkgMC0uNDI4LjAzNy0uNjM5LjA2NC0uMDM4LS4xNS0uMDc0LS4zMDEtLjExNi0uNDUxQTUgNSAwIDAgMCAxOTAuMzIgMTQ4YTQuOTYgNC45NiAwIDAgMC0zLjAxNiAxLjAzNiAyNi41MzEgMjYuNTMxIDAgMCAwLS4zMzUtLjMzNiA0Ljk1NSA0Ljk1NSAwIDAgMCAxLjAxMS0yLjk4NyA1IDUgMCAwIDAtOS41OTktMS45NTljLS4xNDgtLjA0Mi0uMjk3LS4wNzctLjQ0NS0uMTE1LjAyNy0uMjExLjA2NC0uNDIuMDY0LS42MzlhNSA1IDAgMCAwLTUtNSA1IDUgMCAwIDAtNSA1YzAgLjIxOS4wMzcuNDI4LjA2NC42MzktLjE0OC4wMzgtLjI5Ny4wNzMtLjQ0NS4xMTVhNC45OTggNC45OTggMCAwIDAtOS41OTkgMS45NTljMCAxLjEyNS4zODQgMi4xNTEgMS4wMTEgMi45ODctMy43MTcgMy42MzItNi4wMzEgOC42OTMtNi4wMzEgMTQuMyAwIDExLjA0NiA4Ljk1NCAyMCAyMCAyMCA5LjMzOSAwIDE3LjE2LTYuNDEgMTkuMzYxLTE1LjA2NC4yMTEuMDI3LjQyLjA2NC42MzkuMDY0YTUgNSAwIDAgMCA1LTUgNSA1IDAgMCAwLTUtNSIgZmlsbD0iIzQ0RDg2MCIvPjxwYXRoIGZpbGw9IiMzRUNDNUYiIGQ9Ik0xNTMgMTIzaDMwdi0yMGgtMzB6Ii8+PHBhdGggZD0iTTE5MyAxMTUuNWEyLjUgMi41IDAgMSAwIDAtNWMtLjEwOSAwLS4yMTQuMDE5LS4zMTkuMDMyLS4wMi0uMDc1LS4wMzctLjE1LS4wNTgtLjIyNWEyLjUwMSAyLjUwMSAwIDAgMC0uOTYzLTQuODA3Yy0uNTY5IDAtMS4wODguMTk3LTEuNTA4LjUxOGE2LjY1MyA2LjY1MyAwIDAgMC0uMTY4LS4xNjhjLjMxNC0uNDE3LjUwNi0uOTMxLjUwNi0xLjQ5NGEyLjUgMi41IDAgMCAwLTQuOC0uOTc5QTkuOTg3IDkuOTg3IDAgMCAwIDE4MyAxMDNjLTUuNTIyIDAtMTAgNC40NzgtMTAgMTBzNC40NzggMTAgMTAgMTBjLjkzNCAwIDEuODMzLS4xMzggMi42OS0uMzc3YTIuNSAyLjUgMCAwIDAgNC44LS45NzljMC0uNTYzLS4xOTItMS4wNzctLjUwNi0xLjQ5NC4wNTctLjA1NS4xMTMtLjExMS4xNjgtLjE2OC40Mi4zMjEuOTM5LjUxOCAxLjUwOC41MThhMi41IDIuNSAwIDAgMCAuOTYzLTQuODA3Yy4wMjEtLjA3NC4wMzgtLjE1LjA1OC0uMjI1LjEwNS4wMTMuMjEuMDMyLjMxOS4wMzIiIGZpbGw9IiM0NEQ4NjAiLz48cGF0aCBkPSJNNjMgNTUuNWEyLjUgMi41IDAgMCAxLTIuNS0yLjVjMC00LjEzNi0zLjM2NC03LjUtNy41LTcuNXMtNy41IDMuMzY0LTcuNSA3LjVhMi41IDIuNSAwIDEgMS01IDBjMC02Ljg5MyA1LjYwNy0xMi41IDEyLjUtMTIuNVM2NS41IDQ2LjEwNyA2NS41IDUzYTIuNSAyLjUgMCAwIDEtMi41IDIuNSIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0xMDMgMTgzaDYwYzExLjA0NiAwIDIwLTguOTU0IDIwLTIwVjkzaC02MGMtMTEuMDQ2IDAtMjAgOC45NTQtMjAgMjB2NzB6IiBmaWxsPSIjRkZGRjUwIi8+PHBhdGggZD0iTTE2OC4wMiAxMjRoLTUwLjA0YTEgMSAwIDEgMSAwLTJoNTAuMDRhMSAxIDAgMSAxIDAgMm0wIDIwaC01MC4wNGExIDEgMCAxIDEgMC0yaDUwLjA0YTEgMSAwIDEgMSAwIDJtMCAyMGgtNTAuMDRhMSAxIDAgMSAxIDAtMmg1MC4wNGExIDEgMCAxIDEgMCAybTAtNDkuODE0aC01MC4wNGExIDEgMCAxIDEgMC0yaDUwLjA0YTEgMSAwIDEgMSAwIDJtMCAxOS44MTRoLTUwLjA0YTEgMSAwIDEgMSAwLTJoNTAuMDRhMSAxIDAgMSAxIDAgMm0wIDIwaC01MC4wNGExIDEgMCAxIDEgMC0yaDUwLjA0YTEgMSAwIDEgMSAwIDJNMTgzIDYxLjYxMWMtLjAxMiAwLS4wMjItLjAwNi0uMDM0LS4wMDUtMy4wOS4xMDUtNC41NTIgMy4xOTYtNS44NDIgNS45MjMtMS4zNDYgMi44NS0yLjM4NyA0LjcwMy00LjA5MyA0LjY0Ny0xLjg4OS0uMDY4LTIuOTY5LTIuMjAyLTQuMTEzLTQuNDYtMS4zMTQtMi41OTQtMi44MTQtNS41MzYtNS45NjMtNS40MjYtMy4wNDYuMTA0LTQuNTEzIDIuNzk0LTUuODA3IDUuMTY3LTEuMzc3IDIuNTI4LTIuMzE0IDQuMDY1LTQuMTIxIDMuOTk0LTEuOTI3LS4wNy0yLjk1MS0xLjgwNS00LjEzNi0zLjgxMy0xLjMyMS0yLjIzNi0yLjg0OC00Ljc1LTUuOTM2LTQuNjY0LTIuOTk0LjEwMy00LjQ2NSAyLjM4NS01Ljc2MyA0LjQtMS4zNzMgMi4xMy0yLjMzNSAzLjQyOC00LjE2NSAzLjM1MS0xLjk3My0uMDctMi45OTItMS41MS00LjE3MS0zLjE3Ny0xLjMyNC0xLjg3My0yLjgxNi0zLjk5My01Ljg5NS0zLjg5LTIuOTI4LjEtNC4zOTkgMS45Ny01LjY5NiAzLjYxOC0xLjIzMiAxLjU2NC0yLjE5NCAyLjgwMi00LjIyOSAyLjcyNGExIDEgMCAwIDAtLjA3MiAyYzMuMDE3LjEwMSA0LjU0NS0xLjggNS44NzItMy40ODcgMS4xNzctMS40OTYgMi4xOTMtMi43ODcgNC4xOTMtMi44NTUgMS45MjYtLjA4MiAyLjgyOSAxLjExNSA0LjE5NSAzLjA0NSAxLjI5NyAxLjgzNCAyLjc2OSAzLjkxNCA1LjczMSA0LjAyMSAzLjEwMy4xMDQgNC41OTYtMi4yMTUgNS45MTgtNC4yNjcgMS4xODItMS44MzQgMi4yMDItMy40MTcgNC4xNS0zLjQ4NCAxLjc5My0uMDY3IDIuNzY5IDEuMzUgNC4xNDUgMy42ODEgMS4yOTcgMi4xOTcgMi43NjYgNC42ODYgNS43ODcgNC43OTYgMy4xMjUuMTA4IDQuNjM0LTIuNjIgNS45NDktNS4wMzUgMS4xMzktMi4wODggMi4yMTQtNC4wNiA0LjExOS00LjEyNiAxLjc5My0uMDQyIDIuNzI4IDEuNTk1IDQuMTExIDQuMzMgMS4yOTIgMi41NTMgMi43NTcgNS40NDUgNS44MjUgNS41NTZsLjE2OS4wMDNjMy4wNjQgMCA0LjUxOC0zLjA3NSA1LjgwNS01Ljc5NCAxLjEzOS0yLjQxIDIuMjE3LTQuNjggNC4wNjctNC43NzN2LTJ6IiBmaWxsPSIjMDAwIi8+PHBhdGggZmlsbD0iIzNFQ0M1RiIgZD0iTTgzIDE4M2g0MHYtNDBIODN6Ii8+PHBhdGggZD0iTTE0MyAxNThjLS4yMTkgMC0uNDI4LjAzNy0uNjM5LjA2NC0uMDM4LS4xNS0uMDc0LS4zMDEtLjExNi0uNDUxQTUgNSAwIDAgMCAxNDAuMzIgMTQ4YTQuOTYgNC45NiAwIDAgMC0zLjAxNiAxLjAzNiAyNi41MzEgMjYuNTMxIDAgMCAwLS4zMzUtLjMzNiA0Ljk1NSA0Ljk1NSAwIDAgMCAxLjAxMS0yLjk4NyA1IDUgMCAwIDAtOS41OTktMS45NTljLS4xNDgtLjA0Mi0uMjk3LS4wNzctLjQ0NS0uMTE1LjAyNy0uMjExLjA2NC0uNDIuMDY0LS42MzlhNSA1IDAgMCAwLTUtNSA1IDUgMCAwIDAtNSA1YzAgLjIxOS4wMzcuNDI4LjA2NC42MzktLjE0OC4wMzgtLjI5Ny4wNzMtLjQ0NS4xMTVhNC45OTggNC45OTggMCAwIDAtOS41OTkgMS45NTljMCAxLjEyNS4zODQgMi4xNTEgMS4wMTEgMi45ODctMy43MTcgMy42MzItNi4wMzEgOC42OTMtNi4wMzEgMTQuMyAwIDExLjA0NiA4Ljk1NCAyMCAyMCAyMCA5LjMzOSAwIDE3LjE2LTYuNDEgMTkuMzYxLTE1LjA2NC4yMTEuMDI3LjQyLjA2NC42MzkuMDY0YTUgNSAwIDAgMCA1LTUgNSA1IDAgMCAwLTUtNSIgZmlsbD0iIzQ0RDg2MCIvPjxwYXRoIGZpbGw9IiMzRUNDNUYiIGQ9Ik04MyAxMjNoNDB2LTIwSDgzeiIvPjxwYXRoIGQ9Ik0xMzMgMTE1LjVhMi41IDIuNSAwIDEgMCAwLTVjLS4xMDkgMC0uMjE0LjAxOS0uMzE5LjAzMi0uMDItLjA3NS0uMDM3LS4xNS0uMDU4LS4yMjVhMi41MDEgMi41MDEgMCAwIDAtLjk2My00LjgwN2MtLjU2OSAwLTEuMDg4LjE5Ny0xLjUwOC41MThhNi42NTMgNi42NTMgMCAwIDAtLjE2OC0uMTY4Yy4zMTQtLjQxNy41MDYtLjkzMS41MDYtMS40OTRhMi41IDIuNSAwIDAgMC00LjgtLjk3OUE5Ljk4NyA5Ljk4NyAwIDAgMCAxMjMgMTAzYy01LjUyMiAwLTEwIDQuNDc4LTEwIDEwczQuNDc4IDEwIDEwIDEwYy45MzQgMCAxLjgzMy0uMTM4IDIuNjktLjM3N2EyLjUgMi41IDAgMCAwIDQuOC0uOTc5YzAtLjU2My0uMTkyLTEuMDc3LS41MDYtMS40OTQuMDU3LS4wNTUuMTEzLS4xMTEuMTY4LS4xNjguNDIuMzIxLjkzOS41MTggMS41MDguNTE4YTIuNSAyLjUgMCAwIDAgLjk2My00LjgwN2MuMDIxLS4wNzQuMDM4LS4xNS4wNTgtLjIyNS4xMDUuMDEzLjIxLjAzMi4zMTkuMDMyIiBmaWxsPSIjNDREODYwIi8+PHBhdGggZD0iTTE0MyA0MS43NWMtLjE2IDAtLjMzLS4wMi0uNDktLjA1YTIuNTIgMi41MiAwIDAgMS0uNDctLjE0Yy0uMTUtLjA2LS4yOS0uMTQtLjQzMS0uMjMtLjEzLS4wOS0uMjU5LS4yLS4zOC0uMzEtLjEwOS0uMTItLjIxOS0uMjQtLjMwOS0uMzhzLS4xNy0uMjgtLjIzMS0uNDNhMi42MTkgMi42MTkgMCAwIDEtLjE4OS0uOTZjMC0uMTYuMDItLjMzLjA1LS40OS4wMy0uMTYuMDgtLjMxLjEzOS0uNDcuMDYxLS4xNS4xNDEtLjI5LjIzMS0uNDMuMDktLjEzLjItLjI2LjMwOS0uMzguMTIxLS4xMS4yNS0uMjIuMzgtLjMxLjE0MS0uMDkuMjgxLS4xNy40MzEtLjIzLjE0OS0uMDYuMzEtLjExLjQ3LS4xNC4zMi0uMDcuNjUtLjA3Ljk4IDAgLjE1OS4wMy4zMi4wOC40Ny4xNC4xNDkuMDYuMjkuMTQuNDMuMjMuMTMuMDkuMjU5LjIuMzguMzEuMTEuMTIuMjIuMjUuMzEuMzguMDkuMTQuMTcuMjguMjMuNDMuMDYuMTYuMTEuMzEuMTQuNDcuMDI5LjE2LjA1LjMzLjA1LjQ5IDAgLjY2LS4yNzEgMS4zMS0uNzMgMS43Ny0uMTIxLjExLS4yNS4yMi0uMzguMzEtLjE0LjA5LS4yODEuMTctLjQzLjIzYTIuNTY1IDIuNTY1IDAgMCAxLS45Ni4xOW0yMC0xLjI1Yy0uNjYgMC0xLjMtLjI3LTEuNzcxLS43M2EzLjgwMiAzLjgwMiAwIDAgMS0uMzA5LS4zOGMtLjA5LS4xNC0uMTctLjI4LS4yMzEtLjQzYTIuNjE5IDIuNjE5IDAgMCAxLS4xODktLjk2YzAtLjY2LjI3LTEuMy43MjktMS43Ny4xMjEtLjExLjI1LS4yMi4zOC0uMzEuMTQxLS4wOS4yODEtLjE3LjQzMS0uMjMuMTQ5LS4wNi4zMS0uMTEuNDctLjE0LjMyLS4wNy42Ni0uMDcuOTggMCAuMTU5LjAzLjMyLjA4LjQ3LjE0LjE0OS4wNi4yOS4xNC40My4yMy4xMy4wOS4yNTkuMi4zOC4zMS40NTkuNDcuNzMgMS4xMS43MyAxLjc3IDAgLjE2LS4wMjEuMzMtLjA1LjQ5LS4wMy4xNi0uMDguMzItLjE0LjQ3LS4wNy4xNS0uMTQuMjktLjIzLjQzLS4wOS4xMy0uMi4yNi0uMzEuMzgtLjEyMS4xMS0uMjUuMjItLjM4LjMxLS4xNC4wOS0uMjgxLjE3LS40My4yM2EyLjU2NSAyLjU2NSAwIDAgMS0uOTYuMTkiIGZpbGw9IiMwMDAiLz48L2c+PC9zdmc+"},4261:function(e,t,M){"use strict";M.r(t),t.default=M.p+"assets/images/undraw_docusaurus_mountain-92989bc69aed8241aa3f59b1477f0e56.svg"},3706:function(e,t,M){"use strict";M.r(t),t.default=M.p+"assets/images/undraw_docusaurus_react-88f6652b4608b0eaded2f55452ba6aab.svg"},7627:function(e,t,M){"use strict";M.r(t),t.default=M.p+"assets/images/undraw_docusaurus_tree-1a17af96e3c13c3b6a5c862c0e13d742.svg"},2181:function(e,t,M){var a={"./static/img/docusaurus.png":4450,"./static/img/favicon.ico":7716,"./static/img/logo.svg":2940,"./static/img/protosaurus.jpeg":3007,"./static/img/tutorial/docsVersionDropdown.png":3791,"./static/img/tutorial/localeDropdown.png":4448,"./static/img/undraw_docusaurus_mountain.svg":4261,"./static/img/undraw_docusaurus_react.svg":3706,"./static/img/undraw_docusaurus_tree.svg":7627};function n(e){var t=u(e);return M(t)}function u(e){if(!M.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}n.keys=function(){return Object.keys(a)},n.resolve=u,e.exports=n,n.id=2181}}]);