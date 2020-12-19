var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
// const schema = require('./schema/index');

var schema = buildSchema(`

type Query {
  user(id: Int!): Person
  users(shark: String): [Person]
}

type Person {
  id: Int
  name: String
  age: Int
  shark: String
}

`);

// Root resolver
var root = {
  hello: () => 'Hello world!'
};

// Create an express server and a GraphQL endpoint
var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, 
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));