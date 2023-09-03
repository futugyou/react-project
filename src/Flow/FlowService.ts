import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios'

const flowserver = import.meta.env.REACT_APP_FLOW_SERVER

const flowsPath = 'v1/keyvalues'
const keyPerfix = 'react-flow-'

export const restoreFlow = async (flowid: string) => {
    return JSON.parse(localStorage.getItem(keyPerfix + flowid) ?? "{}")
}

export const getFlow = async (flowid: string) => {
    let savedata = JSON.parse(localStorage.getItem(keyPerfix + flowid) ?? "{}")
    if (savedata.nodes != undefined && savedata.nodes.length > 0) {
        return savedata
    }

    let result: string = '{}'

    const jwtToken = JSON.parse(window.localStorage.getItem('auth') || '{}')
    const options: AxiosRequestConfig = {
        url: flowserver + flowsPath + '/' + flowid,
        method: "GET",
    }

    options.headers!.Authorization = "Bearer " + jwtToken.access_token

    try {
        const { data, status } = await axios(options)
        if (status == 200) {
            result = data
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
        headers: {},
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

export const stashFlow = async (flowid: string, data: string) => {
    localStorage.setItem(keyPerfix + flowid, data)
}