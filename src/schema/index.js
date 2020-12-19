// var schema1 = require('./schema1');
// var schema2 = require('./schema2');

var { buildSchema } = require('graphql');

var foo = buildSchema(`
  type Query {
    user(id: Int!): Person
    users(shark: String): [Person]
  },
  type Person {
    id: Int
    name: String
    age: Int
    shark: String
  }
  type Mutation {
    updateUser(id: Int!, name: String!, age: String): Person
  }
`);

module.exports = 
  foo
  // schema1,
  // schema2

