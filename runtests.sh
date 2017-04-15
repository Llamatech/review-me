#!/usr/bin/env bash

meteor test --once --driver-package dispatch:mocha
STATUS_CODE=$?
echo $STATUS_CODE
if [ $? -eq 0 ]; then
    printf "Calcluating coverage...\n"
    awk 'NR==20 {$0="      \047phantomjs-options\047: \047--load-images=no --ssl-protocol=TLSv1 --remote-debugger-port=9000 --remote-debugger-autorun=yes \047"} { print }' node_modules/spacejam/lib/Spacejam.coffee > node_modules/spacejam/lib/Spacejam.coffee.temp
    mv node_modules/spacejam/lib/Spacejam.coffee.temp node_modules/spacejam/lib/Spacejam.coffee
    printf "meteor npm run coverage-app-unit"
    timeout 240s meteor npm run coverage-app-unit
    printf "Done!\n"
else
    exit $STATUS_CODE
fi