import 'babel-polyfill'
import Users from './users';

//APIT TESTING
// describe('LOGIN', () => {
//     it("Login with account = null ( FAILD )", async () => {
//         const user = new Users();
//         const account = null
//         var res = await user.signin(account)
//         var jwt = res?.data?.token
//         expect(res?.status).toBe(400);
//     })
//     it("Login with account invalid !! ", async () => {
//         const user = new Users();
//         const account = { username: 'admin', password: '1' }
//         var res = await user.signin(account)
//         var jwt = res?.data?.token
//         console.log({ token: jwt });

//         expect(res.status).toBe(200);
//     })
//     it("Login with account valid (ACCOUNT BLOCKED ) !! ", async () => {
//         const user = new Users();
//         const account = { username: 'lynhaky', password: '1' }
//         var res = await user.signin(account)
//         var jwt = res?.data?.token
//         console.log({ token: jwt });

//         expect(res?.status).toBe(304); //Account had been blocked
//     })
//     it("Login with account invalid !! ", async () => {
//         const user = new Users();
//         const account = { username: 'dev123', password: '1' }
//         var res = await user.signin(account)
//         var jwt = res?.data?.token
//         console.log({ token: jwt });

//         expect(res?.status).toBe(500); //Account is NULL
//     })
// })

// describe('UPDATE ACCOUNT', () => {
//     it('Self Account', async () => {
//         const user = new Users();
//         var res = await user.changeStatus("5d99c0bf-0da5-4ca4-af2f-7d0764067ea9", { fullname: "Thị Nở" }, { Authorization: `Bearer-eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYW5nbGFuZ3RpbSIsImV4cCI6MTYzMzMxMzE2OSwiaWF0IjoxNjMzMjc3MTY5fQ.O8Pk4R9hOGQs1Pa4of3cigFWp4LZ8Ze-jq4Zrs5Wg4A` })
//         expect(res.data).toBe(true); //Accept Change with Self Account
//     });
//     it('Admin Account', async () => {
//         const user = new Users();
//         var res = await user.changeStatus("5d99c0bf-0da5-4ca4-af2f-7d0764067ea9", { fullname: "Thị Nở" }, { Authorization: `Bearer-eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzMzMwODU2MCwiaWF0IjoxNjMzMjcyNTYwfQ.HcIV3AtyxxekLsvNAsQfTOH7DDPIGSxmpKyVpyGj5Nk` })
//         expect(res.data).toBe(true); //Accept Change with Admin Account
//     });
//     it('Other Account ( ROLE USER )', async () => {
//         const user = new Users();
//         var res = await user.changeStatus("5d99c0bf-0da5-4ca4-af2f-7d0764067ea9", { fullname: "Thị Nở" }, { Authorization: `Bearer-eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYW5nbGFuZ3RpbSIsImV4cCI6MTYzMzMxMzE2OSwiaWF0IjoxNjMzMjc3MTY5fQ.O8Pk4R9hOGQs1Pa4of3cigFWp4LZ8Ze-jq4Zrs5Wg4A` })
//         expect(res.data).toBe(false); //Not Accept Change with Other Account
//     });

// })

describe('LOGIN', () => {
    const user = new Users();

    //---CASE ( Username is null && Password is null )
    it('Check account', async () => {
        const account = { username: '', password: '' }
        const res = await user.signin(account);
        expect(res).toBe('Login successfully')
    });
    //---CASE ( Username invalid && Password is null )
    it(' Username invalid && Password is null', async () => {
        const account = { username: 'admin', password: '' }
        const res = await user.signin(account);

        expect(res).toBe('Login successfully')
    });
    //---CASE ( Username is null && Password invalid )
    it('Username is null && Password invalid', async () => {
        const account = { username: '', password: 'Matkhau1' }
        const res = await user.signin(account);

        expect(res).toBe('Login successfully')
    });
})


