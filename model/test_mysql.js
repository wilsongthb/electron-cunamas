var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cunamas'
});

connection.connect();

connection.query('SELECT VERSION()', function (error, results, fields) {
  if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
    console.log(results)
});

connection.end();