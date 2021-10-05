import mockAxios from 'axios';
import { getUserDataByIds, getPosts, requestAPI } from '../index'
import 'babel-polyfill'

it("API testing ", async () => {
    console.warn(await getPosts());
})