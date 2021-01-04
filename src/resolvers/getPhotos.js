
var request = require('request-promise');
const fs = require('fs');

const filterCategory = () => {
    console.log('wait')
    fs.readdir(__dirname+'/category', (error, files) => {
        var imgFiles = [];
        files.forEach(file => {
                var imgpath = __dirname + '/imgs/' + file;
                imgFiles.push(imgpath);
        })
        console.log('should come first',imgFiles)
        return imgFiles
    })
}

const getPhotos = async () => {

    var options = { 
        method: 'POST', 
        uri: 'http://127.0.0.1:5000/postdata', 
        body: __dirname + '/' + 'static/category/0acd13b832a3adb3b5260facc119c3c6',
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
      name: __dirname + '/' + 'static/category/0acd13b832a3adb3b5260facc119c3c6',
      size:123,
      date:'1234'
    }
}

  module.exports = getPhotos;