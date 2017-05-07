// Permite leer archivos csv generados por LibreOffice 
const entrada = 'resources/in.csv'
const salida = 'resources/out.js'
const config = require('./../main/config.json')
var mysql      = require('mysql');
var connection = mysql.createConnection(config.db.connection);
connection.connect();

// code
// fuente : https://www.npmjs.com/package/fast-csv
const fs = require('fs')
const csv = require('fast-csv')

var stream = fs.createReadStream(entrada, { encoding: 'UTF-8'});

var fila = 1

var csvStream = csv()
    .on("data", function(data){
        //  console.log(data);

        /// insertar beneficiario
        var fecha_nacimiento = data[config.csv.beneficiarios.fechanacimiento].split("/")
        var fecha_registro = data[config.csv.beneficiarios.fecharegistro].split("/")
        var sql_beneficiario = `INSERT INTO \`beneficiarios\` 
                (\`id\`, \`dni\`, \`nombre\`, \`sexo\`, \`fecha_nacimiento\`, \`fecha_registro\`, \`seguro\`, \`numero_seguro\`, \`discapacidad\`, \`id_reg_fila\`) 
                VALUES 
                (NULL, 
                '${data[config.csv.beneficiarios.dni]}', 
                '${data[config.csv.beneficiarios.nombre]}', 
                '${data[config.csv.beneficiarios.sexo]}', 
                '${fecha_nacimiento[2]}/${fecha_nacimiento[1]}/${fecha_nacimiento[0]}', 
                '${fecha_registro[2]}/${fecha_registro[1]}/${fecha_registro[0]}', 
                '${data[config.csv.beneficiarios.seguro]}', 
                '${data[config.csv.beneficiarios.numeroseguro]}', 
                '${data[config.csv.beneficiarios.discapacidad]}', 
                '0,${fila}');`

        // console.log(sql_beneficiario)
        connection.query(sql_beneficiario, function (error, results, fields) {
        if (error) throw error;
            // console.log('The solution is: ', results[0].solution);
            // console.log(results)
        });

        // insertar facilitador
        var sql_facilitador = `INSERT INTO \`cuidadores\` 
                (\`id\`, \`nombre\`, \`sexo\`, \`codigo_familia\`, \`id_reg_fila\`) 
                VALUES 
                (NULL, 
                '${data[config.csv.cuidadores.nombre]}', 
                '${data[config.csv.cuidadores.sexo]}', 
                '${data[config.csv.cuidadores.codigo_familia]}', 
                '0,${fila}');`
        // console.log(sql_facilitador)
        connection.query(sql_facilitador, function (error, results, fields) {
        if (error) throw error;
            // console.log('The solution is: ', results[0].solution);
            // console.log(results)
        });

        // insertar cuidador
        var sql_cuidador = `INSERT INTO \`facilitadores\` 
                (\`id\`, \`nombre\`, \`codigo\`, \`id_reg_fila\`) 
                VALUES 
                (NULL, 
                '${data[config.csv.facilitadores.nombre]}', 
                '${data[config.csv.facilitadores.codigo]}', 
                '0,${fila}');`
        // console.log(sql_cuidador)
        connection.query(sql_cuidador, function (error, results, fields) {
        if (error) throw error;
            // console.log('The solution is: ', results[0].solution);
            // console.log(results)
        });

        // outdata.push(data)
        fila++
    })
    .on("end", function(){
         console.log("done");
        //  fs.writeFileSync(salida, 'module.exports = ' + JSON.stringify(outdata))
         connection.end();
    });
 
stream.pipe(csvStream);

//or 
 
// var csvStream = csv
//     .parse()
//     .on("data", function(data){
//          console.log(data);
         
//     })
//     .on("end", function(){
//          console.log("done");
//     });
 
// stream.pipe(csvStream);