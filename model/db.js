var express = require('express');
var mysql = require('mysql');
var mysqltorest  = require('mysql-to-rest');
const config = require('./../main/config.json').db

var app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cunamas'
});
connection.connect();

var api = mysqltorest(app,connection);

app.listen(config.portApi);