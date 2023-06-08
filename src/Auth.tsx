import { AuthProvider, AuthService, useAuth } from './Auth/index'

const authService = new AuthService({
    clientId: import.meta.env.REACT_APP_CLIENT_ID,
    location: window.location,
    provider: import.meta.env.REACT_APP_PROVIDER,    
    authorizeEndpoint: import.meta.env.REACT_APP_AUTHORIZE,
    tokenEndpoint: import.meta.env.REACT_APP_TOKEN,
    redirectUri: import.meta.env.REACT_APP_REDIRECT_URI || window.location.origin,
    scopes: ['openid', 'profile']
  });

  export default authService