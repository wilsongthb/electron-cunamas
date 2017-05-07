const fs = require('fs')
const csv = require('fast-csv')

const Out = []
var first = true
var keys = []

var stream = fs.createReadStream('render/data/repor.csv')
var csvStream = csv()
    .on("data", function(data){
        //  console.log(data);
        
        if(first){
            first = false
            keys = data
        }else{
            var row = {}
            data.forEach(function(element, index, data) {
                row[keys[index]] = element
            }, this);
             Out.push(row)
        }                

        
    })
    .on("end", function(){
         console.log("done");
         fs.writeFileSync('render/data/report.js', JSON.stringify(Out))
    });
 
stream.pipe(csvStream);

// console.log(fs.readFileSync('wilber cuna mas/REPORTE OFICIAL FEBRERO 2017 moho.csv', {encoding: 'UTF-8'}))