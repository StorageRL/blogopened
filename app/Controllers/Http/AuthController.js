'use strict'


const {validate} = use('Validator');


class AuthController {
    async auth({request,response,auth}){
        let output = { status:1 };
       
        const user_validation = await validate (request.all(), {
           username: 'required|alpha_numeric',
           password: 'required|min:3' 
        });
    if(user_validation.fails() ) {
        output.messages = user_validation.messages();
return output;

    }

const {username, password} = request.all();


try {
await auth.attempt(username,password + 'blog');
} catch (error) {
    console.log(username);
    console.log('Wrong pass');
    console.log(error);
return output;

}
console.log('You are now logged in!');
output.status = 2;
return output;

    }


    async logout({ auth, response}) {
auth.logout();
response.redirect('/');
console.log('Logged out')

    }
}

module.exports = AuthController
