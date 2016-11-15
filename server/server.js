'use strict';

var express = require('express'),
    Db = require('./db'),
    config = require('./config/config');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/../client/src'));

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));


//Getting a path for model directory, where schema is defined
var normalizedPath = require("path").join(__dirname, "./model");

//Registering mongoose schema
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./model/" + file);
});


require('./routes')(app);

var port = config.server.port;

app.listen(port);

console.log('Express app started on port ' + port);
