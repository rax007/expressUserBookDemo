

var addDataToDB = function (dataObj, model ) {

    //intailise newEmp
    var newData = new model(dataObj);

    //save newEmp object
    newData.save(function (err) {
        if(err)
            console.log('Can not save '+ err);

    });

}
// This Method returns modal data
var getDetails = function (modal, callback) {
    var query = modal.find();

    query.exec(function (err, res) {

            callback(err, res)

    });
}


module.exports.addDataToDB = addDataToDB;
module.exports.getDetail = getDetails;