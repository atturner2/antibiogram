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
//hash variable for password
var sha1 = require('sha1');


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

app.use(session({
  key: "user_sid",
  secret: "antibiogramsecretkey",
  saveUninitialized: true,
  resave: false}
));

app.listen(port, () => console.log('Example app listening on port ' + port));
//Session-related code here






//Application code here
app.get('/login', function(req, res) {
console.log('request for Log Page!');
//res.send('Hello World!');
res.sendFile(__dirname + '/html/login.html');
console.log('file sent')
});

app.post('/validateLoginDetails', function(req, res) {
  var user = req.body.User;
  var password = sha1(req.body.Password);
  var sqllogin = 'SELECT acc_username, acc_password FROM tbl_accounts WHERE acc_username = '
   + mysql.escape(user) + 'AND acc_password = '
   + mysql.escape(password);

   con.connect(function(err) {
     if(err) {
       throw err;
     }
     console.log('connected to database for login query');
        con.query(sqllogin, function(err, result) {
            if(err) {
              throw err;
            }
        console.log("done with request");
        console.log(result);
        if(result == '') {
          console.log('name and password wrong, back to the login page');
          res.redirect('/login');
          throw err;
        }
        //found it you fucker
        else {
          console.log('user info correct');
          req.session.user = user;
          console.log('password');
        }
      });
    });
    console.log("sending to mainpage");
    res.redirect('/mainpage');

});

app.get('/mainpage', function(req, res) {
console.log('request for Log Page!');
//res.send('Hello World!');
res.sendFile(__dirname + '/html/mainpage.html');
console.log('file sent')
});
