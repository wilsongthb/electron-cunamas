var fs = require('fs')
var path = require('path')

consola(`
    Path Component:
    ${__dirname}
`)

module.exports = {
    template: fs.readFileSync(path.join(__dirname, 'template.html'), {encoding: 'utf-8'}),
    data(){
        return {
            
        }
    },
    props: {
        b: Object
    }
}