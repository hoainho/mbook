import 'babel-polyfill'
import Users from './users';

it("Should login be success !! ", async () => {
    const user = new Users();
    const account = { username: 'dev', password: '1' }
    var data = await user.signin(account)
    expect(data).toHaveLength(128);
})