/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { useState } from 'react'
import { useAuth } from '../Auth/index'

interface NextjsProjectData {
    Msg: string,
    Authorization: string,
    CreateAt: string,
}

const reacteNextjsProjectData = () => {
    const token = JSON.parse(window.localStorage.getItem('auth') || '{}')
    let data: NextjsProjectData = {
        Msg: 'new data from base app',
        Authorization: '',
        CreateAt: Date()
    }

    if (token.access_token) {
        data.Authorization = "Bearer " + token.access_token
    }

    return data
}

const NextjsProject = () => {
    const { authService } = useAuth()

    const [microAppData, changeMicroAppData] = useState<NextjsProjectData>(reacteNextjsProjectData())

    const nextjsapp_address = import.meta.env.REACT_APP_NEXTJS_APP_ADDRESS

    const handleCreate = () => {
        console.log(1, 'nextjsapp created')
    }

    const handleBeforeMount = () => {
        console.log(2, 'nextjsapp will be render')
    }

    const handleMount = () => {
        console.log(5, 'nextjsapp rendered')

        setTimeout(() => {
            let data: NextjsProjectData = reacteNextjsProjectData()
            changeMicroAppData(data)
        }, 2000)
    }

    const handleUnmount = () => {
        console.log('nextjsapp unmount')
    }

    const handleError = () => {
        console.log('nextjsapp load error')
    }

    const handleDataChange = (e: CustomEvent) => {
        console.log(7, 'data from vue demo app:', e.detail.data)
        if (e.detail.data.NeedLogin) {
            const isRouteAccessible = authService.isAuthenticated()
            if (!isRouteAccessible) {
                authService.authorize()
            }
        }

        if (e.detail.data.Logout) {
            authService.logout(true)
        }
    }

    return (
        <micro-app
            name='nextjsapp'
            url={nextjsapp_address}
            data={microAppData}
            onCreated={handleCreate}
            onBeforemount={handleBeforeMount}
            onMounted={handleMount}
            onUnmount={handleUnmount}
            onError={handleError}
            onDataChange={handleDataChange}
            style={{ height: "100%" }}
            clear-data
        ></ micro-app>
    )
}

export default NextjsProject