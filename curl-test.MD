# Test using curl 

- Query the Tasks - getTaskList

$curl -i -H 'Content-Type: application/json' -X POST -d '{"query": "query {getTaskList{id title description done}}"}' http://localhost:4000/graphql

$curl -i -H 'Content-Type: application/json' -X GET http://localhost:4000/api/v1.0/tasks


- Read a Task - getTask

$curl -i -H 'Content-Type: application/json' -X POST -d '{"query": "query {getTask(id: 1) {id title description done}}"}' http://localhost:4000/graphql

$curl -i -H 'Content-Type: application/json' -X GET http://localhost:4000/api/v1.0/tasks/1


- Create a Task - createTask

$curl -i -H 'Content-Type: application/json' -X POST -d '{"query": "mutation {createTask(title: \"curl\", description: \"test\") {id title description done}}"}' http://localhost:4000/graphql

$curl -i -H 'Content-Type: application/json' -X POST -d '{"title": "curl 2", "description": "test 2"}' http://localhost:4000/ap/v1.0/tasks


- Update/patch a Task - updateTask

$curl -i -H 'Content-Type: application/json' -X POST -d '{"query": "mutation {updateTask(id: 2, title: \"curl test\", done:1)}"}' http://localhost:4000/graphql

$curl -i -H 'Content-Type: application/json' -X POST -d '{"id": 2, "title": "curl test", "done": 1}' http://localhost:4000/api/v1.0/tasks


- Delete a Task - deleteTask

$curl -i -H 'Content-Type: application/json' -X POST -d '{"query": "mutation {deleteTask(id: 3)}"}' http://localhost:4000/graphql

$curl -i -H 'Content-Type: application/json' -X POST -d '{"id": 3}' http://localhost:4000/api/v1.0/tasks