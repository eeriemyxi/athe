#!/bin/bash

TARGETS=("x86_64-unknown-linux-gnu" "aarch64-unknown-linux-gnu" "x86_64-pc-windows-msvc" "x86_64-apple-darwin" "aarch64-apple-darwin")
NAME="athe.bin"

mkdir -p bin

for target in "${TARGETS[@]}"; do
    deno compile --target=$target --allow-net --allow-run --output ./bin/$target-$NAME src/main.ts
done

