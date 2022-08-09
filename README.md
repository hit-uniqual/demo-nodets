# Typescript and Express.js starter setup

## Features
- ESLint with AirBnB config
- Prettier formatter
- Typescript to compile typescript code with rigid type definations to jsavascript
- Babel Transpiler to compile down ES6+ code to native javascript
- Swagger UI for API documentation
- Knex as default database driver
- Passport.js with local & jwt strategy pre-written.
- Methods for generating & authenticating tokens
- Modularize structure

## Installation
1. Install dependencies
    > npm i

2. Copy .env.example into .env & fill the .env as per your requirement
    > cp .env.example .env

3. Compile typescript to javascript 
    > npm run build  
    > npm run start:dev

4. Start environment
    > npm start

5. Voila!

## Commands
1. npm run build - For transpiling code
2. npm run start:dev - For running in development mode
3. npm run start:prod - For running in production mode
4. npm run format - For formatting all the files
