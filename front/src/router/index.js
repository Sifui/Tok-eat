import Vue from 'vue'
import VueRouter from 'vue-router'
import userServices from '../services/userServices'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)
function isAuthenticated() {
  return userServices.me().then((res) => {
    return res.data
  }).catch(() => {
    return false
  })
}
const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue'),
    async beforeEnter(to, from, next) {
      let isAuth = await isAuthenticated()
      if ((isAuth && isAuth.type != 'restaurant') || !isAuth) {
        next();
      } else {
        next(false);
      }
    },
    children: [
      {
        path: '',
        name: 'display-restaurants',
        component: () => import('../components/Display-restaurants')
      },
      {
        path: 'restaurant',
        name: 'restaurant',
        component: () => import('../components/View-restaurant'),
      },
      {
        path: 'search',
        name: 'searchRestaurants',
        component: () => import('../components/Search'),
      },
      {
        path: '/offers',
        name: 'Offers',
        component: () => import(/* webpackChunkName: "about" */ '../components/Offers.vue'),
        props: true
      },
      {
        path: '/profil',
        name: 'profil',
        component:()=> import('../views/Profil.vue'),
      },
      {
        path: '/reservations',
        name: 'reservations',
        component:()=> import('../components/Reservations.vue'),
        async beforeEnter(to, from, next) {
          let isAuth = await isAuthenticated()
          if (isAuth && isAuth.type == 'restaurant') {
            next();
          } else {
            next(false);
          }
        }
      },
    ]
  },
  {
    path:'/Index2',
    name:'Index2',
    component:()=>import('../views/Index2.vue'),
    children:[
      {
        path: '/Index2',
        name: 'RestaurantDashBoard',
        component: () => import('../views/RestaurantDashBoard.vue'),
      },
      {
        path: '/profile',
        name: 'profil',
        component:()=> import('../views/Profil.vue'),
      },
    ]
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
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    async beforeEnter(to, from, next) {
      let isAuth = await isAuthenticated()
      if (!isAuth) {
        next();
      } else {
        next(false);
      }
    }
  },
 
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    async beforeEnter(to, from, next) {
      let isAuth = await isAuthenticated()
      if (!isAuth) {
        next();
      } else {
        next(false);
      }
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "about" */ '../views/Logout.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
