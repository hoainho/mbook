import mockAxios from 'axios';
import Poster from './poster';
import 'babel-polyfill'

describe('POSTER', () => {
    it("GetAll poster and check poster id NOT Exist !!", async () => {
        const res = new Poster();
        var data = await res.get()
        expect(data[0].id).toEqual('ae7fc9c0-2e0a-4030-87f7-2b106ab00862')
    })
    // it("GetAll poster and check poster id Exist !!", async () => {
    //     const res = new Poster();
    //     var data = await res.get()
    //     expect(data[0].id).toEqual('ae7fc9c0-2e0a-4030-87f7-2b106ab0086d')
    // })
});
