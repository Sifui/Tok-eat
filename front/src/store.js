import Vue from 'vue'
import Vuex from 'vuex'
import UserServices from './services/userServices'

Vue.use(Vuex)

const store =  new Vuex.Store({
    state: {
      user: null
    },
    actions:{
      async fetchUser (state) {
        console.log('update called')
        const res = await UserServices.me()
        state.commit('update', res.data)
      },
    },
    mutations: {
      update(state, user){
        state.user = user
      },
      disconnectUser(state){
        state.user = null
      }
    }
})

store.dispatch('fetchUser')


export default store


   