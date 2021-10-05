import Poster from './poster';
import 'babel-polyfill'


describe('GET ALL POSTER', () => {
    it("GetAll poster and check poster id NOT Exist !!", async () => {
        const res = new Poster();
        var data = await res.get()
        expect(data.status).toBe(200)
    })
    // it("GetAll poster and check poster id Exist !!", async () => {
    //     const res = new Poster();
    //     var data = await res.get()
    //     expect(data[0].status).not.toBe(200)
    // })
});
describe('GET POSTER BY ID', () => {
    it("Poster Not Exist", async () => {
        const res = new Poster();
        var data = await res.getPosterById("ae7fc9c0-2e0a-4030-87f7-2b106ab0086d")
        expect(data.status).toBe(200)
    })
    it("Poster Exist", async () => {
        const res = new Poster();
        var data = await res.getPosterById("da533158-674e-4bd2-be0d-f031681514e2")
        expect(data[0].status).not.toBe(200)
    })
});
