var config = require('./main/config.json')

function consola(frase){
    if(config.consola)
        console.log(frase)
}

// metodo 1 para cargar componente
require('./render/components/vue.msj.js')
// metodo 2 para cargar componente, con la opcion de definir su tag html
Vue.component('panel', require('./render/components/obj.panel.js'))


// Componentes de la aplicacion
require('./render/components/firecsv')

//funciones utiles
const edad = require('./render/edad.js')

new Vue({
    el: '#root',
    components: {
        // msj: ,
        // panel: 
    }
})