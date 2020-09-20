#!/bin/bash

cd "`dirname $0`"

echo "[*] Building background.js"
cd background
npm run build 

cd ..

echo "[*] Building popup"
cd popup
npm run build 

cd ..

echo "[*] Building settings-tab"
cd settings-tab
npm run build 
cp -R ./build ../popup/build/settings

cd ..

echo "[+] All done. "