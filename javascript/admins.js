var mongoose = require('mongoose'),
    async = require('async'),
    util = require('./util');


//Define local host
var URIAdminDBString = 'mongodb://localhost/admins';


var adminDBConn = mongoose.createConnection(URIAdminDBString);

adminDBConn.on('error',function(err){
    console.log('err', err);
});


adminDBConn.once('open', function () {
    console.log('Database connection established!');
});


//Defined Schema of personSchema

var adminSchema = new mongoose.Schema({
    Name:{type: String, min:5, max:30},
    Age:{type:Number, max:45}
} , { versionKey: false });

//Defined user modal
var adminModal= adminDBConn.model('admins', adminSchema);




var newAdminObj = {
    Name:'shreyance',
    Age:24
};

//Adding data to admin modal
//util.addDataToDB(newAdminObj, adminModal);

var getAdminsDetails = function (callback) {
    util.getDetail(adminModal, function (err, res) {
        callback(err, res);
    })
}

module.exports.getAdminDetails = getAdminsDetails;