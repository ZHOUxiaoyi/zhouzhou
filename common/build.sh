#!/bin/bash
##打包出pack的文件
MOD_NAME="common"
export PATH=/home/fis/npm/bin:$PATH

sh pack.sh
rm -rf ./out_temp
rm -rf ./output
fis release -o -c -p --dest ./out_temp   --file conf/fis-build.js --no-color
cd out_temp
mv map.json 'assets/'$MOD_NAME'/'
tar zcf $MOD_NAME'.tar.gz' ./
cd ..
mkdir output
mv out_temp/$MOD_NAME'.tar.gz' ./output
rm -rf out_temp
echo "build end"