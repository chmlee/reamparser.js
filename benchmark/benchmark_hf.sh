#!/bin/bash

echo b1
hyperfine './parsemd ./input/b1.md > ./output/b1.csv'
echo b2-1
hyperfine './parsemd ./input/b2-1.md > ./output/b2-1.csv'
echo b2-2
hyperfine './parsemd ./input/b2-2.md > ./output/b2-3.csv'
echo b2-3
hyperfine './parsemd ./input/b2-3.md > ./output/b2-3.csv'
echo b3-1
hyperfine './parsemd ./input/b3-1.md > ./output/b3-1.csv'
echo b3-2
hyperfine './parsemd ./input/b3-2.md > ./output/b3-2.csv'
echo b3-3
hyperfine './parsemd ./input/b3-3.md > ./output/b3-3.csv'
echo b4
hyperfine './parsemd ./input/b4.md > ./output/b4.csv'
