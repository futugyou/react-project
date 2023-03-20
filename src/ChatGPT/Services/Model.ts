import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { openaiserver } from './Const';

const modelListPath = 'v1/model/'

const getModelList = async () => {
    const options: AxiosRequestConfig = {
        url: `${openaiserver}${modelListPath}`,
        method: "GET",
    };

    let result: BaseModel[] = [];
    try {
        const { data, status } = await axios<BaseModel[]>(options);
        return data;
    } catch (error) {
        console.log(error);
        return result;
    }
}

export interface BaseModel {
    name: string,
    describe: string,
}

export default {
    getModelList: getModelList,
}