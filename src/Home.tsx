import React from 'react'
import { useAuth } from './Auth/index'
import jwtDecode from 'jwt-decode' 

export const Home = () => {
  const { authService } = useAuth()
//   const jwtPayload = jwtDecode(authService.getAuthTokens().access_token)

  const login = async () => {
    authService.authorize()
  }
  const logout = async () => {
    authService.logout()
  }

  // if (authService.isPending()) {
  //   return <div>Loading...</div>
  // }

  if (!authService.isAuthenticated()) {
    return (
      <div>
        {/* <p>Not Logged in yet: {jwtPayload} </p> */}
        <button onClick={login}>Login</button>
      </div>
    )
  }

  return (
    <div>
      {/* <p>Logged in! {jwtPayload}</p> */}
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home