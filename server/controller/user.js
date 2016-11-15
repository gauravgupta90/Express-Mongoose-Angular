'use strict';

var mongoose = require('mongoose'),
    user = mongoose.model('user'),
    RedisClient = require('../db').redis;

/**
   GET: /user
 */

exports.getAll = function (req,res,next) {
    user.getAllUsers(function(err, user) {
      if (!err)
        return res.json({status: true, result: user, message:"successfully get all user" });
      else
        return res.json({status: false, error: err, message:"oops something went wrong!"});
    });

};

/**
   GET: /user/:userid
 */

exports.getOne = function (req,res,next) {
      RedisClient.get(req.params.userid, (error, buffer) => {
          if (error || !buffer) {
            user.getUser(req.params.userid , function(err, user) {
              if (!err){
                RedisClient.set(req.params.userid, JSON.stringify(user), (err, reply) => {
                    return res.json({status: true, result: user, message:"successfully get user info"});
                });
              }
              else
                return res.json({status: false, error: err, message:"oops something went wrong!"});
            });
          } else{
           return res.json({status: true, result: JSON.parse(buffer), message:"successfully get user info"});
          }
      });
};

/**
   POST: /user
 */

exports.create = function (req,res,next) {
    user.createUser(req.body, function(err, user) {
        if (!err) {
            RedisClient.set(user.userId, JSON.stringify(user), (err, reply) => {
                return res.json({status: true, result: user, message: "user created successfully"});
            });
        } else {
            if (11000 === err.code || 11001 === err.code)
              return res.json({status: false, error: err, message:"please provide another user id, it already exist"});
            else
              return res.json({status: false, error: err, message:"oops something went wrong!"});
        }
    });
};

/**
   PUT: /user/:userid
 */

exports.update = function (req,res,next) {
    user.updateUser(req.params.userid, req.body.username, function(err, user){
      if (!err) {
          if (user){
            RedisClient.set(user.userId, JSON.stringify(user), (err, reply) => {
                return res.json({status: true, result: user, message: "User updated successfully"});
            });
          } else
            return res.json({status: true, result: user, message: "No such user found"});
      } else {
          if (11000 === err.code || 11001 === err.code) 
            return res.json({status: false, error: err, message:"please provide another user id, it already exist"});
          else 
            return res.json({status: false, error: err, message:"oops something went wrong!"});
      }
    });
};

/**
   DEL: /user/:userid
 */

exports.remove = function (req,res,next) {
    user.removeUser(req.params.userid, function(err, user){
        if(!err){
          // checks from mongodb response for successfull deletion
          if(user.result.n) {
            RedisClient.del(req.params.userid, (err, reply) => {
              return res.json({status: true, result: user, message: "User deleted successfully"});
            });
          } 
          else
            return res.json({status: true, result: user, message: "No such user found"});
        } else 
            return res.json({status: false, error: err, message:"oops something went wrong!"});
    });
};
