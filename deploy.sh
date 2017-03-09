#!/bin/sh

printf "Deploying App...\n"

POE="server.js"
POE2="webpack-dev-server.js"

PR= echo | ps ax | grep $POE | grep -v grep | awk '{print $1}' | xargs kill > /dev/null 2>&1
PR2= echo | ps ax | grep $POE2 | grep -v grep | awk '{print $1}' | xargs kill > /dev/null 2>&1

printf "\nDeploying backend...\n"
cd backEnd
printf "\nDownloading dependencies\n"

npm install
nohup npm start > "$POE.out" 2> "$POE.err" &

printf "\nProcess PID: "
echo $!

printf "\nDeploying frontend...\n"
cd ../frontEnd
printf "\nDownloading dependencies\n"

export NODE_ENV=production
npm install
nohup npm start > "$POE2.out" 2> "$POE2.err" &

printf "\nProcess PID: "
echo $!



