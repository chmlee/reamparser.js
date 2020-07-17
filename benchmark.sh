#!/bin/bash

for i in {1..100}; do
    node ./playground.js #> test.csv
    echo $i
done
