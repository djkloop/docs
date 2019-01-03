import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import './installComponents'

const router = new VueRouter({
  mode: 'history',
  fallback: false,
  routes,
})

new Vue({
  el: '#app',
  router,
})