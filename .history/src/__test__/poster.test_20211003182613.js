import Poster from './poster';
import 'babel-polyfill'


describe('GET ALL POSTER', () => {
    it("GetAll poster and check poster id NOT Exist !!", async () => {
        const res = new Poster();
        var data = await res.get()
        expect(data[0].id).not.toHaveLength(0)
    })
    it("GetAll poster and check poster id Exist !!", async () => {
        const res = new Poster();
        var data = await res.get()
        expect(data[0].id).toHaveLength(0)
    })
});
describe('GET POSTER BY ID', () => {
    it("Poster Not Exist", async () => {
        const res = new Poster();
        var data = await res.getPosterById("ae7fc9c0-2e0a-4030-87f7-2b106ab0086d")
        expect(data[0].id).toEqual('ae7fc9c0-2e0a-4030-87f7-2b106ab0086d')
    })
    it("Poster Exist", async () => {
        const res = new Poster();
        var data = await res.getPosterById("ae7fc9c0-2e0a-4030-87f7-2b106ab0086d")
        expect(data[0].id).toEqual('ae7fc9c0-2e0a-4030-87f7-2b106ab0086d')
    })
});
