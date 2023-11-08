/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly REACT_APP_OPENAI_SERVER: string
    readonly REACT_APP_OPENAI_VERSION: string
    readonly REACT_APP_CLIENT_ID: string
    readonly REACT_APP_PROVIDER: string
    readonly REACT_APP_REDIRECT_URI: string
    readonly REACT_APP_AUTHORIZE: string
    readonly REACT_APP_TOKEN: string
    readonly REACT_APP_ADDRESS: string
    readonly REACT_APP_VUEAWS_APP_ADDRESS: string
    readonly REACT_APP_NEXTJS_APP_ADDRESS: string
    readonly REACT_APP_FLOW_SERVER: string    
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
