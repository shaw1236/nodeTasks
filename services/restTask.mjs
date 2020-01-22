// Restful APIs ES6 Version
//
// Purpose: create restful service
//
// Author : Simon Li  Jan 22, 2020
//
'use strict'; 

import dataModel from '../data/model.mjs';

export const rest = app => {
    // List all the tasks (GET)
    app.get("/api/v1.0/tasks", (req, res) => {
        dataModel.findAll().then(result => {
            //console.log(result);
            const tasks = [];
            result.map(elem => tasks.push(elem.dataValues));    
            res.send(tasks);
            //res.json(tasks);
        })
        .catch(error => {
            res.send("no task found!");
        });
    });

    // Get a task per id (GET)
    app.get("/api/v1.0/tasks(:id)", (req, res) => {
        const task_id = Number(req.params.id.slice(1, -1));
        dataModel.findOne({ where: { id: task_id } }).then(task => {
            res.send(task);
        })
        .catch(error => {
            res.send(`no task found for id: ${task_id}`);
        });
    });

    // Get a task per id (GET) - alt 2
    app.get("/api/v1.0/tasks/:id", (req, res) => {
        dataModel.findOne({ where: { id: req.params.id } }).then(task => {
            res.send(task);
        })
        .catch(error => {
            res.send(`no task found for id: ${req.params.id}`);
        });
    });

    // Get a detailed value (GET)
    app.get("/api/v1.0/tasks(:id)/:field", (req, res) => {
        const {field} = req.params; 
        const task_id = Number(req.params.id.slice(1, -1));
        dataModel.findOne({ where: { id: task_id }, attributes: [field]}).then(value => {
            res.send("" + value[field]);
        }).catch(error => {
            res.send(`no data found for id: ${task_id} or an invalid field ${field}!`);
        });
    });

    // Get a detailed value (GET) - alt 2
    app.get("/api/v1.0/tasks/:id/:field", (req, res) => {
        const {"id": task_id, field} = req.params; 
        dataModel.findOne({ where: { id: task_id }, attributes: [field]}).then(value => {
            res.send("" + value[field]);
        }).catch(error => {
            res.send(`no data found for id: ${task_id} or an invalid field ${field}!`);
        });
    });

    // Insert a task (POST)
    app.post("/api/v1.0/tasks", (req, res) => {    
        // a document instance
        //console.log(req.body)
        const task = req.body; 
        dataModel.create(task).then(restask =>{
            res.send(`Task ${restask.title} was inserted`);
        })
        .catch(error => {
            res.send(`Creation failed: ${task}`);
        });
    });

    // Update the task (PUT)
    app.put("/api/v1.0/tasks", (req, res) => {
        //console.log(req.body)
        dataModel.update({
                title: req.body.title,
                description: req.body.description, 
                done: req.body.done
            },
            { where: { id: req.body.id }}
        ).then(result => {
            res.send(`${result} record(s) updated - ${req.body.id}`);
        })
        .catch(error => {
            res.send(`Replacing failed: ${req.body}`);
        });
    });

    // Update the task (PATCH)
    app.patch("/api/v1.0/tasks", (req, res) => {
        //console.log(req.body)
        const task = {...req.body};
        delete task["id"];
    
        dataModel.update(task, {where: {id: req.body.id}}
        ).then(result => {
            res.send(`${result} record(s) patched - ${req.body.id}`);
        })
        .catch(error => {
            res.send(`Patching failed: ${task}`);
        });
    });

    // Delete a task (DELETE)
    app.delete("/api/v1.0/tasks", (req, res) => {
        dataModel.destroy({where: {id: req.body.id}}).then(result => {
            res.send(`Number of records deleted: ${result}`);
        })
        .catch(error => {
            res.send(`Deletion failed for id: ${req.body.id}`);
        });
    });    
}