import axios, { AxiosRequestConfig } from 'axios';
import { openaiserver } from './Const';

const settingPath = 'v1/completion/ '

const getSetting = async (settingName: string) => {
    const options: AxiosRequestConfig = {
        url: `${openaiserver}${settingPath}${settingName}`,
        method: "GET",
    };

    let result: Setting = {} as Setting;
    try {
        const { data, status } = await axios<Setting>(options);
        return data;
    } catch (error) {
        console.log(error);
        return result;
    }
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
}

export default {
    getSetting: getSetting,
}