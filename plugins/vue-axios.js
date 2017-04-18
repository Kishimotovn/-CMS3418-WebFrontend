import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '~store'
// import NProgress from 'vue-nprogress'

axios.defaults.baseURL = 'http://0.0.0.0:8080/api/v1'

// Intercept the request to make sure the token is injected into the header.
axios.interceptors.request.use(config => {
  const token = store.state.token
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

// Intercept the response and…
axios.interceptors.response.use(response => {
  // NProgress.done()

  // …get the token from the header or response data if exists, and save it.
  const token = response.headers['Authorization'] || response.data['token']
  if (token) {
    store.commit('setToken', token)
  }

  return response
}, error => {
  // NProgress.done()
  // Also, if we receive a Bad Request / Unauthorized error
  if (error.response.status === 400 || error.response.status === 401) {
    store.commit('setToken', null)
  }

  return Promise.reject(error)
})

Vue.use(VueAxios, axios)
