// import Vue from 'vue'
// import Vuex from 'vuex'
import { request } from '../network/request'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
  },
  actions: {
    getNormalData(context, configObj) {
      return request(configObj)
    },
    setNormalData(context, configObj) {
      return request(configObj)
    }
  },
  modules: {
  }
})
