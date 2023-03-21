/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly REACT_APP_OPENAI_SERVER: string
    readonly REACT_APP_OPENAI_VERSION: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
