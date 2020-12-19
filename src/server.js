var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/index');
const users = require('./dummydata')
const axios = require('axios')

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

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, 
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));