import jwtDecode from 'jwt-decode'

export default {
  isAuthenticated (state) {
    return !!state.token
  },
  loggedUser (state) {
    if (state.token) {
      return jwtDecode(state.token)
    }
  }
}
