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
  console.log("session value when unset: ");
  console.log(req.session.value);
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
        }
        //found it you fucker
        else {
          console.log('user info correct');
          req.session.value = user;
          console.log("new session value");
          console.log(req.session.value);
        //  req.session.reset();
          res.redirect('/mainpage');

        }
      });
    });
    console.log("Session Value: ");
    console.log(req.session.value);
    console.log("UserID: ");
    console.log(req.body.User);
    console.log("sessionid: ");
    console.log(req.sessionID);
    console.log("sending to mainpage");

});

app.get('/mainpage', function(req, res) {
  console.log("BEGINNING OF MAINPAGE");
  console.log("sessionval: ");
  console.log(req.session.value);
  console.log("sessionuser: ");
  console.log(req.body.User);
  if(req.session.value == undefined) {
    console.log("INVALID LOGIN");
  }
console.log('request for Log Page!');
//res.send('Hello World!');
res.sendFile(__dirname + '/html/mainpage.html');
console.log('MAINPAGE FILE SENT');
});
