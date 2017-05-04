const config = require('./main/config.js')
const fs = require('fs')
const csv = require('fast-csv')

const Out = []

var stream = fs.createReadStream(config.fileName)
var csvStream = csv()
    .on("data", function(data){
         console.log(data);
         Out.push(data)
    })
    .on("end", function(){
         console.log("done");
         fs.writeFileSync(config.fileNameOut, JSON.stringify(Out))
    });
 
stream.pipe(csvStream);

// console.log(fs.readFileSync('wilber cuna mas/REPORTE OFICIAL FEBRERO 2017 moho.csv', {encoding: 'UTF-8'}))