// Data model for task table/collection ES6 Version
//
// Purpose: create data model
//
// Author : Simon Li  Jan 22, 2020
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
import dotenv from 'dotenv';

dotenv.config();
const databaseUrl = process.env.DATABASEURL;

import Sequelize from 'sequelize';

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
           type: Sequelize.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true
    }, 
    title: {
        type: Sequelize.STRING,
        allowNull: false,
	},
	description: {
        type: Sequelize.STRING,
	},
	done: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

// src/server.js
dataModel.sync().then(() => { 
    console.log("Database connected!!")
}).catch(error => {
    throw new Error("oooh, did you enter wrong database credentials?");
});

export default dataModel;