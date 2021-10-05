import requestAPI from "../index"



test('should get poster', () => {
    requestAPI('/poster/get', 'GET').then(res =>
        expect(res?.status).toEqual(200))
})