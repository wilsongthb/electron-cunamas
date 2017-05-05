const fs = require('fs')

function exportar(ruta){
    var content = fs.readFileSync(ruta, {encoding : 'utf-8'})
    console.log(content)
}