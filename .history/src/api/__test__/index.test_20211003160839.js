import axios from 'axios';
import { getUserDataByIds } from '../index'
import 'babel-polyfill'
jest.mock('axios');

describe('getUserDataByIds', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should return empty Map when axios.get failed', async () => {
        const getError = new Error('network error');
        axios.get = jest.fn().mockRejectedValue(getError);
        const actualValue = await getUserDataByIds(['1']);
        expect(actualValue).toEqual(new Map());
        expect(axios.get).toBeCalledWith('/account/get');
    });

    it('should return users', async () => {
        const mockedUsers = [{ userId: 1 }];
        axios.get = jest.fn().mockResolvedValue(mockedUsers);
        const actualValue = await getUserDataByIds([1]);
        console.log({ actualValue });
        expect(actualValue).toEqual(mockedUsers);
        expect(axios.get).toBeCalledWith('/account/get');
    });
});

it('Check isExist of Name', async () => {
    const name = await getUserDataByIds();  // Run the function
    expect(name).toEqual('Nguyễn Hoài Nhớ');  // Make an assertion on the result
});