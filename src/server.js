var express = require('express');
let p = require('python-shell');
var normalizePort = require('express')
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/index');
const root = require('./root')
var cors = require("cors");
var bodyParser = require('body-parser'); 
var request = require('request-promise'); 


var app = express();
var port = normalizePort(process.env.PORT || 9000);

app.use(cors());
app.use(express.json()) 
app.use (express.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({ extended: false })); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, 
}));
;

 
app.post('/sendPhotos', (req, res) => {
  console.log('res', req.body)
  res.send('hit this homepage')
})
 
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
app.listen(9000, () => console.log('Browse to localhost:9000/'));
