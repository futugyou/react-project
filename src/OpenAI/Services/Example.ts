import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios'
import { openaiserver } from './Const'
import { ExampleModel, DefaultExampleModel } from '../models/ExampleModel'

const settingPath = 'examples'
const exampleKey: string = "playground/example"
const customeExampleKey: string = "playground/customeExample"

const getExample = async (exampleName: string) => {
    const examples = await getAllSystemExamples()
    const example = examples.find((d: ExampleModel) => d.key == exampleName) ?? DefaultExampleModel
    return example
}

const getAllSystemExamples = async () => {
    return getAllExamples(exampleKey, `${openaiserver}${settingPath}`)
}


const getAllExamples = async (localStoragekey: string, path: string) => {
    let examples = JSON.parse(localStorage.getItem(localStoragekey) ?? "{}")
    if (examples.date && examples.date < new Date().getTime() || !examples.data) {
        const options: AxiosRequestConfig = {
            url: path,
            method: "GET",
        }

        let result: ExampleModel[] = []
        try {
            const { data, status } = await axios<ExampleModel[]>(options)
            result = data
            if (status == 200) {
                const expiraDate = new Date().setHours(new Date().getHours() + 1)
                localStorage.setItem(localStoragekey, JSON.stringify({ date: expiraDate, data: data }))
            }
        } catch (error) {
            console.log(error)
        }

        return result
    } else {
        return examples.data
    }
}

const getAllCustomExamples = async () => {
    return getAllExamples(customeExampleKey, `${openaiserver}${settingPath}?type=custom`)
}

const createSystemExample = async (data: ExampleModel) => {
    return await createExample(data, exampleKey, `${openaiserver}${settingPath}`)
}

const createExample = async (data: ExampleModel, localStoragekey: string, path: string) => {
    const jwtToken = JSON.parse(window.localStorage.getItem('auth') || '{}')
    const options: AxiosRequestConfig = {
        url: path,
        method: "POST",
        data: data,
        headers: {},
    };

    options.headers!.Authorization = "Bearer " + jwtToken.access_token

    let result: ExampleModel[] = []

    try {
        const { data, status } = await axios<ExampleModel[]>(options)
        if (status == 200) {
            localStorage.removeItem(localStoragekey)
        }

        return data
    } catch (error: any) {
        console.log(error)
    }

    return result
}

const createCustomExample = async (data: ExampleModel) => {
    return await createExample(data, customeExampleKey, `${openaiserver}${settingPath}?type=custom`)
}

export default {
    getExample: getExample,
    getAllExamples: getAllSystemExamples,
    createExample: createSystemExample,
    createCustomExample: createCustomExample,
    getAllCustomExamples: getAllCustomExamples,
}