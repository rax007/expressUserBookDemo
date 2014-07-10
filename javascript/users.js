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

//var newUserObj = {
//    Name:'amit',
//    Age:29
//};


var getUserDetails = function (callback) {

    util.getDetail(userModel, function (err, res) {

//        console.log(err, res);
        callback(err, res);
    });
}
var addUser = function (userObj, callback) {

    util.addDataToDB(userObj, userModel, function (err, res) {
        if(err)
        {
            callback(err, null);
        }
        else
        callback(null, 'successfully saved');
    })
}

//update user
var updateUser = function (id, userObj, callback) {

    util.update(id, userObj, userModel, function (err, res) {
        if(err)
        callback(err, null);
        else
        callback(null, res);
    });
};

var deleteRecord = function (id, callback) {
    util.deleteRecord(id, userModel, function (err, res) {
        if(err)
            callback(err, null);
        else
            callback(null, res);
    })
};
module.exports.getUserDetails = getUserDetails;
module.exports.addUser = addUser;
module.exports.update = updateUser;
module.exports.deleteRecord = deleteRecord;