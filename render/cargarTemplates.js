const templateFolder = './render/templates'
const idTemplate = document.getElementById('templates')

var fs = require('fs');
var path = require('path')

fs.readdirSync(templateFolder).forEach(function(element) {
    // console.log(element)
    idTemplate.innerHTML += fs.readFileSync(path.join(templateFolder, element) ,  {encoding: 'utf-8'})    
}, this);