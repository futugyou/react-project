declare global {
    interface Window {
        microApp: any
        __MICRO_APP_NAME__: string
        __MICRO_APP_ENVIRONMENT__: string
        __MICRO_APP_BASE_ROUTE__: string

        [key: `micro-app-${string}`]: {
            mount: () => void
            unmount: () => void
        }
    }
}

export { }
