//Here is the Express module
var express = require("express");
//Request module
var app = express();
//Bodyparser here, handles the request stream
var bodyparser = require('body-parser');
//fs module for filesystem interaction
var fs = require("fs");
//user session variable Here
var session = require('express-session');
//mysql module
var mysql = require("mysql");
//port variable
var port = 9001;

var hospital_name;

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json({extended: true}));


var con = mysql.createConnection({
  hhost: "localhost",
  user: "wildbill", // replace with the database user provided to you
  password: "peterstrash", // replace with the database password provided to you
  database: "antibiogram", // replace with the database user provided to you
  port: 3306
});
