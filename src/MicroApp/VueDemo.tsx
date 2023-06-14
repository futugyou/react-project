/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { useState } from 'react'

function VueDemo() {
    const [microAppData, changeMicroAppData] = useState({ msg: 'data from base app' })

    function handleCreate() {
        console.log('child-vue3 created')
    }

    function handleBeforeMount() {
        console.log('child-vue3 will be render')
    }

    function handleMount() {
        console.log('child-vue3 rendered')

        setTimeout(() => {
            changeMicroAppData({ msg: 'new data from base app' })
        }, 2000)
    }

    function handleUnmount() {
        console.log('child-vue3 unmount')
    }

    function handleError() {
        console.log('child-vue3 load error')
    }

    function handleDataChange(e: CustomEvent) {
        console.log('data from vue demo app:', e.detail.data)
    }

    return (
        <div>
            <h1>vue sub app</h1>
            <micro-app
                name='vueawsapp'
                url='http://localhost:8080/'
                data={microAppData}
                onCreated={handleCreate}
                onBeforemount={handleBeforeMount}
                onMounted={handleMount}
                onUnmount={handleUnmount}
                onError={handleError}
                onDataChange={handleDataChange}
            ></micro-app>
        </div>
    )
}

export default VueDemo