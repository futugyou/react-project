import axios, { AxiosRequestConfig } from 'axios';
import { openaiserver } from './Const';

const modelListPath = 'model'
const modelKey: string = "playground/model"

const getModelList = async () => {

    let examples = JSON.parse(localStorage.getItem(modelKey) ?? "{}")
    if (examples.date && examples.date < new Date().getTime() || !examples.data) {
        const options: AxiosRequestConfig = {
            url: `${openaiserver}${modelListPath}`,
            method: "GET",
        };

        let result: BaseModel[] = [];
        try {
            const { data, status } = await axios<BaseModel[]>(options);
            if (status == 200) {
                const expiraDate = new Date().setHours(new Date().getHours() + 1)
                localStorage.setItem(modelKey, JSON.stringify({ date: expiraDate, data: data }))
            }
            
            return data;
        } catch (error) {
            console.log(error);
            return result;
        }
    } else {
        return examples.data
    }
}

export interface BaseModel {
    name: string,
    describe: string,
}

export default {
    getModelList: getModelList,
}