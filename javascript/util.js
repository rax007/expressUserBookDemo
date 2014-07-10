

var addDataToDB = function (dataObj, model, callback ) {

    //intailise newEmp
    var newData = new model(dataObj);

    //save newEmp object
    newData.save(function (err, res) {
        callback(err, res);
//            console.log('Can not save '+ err);

    });

};
// This Method returns modal data
var getDetails = function (modal, callback) {
    var query = modal.find();

    query.exec(function (err, res) {

            callback(err, res)

    });
};

var update = function (id, obj, model, callback) {
    model.update({_id: id}, {$set: obj}, function (err, result) {
        callback(err,"Record Updated " + result);
    })
};



var deleteRecord = function (id, modal, callback) {
    modal.find({_id: id}).remove().exec(function (err) {
        callback(err, " Deleted");
    });
};
module.exports.addDataToDB = addDataToDB;
module.exports.getDetail = getDetails;
module.exports.update = update;
module.exports.deleteRecord = deleteRecord;