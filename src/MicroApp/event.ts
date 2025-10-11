
export const handleGlobalData = () => {
    if (window.__MICRO_APP_ENVIRONMENT__) {
        window.microApp.setGlobalData({ name: window.__MICRO_APP_NAME__ })
    }
}

export const handleMicroData = () => {
    if (window.__MICRO_APP_ENVIRONMENT__) {
        console.log(4, 'reactapp getData:', window.microApp.getData())
        window.microApp.addDataListener((data: Record<string, unknown>) => {
            console.log(6, 'reactapp addDataListener:', data)
        })

        setTimeout(() => {
            window.microApp.dispatch({ myname: 'reactapp' })
        }, 3000)
    }
}
