var fs = require('fs')
var path = require('path')
var csv = require('fast-csv')

consola('Path Component:' + __dirname)

module.exports = {
    template: fs.readFileSync(path.join(__dirname, 'template.html'), {encoding: 'utf-8'}),
    data(){
        return {
            verCsv: false,
            beneficiarios: []
        }
    },
    props: {
        path: String
    },
    methods: {
        leer(){
            // console.log('Cargando')
            var stream = fs.createReadStream(this.path, { encoding: 'UTF-8'});
            var templateCSV = ''
            
            var csvStream = csv
                .parse()
                .on("data", function(data){
                    var obj_beneficiario = {}
                    for(i in config.csv.beneficiarios){
                        if(i === 'fechanacimiento'){
                            var fecha = data[config.csv.beneficiarios[i]].split(config.csv.fechaSplit)
                             var fechaNacimiento = `${fecha[2]}-${fecha[1]}-${fecha[0]}`
                            obj_beneficiario[i] = fechaNacimiento
                            obj_beneficiario.edad = edad(fechaNacimiento).str
                            obj_beneficiario.meses = edad(fechaNacimiento).meses
                        }else
                            obj_beneficiario[i] = data[config.csv.beneficiarios[i]]
                    }
                    consola(obj_beneficiario)
                    this.beneficiarios.push(obj_beneficiario)

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