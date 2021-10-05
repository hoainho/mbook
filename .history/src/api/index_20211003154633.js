import axios from 'axios'

export default async function requestAPI(url, method, body, injectHeader) {
    let urlOrigin = 'http://localhost:8080'
    const headers = {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        ...injectHeader,
    };

    let objMeta = {
        method,
        url: `${urlOrigin}${url}`,
        headers,
        data: body
    };
    return await axios(objMeta);
}

export const getPosts = () => requestAPI(`/poster/get`, 'GET').then(res => res.status).catch(err => err.response.status)

import axios from 'axios';

export async function getUserDataByIds() {
    try {
        const users = await axios.get('/account/get');
        return users;
    } catch (err) {
        return new Map();
    }
}