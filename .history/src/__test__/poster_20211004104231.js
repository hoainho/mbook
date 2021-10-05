
import axios from 'axios';
import { useState } from 'react';
import requestAPI from '../api/index'
export default class Poster {
    get() {
        return axios.get("http://localhost:8080/poster/get")
            .then(res => res)
        // .catch(err => err.response)

    }
    getPosterById(id) {
        return requestAPI(`/poster/details/${id}`, "GET", null, { Authorization: `Bearer-eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZXYiLCJleHAiOjE2MzMyOTMyMjYsImlhdCI6MTYzMzI1NzIyNn0.rMtpN9uGvUSG_smv8_1MBRJs1omk0kzNxLeL1qh9w6Q` })
            .then(res => res)
            .catch(err => err.response)
    }
    postBlog(data) {
        data.createddate = new Date();
        const [post, setPost] = useState({
            title: "", sub: "", content: "", categoryCode: [],
            urlImage: 'http://res.cloudinary.com/remalw/image/upload/v1620066495/m-book/z7ftb1kemz1temydh5c6.jpg'
        })
        if (data?.title && data?.title?.length < 1) {
            return 'Title is valid'
        } else if (data?.sub && data?.sub?.length < 1) {
            return 'Sub is valid'
        } else if (data?.categoryCode && data?.categoryCode?.length < 1) {
            return 'Category is valid'
        } else {
            setPost(data);
            return 'Upload post successfully'
        }
    }
}