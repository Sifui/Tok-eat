import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import router from './router'
import VueCookies from 'vue-cookies'

Vue.use(VueRouter)
Vue.use(VueCookies)
Vue.$cookies.config('7d')

Vue.use(VueMaterial)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


