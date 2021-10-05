import requestAPI from "../index"
import axios from 'axios';
import "babel-polyfill"
jest.mock('../index')

afterEach(() => {
    jest.clearAllMocks()
})
const savePost = () => requestAPI(`/poster/get`, 'GET')

test('should get poster', () => {
    savePost.mockResolvedValueOnce()
    const status = 403
    expect(mockSavePost).toHaveBeenCalledTimes(1)
    // requestAPI('/poster/get', 'GET').then(res =>
    //     expect(res).toBe(300)
    // )
    // requestAPI('/poster/get', 'GET').then(data => {
    //     console.log({ data })
    //     return expect(data.status).toEqual(status)
    // })
    // return axios.get('/poster/get')?.then(resp => expect(200).toBe(status));
})