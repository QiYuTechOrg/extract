
build:
	node build.mjs ./src/baidu/code.ts
	node build.mjs ./src/baidu_hot/code.ts
	node build.mjs ./src/baidu_hot/view.ts
	node build.mjs ./src/google/code.ts
	node build.mjs ./src/qq_news/code.ts

clean:
	rm -rf src/**/*.js
