'use strict';

var mongoose = require('mongoose'); 
var config = require('../config/config');
var redis = require('redis');
var db = null, redisClient = null;

function connectDatabase(){
	mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db);
	db = mongoose.connection;
	db.on('error', function callback(){
		console.error.bind(console, 'mongodb connection error');
		console.log("Reconectting database");
		connectDatabase();
	});  
	db.once('open', function callback() {  
	    console.log("Connection with database succeeded.");
	});	
}

function connectRedis(){
	redisClient = redis.createClient({
        host: config.redis.host,
        port: config.redis.port
    });

    redisClient.on("error", function (err) {
        console.log("Error " + err);
        console.error.bind(console, 'redis connection error');
		console.log("Reconectting redis");
        connectRedis();
    });

    redisClient.once('open', function callback() {
	    console.log("Connection with redis succeeded.");
	});
}

connectDatabase();

connectRedis();

exports.mongoose = mongoose;  
exports.db = db;

exports.redis = redisClient;