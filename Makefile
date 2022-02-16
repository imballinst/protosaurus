# Copyright 2022 Protosaurus Authors
# Licensed under the Apache License, Version 2.0 (the "License")

# Include versions of tools we build or fetch on-demand.
include Tools.mk

# Root dir returns absolute path of current directory. It has a trailing "/".
root_dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

# Path to the `mdx` module.
mdx_dir := $(root_dir)/packages/mdx

# Path to the `proto-messages` plugin.
# TODO(imballinst): make it an array so that we don't have to define the
# build step one-by-one.
rehype_plugin_codeblock_dir := $(root_dir)/packages/rehype-plugin-protosaurus-codeblock
docusaurus_plugin_mdx_dir := $(root_dir)/packages/protosaurus-plugin-mdx
docusaurus_theme_dir := $(root_dir)/packages/protosaurus-theme
docusaurus_preset_dir := $(root_dir)/packages/protosaurus-preset

# Currently we resolve it using which. But more sophisticated approach is to use infer GOROOT.
go     := $(shell which go)
goarch := $(shell $(go) env GOARCH)
goexe  := $(shell $(go) env GOEXE)
goos   := $(shell $(go) env GOOS)

# Local cache directory.
CACHE_DIR ?= $(root_dir).cache

# We set the PROTOSAURUS_HOME to be the same as the CACHE_DIR. In real usage, PROTOSAURUS_HOME
# points to ~/.protosaurus by default.
export PROTOSAURUS_HOME ?= $(CACHE_DIR)

# Go tools directory holds the binaries of Go-based tools.
go_tools_dir := $(CACHE_DIR)/tools/go
# Prepackaged tools may have more than precompiled binaries, e.g. for protoc, it also has an include
# directory which contains well-known proto files: https://github.com/protocolbuffers/protobuf/tree/master/src/google/protobuf.
prepackaged_tools_dir := $(CACHE_DIR)/tools/prepackaged

# By default, a protoc-gen-<name> program is expected to be on your PATH so that it can be
# discovered and executed by buf. This makes sure the Go-based and prepackaged tools dirs are
# registered in the PATH for buf to pick up. As an alternative, we can specify "path"
# https://docs.buf.build/configuration/v1/buf-gen-yaml#path for each plugin entry in buf.gen.yaml,
# however that means we need to override buf.gen.yaml at runtime.
export PATH := $(go_tools_dir):$(prepackaged_tools_dir)/bin:$(PATH)

# Pre-packaged targets.
clang-format := $(prepackaged_tools_dir)/bin/clang-format
node         := $(prepackaged_tools_dir)/bin/node
protoc       := $(prepackaged_tools_dir)/bin/protoc
yarn         := $(prepackaged_tools_dir)/bin/yarn

# Go-based tools targets.
addlicense     := $(go_tools_dir)/addlicense
buf            := $(go_tools_dir)/buf
protoc-gen-doc := $(go_tools_dir)/protoc-gen-doc

# Assorted tools required for processing proto files.
proto_tools := \
	$(buf) \
	$(protoc) \
	$(protoc-gen-doc)

# This is adopted from https://github.com/tetratelabs/func-e/blob/3df66c9593e827d67b330b7355d577f91cdcb722/Makefile#L60-L76.
# ANSI escape codes. f_ means foreground, b_ background.
# See https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters.
f_black            := $(shell printf "\33[30m")
b_black            := $(shell printf "\33[40m")
f_white            := $(shell printf "\33[97m")
f_gray             := $(shell printf "\33[37m")
f_dark_gray        := $(shell printf "\33[90m")
f_bright_green     := $(shell printf "\33[92m")
b_bright_green     := $(shell printf "\33[102m")
ansi_reset         := $(shell printf "\33[0m")
ansi_protosaurus   := $(b_black)$(f_black)$(b_bright_green)protosaurus$(ansi_reset)
ansi_format_dark   := $(f_gray)$(f_bright_green)%-10s$(ansi_reset) $(f_dark_gray)%s$(ansi_reset)\n
ansi_format_bright := $(f_white)$(f_bright_green)%-10s$(ansi_reset) $(f_black)$(b_bright_green)%s$(ansi_reset)\n

# We cache the deps fetched by buf locally (in-situ) by setting BUF_CACHE_DIR
# https://docs.buf.build/bsr/overview#module-cache, so it can be referenced by other targets.
export BUF_CACHE_DIR := $(root_dir).cache/buf
BUF_V1_MODULE_DATA   := $(BUF_CACHE_DIR)/v1/module/data/buf.build

# This formats help statements in ANSI colors. To hide a target from help, don't comment it with a trailing '##'.
help: ## Describe how to use each target
	@printf "$(ansi_protosaurus)$(f_white)\n"
	@awk 'BEGIN {FS = ":.*?## "} /^[0-9a-zA-Z_-]+:.*?## / {sub("\\\\n",sprintf("\n%22c"," "), $$2);printf "$(ansi_format_dark)", $$1, $$2}' $(MAKEFILE_LIST)

# We use @protosaurus/example to generate .json from .proto in this project, provided by
# buf.work.yaml that points to the testdata (buf) module.
gen: $(BUF_V1_MODULE_DATA) $(yarn) ## Generate files from proto files
	@printf "$(ansi_format_dark)" $@ "generating files..."
	@$(MAKE) gen-wkt
	@$(yarn) install --frozen-lockfile
	@$(yarn) workspace @protosaurus/example generate
	@$(MAKE) gen-docusaurus-addons
	@printf "$(ansi_format_bright)" $@ "ok"

