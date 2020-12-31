var express = require('express');
var normalizePort = require('express')
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/index');
const users = require('./dummydata')
const axios = require('axios')
var testAPIRouter = require("./testAPI");
var cors = require("cors");

const getBreeds =  () => {
  return axios.get('https://dog.ceo/api/breeds/list/all').then(data => {
    return data.data
  })
}

// Return a single user (based on id)
var getUser = function(args) {
  var userID = args.id;
  return users.filter(user => user.id == userID)[0];
}

// Return a list of users (takes an optional shark parameter)
var retrieveUsers = function(args) {
  if (args.shark) {
    var shark = args.shark;
    return users.filter(user => user.shark === shark);
  } else {
    return users;
  }
}

// Update a user and return new user details
var updateUser = function({id, name, age}) {
  users.map(user => {
    if (user.id === id) {
      user.name = name;
      user.age = age;
      return user;
    }
  });
  return users.filter(user => user.id === id)[0];
}

var root = {
  user: getUser,
  users: retrieveUsers,
  updateUser: updateUser
};

// Create an express server and a GraphQL endpoint
var app = express();
var port = normalizePort(process.env.PORT || 9000);

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, 
}));
app.use("/testAPI", testAPIRouter);

app.set('port', port)
app.listen(9000, () => console.log('Now browse to localhost:9000/graphql'));
