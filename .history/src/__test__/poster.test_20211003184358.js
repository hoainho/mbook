import Poster from './poster';
import 'babel-polyfill'


describe('GET ALL POSTER', () => {
    it("GetAll poster and check poster id NOT Exist !!", async () => {
        const res = new Poster();
        var data = await res.get()
        expect(data.status).toBe(200) //Status Code return 200 === success
    })
    it("GetAll poster and check poster id Exist !!", async () => {
        const res = new Poster();
        var data = await res.get()
        expect(data.data).not.toHaveLength(0) //Data Legnth > 0
    })
});
describe('GET POSTER BY ID', () => {
    it("Poster Not Exist", async () => {
        const res = new Poster();
        var data = await res.getPosterById("ae7fc9c0-2e0a-4030-87f7-2b106ab0086d")
        expect(data.status).toBe(500)
    })
    it("Poster Exist", async () => {
        const res = new Poster();
        var data = await res.getPosterById("da533158-674e-4bd2-be0d-f031681514e2")
        console.log({ title: data.title });
        expect(data.status).toBe(200)
    })
});
