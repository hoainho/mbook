// import 'babel-polyfill'
// import Users from './users';

// // APIT TESTING
// // describe('LOGIN', () => {
// //     it("Login with account = null ( FAILD )", async () => {
// //         const user = new Users();
// //         const account = null
// //         var res = await user.signin(account)
// //         var jwt = res?.data?.token
// //         expect(res?.status).toBe(400);
// //     })
// //     it("Login with account invalid !! ", async () => {
// //         const user = new Users();
// //         const account = { username: 'admin', password: '1' }
// //         var res = await user.signin(account)
// //         var jwt = res?.data?.token
// //         console.log({ token: jwt });

// //         expect(res.status).toBe(200);
// //     })
// //     it("Login with account valid (ACCOUNT BLOCKED ) !! ", async () => {
// //         const user = new Users();
// //         const account = { username: 'lynhaky', password: '1' }
// //         var res = await user.signin(account)
// //         var jwt = res?.data?.token
// //         console.log({ token: jwt });

// //         expect(res?.status).toBe(304); //Account had been blocked
// //     })
// //     it("Login with account invalid !! ", async () => {
// //         const user = new Users();
// //         const account = { username: 'dev123', password: '1' }
// //         var res = await user.signin(account)
// //         var jwt = res?.data?.token
// //         console.log({ token: jwt });

// //         expect(res?.status).toBe(500); //Account is NULL
// //     })
// // })

// // describe('UPDATE ACCOUNT', () => {
// //     it('Self Account', async () => {
// //         const user = new Users();
// //         var res = await user.changeStatus("5d99c0bf-0da5-4ca4-af2f-7d0764067ea9", { fullname: "Thị Nở" }, { Authorization: `Bearer-eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYW5nbGFuZ3RpbSIsImV4cCI6MTYzMzMxMzE2OSwiaWF0IjoxNjMzMjc3MTY5fQ.O8Pk4R9hOGQs1Pa4of3cigFWp4LZ8Ze-jq4Zrs5Wg4A` })
// //         expect(res.data).toBe(true); //Accept Change with Self Account
// //     });
// //     it('Admin Account', async () => {
// //         const user = new Users();
// //         var res = await user.changeStatus("5d99c0bf-0da5-4ca4-af2f-7d0764067ea9", { fullname: "Thị Nở" }, { Authorization: `Bearer-eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzMzMwODU2MCwiaWF0IjoxNjMzMjcyNTYwfQ.HcIV3AtyxxekLsvNAsQfTOH7DDPIGSxmpKyVpyGj5Nk` })
// //         expect(res.data).toBe(true); //Accept Change with Admin Account
// //     });
// //     it('Other Account ( ROLE USER )', async () => {
// //         const user = new Users();
// //         var res = await user.changeStatus("5d99c0bf-0da5-4ca4-af2f-7d0764067ea9", { fullname: "Thị Nở" }, { Authorization: `Bearer-eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYW5nbGFuZ3RpbSIsImV4cCI6MTYzMzMxMzE2OSwiaWF0IjoxNjMzMjc3MTY5fQ.O8Pk4R9hOGQs1Pa4of3cigFWp4LZ8Ze-jq4Zrs5Wg4A` })
// //         expect(res.data).toBe(false); //Not Accept Change with Other Account
// //     });

// // })

describe('LOGIN', () => {
    // const user = new Users();
    const valueBoard = [
        { case: 'Username VALID && Password VALID', username: 'admin', password: 'Matkhau1', result: 'Login successfully' },
        { case: 'Username is null && Password is null', username: '', password: '', result: 'Username or Password INVALID' },
        { case: 'Username VALID && Password is null', username: 'admin', password: '', result: 'Username or Password INVALID' },
        { case: 'Username is null && Password VALID', username: '', password: 'Matkhau1', result: 'Username or Password INVALID' },
        { case: 'Username INVALID && Password INVALID with space', username: '     ', password: '      ', result: 'Username or Password INVALID' },
        { case: 'Username VALID && Password VALID', username: 'adm in', password: 'Mat khau1', result: 'Username or Password INVALID' },
        { case: 'Account login FAILD with case LENGTH INVALID', username: 'ad', password: '1', result: 'Username or Password INVALID' },
        { case: 'Username INVALID && Password INVALID with symbox', username: '!32$%@  **', password: '()1#~~4)', result: 'Username or Password INVALID' },
    ]
    //     valueBoard.map(item => (
    //         it(item.case, async () => {
    //             const account = { username: item.username, password: item.password }
    //             const res = await user.signin(account);
    //             expect(res).toBe(item.result)
    //         })))
    //     // //---CASE ( Username is null && Password is null )
    it('Username is null && Password is null', async () => {
        const account = { username: '', password: '' }
        const res = await user.signin(account);
        // expect(res).toBe('Username is valid')
    });
    //     // //---CASE ( Username invalid && Password is null )
    //     // it(' Username invalid && Password is null', async () => {
    //     //     const account = { username: 'admin', password: '' }
    //     //     const res = await user.signin(account);

    //     //     expect(res).toBe('Password is valid')
    //     // });
    //     // //---CASE ( Username is null && Password invalid )
    //     // it('Username is null && Password invalid', async () => {
    //     //     const account = { username: '', password: 'Matkhau1' }
    //     //     const res = await user.signin(account);
    //     //     expect(res).toBe('Username is valid')
    //     // });
    //     // //---CASE (1) ( Username is valid && Password is valid )
    //     // it('Username is valid && Password is valid', async () => {
    //     //     const account = { username: '      ', password: '     ' }
    //     //     const res = await user.signin(account);
    //     //     expect(res).toBe('Username is valid')
    //     // });
    //     // //---CASE (2) ( Username is valid && Password is valid )
    //     // it('Username is valid && Password is valid', async () => {
    //     //     const account = { username: '   $123.^^   ', password: '  @###33   ' }
    //     //     const res = await user.signin(account);
    //     //     expect(res).toBe('Username and Password is valid')
    //     // });
    //     // //---CASE (3) ( Username is valid && Password is valid )
    //     // it('Username is valid && Password is valid', async () => {
    //     //     const account = { username: 'ad min', password: 'Mathau 123' }
    //     //     const res = await user.signin(account);
    //     //     expect(res).toBe('Username and Password is valid')
    //     // });
    //     // //---CASE (4) (Length Username is valid  && Length Password is valid )
    //     // it('Length Password is valid', async () => {
    //     //     const account = { username: 'admin', password: '1' }
    //     //     const res = await user.signin(account);
    //     //     expect(res).toBe('Length Password is valid')
    //     // });
})


