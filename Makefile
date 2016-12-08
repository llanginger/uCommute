watch-js:
	mkdir -p build
	mkdir -p build/client
	watchify -v -e src/client/js/app.js -t [ babelify --presets [ es2015 react stage-2 ] ] --debug -o build/client/app.js
build-js:
	mkdir -p build
	mkdir -p build/client
	browserify -v -e src/client/js/app.js -t [ babelify --presets [ es2015 react stage-2 ] ] --debug -o build/client/app.js
build-libs:
	mkdir -p build
	mkdir -p build/client
	browserify -o build/client/js/libs.js
build-src:
	touch server.js
	mkdir -p src
	mkdir -p src/client
	touch src/client/app.tsx
	touch src/client/store.tsx
	mkdir -p src/client/css
	touch src/client/css/main.css
	mkdir -p src/server
	touch src/server/index.html
	mkdir -p assets
build-assets:
	mkdir -p build
	mkdir -p build/client
	mkdir -p build/client/css
	mkdir -p build/server
	cp -r assets/ build/client/
	cp src/server/index.html build/server/
	cp src/client/css/main.css build/client/css/
	cp src/client/css/blueprint.css build/client/css/
clean:
	rm -rf build/
