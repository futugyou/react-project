declare global {
    interface Window {
        microApp: any
        __MICRO_APP_NAME__: string
        __MICRO_APP_ENVIRONMENT__: string
        __MICRO_APP_BASE_ROUTE__: string
        rawWindow: any

        [key: `micro-app-${string}`]: {
            mount: () => void
            unmount: () => void
        }
    }
}

export { }
