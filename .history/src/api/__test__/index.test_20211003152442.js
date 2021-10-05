// import requestAPI from "../index"
import { getPosts } from "../index"
import "babel-polyfill"
jest.mock('../index')

afterEach(() => {
    jest.clearAllMocks()
})


test('should get poster', () => {
    // getPosts.mockResolvedValueOnce()
    // console.log({ value: getPosts.mockResolvedValue() });

    const myMockFn = jest
        .fn()
        .mockReturnValue('default')
        .mockReturnValueOnce('first call')
        .mockReturnValueOnce('second call');

    // 'first call', 'second call', 'default', 'default'
    console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
    // expect(mockSavePost).toHaveReturned(200)
    // expect(mockSavePost).toHaveBeenCalledTimes(1)
    // requestAPI('/poster/get', 'GET').then(res =>
    //     expect(res).toBe(300)
    // )
    // requestAPI('/poster/get', 'GET').then(data => {
    //     console.log({ data })
    //     return expect(data.status).toEqual(status)
    // })
    // return axios.get('/poster/get')?.then(resp => expect(200).toBe(status));
})