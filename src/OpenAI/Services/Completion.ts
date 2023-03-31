import axios, { AxiosRequestConfig } from 'axios';
import { openaiserver } from './Const';
import { OpenAIModel } from '../Models/OpenAIModel';

const createCompletionPath = 'qa/'

const createCompletion = async (data: OpenAIModel) => {
    const options: AxiosRequestConfig = {
        url: `${openaiserver}${createCompletionPath}`,
        method: "POST",
        data: data,
    };

    let result: any[] = [];
    try {
        const { data, status } = await axios<any[]>(options);
        return data;
    } catch (error) {
        console.log(error);
        return result;
    }
}

export default {
    createCompletion: createCompletion,
}