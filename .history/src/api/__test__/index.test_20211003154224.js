// import requestAPI from "../index"
import { getPosts, getPosterDataByIds } from "../index"
import axios from "axios"
import "babel-polyfill"
jest.mock('../index')

afterEach(() => {
    jest.clearAllMocks()
})


describe('Get Post With ID Case Faild', () => {
    it('should return empty Map when axios.get failed', async () => {
        const getError = new Error('GET POSTER FAILD... NOTFOUND');
        axios.get = jest.fn().mockRejectedValue(getError);
        const actualValue = await getPosterDataByIds(['da533158-674e-4bd2-be0d-f031681514e1']);
        expect(actualValue).toEqual(new Map());
        expect(axios.get).toBeCalledWith('/poster/get');
    });

    it('Get Post With ID Case Successfully', async () => {
        const mockPost = [{ id: "da533158-674e-4bd2-be0d-f031681514e2" }];
        axios.get = jest.fn().mockResolvedValue(mockPost);
        const actualValue = await getPosterDataByIds(['da533158-674e-4bd2-be0d-f031681514e2']);
        expect(actualValue).toEqual(mockPost);
        expect(axios.get).toBeCalledWith('/poster/get');
    });
});