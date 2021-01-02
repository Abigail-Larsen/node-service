var express = require('express');
let p = require('python-shell');
var normalizePort = require('express')
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/index');
const users = require('./dummydata')
const axios = require('axios')
var cors = require("cors");

var bodyParser = require('body-parser'); 
var request = require('request-promise'); 

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

const getPhotos = async () => {
  var options = {
    args:
    [
      JSON.stringify('content')

    ]
  }
    p.PythonShell.run('hello.py', options, function  (err, results)  {
    console.log('results from python',results)
  });

  console.log("hit'")
  return {
    name: 'yab',
    size:123,
    date:'1234'
  }
}

var root = {
  user: getUser,
  photos: getPhotos
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
app.use(bodyParser.urlencoded({ extended: false })); 
 
app.get('/postdatatoFlask', async function (req, res) { 
    var data = {
        data1: "foo", 
        data2: "bar" 
    } 
 
    var options = { 
        method: 'POST', 
        uri: 'http://127.0.0.1:5000/postdata', 
        body: data, 
        json: true 
    }; 
     
    var returndata; 
    var sendrequest = await request(options) 
    .then(function (parsedBody) { 
        // parsedBody contains the data sent back from the Flask server 
        returndata = parsedBody; // do something with this data, here I'm assigning it to a variable. 
    }) 
    .catch(function (err) { 
        console.log(err); 
    }); 
     
    res.send(returndata); 
}); 


app.set('port', port)
app.listen(9000, () => console.log('Now browse to localhost:9000/graphql'));
