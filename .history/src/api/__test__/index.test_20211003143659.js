import requestAPI from "../index"
import { getPosts as mockSavePost } from "../index"
import "babel-polyfill"
jest.mock('../index')

afterEach(() => {
    jest.clearAllMocks()
})


test('should get poster', () => {
    mockSavePost.mockResolvedValueOnce()
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