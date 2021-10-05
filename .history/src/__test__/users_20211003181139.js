
import axios from 'axios';
import requestAPI from '../api/index'
export default class Users {
    signin(acc) {
        return axios.post("http://localhost:8080/account/signin", acc)
            .then(res => res.data.token)
    }
}