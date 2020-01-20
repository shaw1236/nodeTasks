// Data model for task table/collection 
//
// Purpose: create data model
//
// Author : Simon Li  Jan 19, 2020
//

'use strict';

// Set up a database connection and store the connection sytring
// in variable "DATABASEURL" of file ".env"
// samples 
//DATABASEURL = mysql://user:password@localhost:3306/database
//DATABASEURL = mssql://user:password@localhost/database
//DATABASEURL = mariadb://user:password@example.com:9821/database
//DATABASEURL = sqlite://user:password@/home/abs/path/dbname.db
//DATABASEURL = postgres://user:password@/home/abs/path/dbname.db

//-----------------------------------------
// Part 1 - sequelize - database table sync
//-----------------------------------------
// Load the enviroment variables to process from .env
require('dotenv').config()
const databaseUrl = process.env.DATABASEURL;

const Sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

// src/data/sequelize.js
const sequelize = new Sequelize(databaseUrl, {
    define: {
      freezeTableName: true
    },
    logging: console.log
});

// src/data/models/taskTable.js
const dataModel = sequelize.define('tasks', {
    id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true
    }, 
    title: {
        type: DataTypes.STRING,
        allowNull: false,
	},
	description: {
        type: DataTypes.STRING,
	},
	done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

// src/server.js
dataModel.sync().then(() => { 
    console.log("Database connected!!")
}).catch(error => {
    throw new Error("oooh, did you enter wrong database credentials?");
});

exports.dataModel = dataModel;