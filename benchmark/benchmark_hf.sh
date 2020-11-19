#!/bin/bash

echo b1
hyperfine -n js_b1   --export-json ./result/js-b1.json './parsemd ./input/b1.md > ./output/b1.json'
echo b2-1
hyperfine -n js_b2-1 --export-json ./result/js-b2-1.json './parsemd ./input/b2-1.md > ./output/b2-1.json'
echo b2-2       
hyperfine -n js_b2-2 --export-json ./result/js-b2-2.json './parsemd ./input/b2-2.md > ./output/b2-3.json'
echo b2-3       
hyperfine -n js_b2-3 --export-json ./result/js-b2-3.json './parsemd ./input/b2-3.md > ./output/b2-3.json'
echo b3-1       
hyperfine -n js_b3-1 --export-json ./result/js-b3-1.json './parsemd ./input/b3-1.md > ./output/b3-1.json'
echo b3-2       
hyperfine -n js_b3-2 --export-json ./result/js-b3-2.json './parsemd ./input/b3-2.md > ./output/b3-2.json'
echo b3-3       
hyperfine -n js_b3-3 --export-json ./result/js-b3-3.json './parsemd ./input/b3-3.md > ./output/b3-3.json'
echo b4
hyperfine -n js_b4   --export-json ./result/js-b4.json './parsemd ./input/b4.md > ./output/b4.json'
