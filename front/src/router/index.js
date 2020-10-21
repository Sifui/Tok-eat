import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../components/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/register-restaurant',
    name:'Register-restaurant',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register-restaurant.vue')
  },
  {
    path: '/login-restaurant',
    name:'Login-restaurant',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login-restaurant.vue')
  },
  {
    path: '/home',
    name:'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
