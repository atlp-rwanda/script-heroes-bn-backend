[![Build Status](https://travis-ci.org/atlp-rwanda/script-heroes-bn-backend.svg?branch=develop)](https://travis-ci.org/atlp-rwanda/script-heroes-bn-backend) [![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/script-heroes-bn-backend/badge.svg?branch=develop)](https://coveralls.io/github/atlp-rwanda/script-heroes-bn-backend?branch=develop) [![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)

# Barefoot Nomad - Making company travel and accomodation easy and convinient.

## Vision

Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.

This is the swagger API [documentation](https://script-heroes-bn-backend-stgng.herokuapp.com/api-docs/) link

## Heroku backend endpoint

This the heroku staging Api https://script-heroes-bn-backend-stgng.herokuapp.com/

This the production Api https://script-heroes-bn-backend.herokuapp.com/

## Setup Dotenv

- Create .env file in project root directory
- Copy keys in .env.example file, which is in the project root directory and assign values to those keys.
- You can add more environmenta variables to the .env file
- To use declared variables, require dotenv at the top of your file `import dotenv from 'dotenv'` and call its method config `dotenv.config()`
- Access environment variable value by using `process.env.KEY_NAME` where `KEY_NAME` is the variable name.

Note: If you make changes that uses environmental variables make sure to add those variables with example values in the .env.example file.

## Sequelize and Sequelize-cli

### 1 Installing cli

`npm install`

### 2 Running Migrations

`sequelize db:migrate`

### 3 Running Seeds

`sequelize db:seed:all`
