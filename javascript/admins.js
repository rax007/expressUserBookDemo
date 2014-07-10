var mongoose = require('mongoose'),
    async = require('async'),
    util = require('./../utils/util');


//Define local host
var URIAdminDBString = 'mongodb://localhost/admins';


var adminDBConn = mongoose.createConnection(URIAdminDBString);

adminDBConn.on('error',function(err){
    console.log('err', err);
});


adminDBConn.once('open', function () {
    console.log('Database connection established!');
});


//Defined Schema of adminSchema
var adminSchema = new mongoose.Schema({
    Name:{type: String, min:5, max:30},
    Age:{type:Number, max:45}
} , { versionKey: false });

//Defined user modal
var adminModal= adminDBConn.model('admins', adminSchema);


//Adding data to admin modal
var addAdmin = function (newAdminObj, callback) {

    util.addDataToDB(newAdminObj, adminModal, function (err, res) {
        if(err)
        callback(err, null);
        else
        callback(null, "successfully saved");

    });
};

//update user
var updateAdmin = function (id, adminObj, callback) {

    util.update(id, adminObj, adminModal, function (err, res) {
        if(err)
            callback(err, null);
        else
            callback(null, res);
    });
};

var getAdminsDetails = function (callback) {
    util.getDetail(adminModal, function (err, res) {
        callback(err, res);
    })
}


var deleteRecord = function (id, callback) {
    util.deleteRecord(id, adminModal, function (err, res) {
        if(err)
            callback(err, null);
        else
            callback(null, res);
    })
}

module.exports.getAdminDetails = getAdminsDetails;
module.exports.addAdmin = addAdmin;
module.exports.update = updateAdmin;
module.exports.deleteRecord = deleteRecord;
