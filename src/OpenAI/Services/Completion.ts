import axios, { AxiosRequestConfig } from 'axios';
import { openaiserver } from './Const';
import { OpenAIModel } from '../Models/OpenAIModel';
import { CompletionModel, DefaultCompletionModel } from '../Models/CompletionModel';
import * as SSEClient from 'sse.js';

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

const createCompletionStream = async (data: OpenAIModel, processfn: (a: any) => void, endfn: () => void) => {
    const path = 'completions/'
    const sse = SSEClient.SSE(`${openaiserver}${path}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        payload: JSON.stringify(data),
    });

    sse.addEventListener('message', (event: any) => {
        if (event.data == "[DONE]") {
            sse.close();
            endfn();
        } else {
            processfn(event.data)
        }
    });

    sse.stream();
}

export default {
    createCompletion: createCompletion,
    createCompletionStream: createCompletionStream,
}