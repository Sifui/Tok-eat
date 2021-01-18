import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import router from './router'
import VueCookies from 'vue-cookies'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import 'es6-promise/auto'
import store from './store'

Vue.use(VueRouter)
Vue.use(VueCookies)
Vue.$cookies.config('7d')

Vue.use(VueMaterial)
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://localhost:8081'),

}))
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


