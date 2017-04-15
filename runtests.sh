#!/usr/bin/env bash

awk 'NR==20 {$0="\047phantomjs-options\047: \047--load-images=no --ssl-protocol=TLSv1 --debug=true --remote-debugger-port=9000 --remote-debugger-autorun=yes \047"} { print }' node_modules/spacejam/lib/Spacejam.coffee
timeout 240s meteor npm run coverage-app-unit
