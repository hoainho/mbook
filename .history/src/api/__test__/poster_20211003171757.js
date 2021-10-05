
import axios from 'axios';
import requestAPI from '../index'
export default class Poster {
    get() {
        return axios.get("http://localhost:8080/account/get")
            .then(res => res.data)
    }
    get(id) {
        return requestAPI(`/poster/${id}`)
            .then(res => res.data)
    }
}