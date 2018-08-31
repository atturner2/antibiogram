var mysql = require("mysql");
var sha1 = require('sha1');

var con = mysql.createConnection({
  hhost: "localhost",
  user: "wildbill", // replace with the database user provided to you
  password: "peterstrash", // replace with the database password provided to you
  database: "antibiogram", // replace with the database user provided to you
  port: 3306
});


con.connect(function(err) {
  if (err) {
    throw err;
  };
  console.log("Connected!");

  var rowToBeInserted = {
    acc_username: 'wildbill', // replace with acc_name chosen by you OR retain the same value
    acc_password: sha1("wildbill"), // replace with acc_password chosen by you OR retain the same value
    hospital_name: 'Childrens'
  };

  var sql = ``;
  con.query('INSERT tbl_accounts SET ?', rowToBeInserted, function(err, result) {
    if(err) {
      throw err;
    }
    console.log("Value inserted");
  });
});
