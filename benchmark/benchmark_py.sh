#!/bin/bash

#echo b1
#hyperfine -m 5 'python $HOME/dev/ream-python/ream/__main__.py --input ./input/b1.md --output ./output/b1.csv --force'
echo b2-1
hyperfine -m 5 'python $HOME/dev/ream-python/ream/__main__.py --input ./input/b2-1.md --output ./output/b2-1.csv --force'
echo b2-2
hyperfine -m 5 'python $HOME/dev/ream-python/ream/__main__.py --input ./input/b2-2.md --output ./output/b2-3.csv --force'
echo b2-3
hyperfine -m 5 'python $HOME/dev/ream-python/ream/__main__.py --input ./input/b2-3.md --output ./output/b2-3.csv --force'
echo b3-1
hyperfine -m 5 'python $HOME/dev/ream-python/ream/__main__.py --input ./input/b3-1.md --output ./output/b3-1.csv --force'
echo b3-2
hyperfine -m 5 'python $HOME/dev/ream-python/ream/__main__.py --input ./input/b3-2.md --output ./output/b3-2.csv --force'
echo b3-3
hyperfine -m 5 'python $HOME/dev/ream-python/ream/__main__.py --input ./input/b3-3.md --output ./output/b3-3.csv --force'
echo b4
hyperfine -m 5 'python $HOME/dev/ream-python/ream/__main__.py --input ./input/b4.md --output ./output/b4.csv --force'
