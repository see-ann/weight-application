var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "seanwang1327!",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM test2", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});