generated_dir := packages/wkt/generated/json
gen-wkt: $(protoc) $(protoc-gen-doc)
	@mkdir -p $(generated_dir)
	@for proto in $(shell find $(prepackaged_tools_dir)/include -name "*.proto"); do \
		$(protoc) --doc_out=$(generated_dir) --doc_opt=json,$$proto.json,source_relative $$proto; \
	done

gen-docusaurus-addons: $(yarn)
	@$(yarn) --cwd $(rehype_plugin_codeblock_dir) build
	@$(yarn) --cwd $(docusaurus_theme_dir) build
	@$(yarn) --cwd $(docusaurus_preset_dir) build
	@$(yarn) --cwd $(docusaurus_plugin_mdx_dir) build
	
start: $(yarn)
	@$(yarn) --cwd website start

build: $(yarn)
	@$(yarn) --cwd website build

# This is only used for testing purposes. We are using this file: website/plugins/proto-messages/test-remark.ts.
# Otherwise, there's no way we could rapidly test the output correctness of the plugin
# without running Docusaurus development server.
dev-test-plugin:
	@$(yarn) --cwd $(rehype_plugin_codeblock_dir) test:mdx

format: $(buf) $(clang-format) ## Format all proto files
	@$(clang-format) -i $(shell $(buf) ls-files)

docs: $(yarn) ## Build the docs site
	$(yarn) --cwd website build

license_files := website packages testdata .github Makefile *.mk buf.*.yaml
license: $(addlicense) ## Add license to files
	@$(addlicense) $(license_ignore) -c "Protosaurus Authors"  $(license_files) 1>/dev/null 2>&1

test:
	@WORK_DIR=$(root_dir) $(yarn) --cwd $(docusaurus_plugin_mdx_dir) test

# BUF_V1_MODULE_DATA can only be generated by buf generate or build.
# Note that since we use newer buf binary, the buf.lock contains "version: v1" entry which is not
# backward compatible with older version of buf.
$(BUF_V1_MODULE_DATA): testdata/buf.yaml testdata/buf.lock $(proto_tools)
	@printf "$(ansi_format_dark)" buf "checking proto files..."
	@$(buf) lint
	@$(buf) build
	@printf "$(ansi_format_bright)" buf "ok"

# Catch all rules for Go-based tools.
$(go_tools_dir)/%:
	@printf "$(ansi_format_dark)" tools "installing $($(notdir $@)@v)..."
	@GOBIN=$(go_tools_dir) go install $($(notdir $@)@v)
	@printf "$(ansi_format_bright)" tools "ok"

# Install protoc from github.com/protocolbuffers/protobuf. We don't support win32 yet as this script
# will fail.
protoc-version                     = $(subst github.com/protocolbuffers/protobuf@v,-,$($(notdir $1)@v))
protoc-download-archive-url-prefix = https://$(subst @,/releases/download/,$($(notdir $1)@v))/protoc$(call protoc-version,$1)
protoc-download-archive-name       = $(if $(findstring $(goos),darwin),osx-x86_64.zip,linux-x86_64.zip)
protoc_zip                         = $(prepackaged_tools_dir)/bin/protoc.zip
$(protoc):
	@printf "$(ansi_format_dark)" tools "installing $($(notdir $@)@v)..."
	@mkdir -p $(dir $@)
	@curl -sSL $(call protoc-download-archive-url-prefix,$@)-$(call protoc-download-archive-name) -o $(protoc_zip)
	@unzip -qq $(protoc_zip) -d $(prepackaged_tools_dir)
	@rm -f $(protoc_zip)
	@printf "$(ansi_format_bright)" tools "ok"

# Install yarn from https://github.com/yarnpkg/yarn. $(yarn) depends on $(node).
yarn-version              = $(subst github.com/yarnpkg/yarn@v,-,$($(notdir $1)@v))
yarn-download-archive-url = https://$(subst @,/releases/download/,$($(notdir $1)@v))/yarn$(call yarn-version,$1).js
$(yarn): $(node)
	@printf "$(ansi_format_dark)" tools "installing $($(notdir $@)@v)..."
	@mkdir -p $(dir $@)
	@curl -sSL $(call yarn-download-archive-url,$@) -o $(yarn)
	@chmod +x $(yarn)
	@printf "$(ansi_format_bright)" tools "ok"

# Install node from https://nodejs.org/dist. We don't support win32 yet as this script will fail.
node-version              = $(subst nodejs.org/node@v,,$($(notdir $1)@v))
node-arch                 = $(if $(findstring $(goarch),amd64),x64,$(goarch))
node-download-archive-url = https://$(subst node@,dist/,$($(notdir $1)@v))/node-v$(call node-version,$1)-$(goos)-$(call node-arch).tar.gz
$(node):
	@printf "$(ansi_format_dark)" tools "installing $($(notdir $@)@v)..."
	@mkdir -p $(dir $@)
	@curl -sSL $(call node-download-archive-url,$@) | tar xzf - -C $(prepackaged_tools_dir) --strip-components 1
	@printf "$(ansi_format_bright)" tools "ok"

# Install clang-format from https://github.com/angular/clang-format. We don't support win32 yet as
# this script will fail.
clang-format-download-archive-url = https://$(subst @,/archive/refs/tags/,$($(notdir $1)@v)).tar.gz
clang-format-dir                  = $(subst github.com/angular/clang-format@v,clang-format-,$($(notdir $1)@v))
$(clang-format):
	@printf "$(ansi_format_dark)" tools "installing $($(notdir $@)@v)..."
	@mkdir -p $(dir $@)
	@curl -sSL $(call clang-format-download-archive-url,$@) | tar xzf - -C $(prepackaged_tools_dir)/bin \
		--strip 3 $(call clang-format-dir,$@)/bin/$(goos)_x64
	@printf "$(ansi_format_bright)" tools "ok"
