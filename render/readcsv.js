// Permite leer archivos csv generados por LibreOffice 
const entrada = 'C:\\xampp\\htdocs\\dev\\electron-cunamas\\resources\\REPORTE OFICIAL FEBRERO 2017 moho.csv'
const salida = 'resources/out.csv'


// code
// fuente : https://www.npmjs.com/package/fast-csv
const fs = require('fs')
const csv = require('fast-csv')

var stream = fs.createReadStream(entrada, { encoding: 'UTF-8'});
var outdata = []
var csvStream = csv()
    .on("data", function(data){
        //  console.log(data);
         outdata.push(data)
    })
    .on("end", function(){
         console.log("done");
         fs.writeFileSync(salida, 'module.exports = ' + JSON.stringify(outdata))
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