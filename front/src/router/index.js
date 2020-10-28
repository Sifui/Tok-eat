import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () =>  import(/* webpackChunkName: "about" */ '../views/Index.vue'),
    children:[
      {
        path:'',
        name:'display-restaurants',
        component:()=> import('../components/Display-restaurants')
      },
      {
        path:'restaurant',
        name:'restaurant',
        component:()=> import('../components/View-restaurant'),
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component:()=> import('../views/Login.vue'),
  },
  {
    path: '/RestaurantDashBoard',
    name: 'RestaurantDashBoard',
    component:()=> import('../views/RestaurantDashBoard.vue'),
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
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '*',
    name: 'Error404',
    component: () => import(/* webpackChunkName: "about" */ '../views/Error404.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
