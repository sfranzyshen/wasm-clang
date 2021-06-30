# Running Clang/LLD in the browser

# Directory structure

- `clang.wasm`: clang compiler, compiled to wasm w/ WASI
- `lld.wasm`: lld linker, compiled to wasm w/ WASI
- `memfs.wasm`: wasm w/ WASI implementation of in-memory filesystem,
- `index.html`: the web page
- `index.css`: css file for the web page
- `index.js`: javascript file for the web page
- `service_worker.js`: Service worker used by the web page
- `worker.js`: Dedicated work used to compile
- `sysroot.tar`: C++ standard headers and libraries


