# Test with GraphiQL

- Query

"{
  getTaskList {
    id
    title
    description
    done
  }
}"

- Create

"mutation {
  createTask(title: "andy", description: "hope is a good thing") {
    id title description done
  }
}"

- Update/patch

"mutation {
  updateTask(id: 3, title: "andy", description: "andy's test", done: 1)
}"

- Read

"{
  getTask(id: 1) {
    id title description done
  }
}"

- Delete

"mutation {
  deleteTask(id: 2)
}"
