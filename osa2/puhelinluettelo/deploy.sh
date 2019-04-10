#!/bin/sh
npm run build
rm -rf ../../../fullstack_open_part3/build
cp -r build ../../../fullstack_open_part3/build