'use strict'


const {validate} = use('Validator');
const User = use('App/Models/User');

class RegisterController {
async register({request, auth}){
    let output = {status:1};

const user_validator = await validate(request.all(), {
email: 'required|email',
username: 'required|alpha_numeric',
password: 'required|min:3',
re_password: 'required|min:3|same:password'
});

if (user_validator.fails()) {
output.messages = user_validator.messages();
return output;
}

const {username,password, email} = request.all();

const new_user = new User();


new_user.username = username;
new_user.email = email;
new_user.password = password + 'blog';


try {
await new_user.save();
} catch(err) {
console.log(err);
return output;
}
    
await auth.loginViaId(new_user.id);
output.status = 2;
return output;
}
}

module.exports = RegisterController
