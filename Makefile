
build:
	find src -name code.ts | xargs node build.mjs
	find src -name view.ts | xargs node build.mjs


build-zip:
	zip -r src.zip src

clean:
	find src -name '*.js' | xargs rm -f
