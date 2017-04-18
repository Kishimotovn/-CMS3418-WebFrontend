import { saveToken, deleteToken } from '~/utils/auth'

export default {
  setToken (state, token) {
    state.token = token
    if (token) {
      saveToken(token)
    } else {
      deleteToken()
    }
  }
}
