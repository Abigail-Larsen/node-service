const getPhotos = require('./resolvers/getPhotos')

const root = {
    photos: getPhotos
};
  
module.exports = root;