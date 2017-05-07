var data = require('./render/data/report.js')

function Beneficiario(
    dni,
    nombre,
    sexo,
    fechaNacimiento,
    fechaRegistro,
    seguro,
    numeroSeguro,
    discapacidad,
    cuidadores,
    facilitadores
){
    this.dni = dni
    this.nombre = nombre
    this.sexo = sexo
    this.fechaNacimiento = fechaNacimiento
    this.fechaRegistro = fechaRegistro
    this.seguro = seguro
    this.numeroSeguro = numeroSeguro
    this.discapacidad = discapacidad
    this.cuidadores = cuidadores
    this.facilitadores = facilitadores
}

var Out = {}

data.forEach(function(element) {
    b = new Beneficiario(
        element.DNI,
        element['NOMBRES COMPLETOS'],
        element.SEXONIN,
        element.FECNAC,
        element["FECHA\nREGISTROS"],
        element.SEGURO,
        element["NUMERO\nSEGURO"],
        element.DISCAPACIDAD,
        element.CODCUIPRI,
        element["CODIGO\nFACILITADOR\nVISITA"]
    );
    console.log(b)
    Out[element["CODIGO\nBENEFICIARIO / USUARIO"]] = b
    // Out.push(b)
}, this);

const fs = require('fs')
fs.writeFileSync('render/data/db.js', JSON.stringify(Out))