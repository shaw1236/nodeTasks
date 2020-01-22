// APIs for graphql ES6 version
//
// Purpose: create schema for graphql
//
// Author : Simon Li  Jan 22, 2020
//
'use strict';

import graphql from 'graphql';
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = graphql;

import dataModel from '../data/model.mjs';

//construct a schema programmatically.
// src/data/types/CountryType.js
const taskType = new GraphQLObjectType({
    name: 'Task',
    fields: {
                id: { type: GraphQLInt },
                description: { type: GraphQLString },
                title: { type: GraphQLString },
                done: {type: GraphQLBoolean }
    }
});

// Define the Query type
// src/data/queries/getCountries.js
const getTask = {
    type: taskType,
    args: {
        id: { type: GraphQLInt }
    },
    async resolve(_, {id}) {
        return await dataModel.findOne({where: {id: id}});
    }
};

const getTaskList = {
    type: new GraphQLList(taskType),
    async resolve() {
        return await dataModel.findAll();
    }
};

// src/data/mutations/updateTask.js
const createTask = {
    type: taskType,
    args: {
        description: { type: GraphQLString },
        title: { type: GraphQLString }
    },
    async resolve(_, {description, title}) {
      return await dataModel.create({title: title, description: description});
  }
};

const updateTask = {
    type: GraphQLString,
    args: { 
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        done: { type: GraphQLBoolean }
    },
    async resolve(_, {id, description, title, done}) {
        const task = {};
        if (title) task["title"] = title;
        if (description) task["description"] = description;
        if (done) task["done"] = done;

        const result = await dataModel.update(task, {where: {id: id}});
        return `${result} record(s) patched - ${id}`;
    }
};

const deleteTask = {
    type: GraphQLString,
    args: {
        id: { type: GraphQLInt }
    },
    async resolve(_, {id}) {
        const result = await dataModel.destroy({where: {id: id}});
        return `Number of records deleted: ${result}`;
    }
};

// src/data/schema.js
const graphqlSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            getTask,
            getTaskList
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createTask,
            updateTask,
            deleteTask
        }
    })
});

export default graphqlSchema;