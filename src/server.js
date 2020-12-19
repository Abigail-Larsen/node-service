var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/index');
const users = require('./dummydata')

// Return a single user (based on id)
var getUser = function(args) {
  var userID = args.id;
  return users.filter(user => user.id == userID)[0];
}

var root = {
  user: getUser
};

// Create an express server and a GraphQL endpoint
var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, 
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));