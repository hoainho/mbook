// import Poster from './poster';
// import 'babel-polyfill'


// // describe('GET ALL POSTER', () => {
// //     it("GetAll poster and check poster id NOT Exist !!", async () => {
// //         const res = new Poster();
// //         var data = await res.get()
// //         expect(data.status).toBe(200) //Status Code return 200 === success
// //     })
// //     it("GetAll poster and check poster id Exist !!", async () => {
// //         const res = new Poster();
// //         var data = await res.get()
// //         expect(data.data).not.toHaveLength(0) //Data Legnth > 0
// //     })
// // });
// // describe('GET POSTER BY ID', () => {
// //     it("Poster Not Exist", async () => {
// //         const res = new Poster();
// //         var data = await res.getPosterById("ae7fc9c0-2e0a-4030-87f7-2b106ab0086d") // ID not exist
// //         expect(data.status).toBe(500)
// //     })
// //     it("Poster Exist", async () => {
// //         const poster = new Poster();
// //         var res = await poster.getPosterById("da533158-674e-4bd2-be0d-f031681514e2") //ID exist
// //         console.log({ title: res?.data?.title });
// //         expect(res.status).toBe(200)
// //     })
// // });



// describe('UPLOAD POSTER', () => {
//     const valueBoard = [
//         {
//             case: 'Upload poster VALID',
//             result: 'Upload post successfully',
//             post: {
//                 title: "Clean Code",
//                 sub: "Sách dành cho người yêu code",
//                 content: "Một nội dung code nào đó",
//                 categoryCode: [1, 2],
//                 urlImage: ''
//             }
//         },
//         {
//             case: 'Upload poster INVALID with case LENGTH (title) INVALID',
//             result: 'Upload post FAILED',
//             post: {
//                 title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//                 sub: "Sách dành cho người yêu code",
//                 content: "Một nội dung code nào đó",
//                 categoryCode: [1, 2],
//                 urlImage: ''
//             }
//         },
//         {
//             case: 'Upload poster INVALID with case LENGTH (sub) INVALID',
//             result: 'Upload post FAILED',
//             post: {
//                 title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
//                 sub: "of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//                 content: "Một nội dung code nào đó",
//                 categoryCode: [1, 2],
//                 urlImage: ''
//             }
//         },
//         {
//             case: 'Upload poster INVALID with case LENGTH (category) INVALID',
//             result: 'Upload post FAILED',
//             post: {
//                 title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//                 sub: "Sách dành cho người yêu code",
//                 content: "Một nội dung code nào đó",
//                 categoryCode: [],
//                 urlImage: ''
//             }
//         },
//         {
//             case: 'POST is NULL Value',
//             result: 'Title is valid',
//             post: {
//                 title: "",
//                 content: "",
//                 categoryCode: [],
//                 urlImage: ''
//             }
//         },
//     ]
//     const poster = new Poster();
//     valueBoard.map(item => (
//         it(item.case, async () => {
//             const res = await poster.postBlog(item.post);
//             expect(res).toBe(item.result)
//         })))


// })

