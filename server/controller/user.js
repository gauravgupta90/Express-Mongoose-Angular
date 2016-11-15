'use strict';

var mongoose = require('mongoose'),
    user = mongoose.model('user');

/**
   GET: /user
 */

exports.getAll = function (req,res,next) {
    user.getAllUsers(function(err, user) {
      if (!err)
        res.json({status: true, result: user, message:"successfully get all user" });
      else
        res.json({status: false, error: err, message:"oops something went wrong!"});
    });

};

/**
   GET: /user/:userid
 */

exports.getOne = function (req,res,next) {
      user.getUser(req.params.userid , function(err, user) {
        if (!err)
          res.json({status: true, result: user, message:"successfully get user info"});
        else
          res.json({status: false, error: err, message:"oops something went wrong!"});
    });

};

/**
   POST: /user
 */

exports.create = function (req,res,next) {
    user.createUser(req.body, function(err, user) {
        if (!err) {
            res.json({status: true, result: user, message: "user created successfully"});
        } else {
            if (11000 === err.code || 11001 === err.code)
              res.json({status: false, error: err, message:"please provide another user id, it already exist"});
            else
              res.json({status: false, error: err, message:"oops something went wrong!"});
        }
    });
};

/**
   PUT: /user/:userid
 */

exports.update = function (req,res,next) {
    user.updateUser(req.params.userid, req.body.username, function(err, user){
      if (!err) {
          if (user)
            res.json({status: true, result: user, message: "User updated successfully"});
          else
            res.json({status: true, result: user, message: "No such user found"});
      } else {
          if (11000 === err.code || 11001 === err.code) 
            res.json({status: false, error: err, message:"please provide another user id, it already exist"});
          else 
            res.json({status: false, error: err, message:"oops something went wrong!"});
      }
    });
};

/**
   DEL: /user/:userid
 */

exports.remove = function (req,res,next) {
    user.removeUser(req.params.userid, function(err, user){
        if(!err){
          if(user.result.n) // checks from mongodb response for successfull deletion
              res.json({status: true, result: user, message: "User deleted successfully"});
          else
              res.json({status: true, result: user, message: "No such user found"});
        } else 
            res.json({status: false, error: err, message:"oops something went wrong!"});
    });
};
