
var request = require('request-promise'); 
const foo = () => {

}
    

const getPhotos = async () => {
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

    return {
      name: JSON.stringify(returndata.newdata),
      size:123,
      date:'1234'
    }
}

  module.exports = getPhotos;