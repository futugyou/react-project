/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { useState } from 'react'

const VueDemo = () => {
    const jwtToken = JSON.parse(window.localStorage.getItem('auth') || '{}')
    const [microAppData, changeMicroAppData] = useState({
        msg: 'data from base app',
        "Authorization": "Bearer " + jwtToken.access_token,
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
            changeMicroAppData({
                msg: 'new data from base app',
                "Authorization": "Bearer " + jwtToken.access_token,
            })
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