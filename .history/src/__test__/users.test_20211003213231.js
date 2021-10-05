import 'babel-polyfill'
import Users from './users';


describe('LOGIN', () => {
    it("Login with account = null ( FAILD )", async () => {
        const user = new Users();
        const account = null
        var res = await user.signin(account)
        var jwt = res?.data?.token
        expect(res.status).toBe(404);
    })
    it("Login with account invalid !! ", async () => {
        const user = new Users();
        const account = { username: 'admin', password: '1' }
        var res = await user.signin(account)
        var jwt = res?.data?.token
        console.log({ token: jwt });

        expect(jwt).toHaveLength(128);
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
