var mongoose = require('mongoose'),
    async = require('async'),
    util= require('./../utils/util');


//Define local host
var URIBookDBString = 'mongodb://localhost/books';

//Connection created
var bookDBConn = mongoose.createConnection(URIBookDBString);

bookDBConn.on('error',function(err){
    console.log('err', err);
});


bookDBConn.once('open', function () {
    console.log('Database connection established!');
});


//Defined Schema of personSchema

var bookSchema = new mongoose.Schema({
    Name:{type: String, min:5, max:30},
    Price:{type:Number},
    AuthorID: {type:String }
} , { versionKey: false });

//Defined user modal
var bookModel= bookDBConn.model('book', bookSchema);

/*
var newBookObj = {
    Name:'Groovy',
    Price:1500,
    AuthorID: '53bd28b1b494cb3915365c35, 53bd3463115c804318d4fe33, 53be64e5746caccf2c8d9c79 '
};*/


var getBookDetails = function (callback) {

    util.getDetail(bookModel, function (err, res) {

//        console.log(err, res);
        callback(err, res);
    });
}
var addbook = function (bookObj, callback) {

    util.addDataToDB( bookObj, bookModel, function (err, res) {
        if(err)
        {
            callback(err, null);
        }
        else
            callback(null, 'successfully saved');
    });
}

//update user
var updateBook = function (id, bookObj, callback) {

    util.update(id,  bookObj,bookModel, function (err, res) {
        if(err)
            callback(err, null);
        else
            callback(null, res);
    });
};

var deleteRecord = function (id, callback) {
    util.deleteRecord(id, bookModel, function (err, res) {
        if(err)
            callback(err, null);
        else
            callback(null, res);
    })
};
module.exports.getBookDetails = getBookDetails;
module.exports.addbook = addbook;
module.exports.update = updateBook;
module.exports.deleteRecord = deleteRecord;