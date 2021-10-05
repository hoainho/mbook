import mockAxios from 'axios';
import Poster from './poster';
import 'babel-polyfill'

it("API testing ", async () => {
    const res = new Poster();
    console.warn(await res.get());
})