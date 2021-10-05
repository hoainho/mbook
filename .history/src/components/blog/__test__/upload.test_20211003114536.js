const { default: requestAPI } = require('../../../api')

test('should get poster', () => {
    requestAPI('/poster/get', 'GET').then(res =>
        expect(res?.status).toEqual(200))
})