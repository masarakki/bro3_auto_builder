#!/bin/sh

ts=`date +%s`
sed -e "s/__TIMESTAMP__/${ts}/g"
