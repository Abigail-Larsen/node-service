var { buildSchema } = require('graphql');

module.exports = buildSchema(`

  extend type Query {
    user1(id: Int!): Person
  },

  type Person {
    id: Int
    name: String
    age: Int
    shark: String
  }

`);
