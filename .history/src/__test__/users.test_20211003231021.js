import 'babel-polyfill'
import Users from './users';


describe('LOGIN', () => {
    it("Login with account = null ( FAILD )", async () => {
        const user = new Users();
        const account = null
        var res = await user.signin(account)
        var jwt = res?.data?.token
        expect(res.status).toBe(400);
    })
    it("Login with account invalid !! ", async () => {
        const user = new Users();
        const account = { username: 'admin', password: '1' }
        var res = await user.signin(account)
        var jwt = res?.data?.token
        console.log({ token: jwt });

        expect(res.status).toBe(200);
    })
    it("Login with account valid (ACCOUNT BLOCKED ) !! ", async () => {
        const user = new Users();
        const account = { username: 'dev', password: '1' }
        var res = await user.signin(account)
        var jwt = res?.data?.token
        console.log({ token: jwt });

        expect(res.status).toBe(304); //Account had been blocked
    })
    it("Login with account invalid !! ", async () => {
        const user = new Users();
        const account = { username: 'dev123', password: '1' }
        var res = await user.signin(account)
        var jwt = res?.data?.token
        console.log({ token: jwt });

        expect(res.status).toBe(404); //Account is NULL
    })
})

describe('UPDATE ACCOUNT', () => {
    it('Self Account', async () => {
        const user = new Users();
        var res = await user.changeStatus("5d99c0bf-0da5-4ca4-af2f-7d0764067ea9", { status: true }, { Authorization: `Bearer-eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZXYiLCJleHAiOjE2MzMzMTMxMTgsImlhdCI6MTYzMzI3NzExOH0.P_1x5zc11TuRbUmS2-wJnQzPy7jbTJFu7O7RnalCuhk` })
        expect(res.data).toBe(true); // Self Account
    });
    it('Admin Account', async () => {
        const user = new Users();
        var res = await user.changeStatus("5d99c0bf-0da5-4ca4-af2f-7d0764067ea9", { status: true }, { Authorization: `Bearer-eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzMzMwODU2MCwiaWF0IjoxNjMzMjcyNTYwfQ.HcIV3AtyxxekLsvNAsQfTOH7DDPIGSxmpKyVpyGj5Nk` })
        expect(res.data).toBe(true); //Admin Account
    });
    it('Other Account ( ROLE USER )', async () => {
        const user = new Users();
        var res = await user.changeStatus("5d99c0bf-0da5-4ca4-af2f-7d0764067ea9", { status: true }, { Authorization: `Bearer-eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYW5nbGFuZ3RpbSIsImV4cCI6MTYzMzMxMzE2OSwiaWF0IjoxNjMzMjc3MTY5fQ.O8Pk4R9hOGQs1Pa4of3cigFWp4LZ8Ze-jq4Zrs5Wg4A` })
        expect(res.data).toBe(true); //Other Account
    });

})

