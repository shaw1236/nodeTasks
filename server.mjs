// Graphql Express Server Demo - Task ES6 Version
//
// Purpose: Sample to use graphql express server to expose APIs
//          supports APIs for (C)reate, (R)ead, (U)pdate/Patch, 
//          (D)elete and Query
// Author : Simon Li  Jan 19, 2020
//
// Prerequisite packages: 
//        dotenv, sequelize, mysql2, express, express-graphql, graphql
// 
// No source code change and direct support with the backend
// ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
//
// Tested with GraphiQL, postman GraphQL and curl
'use strict';

import express from 'express';
import graphqlHTTP from 'express-graphql';

import schema  from './services/graphqlSchema.mjs';
import { rest } from './services/restTask.mjs';

//---------------------------
// Part 3 - server.js
//---------------------------
// src/server.js
const app = express();

// Dummy root request
app.get("/", (req, res) => {
    res.send("<h4>Welcome to task services powered by express-graphql programming & sequelize/mysql.</h4>\n");
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,  // GrapgiQL UI will be launched
    pretty: true
}));

// restful service hook
rest(app);

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Running a GraphQL/Rest API server at http://localhost:${port}`);
console.log(`Graphql service at http://localhost:${port}/graphql`);
console.log(`Restful service at http://localhost:${port}/api/v1.0/tasks`);

//$node --experimental-modules server.mjs