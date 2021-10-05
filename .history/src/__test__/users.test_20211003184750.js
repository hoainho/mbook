import 'babel-polyfill'
import Users from './users';

it("Should login be success !! ", async () => {
    const user = new Users();
    const account = { username: 'dev', password: '1' }
    var res = await user.signin(account)
    console.log({ token: res?.data?.token });
    expect(data).toHaveLength(128);
})