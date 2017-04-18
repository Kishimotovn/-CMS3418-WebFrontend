import Cookie from 'js-cookie'

export const saveToken = (token) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('token', token)
  Cookie.set('jwt', token)
}

export const deleteToken = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('token')
  Cookie.remove('jwt')
  window.localStorage.setItem('logout', Date.now())
}

export const getTokenFromCookie = (req) => {
  if (!req.headers.cookie) return

  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) return
  console.log('cookie ', jwtCookie)
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const getTokenFromLocalStorage = () => {
  const token = window.localStorage.token
  console.log('token ', token)
  return token
}
