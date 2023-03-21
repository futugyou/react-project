/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly REACT_APP_OPENAI_SERVER: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
