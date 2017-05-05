///////////////////////////////////
//
// Componente Vue JS
/**
 * @auth: Wilson Pilco Nuñez
 *
 * @export: un objeto para ser usado con Vue.extend
 *
 */
//
///////////////////////////////////

var fs = require('fs')
var csv = require('fast-csv')

module.exports = {
    template: '#lector-csv',
    data: function(){
        return {
            path: './test/in.csv'
        }
    },
    methods: {
        leer(){
            // console.log('Cargando')
            var stream = fs.createReadStream(this.path, { encoding: 'UTF-8'});
            var templateCSV = ''
            
            var csvStream = csv
                .parse()
                .on("data", function(data){
                    // console.log(data);
                    
                    templateCSV += `<tr>`
                    data.forEach(function(element) {
                        templateCSV += `<td>${element}</td>`
                    }, this);
                    templateCSV += `</tr>`
                }.bind(this))
                .on("end", function(){
                    // console.log("done");
                    var csvTabla = document.getElementById('csv-tabla')
                    csvTabla.innerHTML = templateCSV
                });

            stream.pipe(csvStream);
        }
    },
    created(){
        this.leer()
    }
}