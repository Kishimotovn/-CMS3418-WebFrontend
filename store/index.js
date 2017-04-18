import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const store = new Vuex.Store({
  state: {
    token: null
  },
  getters: getters,
  mutations: mutations,
  actions: actions
})

export default store
