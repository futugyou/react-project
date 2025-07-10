import microApp from '@micro-zoe/micro-app'

microApp.start({
    'keep-alive': true,
    async fetch(url, options, appName) {
        const config = {
            mode: 'cors' as any,
        }

        const res = await window.fetch(url, Object.assign(config, options))
        return await res.text()
    }
})
