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
var getUser = async function(args) {
  const foo = await getBreeds()
  console.log('foo', foo)
  var userID = args.id;
  return users.filter(user => user.id == userID)[0];
}

var root = {
  user: getUser
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
