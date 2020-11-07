#!/bin/bash

echo b1
hyperfine './parsemd ./input/b1.md > ./output/b1.csv'
echo b2
hyperfine './parsemd ./input/b2.md > ./output/b2.csv'
echo b3
hyperfine './parsemd ./input/b3.md > ./output/b3.csv'
echo b4
hyperfine './parsemd ./input/b4.md > ./output/b4.csv'
# echo b5
# time ./parsemd ./input/b5.md > ./output/b5.csv

