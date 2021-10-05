
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
        if (data?.username === "") {
            return 'Title is valid'
        } else if (data?.sub?.length < 1) {
            return 'Sub is valid'
        } else if (data?.categoryCode?.length < 1) {
            return 'Category is valid'
        } else {
            if (data.urlImage?.length > 0) {
                post = { ...data }
            } else {
                post = { ...data, urlImage: post.urlImage }
            }
            return 'Upload post successfully'
        }
    }
}