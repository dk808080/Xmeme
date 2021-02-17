#!/bin/bash 

cd ./server
. ~/.nvm/nvm.sh 
# Setup DB or any other environment variables you want to 

npm install 
sudo kill -9 $(sudo lsof -t -i:8081)
mongo xmemeDB --eval "db.dropDatabase()"
npm start
