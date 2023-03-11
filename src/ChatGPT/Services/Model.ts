import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const openaiserver = 'http://localhost:8080/api/'
const modelListPath = 'v1/model/'

const getModelList = async () => {
    const options: AxiosRequestConfig = {
        url: `${openaiserver}${modelListPath}`,
        method: "GET",
    };

    try {
        const { data, status } = await axios<string[]>(options);
        return data;
    } catch (error) {
        console.log(error);
        return [""];
    }
}

export default {
    getModelList: getModelList,
}