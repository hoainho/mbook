
import requestAPI from '../api/index'
export default class Users {
    // signin(acc) {
    //     return requestAPI("/account/signin", 'POST', acc) //Login so get token
    //         .then(res => res)
    //         .catch(err => err.response)
    // }
    // changeStatus(id, status, token) {
    //     return requestAPI(`/account/update/${id}`, 'PUT', status, token) //Login so get token
    //         .then(res => res)
    //         .catch(err => err.response)
    // }
    signin(acc) {
        if (acc) {
            if (data?.username.trim().length < 1) {
                return 'Title is valid'
            } else if (data?.username.trim().length < 1) {
                return 'Password is valid'
            } else {
                return 'Login successfully'
            }
        } else {
            return 'Account null'
        }
    }
}