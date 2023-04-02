import axios, { AxiosRequestConfig } from 'axios';
import { openaiserver } from './Const';
import { OpenAIModel, CompletionModel, DefaultCompletionModel } from '../Models/OpenAIModel';

const createCompletionPath = 'qa/'

const createCompletion = async (data: OpenAIModel) => {
    data.stop = []
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
    } catch (error) {
        console.log(error);
    }

    return result;
}

export default {
    createCompletion: createCompletion,
}