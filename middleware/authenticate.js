import { getTokenFromCookie, getTokenFromLocalStorage } from '~/utils/auth'

export default function ({ isServer, store, req }) {
  const token = isServer ? getTokenFromCookie(req) : getTokenFromLocalStorage()
  console.log('setting token')
  store.commit('setToken', token)
}
