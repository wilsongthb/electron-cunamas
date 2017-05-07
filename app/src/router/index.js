import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import leerCsv from '@/components/leer-csv'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/leer',
      name: 'Leer CSV',
      component: leerCsv
    }
  ]
})
