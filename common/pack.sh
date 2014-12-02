#!/bin/bash
MOD_NAME="common"
export PATH=/home/fis/npm/bin:$PATH

rm -f build/*
ls build
echo "delete build"
mkdir -p '_temp/assets/'$MOD_NAME'/'
cp -rf [^_]* '_temp/assets/'$MOD_NAME'/'
cd _temp/
fis release -c -p --file 'assets/'$MOD_NAME'/conf/fis-pack.js' -d ./ --no-color
cp -rf 'assets/'$MOD_NAME'/build' ../
cd ..
rm -rf _temp/
##node build.js
echo "delete _temp"
