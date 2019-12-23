#!/bin/bash

TEMP=/tmp/nodegui-plugin-svg

if [ -e $TEMP ]; then
    rm -r $TEMP
fi

mkdir $TEMP
cp -R dist/* $TEMP
cp {package.json,README.md,install.js} $TEMP

if [ -e $TEMP/nodegui_plugin_svg.node ]; then
    rm $TEMP/nodegui_plugin_svg.node
fi

cd $TEMP

npm publish
