import axios from 'axios'
import config from '../config.json'

export default class FileService {
    static apiURL = config.apiURL

    static getAllUserFiles = (id) => {
        return axios.get(this.apiURL + 'file/get', { params: { id }, withCredentials: true })
    }

    static uploadFile = (formData) => {
        return axios.post(this.apiURL + 'file/upload', formData, { withCredentials: true, headers: {
            'Content-Type': 'multipart/form-data'
        } })
    }

    static downloadFile = (fileName) => {
        return axios.get(this.apiURL + 'file/download', { params: { fileName }, withCredentials: true } )
    }
}