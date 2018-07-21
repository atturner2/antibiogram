var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
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
  var sql = `CREATE TABLE hospitals(place_id INT NOT NULL AUTO_INCREMENT,
                                       hospital_name VARCHAR(35), PRIMARY KEY(place_id, hospital_name))`;
  con.query(sql, function(err, result) {
    if(err) {
      throw err;
    }
    console.log("Antibiotics Table created");
  });
});
