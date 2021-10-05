import axios from 'axios'

test('should get poster', () => {
    axios.get('/poster/get').then(res =>
        expect(res?.status).toEqual(200))
})