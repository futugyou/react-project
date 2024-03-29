import axios, { AxiosRequestConfig } from 'axios'

const flowserver = import.meta.env.REACT_APP_FLOW_SERVER

const flowsPath = 'v1/keyvalues'
const keyPerfix = 'react-flow-'

export const restoreFlow = (flowid: string) => {
    return JSON.parse(localStorage.getItem(keyPerfix + flowid) ?? "{}")
}

export const getFlow = async (flowid: string) => {
    let result: string = '{}'

    const jwtToken = JSON.parse(window.localStorage.getItem('auth') || '{}')
    const options: AxiosRequestConfig = {
        url: flowserver + flowsPath + '/' + flowid,
        method: "GET",
        headers: {
            'Account-Id': 'aws-account-id-magic-code'
        },
    }

    options.headers!.Authorization = "Bearer " + jwtToken.access_token

    try {
        const { data, status } = await axios(options)
        if (status == 200) {
            result = data.value
            localStorage.setItem(keyPerfix + flowid, data.value)
        }
    } catch (error) {
        console.log(error)
    }

    return JSON.parse(result)
}

export const saveFlow = async (flowid: string, data: string) => {
    const jwtToken = JSON.parse(window.localStorage.getItem('auth') || '{}')
    const options: AxiosRequestConfig = {
        url: flowserver + flowsPath,
        method: "POST",
        data: {
            key: flowid,
            value: data
        },
        headers: {
            'Account-Id': 'aws-account-id-magic-code'
        },
    }

    options.headers!.Authorization = "Bearer " + jwtToken.access_token
    try {
        const { status } = await axios(options)
        if (status == 200) {
            localStorage.setItem(keyPerfix + flowid, data)
            return true
        }
    } catch (error: any) {
        console.log(error)
    }

    return false
}

export const stashFlow = (flowid: string, data: string) => {
    localStorage.setItem(keyPerfix + flowid, data)
}
