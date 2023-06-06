import axios, { AxiosRequestConfig } from 'axios';
import { openaiserver } from './Const';
import { EditModel } from '../Models/EditModel';
import { CompletionModel, DefaultCompletionModel } from '../Models/CompletionModel';

const createEdit = async (data: EditModel) => {
    const path = 'edits'
    const options: AxiosRequestConfig = {
        url: `${openaiserver}${path}`,
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

export default {
    createEdit: createEdit,
}