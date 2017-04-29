// Permite leer archivos csv generados por LibreOffice 
const entrada = 'resources/in.csv'
const salida = 'resources/out.js'
const config = require('./../main/config.json')
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cunamas'
});
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
        var sql = `INSERT INTO \`beneficiarios\` 
                (\`id\`, \`dni\`, \`nombre\`, \`sexo\`, \`fecha_nacimiento\`, \`fecha_registro\`, \`seguro\`, \`numero_seguro\`, \`discapacidad\`, \`id_reg_fila\`) 
                VALUES 
                (NULL, 
                '${data[config.csv.beneficiarios.dni]}', 
                '${data[config.csv.beneficiarios.nombre]}', 
                '${data[config.csv.beneficiarios.sexo]}', 
                '${data[config.csv.beneficiarios.fechanacimiento]}', 
                '${data[config.csv.beneficiarios.fecharegistro]}', 
                '${data[config.csv.beneficiarios.seguro]}', 
                '${data[config.csv.beneficiarios.numeroseguro]}', 
                '${data[config.csv.beneficiarios.discapacidad]}', 
                '0,${fila}');`
        console.log(sql)
        connection.query(sql, function (error, results, fields) {
        if (error) throw error;
            // console.log('The solution is: ', results[0].solution);
            console.log(results)
        });

        // 


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