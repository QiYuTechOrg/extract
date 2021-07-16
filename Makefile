
build:
	yarn tsc --lib dom.iterable,dom,esnext,es2020 \
		 --downlevelIteration                 \
		 --target es2020                      \
		 src/*/code.ts src/*/view.ts
	# 合并文件
	node build.mjs



clean:
	rm -rf src/**/*.js
