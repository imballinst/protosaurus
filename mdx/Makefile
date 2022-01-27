# yarn should be already installed from parent Makefile.
yarn := $(shell which yarn)

PWD := $(shell pwd)

build:
	@$(yarn) build

test:
	@$(yarn) test

gen-mdx: $(build)
	@PWD=$(PWD) $(yarn) emit

# This is only used for testing purposes, so that we don't have
# to build and rebuild every time we change `emit.ts` or other TS files.
dev-gen-mdx:
	@PWD=$(PWD) $(yarn) ts-node emit.ts
