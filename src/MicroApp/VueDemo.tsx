/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { useState } from 'react'
import { useAuth } from '../Auth/index'

interface VueDemoData {
    Msg: string,
    Authorization: string,
    CreateAt: string,
}

const reacteVueDemoData = () => {
    const token = JSON.parse(window.localStorage.getItem('auth') || '{}')
    let data: VueDemoData = {
        Msg: 'new data from base app',
        Authorization: '',
        CreateAt: Date()
    }

    if (token.access_token) {
        data.Authorization = "Bearer " + token.access_token
    }

    return data
}

const VueDemo = () => {
    const { authService } = useAuth()

    const [microAppData, changeMicroAppData] = useState<VueDemoData>(reacteVueDemoData())

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
            let data: VueDemoData = reacteVueDemoData()
            changeMicroAppData(data)
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
        if (e.detail.data.NeedLogin) {
            const isRouteAccessible = authService.isAuthenticated()
            if (!isRouteAccessible) {
                authService.authorize()
            }
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
            clear-data
            iframe
        ></ micro-app>
    )
}

export default VueDemo