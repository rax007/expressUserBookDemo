/**
 * Created by rakesh on 9/7/14.
 */

var express = require('express'),
    util = require('./util'),
    admins = require('./admins'),
    users = require('./users'),
    books = require('./books');
var app = express();


app.get('/user/:id?', function(req, res) {

    users.getUserDetails(function (errr, result) {

        if(!req.param('id'))
        {
            res.send(result);
        }
        else
        {
            var id = req.param('id');
            for (var obj in result) {
                if(result[obj]._id == id)
                res.send(result[obj]);
            }
        }


    });

});


app.get('/admin/:id?', function (req, res) {

    admins.getAdminDetails(function (errr, result) {

        if(!req.param('id'))
        {
            res.send(result);
        }
        else
        {
            var id = req.param('id');
            for (var obj in result) {
                if(result[obj]._id == id)
                    res.send(result[obj]);
            }
        }
    });

})

app.post()
app.listen(8888);