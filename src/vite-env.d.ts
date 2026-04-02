/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_OPENAI_SERVER: string
  readonly REACT_APP_OPENAI_VERSION: string
  readonly REACT_APP_CLIENT_ID: string
  readonly REACT_APP_PROVIDER: string
  readonly REACT_APP_REDIRECT_URI: string
  readonly REACT_APP_AUTHORIZE: string
  readonly REACT_APP_TOKEN: string
  readonly REACT_APP_FLOW_SERVER: string
  readonly REACT_APP_FLUID_CLIENT: string
  readonly REACT_APP_FLUID_REMOTE_TENANT_ID: string
  readonly REACT_APP_FLUID_REMOTE_ENDPOINT: string
  readonly REACT_APP_FLUID_LOCAL_ENDPOINT: string
  readonly REACT_APP_PUSHER_APP_ID: string
  readonly REACT_APP_PUSHER_KEY: string
  readonly REACT_APP_PUSHER_SECRET: string
  readonly REACT_APP_PUSHER_CLUSTER: string
  readonly REACT_APP_ALPHAVANTAGE: string
  readonly REACT_APP_HONEYCOMB_SDK_API_KEY: string
  readonly REACT_APP_HONEYCOMB_SDK_BACKEND_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
