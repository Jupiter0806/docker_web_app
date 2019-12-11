to dev: 
  1. docker-compose up, nodemon will listen on ./dist (local file will be copied into docker container)
  2. npm run dev, tsc --watch. any changes will be applied into ./dist to trigger nodemon update