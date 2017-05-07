Vue.component('csv-reader', {
    methods: {
        leer(){
            
        }
    },
    template: `
<div>
    <table>
        <tr>
            <td>
                <input type="text">
            </td>
        </tr>
    </table>
</div>
    `
})
Vue.component('App', {
    data: function(){
        return {
            msg: 'Hola Perro'
        }
    },
    template: `
        <div>
            <csv-reader></csv-reader>
        </div>
    `
})


new Vue({
    el: '#root'
})