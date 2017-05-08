var fs = require('fs')
var path = require('path')
var csv = require('fast-csv')

consola(`
    Path Component:
    ${__dirname}
`)

module.exports = {
    template: fs.readFileSync(path.join(__dirname, 'template.html'), {encoding: 'utf-8'}),
    data(){
        return {
            beneficiarios: []
        }
    },
    props: {
        path: String
    },
    methods: {
        leer(){
            var lineaCsv = -1

            if(document.getElementById('csv-tabla'))
                document.getElementById('csv-tabla').innerHTML = 'Leendo ...'
            // console.log('Cargando')
            var stream = fs.createReadStream(this.path, { encoding: 'UTF-8'});
            var templateCSV = ''
            
            var csvStream = csv
                .parse()
                .on("data", function(data){

                    // cargar beneficiarios
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
                    // consola(obj_beneficiario)
                    this.beneficiarios.push(obj_beneficiario)


                    // cargar la vista del csv
                    // console.log(data);
                    if(lineaCsv == -1){
                        templateCSV += `<tr>`
                        templateCSV += `<th></th>`
                        for (var index = 0; index < data.length; index++) {
                            templateCSV += `<th>${index}</th>`
                        }
                        templateCSV += `</tr>`
                    }
                    lineaCsv++

                    templateCSV += `<tr>`
                    templateCSV += `<th>${lineaCsv}</th>`
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
    },
    computed: {
        listaBeneficiarios(){
            return this.beneficiarios.sort(function(a, b){
                if(a.meses < b.meses)
                    return 1
                if(a.meses > b.meses)
                    return -1
                return 0
            })
        }
    }
}