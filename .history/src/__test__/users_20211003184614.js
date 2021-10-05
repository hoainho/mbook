
import requestAPI from '../api/index'
export default class Users {
    signin(acc) {
        return requestAPI("/account/signin", acc) //Login so get token
            .then(res => res.data.token)
            .catch(err => err.response)
    }
}