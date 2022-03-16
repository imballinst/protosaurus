"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[803],{1255:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return k},contentTitle:function(){return h},metadata:function(){return u},toc:function(){return g},default:function(){return b}});var n=a(5773),i=a(808),o=(a(7378),a(5318)),s=(a(1488),a(9135)),r=a.n(s),m=a(342),d=a.n(m),p=(a(4395),a(1289),a(6989),a(5401),a(775)),c=a.n(p),l=a(6645),v=a.n(l),N=["components"],k={},h=void 0,u={unversionedId:"wkt/google.protobuf.compiler",id:"wkt/google.protobuf.compiler",title:"google.protobuf.compiler",description:"Messages",source:"@site/docs/wkt/google.protobuf.compiler.mdx",sourceDirName:"wkt",slug:"/wkt/google.protobuf.compiler",permalink:"/protosaurus/main/docs/wkt/google.protobuf.compiler",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/wkt/google.protobuf.compiler.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Test Protosaurus",permalink:"/protosaurus/main/docs/test"},next:{title:"google.protobuf",permalink:"/protosaurus/main/docs/wkt/google.protobuf"}},g=[{value:"Messages",id:"messages",children:[{value:"CodeGeneratorRequest",id:"codegeneratorrequest",children:[],level:3},{value:"CodeGeneratorResponse",id:"codegeneratorresponse",children:[],level:3},{value:"Version",id:"version",children:[],level:3}],level:2}],f={toc:g};function b(e){var t=e.components,a=(0,i.Z)(e,N);return(0,o.kt)("wrapper",(0,n.Z)({},f,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)(c(),{mdxType:"ProtosaurusImage"}),(0,o.kt)(v(),{mdxType:"ProtosaurusAnnotation"}),(0,o.kt)("h2",{id:"messages"},"Messages"),(0,o.kt)(r(),{mdxType:"Definition"},(0,o.kt)(d(),{name:"message",mdxType:"DefinitionHeader"},(0,o.kt)("h3",{id:"codegeneratorrequest"},"CodeGeneratorRequest")),(0,o.kt)("p",null,"An encoded CodeGeneratorRequest is written to the plugin's stdin."),(0,o.kt)("div",{className:"protosaurus-code-container"},(0,o.kt)("div",{parentName:"div",className:"protosaurus-code"},(0,o.kt)("div",{parentName:"div"},(0,o.kt)("span",{parentName:"div"},""),(0,o.kt)("span",{parentName:"div",className:"type"},"message")," CodeGeneratorRequest {"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // The .proto files that were explicitly listed on the command-line.  The\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // code generator should generate code only for these files.  Each file's\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // descriptor will be included in proto_file, below.\n"),(0,o.kt)("div",{parentName:"div"},"  repeated string file_to_generate = 1;\n"),(0,o.kt)("div",{parentName:"div"},"\u200b\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // The generator parameter passed on the command-line.\n"),(0,o.kt)("div",{parentName:"div"},(0,o.kt)("span",{parentName:"div"},"  "),(0,o.kt)("span",{parentName:"div",className:"type"},"string")," parameter = 2;"),(0,o.kt)("div",{parentName:"div"},"\u200b\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // FileDescriptorProtos for all files in files_to_generate and everything\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // they import.  The files will appear in topological order, so each file\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // appears before any file that imports it.\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // \n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // protoc guarantees that all proto_files will be written after\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // the fields above, even though this is not technically guaranteed by the\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // protobuf wire format.  This theoretically could allow a plugin to stream\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // in the FileDescriptorProtos and handle them one by one rather than read\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // the entire set into memory at once.  However, as of this writing, this\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // is not similarly optimized on protoc's end -- it will store all fields in\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // memory at once before sending them to the plugin.\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // \n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // Type names of fields and extensions in the FileDescriptorProto are always\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // fully qualified.\n"),(0,o.kt)("div",{parentName:"div"},(0,o.kt)("span",{parentName:"div"},"  "),(0,o.kt)("span",{parentName:"div",className:"type"},"repeated "),(0,o.kt)("a",{parentName:"div",href:"/docs/wkt/google.protobuf#filedescriptorproto"},"FileDescriptorProto")," proto_file = 3;"),(0,o.kt)("div",{parentName:"div"},"\u200b\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // The version number of protocol compiler.\n"),(0,o.kt)("div",{parentName:"div"},(0,o.kt)("span",{parentName:"div"},"  "),(0,o.kt)("a",{parentName:"div",href:"/docs/wkt/google.protobuf.compiler#version"},"Version")," compiler_version = 4;"),(0,o.kt)("div",{parentName:"div"},"}")))),(0,o.kt)(r(),{mdxType:"Definition"},(0,o.kt)(d(),{name:"message",mdxType:"DefinitionHeader"},(0,o.kt)("h3",{id:"codegeneratorresponse"},"CodeGeneratorResponse")),(0,o.kt)("p",null,"The plugin writes an encoded CodeGeneratorResponse to stdout."),(0,o.kt)("div",{className:"protosaurus-code-container"},(0,o.kt)("div",{parentName:"div",className:"protosaurus-code"},(0,o.kt)("div",{parentName:"div"},(0,o.kt)("span",{parentName:"div"},""),(0,o.kt)("span",{parentName:"div",className:"type"},"message")," CodeGeneratorResponse {"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // Error message.  If non-empty, code generation failed.  The plugin process\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // should exit with status code zero even if it reports an error in this way.\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // \n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // This should be used to indicate errors in .proto files which prevent the\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // code generator from generating correct code.  Errors which indicate a\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // problem in protoc itself -- such as the input CodeGeneratorRequest being\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // unparseable -- should be reported by writing a message to stderr and\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // exiting with a non-zero status code.\n"),(0,o.kt)("div",{parentName:"div"},(0,o.kt)("span",{parentName:"div"},"  "),(0,o.kt)("span",{parentName:"div",className:"type"},"string")," error = 1;"),(0,o.kt)("div",{parentName:"div"},"\u200b\n"),(0,o.kt)("div",{parentName:"div"},(0,o.kt)("span",{parentName:"div"},"  "),(0,o.kt)("span",{parentName:"div",className:"type"},"message")," File {"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // The file name, relative to the output directory.  The name must not\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},'    // contain "." or ".." components and must be relative, not be absolute (so,\n'),(0,o.kt)("div",{parentName:"div",className:"comment"},'    // the file cannot lie outside the output directory).  "/" must be used as\n'),(0,o.kt)("div",{parentName:"div",className:"comment"},'    // the path separator, not "\\".\n'),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // \n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // If the name is omitted, the content will be appended to the previous\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // file.  This allows the generator to break large files into small chunks,\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // and allows the generated text to be streamed back to protoc so that large\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // files need not reside completely in memory at one time.  Note that as of\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // this writing protoc does not optimize for this -- it will read the entire\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // CodeGeneratorResponse before writing files to disk.\n"),(0,o.kt)("div",{parentName:"div"},(0,o.kt)("span",{parentName:"div"},"    "),(0,o.kt)("span",{parentName:"div",className:"type"},"string")," name = 1;"),(0,o.kt)("div",{parentName:"div"},"\u200b\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // If non-empty, indicates that the named file should already exist, and the\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // content here is to be inserted into that file at a defined insertion\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // point.  This feature allows a code generator to extend the output\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // produced by another code generator.  The original generator may provide\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // insertion points by placing special annotations in the file that look\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // like:\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    //   @@protoc_insertion_point(NAME)\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // The annotation can have arbitrary text before and after it on the line,\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // which allows it to be placed in a comment.  NAME should be replaced with\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // an identifier naming the point -- this is what other generators will use\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // as the insertion_point.  Code inserted at this point will be placed\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // immediately above the line containing the insertion point (thus multiple\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // insertions to the same point will come out in the order they were added).\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // The double-@ is intended to make it unlikely that the generated code\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // could contain things that look like insertion points by accident.\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // \n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // For example, the C++ code generator places the following line in the\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // .pb.h files that it generates:\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    //   // @@protoc_insertion_point(namespace_scope)\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // This line appears within the scope of the file's package namespace, but\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // outside of any particular class.  Another plugin can then specify the\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},'    // insertion_point "namespace_scope" to generate additional classes or\n'),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // other declarations that should be placed in this scope.\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // \n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // Note that if the line containing the insertion point begins with\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // whitespace, the same whitespace will be added to every line of the\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // inserted text.  This is useful for languages like Python, where\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // indentation matters.  In these languages, the insertion point comment\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // should be indented the same amount as any inserted code will need to be\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // in order to work correctly in that context.\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // \n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // The code generator that generates the initial file and the one which\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // inserts into it must both run as part of a single invocation of protoc.\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // Code generators are executed in the order in which they appear on the\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // command line.\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // \n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // If |insertion_point| is present, |name| must also be present.\n"),(0,o.kt)("div",{parentName:"div"},(0,o.kt)("span",{parentName:"div"},"    "),(0,o.kt)("span",{parentName:"div",className:"type"},"string")," insertion_point = 2;"),(0,o.kt)("div",{parentName:"div"},"\u200b\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},"    // The file contents.\n"),(0,o.kt)("div",{parentName:"div"},(0,o.kt)("span",{parentName:"div"},"    "),(0,o.kt)("span",{parentName:"div",className:"type"},"string")," content = 3;"),(0,o.kt)("div",{parentName:"div"},"  }\n"),(0,o.kt)("div",{parentName:"div"},"\u200b\n"),(0,o.kt)("div",{parentName:"div"},"  repeated File file = 2;\n"),(0,o.kt)("div",{parentName:"div"},"}")))),(0,o.kt)(r(),{mdxType:"Definition"},(0,o.kt)(d(),{name:"message",mdxType:"DefinitionHeader"},(0,o.kt)("h3",{id:"version"},"Version")),(0,o.kt)("p",null,"The version number of protocol compiler."),(0,o.kt)("div",{className:"protosaurus-code-container"},(0,o.kt)("div",{parentName:"div",className:"protosaurus-code"},(0,o.kt)("div",{parentName:"div"},(0,o.kt)("span",{parentName:"div"},""),(0,o.kt)("span",{parentName:"div",className:"type"},"message")," Version {"),(0,o.kt)("div",{parentName:"div"},(0,o.kt)("span",{parentName:"div"},"  "),(0,o.kt)("span",{parentName:"div",className:"type"},"int32")," major = 1;"),(0,o.kt)("div",{parentName:"div"},"\u200b\n"),(0,o.kt)("div",{parentName:"div"},(0,o.kt)("span",{parentName:"div"},"  "),(0,o.kt)("span",{parentName:"div",className:"type"},"int32")," minor = 2;"),(0,o.kt)("div",{parentName:"div"},"\u200b\n"),(0,o.kt)("div",{parentName:"div"},(0,o.kt)("span",{parentName:"div"},"  "),(0,o.kt)("span",{parentName:"div",className:"type"},"int32")," patch = 3;"),(0,o.kt)("div",{parentName:"div"},"\u200b\n"),(0,o.kt)("div",{parentName:"div",className:"comment"},'  // A suffix for alpha, beta or rc release, e.g., "alpha-1", "rc2". It should\n'),(0,o.kt)("div",{parentName:"div",className:"comment"},"  // be empty for mainline stable releases.\n"),(0,o.kt)("div",{parentName:"div"},(0,o.kt)("span",{parentName:"div"},"  "),(0,o.kt)("span",{parentName:"div",className:"type"},"string")," suffix = 4;"),(0,o.kt)("div",{parentName:"div"},"}")))))}b.isMDXComponent=!0}}]);