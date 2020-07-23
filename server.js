const express = require('express');
const logger = require('morgan');
// const cors = require('cors');
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');
const app = express();
//app.use(cors);
app.set('secretKey', 'nodeRestApi'); // jwt secret token
// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(async function (req, res,next){
    try {
        console.log("Step:2");   
        
        let resp = await next();
        console.log(resp);
       
      
    } catch (error) {
        console.log("Step error")
        console.log(error);
    }
});

app.get('/', function (req, res) {
    console.log("Step:1");   
    res.json({ "tutorial": "Build REST API with node.js" });
});
// public route
app.use('/users', users);
// private route

app.get('/favicon.ico', function (req, res) {
    res.sendStatus(204);
});
function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.json({ status: "error", message: err.message, data: null });
        } else {
            // add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });

}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
// app.use(function (req, res, next) {
//     console.log("Step:3");  
//     console.log("Errior");
//     let err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
// // handle errors
// app.use(function (err, req, res, next) {
//     console.log("Step:4"); 
//     console.log(err);

//     if (err.status === 404)
//         res.status(404).json({ message: "Not found" });
//     else
//         res.status(500).json({ message: "Something looks wrong :( !!!" });
// });
app.listen(3000, function () {
    console.log('Node server listening on port 3000');
});