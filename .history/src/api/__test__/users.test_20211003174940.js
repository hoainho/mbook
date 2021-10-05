import 'babel-polyfill'
import Users from './users';

it("Should login be success !! ", async () => {
    const user = new Users();
    var data = await user.signin({ username: 'dev', password: '2' })
    expect(data).toHaveLength(128);
})