import mockAxios from 'axios';
import Poster from './poster';
import 'babel-polyfill'

it("API testing ", async () => {
    const res = new Poster();
    var data = await res.get()
    expect(data[0].id).toEqual('ae7fc9c0-2e0a-4030-87f7-2b106ab00862')
})