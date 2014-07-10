/**
 * Created by rakesh on 9/7/14.
 */

var express = require('express'),
    admins = require('./admins'),
    users = require('./users'),
    books = require('./books'),
    bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());

//Get all user list
app.get('/user/:id?', function(req, res) {

    users.getUserDetails(function (errr, result) {

        if(!req.param('id'))
        {
            res.send(200,result);
        }
        else
        {
            var id = req.param('id');
            for (var obj in result) {
                if(result[obj]._id == id)
                res.send(200, result[obj]);
            }
        }


    });

});

//Get all admin list
app.get('/admin/:id?', function (req, res) {

    admins.getAdminDetails(function (errr, result) {

        if(!req.param('id'))
        {
            res.send(200, result);
        }
        else
        {
            var id = req.param('id');
            for (var obj in result) {
                if(result[obj]._id == id)
                    res.send(200, result[obj]);
            }
        }
    });

});

//save new user
app.post('/user', function (req, res) {
    users.addUser(req.body, function (err, result) {
        if(err) {
            console.log('err: ',err);
            res.send(400, err);
        }
        else
        res.send(200, result)
    })
});

//save new admin
app.post('/admin', function (req, res) {
    admins.addAdmin(req.body, function (err, result) {
        if(err) {
            console.log('err: ',err);
            res.send(400, err);
        }
        else
            res.send(200, result)
    })
});

app.listen(8888);