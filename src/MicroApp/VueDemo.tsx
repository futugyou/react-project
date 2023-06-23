/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { useState } from 'react'

const VueDemo = () => {
    const [microAppData, changeMicroAppData] = useState({ msg: 'data from base app' })
    const vueawsapp_address = import.meta.env.REACT_APP_VUEAWS_APP_ADDRESS

    const handleCreate = () => {
        console.log('vueawsapp created')
    }

    const handleBeforeMount = () => {
        console.log('vueawsapp will be render')
    }

    const handleMount = () => {
        console.log('vueawsapp rendered')

        setTimeout(() => {
            changeMicroAppData({ msg: 'new data from base app' })
        }, 2000)
    }

    const handleUnmount = () => {
        console.log('vueawsapp unmount')
    }

    const handleError = () => {
        console.log('vueawsapp load error')
    }

    const handleDataChange = (e: CustomEvent) => {
        console.log('data from vue demo app:', e.detail.data)
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