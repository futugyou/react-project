import axios, { AxiosRequestConfig } from 'axios';
import { openaiserver } from './Const';

const settingPath = 'completion/'
export const defaultSetting: Setting = {
    model: 'text-davinci-003',
    prompt: '',
    max_tokens: 0,
    top_p: 0,
    temperature: 0.5,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: [],
    best_of: 1
};

const getSetting = async (settingName: string) => {
    const options: AxiosRequestConfig = {
        url: `${openaiserver}${settingPath}${settingName}`,
        method: "GET",
    };

    let result: Setting = defaultSetting;
    try {
        const { data, status } = await axios<Setting>(options);
        result = {
            ...defaultSetting,
            ...data,
        }
    } catch (error) {
        console.log(error);

    }

    return result;
}

export interface Setting {
    model: string,
    prompt: string,
    max_tokens: number,
    top_p: number,
    temperature: number,
    frequency_penalty: number,
    presence_penalty: number,
    stop: string[],
    best_of: number,
}

export default {
    getSetting: getSetting,
}