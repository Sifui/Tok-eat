import Vue from 'vue'
import VueRouter from 'vue-router'
import userServices from '../services/userServices'
// import Home from '../views/Home.vue'
Vue.use(VueRouter)
async function isAuthenticated() {
  try{
  let res = await userServices.me()
  res = res.data

  return res 
  }catch(e){
    console.log(e)
    return false 
  }
}
const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue'),
     async beforeEnter(to, from, next) {
      let isAuth = await isAuthenticated()
      console.log(isAuth)
      if ((isAuth && isAuth.type != 'restaurant') || !isAuth) {
        next();
      } else {
        next({ path:'/Index2'});
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
      
    ]
  },
  {
    path:'/Index2',
    name:'Index2',
    component:()=>import('../views/Index2.vue'),
    async beforeEnter(to, from, next) {
          let isAuth = await isAuthenticated()
          if (isAuth && isAuth.type == 'restaurant') {
            next();
          } else {
            next( {path:'/'});
          }
    },
    children:[
      {
        path: '/Index2',
        name: 'test',
        component: () => import('../views/Test.vue'),
      },
      {
        path: '/Dashboard',
        name: 'RestaurantDashBoard',
        component: () => import('../views/RestaurantDashBoard.vue'),
      },
      {
        path: '/ProfilRestaurant',
        name: 'ProfilRestaurant',
        component:()=> import('../views/ProfilRestaurant.vue'),
      },
      {
        path: '/reservations',
        name: 'reservations',
        component:()=> import('../components/Reservations.vue'),
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
  },{
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "about" */ '../views/Logout.vue')
  },
  
  
]

const router = new VueRouter({
  routes
})

export default router
