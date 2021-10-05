
import axios from 'axios';
import requestAPI from '../index'
export default class Users {
    signin() {
        return axios.get("http://localhost:8080/account/signin")
            .then(res => res.data.token)
    }
}