var mongoose = require('mongoose'),
    async = require('async'),
    util = require('./util');


//Define local host
var URIUserDBString = 'mongodb://localhost/users';


var userDBConn = mongoose.createConnection(URIUserDBString);

userDBConn.on('error',function(err){
    console.log('err', err);
});


userDBConn.once('open', function () {
    console.log('source Database connection established!');
});


//Defined Schema of personSchema

var userSchema = new mongoose.Schema({
    Name:{type: String, min:5, max:30},
    Age:{type:Number, max:45}
} , { versionKey: false });

//Defined user modal
var userModel= userDBConn.model('username', userSchema);


//add user data to collection

var newUserObj = {
    Name:'amit',
    Age:29
};

//Add data to user model
util.addDataToDB(newUserObj, userModel);

//Creating Query
util.showData(userModel);