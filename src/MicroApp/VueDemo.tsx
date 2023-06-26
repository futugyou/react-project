/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { useState } from 'react'
import { useAuth } from '../Auth/index'
import microApp from '@micro-zoe/micro-app'

const VueDemo = () => {
    const { authService } = useAuth()

    const jwtToken = JSON.parse(window.localStorage.getItem('auth') || '{}')
    const [microAppData, changeMicroAppData] = useState({
        msg: 'data from base app',
        "Authorization": "Bearer " + jwtToken.access_token,
        crateAt: Date(),
    })
    const vueawsapp_address = import.meta.env.REACT_APP_VUEAWS_APP_ADDRESS

    const handleCreate = () => {
        console.log(1, 'vueawsapp created')
    }

    const handleBeforeMount = () => {
        console.log(2, 'vueawsapp will be render')
    }

    const handleMount = () => {
        console.log(5, 'vueawsapp rendered')

        setTimeout(() => {
            const token = JSON.parse(window.localStorage.getItem('auth') || '{}')
            if (token.access_token) {
                changeMicroAppData({
                    msg: 'new data from base app',
                    Authorization: "Bearer " + token.access_token,
                    crateAt: Date(),
                })
            } else {
                changeMicroAppData({
                    msg: 'new data from base app',
                    Authorization: '',
                    crateAt: Date(),
                })
            }

        }, 2000)
    }

    const handleUnmount = () => {
        console.log('vueawsapp unmount')
    }

    const handleError = () => {
        console.log('vueawsapp load error')
    }

    const handleDataChange = (e: CustomEvent) => {
        console.log(7, 'data from vue demo app:', e.detail.data)
        if (e.detail.data.loginRedirect) {
            const isRouteAccessible = authService.isAuthenticated()
            if (!isRouteAccessible) {
                authService.authorize()
            }
            microApp.router.push({ name: 'vueawsapp', path: e.detail.data.loginRedirect })
        }
    }

    return (
        <micro-app
            name='vueawsapp'
            url={vueawsapp_address}
            data={microAppData}
            onCreated={handleCreate}
            onBeforemount={handleBeforeMount}
            onMounted={handleMount}
            onUnmount={handleUnmount}
            onError={handleError}
            onDataChange={handleDataChange}
            style={{ height: "100%" }}
        ></ micro-app>
    )
}

export default VueDemo