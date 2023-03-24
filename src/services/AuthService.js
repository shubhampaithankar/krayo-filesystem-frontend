import axios from 'axios'
import config from '../config.json'

export default class AuthService {
    static apiURL = config.apiURL
    static getUserOnSuccess = () => {
        return axios.get(this.apiURL + 'auth/login/success', { withCredentials: true })
    }
    static logoutUser = () => {
        return axios.get(this.apiURL + 'auth/logout')
    }
}