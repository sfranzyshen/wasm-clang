# Running Clang/LLD in the browser

# Directory structure

- `clang.wasm`: clang compiler, compiled to wasm w/ WASI
- `lld.wasm`: lld linker, compiled to wasm w/ WASI
- `memfs.wasm`: wasm w/ WASI implementation of in-memory filesystem,
- `index.html`
- `index.css`
- `index.js`
- `service_worker.js`: Service worker used by all web pages
- `worker.js`: Dedicated work used to compile/run
- `sysroot.tar`: C++ standard headers and libraries


