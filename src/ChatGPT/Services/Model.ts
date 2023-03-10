import axios from 'axios';

const modelLostUrl = 'https://0969-18-162-214-228.ap.ngrok.io/api/v1/model/'


const getModelList = () => {
    return axios.get(modelLostUrl).then(response => response.data)
}

export default {
    getModelList: getModelList,
}