import jwtDecode from 'jwt-decode'

export default function (context) {
  console.log('checing admin')
  if (!context.store.getters.isAuthenticated) {
    return context.redirect('/signin')
  }

  const token = context.store.state.token
  // console.log('admin middleware', token, jwtDecode(token))
  if (!jwtDecode(token).is_admin) {
    return context.error({
      statusCode: 401,
      message: 'You are not authorized'
    })
  }
}
