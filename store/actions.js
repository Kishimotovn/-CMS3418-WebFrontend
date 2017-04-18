import Vue from 'vue'

export default {
  login (context, creds) {
    return Vue.axios.post('/auth/login', creds).then(response => {
      context.commit('setToken', response.data.token)
      return response
    }).catch(error => {
      throw error
    })
  },
  logout (context) {
    return Vue.axios.post('/auth/logout').then(response => {
      context.commit('setToken', null)
      return response
    }).catch(error => {
      throw error
    })
  }
}
