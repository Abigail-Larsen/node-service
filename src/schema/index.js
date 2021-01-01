var { buildSchema } = require('graphql');

var foo = buildSchema(`
  type Query {
    user(id: Int!): Int
  },
  type Person {
    id: Int
    name: String
    age: Int
    birthday: String
  }

  type Photo {
    name: String
    size: Int
    date: String
  }
`);

module.exports = foo

