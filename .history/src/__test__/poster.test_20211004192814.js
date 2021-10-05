import Poster from './poster';
import 'babel-polyfill'


// describe('GET ALL POSTER', () => {
//     it("GetAll poster and check poster id NOT Exist !!", async () => {
//         const res = new Poster();
//         var data = await res.get()
//         expect(data.status).toBe(200) //Status Code return 200 === success
//     })
//     it("GetAll poster and check poster id Exist !!", async () => {
//         const res = new Poster();
//         var data = await res.get()
//         expect(data.data).not.toHaveLength(0) //Data Legnth > 0
//     })
// });
// describe('GET POSTER BY ID', () => {
//     it("Poster Not Exist", async () => {
//         const res = new Poster();
//         var data = await res.getPosterById("ae7fc9c0-2e0a-4030-87f7-2b106ab0086d") // ID not exist
//         expect(data.status).toBe(500)
//     })
//     it("Poster Exist", async () => {
//         const poster = new Poster();
//         var res = await poster.getPosterById("da533158-674e-4bd2-be0d-f031681514e2") //ID exist
//         console.log({ title: res?.data?.title });
//         expect(res.status).toBe(200)
//     })
// });
describe('UPLOAD POSTER', () => {
    it('Check input value', async () => {
        const poster = new Poster();
        const data = {
            title: 'Hello',
            sub: 'Sub Hello',
            urlImage: '',
            categoryCode: [1, 2]
        }
        const res = await poster.postBlog(data);

        console.log({ res });
        expect(res).toBe('Upload post successfully')
    });

})

