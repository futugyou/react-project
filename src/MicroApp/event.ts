
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

export const patchWindowOpen = (url: string) => {
    // window.rawWindow is main app window, window is sub app window
    let win = (window.rawWindow ?? window) as Window & typeof globalThis
    // let win = window

    if (url.startsWith('http://') || url.startsWith('https://')) {
        win.open(url, '_blank')
    }

    if (window.__MICRO_APP_ENVIRONMENT__) {
        // in a micro-frontend environment, window.rawWindow must exist and represent the main window.
        // use main app window to get location info
        // for exmaple: main url is `https://main.testing.app/reactapp?reactapp=%2Freact%2Fproject`, sub app url is  `https://sub.react.app/react/project`
        // main: 
        //      origin: https://main.testing.app
        //      path: /reactapp
        // sub:
        //      origin: https://sub.react.app
        //      path: /react/project        
        // i want get /reactapp, NOT /react/project
        let origin = win.location.origin.replace(/\/+$/, '')
        let path = win.location.pathname.replace(/^\/+/, '')

        let finalUrl = origin + '/' + path + '?' + path + '=' + url

        console.log('window open url is:', finalUrl);

        win.open(finalUrl, '_blank')
    } else {
        win.open(url, '_blank')
    }
}