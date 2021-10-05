import requestAPI from "../index"
import "babel-polyfill"
test('should get poster', () => {
    // requestAPI('/poster/get', 'GET').then(res =>
    //     expect(res).toBe(300)
    // )
    return requestAPI('/poster/get', 'GET').then(data => expect(data).toEqual(users));
})