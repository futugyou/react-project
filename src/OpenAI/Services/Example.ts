import axios, { AxiosRequestConfig } from 'axios';
import { openaiserver } from './Const';
import { OpenAIModel, DefaultOpenAIModel } from '../Models/OpenAIModel';

const settingPath = 'completion/'

const getExample = async (settingName: string) => {
    const options: AxiosRequestConfig = {
        url: `${openaiserver}${settingPath}${settingName}`,
        method: "GET",
    };

    let result: OpenAIModel = DefaultOpenAIModel;
    try {
        const { data, status } = await axios<OpenAIModel>(options);
        result = {
            ...DefaultOpenAIModel,
            ...data,
        }
    } catch (error) {
        console.log(error);
    }

    return result;
}


export default {
    getExample: getExample,
}