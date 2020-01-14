to dev: 
  1. docker-compose up, nodemon will listen on ./dist (local file will be copied into docker container)
  2. npm run dev, tsc --watch. any changes will be applied into ./dist to trigger nodemon update

todos:
  1. add configuration files for db setup
  2. need use AppError to handle Joi error