var express = require('express');
var normalizePort = require('express')
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/index');
const users = require('./dummydata')
const axios = require('axios')
var cors = require("cors");

const getBreeds =  () => {
  return axios.get('https://dog.ceo/api/breeds/list/all').then(data => {
    return data.data
  })
}

// Return a single user (based on id)
var getUser = async function(args) {
  const foo = await getBreeds()
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
;

app.use(express.json()) 
app.use (express.urlencoded({extended: false}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });
 
app.post('/sendPhotos', (req, res) => {
  console.log('res', req.body)
  res.send('hit this homepage')
})

app.set('port', port)
app.listen(9000, () => console.log('Now browse to localhost:9000/graphql'));
