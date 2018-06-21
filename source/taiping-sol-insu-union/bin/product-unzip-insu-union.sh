#!/bin/sh

D="insu-union"
WAR="taiping-sol-insu-union.war"
SRC_TMP_PATH="/home/weblogic/upload"
DATE_EXT=`date +%m%d%H%M`

echo ============= upzip [$D] start ... ===========
echo SRC_TMP_PATH: $SRC_TMP_PATH
echo WAR: $WAR
echo DATE_EXT: $DATE_EXT

echo -e '\n'
echo unzip ...
cd $SRC_TMP_PATH

rm -rf $D
unzip $WAR -d $D
cp -rf $D $D-$DATE_EXT

echo "excute rsync"
echo -e '\n'

sh /tpdata/shell_script/rsync/rsync.sh

echo "complete rsync"
echo -e '\n'
echo ============= upzip [$D] finish ... ===========