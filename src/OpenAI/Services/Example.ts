import axios, { AxiosRequestConfig } from 'axios';
import { openaiserver } from './Const';
import { ExampleModel, DefaultExampleModel } from '../Models/ExampleModel';

const settingPath = 'examples/'

const getExample = async (exampleName: string) => {
    const examples = await getAllExamples()
    const example = examples.find(d => d.key == exampleName) ?? DefaultExampleModel
    return example;
}

const getAllExamples = async () => {
    const options: AxiosRequestConfig = {
        url: `${openaiserver}${settingPath}`,
        method: "GET",
    };

    let result: ExampleModel[] = [];
    try {
        const { data, status } = await axios<ExampleModel[]>(options);
        result = data
    } catch (error) {
        console.log(error);
    }

    return result;
}


export default {
    getExample: getExample,
    getAllExamples: getAllExamples,
}