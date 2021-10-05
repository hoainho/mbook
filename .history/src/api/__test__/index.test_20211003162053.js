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
    axios.get.mockResolvedValue({
        data: [
            {
                userId: 1,
                id: 1,
                title: 'Nguyễn Hoài Nhớ'
            },
            {
                userId: 1,
                id: 2,
                title: 'Nguyễn Văn Tèo'
            }
        ]
    });
    const name = await getUserDataByIds();  // Run the function
    console.log({ name });
    console.log("axios.get() called with>>>", axios.get.mock.calls[0]);
    console.log("axios.get() returns>>>", axios.get.mock.results[0].value.then(res => res.data[0]));
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(name).toContainEqual('Nguyễn Hoài Nhớ');  // Make an assertion on the result
});