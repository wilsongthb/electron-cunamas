////////////////////////////////////////////////////////////////
//
// API REST FULL PARA LA BASE DE DATOS CUNAMAS EN mysql
// REVISAR LA CONFIGURACION EN EL ARCHIVO main/config.json
//
////////////////////////////////////////////////////////////////

var express = require('express');
var mysql = require('mysql');
var mysqltorest  = require('mysql-to-rest');
const config = require('./../main/config.json').db

var app = express();

var connection = mysql.createConnection(config.connection);
connection.connect();

var api = mysqltorest(app,connection);

app.listen(config.portApi);