
import axios from 'axios';
import requestAPI from '../api/index'
export default class Poster {
    get() {
        return axios.get("http://localhost:8080/account/get")
            .then(res => res)
            .catch(err => err.response)

    }
    getPosterById(id) {
        return requestAPI(`/poster/details/${id}`, "GET", null, { Authorization: `Bearer-eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZXYiLCJleHAiOjE2MzMyOTMyMjYsImlhdCI6MTYzMzI1NzIyNn0.rMtpN9uGvUSG_smv8_1MBRJs1omk0kzNxLeL1qh9w6Q` })
            .then(res => res.data)
            .catch(err => err.response)
    }
}