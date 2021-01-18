import Vue from 'vue'
import Vuex from 'vuex'
import UserServices from './services/userServices'

Vue.use(Vuex)

const store =  new Vuex.Store({
    state: {
      user: null
    },
    mutations: {
       update (state) {
        console.log('update called')
         UserServices.me().then((res)=>{
          state.user = res.data
         })
      },
      disconnectUser(state){
        state.user = null
      }
    }
})
store.commit('update')

export default store


   