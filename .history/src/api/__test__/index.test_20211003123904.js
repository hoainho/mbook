import requestAPI from "../index"
import "babel-polyfill"
test('should get poster', () => {
    const status = 200
    // requestAPI('/poster/get', 'GET').then(res =>
    //     expect(res).toBe(300)
    // )
    return requestAPI('/poster/get', 'GET').then(data => {
        console.log({ data })
        return expect(data.status).toEqual(status)
    })
})