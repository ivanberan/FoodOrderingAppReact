[![N|Solid](https://parklio.com/assets/img/Parklio-Logo.svg)](https://nodesource.com/products/nsolid)

## _API Demo_

This is a mock Task API.

## Features
- GET, POST, UPDATE, DELETE tasks

## Installation
This app was built using NodeJS v16.14.0

Install dependancies
```sh
npm install
```
To start the server use
```sh
npm start
```
Once the app is running test the endpoint with:
```sh
curl -H "Accept:application/json" http://localhost:3001/tasks
```
You can add an example Task:
```sh
curl -X POST -H "Content-Type:application/json" http://localhost:3001/tasks -d '{"title":"Test 1", "description": "Just a test", "state": "todo"}'
```

## Copyright
This project is licensed under the ISC license.

## Credits
Created by Parklio. Commercial support avaibale at info@parklio.com
