import axios from 'axios';
import { getUserDataByIds } from '../index'
import 'babel-polyfill'
jest.mock('axios');

// describe('getUserDataByIds', () => {
//     afterEach(() => {
//         jest.resetAllMocks();
//     });
//     it('should return empty Map when axios.get failed', async () => {
//         const getError = new Error('network error');
//         axios.get = jest.fn().mockRejectedValue(getError);
//         const actualValue = await getUserDataByIds(['1']);
//         expect(actualValue).toEqual(new Map());
//         expect(axios.get).toBeCalledWith('/account/get');
//     });

//     it('should return users', async () => {
//         const mockedUsers = [{ fullname: 'Nguyễn Hoài Nhớ' }];
//         axios.get = jest.fn().mockResolvedValue(mockedUsers);
//         const actualValue = await getUserDataByIds(['Nguyễn Hoài Nhớ']);
//         expect(actualValue).toEqual(mockedUsers);
//         expect(axios.get).toBeCalledWith('/account/get');
//     });
// });

it('Check isExist of Name', async () => {
    const name = await getUserDataByIds();  // Run the function
    console.log({ name });
    expect(name).toContainEqual('Nguyễn Hoài Nhớ');  // Make an assertion on the result
});