import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    persistedState({
    })
  ],
  state: {
    HeroInfo:{}
  },
  mutations: {
    SaveInfo(state,info){
      state.HeroInfo = info
    }
  },
  actions: {
  },
  modules: {
  }
})
