var { buildSchema } = require('graphql');

var foo = buildSchema(`
type Query {
  user(id: Int!): Person
},
type Person {
  id: Int
  name: String
  age: Int
  birthday: String
}
`);

module.exports = foo

