import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios';
import { openaiserver } from './Const';
import { OpenAIModel } from '../Models/OpenAIModel';
import { CompletionModel, DefaultCompletionModel } from '../Models/CompletionModel';
import * as SSEClient from '../../modules/sse';

const createCompletion = async (data: OpenAIModel) => {
    const jwtToken = JSON.parse(window.localStorage.getItem('auth') || '{}')
    const path = 'completions'
    const options: AxiosRequestConfig = {
        url: `${openaiserver}${path}`,
        method: "POST",
        data: data,
        headers: {},
    };

    options.headers!.Authorization = "Bearer " + jwtToken.access_token

    let result: CompletionModel = DefaultCompletionModel;

    try {
        const { data, status } = await axios<CompletionModel>(options);
        result = {
            ...DefaultCompletionModel,
            ...data,
        }
    } catch (error: any) {
        console.log(error);
        result = {
            ...result,
            error: error.message
        }
    }

    return result;
}

const createCompletionStream = async (data: OpenAIModel, processfn: (a: any) => void, endfn: () => void) => {
    const path = 'completions/sse'
    const jwtToken = JSON.parse(window.localStorage.getItem('auth') || '{}')
    const sse = SSEClient.SSE(`${openaiserver}${path}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwtToken.access_token,
        },
        method: "POST",
        payload: JSON.stringify(data),
    });

    sse.addEventListener('message', (event: any) => {
        if (event.data == "[DONE]") {
            sse.close();
            endfn();
        } else {
            let tmp = event.data.replace(/\+/gi, '%20')
            processfn(decodeURIComponent(tmp))
        }
    });

    sse.stream();
}

export default {
    createCompletion: createCompletion,
    createCompletionStream: createCompletionStream,
}