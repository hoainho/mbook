import axios from 'axios'

export default async function requestAPI(url, method, body, injectHeader) {
    let urlOrigin = 'https://localhost:44351/api'
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