import axios, { AxiosRequestConfig } from 'axios';
import { openaiserver } from './Const';
import { OpenAIModel } from '../Models/OpenAIModel';
import { CompletionModel, DefaultCompletionModel } from '../Models/CompletionModel';
import * as SSE from 'sse.js';

const createCompletionPath = 'qa/'

const createCompletion = async (data: OpenAIModel) => {
    const options: AxiosRequestConfig = {
        url: `${openaiserver}${createCompletionPath}`,
        method: "POST",
        data: data,
    };

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

const createCompletionSSE = async (data: OpenAIModel) => {
    const path = 'completions/'
    const sse = new SSE();
    sse.connect(`${openaiserver}${path}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        payload: JSON.stringify(data),
    });

    sse.addEventListener('message', (event: any) => {
        console.log(event)
    });

    sse.stream();
}

export default {
    createCompletion: createCompletion,
    createCompletionSSE: createCompletionSSE,
}