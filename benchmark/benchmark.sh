#!/bin/bash

echo b1
time ./parsemd ./input/b1.md > ./output/b1.csv
echo b2
time ./parsemd ./input/b2.md > ./output/b2.csv
echo b3
time ./parsemd ./input/b3.md > ./output/b3.csv
echo b4
time ./parsemd ./input/b4.md > ./output/b4.csv
# echo b5
# time ./parsemd ./input/b5.md > ./output/b5.csv

