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