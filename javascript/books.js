var mongoose = require('mongoose'),
    async = require('async'),
    util= require('./util');


//Define local host
var URIBookDBString = 'mongodb://localhost/books';


var bookDBConn = mongoose.createConnection(URIBookDBString);

bookDBConn.on('error',function(err){
    console.log('err', err);
});


bookDBConn.once('open', function () {
    console.log('source Database connection established!');
});


//Defined Schema of personSchema

var bookSchema = new mongoose.Schema({
    Name:{type: String, min:5, max:30},
    Age:{type:Number, max:45}
} , { versionKey: false });

//Defined user modal
var bookModel= bookDBConn.model('book', bookSchema);


//add user data to collection
var addDataToDB = function (dataObj, model ) {

    //intailise newEmp
    var newData = new model(dataObj);

    //save newEmp object
    newData.save(function (err) {
        if(err)
            console.log('Can not save '+ err);

    });

}

var newBookObj = {
    Name:'rakesh',
    Age:25
};

//addDataToDB(newBookObj, bookModel);
//Creating Query
var query = bookModel.find();
query.exec(function (err, res) {
    if(err)
        console.log('not Executed:- '  + err);
    else {

   console.log(res);
    }
});
