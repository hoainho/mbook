import 'babel-polyfill'
import Users from './users';

it("Should login be success !! ", async () => {
    const user = new Users();
    // const account = { username: 'dev', password: '1' }
    const account = {}
    var res = await user.signin(account)
    var jwt = res?.data?.token
    console.log({ token: jwt });

    expect(account).toBe(null);

    // expect(jwt).toHaveLength(128);
    // expect(res.status).toBe(200);

    // expect(res.status).toBe(304); //Account had been blocked

    // expect(res.status).toBe(404); //Account is NULL
})