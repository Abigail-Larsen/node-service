var { buildSchema } = require('graphql');

var foo = buildSchema(`
  type Query {
    user(id: Int!): Person
    photos: Photo
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

module.exports = foo;

