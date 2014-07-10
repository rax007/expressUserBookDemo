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

//update user by id
app.put('/user/:id', function (req, res) {
    users.update(req.param('id'), req.body, function (err, result) {
        if(err) {
            console.log('err: ',err);
            res.send(400, "Entered wrong ID");
        }
        else
            res.send(200, result)
    })

});

//update admin by id
app.put('/admin/:id', function (req, res) {
    admins.update(req.param('id'), req.body, function (err, result) {
        if(err) {
            console.log('err: ',err);
            res.send(400, " wrong ID Entered");
        }
        else
            res.send(200, result)
    })

});

// user record deleted by ID
app.delete('/user/:id', function (req, res) {
    users.deleteRecord(req.param('id'), function (err, result) {
        if(err) {
            console.log('err: ',err);
            res.send(400, " wrong ID Entered");
        }
        else
            res.send(200, result )
    })
});

app.delete('/admin/:id', function (req, res) {

    admins.deleteRecord(req.param('id'), function (err, result) {
        if(err) {
            console.log('err: ',err);
            res.send(400, " wrong ID Entered");
        }
        else
            res.send(200, result )
    })
});

app.listen(8888);