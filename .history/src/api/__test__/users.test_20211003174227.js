import 'babel-polyfill'
import Users from './users';

it("API testing ", async () => {
    const user = new Users();
    var data = await user.signin({ username: 'dev', password: '1' })
    expect(data).toHaveLength(1);
})