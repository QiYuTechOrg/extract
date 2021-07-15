
build-src:
	yarn tsc --lib dom.iterable,dom,esnext,es2020 \
		 --downlevelIteration                 \
		 --target es2020                      \
		 src/*/code.ts
	# 合并文件
	node build.mjs


build-rule:
	yarn tsc --lib dom.iterable,dom,esnext,es2020 \
		 --downlevelIteration                 \
		 --target es2020                      \
		 rule/*/*.ts


build: build-src build-rule

clean:
	rm -rf src/**/*.js
	rm -rf rule/**/*.js
