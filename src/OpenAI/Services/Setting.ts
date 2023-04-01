import axios, { AxiosRequestConfig } from 'axios';
import { openaiserver } from './Const';
import { OpenAIModel } from '../Models/OpenAIModel';

const settingPath = 'completion/'
export const defaultSetting: OpenAIModel = {
    model: 'text-davinci-003',
    prompt: 'hello',
    max_tokens: 256,
    top_p: 1,
    temperature: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: [],
    best_of: 1,
    echo: false,
    logprobs: 0,
};

const getSetting = async (settingName: string) => {
    const options: AxiosRequestConfig = {
        url: `${openaiserver}${settingPath}${settingName}`,
        method: "GET",
    };

    let result: OpenAIModel = defaultSetting;
    try {
        const { data, status } = await axios<OpenAIModel>(options);
        result = {
            ...defaultSetting,
            ...data,
        }
    } catch (error) {
        console.log(error);

    }

    return result;
}


export default {
    getSetting: getSetting,
}