import Vue from 'vue'
import Vuex from 'vuex'
import order from './store/store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    order
  }
})
