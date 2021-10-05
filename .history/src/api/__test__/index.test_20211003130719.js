// import requestAPI from "../index"
import axios from 'axios';

jest.mock('axios');
import "babel-polyfill"
test('should get poster', () => {
    const status = 300
    // requestAPI('/poster/get', 'GET').then(res =>
    //     expect(res).toBe(300)
    // )
    // requestAPI('/poster/get', 'GET').then(data => {
    //     console.log({ data })
    //     return expect(data.status).toEqual(status)
    // })
    return axios.get('/poster/get').then(resp => expect(resp.status).toEqual(status));
})