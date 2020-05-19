
const express = require('express'),
  es6Renderer = require('express-es6-template-engine'),
  app = express();
  app.engine('html', es6Renderer);
  app.set('views', 'views');
  app.set('view engine', 'html');  

var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//app.use(express.static(__dirname + '/views'));
//app.render('index', {locals: {title: 'ES6 Renderer'}});

app.get('/', async function(req, res) {
    data = await processResponse3();
    res.render('index', {locals: {allData: data}});
  });

app.use(express.static(__dirname + '/public'));
//search
app.get('/process_get', async function (req, res) {
    response = [req.query.name, req.query.date];
    console.log(response);
    data =  await processResponse2(response[0], response[1]); 
    res.render('index', {locals: {allData: data}});
    //res.sendFile( __dirname + "/views/" + "index.html" );
    //table = '<html><body><h1>Hello World</h1></body></html>';
    //res.send(table);
 })
//input data
app.post('/', urlencodedParser, async function (req, res) {
   response = [["Sean", req.body.sean_weight, req.body.sean_date],
["Yoda", req.body.yoda_weight, req.body.yoda_date],
["Gwen", req.body.gwen_weight, req.body.gwen_date],
["Anthony", req.body.anthony_weight, req.body.anthony_date],
["Sharon", req.body.sharon_weight, req.body.sharon_date],
["Steven", req.body.steven_weight, req.body.steven_date]];
   console.log(response);
   processResponse(response);
   //res.sendFile( __dirname + "/views/" + "index.html" );
   //res.render('index', {locals: {allData: data}});
   //res.end(JSON.stringify(response));
})

const processResponse=(response)=>{
    var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "seanwang1327!",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO test2 (Name, Weight, Date) VALUES ?";
  var values = response;
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});
}
function processResponse2(response1, response2){
    return new Promise(function(resolve, reject) {
        var mysql = require('mysql');
        var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "seanwang1327!",
        database: "mydb"
        });
        var name = response1;
        var date = response2;
        var sql = 'SELECT * FROM test2 WHERE name = ? AND date = ?';
        var weights ;
        con.query(sql, [name, date], function (err, result) {
            if (err) throw err; 
            console.log(result);
            var data = new Array(result.length);
              // Loop to create 2D array using 1D array 
              for (var i = 0; i < data.length; i++) { 
                  data[i] = new Array(3);
                } 
            // Loop to initilize 2D array elements. 
            for (var i = 0; i < result.length; i++) { 
                for (var j = 0; j < 3; j++) {
                    if (j==0){
                        data[i][j] = result[i].Name; 
                        }
                    else if (j==1){
                        data[i][j] = result[i].Weight; 
                        }
                    else if (j==2){
                        data[i][j] = result[i].Date; 
                        }
                    }
                }
            console.log("process2", data);
            resolve(data);
         });
      }); 
}   

function processResponse3(){
    return new Promise(function(resolve, reject) {
        var mysql = require('mysql');
        var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "seanwang1327!",
        database: "mydb"
        });
        con.connect(function(err) {
            if (err) throw err;
            con.query("SELECT * FROM test2 where Weight is not null and Name is not Null and length(Name)>0 and length(Weight)>0", function (err, result, fields) {
              if (err) throw err;
              var data = new Array(result.length);
              // Loop to create 2D array using 1D array 
              for (var i = 0; i < data.length; i++) { 
                  data[i] = new Array(3);
                } 
            // Loop to initilize 2D array elements. 
            for (var i = 0; i < result.length; i++) { 
                for (var j = 0; j < 3; j++) {
                    if (j==0){
                        data[i][j] = result[i].Name; 
                        }
                    else if (j==1){
                        data[i][j] = result[i].Weight; 
                        }
                    else if (j==2){
                        data[i][j] = result[i].Date; 
                        }
                    }
                }
            resolve(data);
            });
          });          
      }); 
}   

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

