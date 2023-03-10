import axios from 'axios';

const modelLostUrl = 'http://localhost:8080/api/v1/model/'

const getModelList = () => {
    return axios.get(modelLostUrl).then(response => response.data)
}

export default {
    getModelList: getModelList,
}