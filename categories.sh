#!/bin/bash

for file in `ls data/*.csv` ; do
   CATEGORY=$(echo $file | sed 's/data\///' | sed 's/\.csv//')
   echo $CATEGORY
done
