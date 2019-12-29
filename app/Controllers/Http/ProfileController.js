'use strict'
const {validate} = use("Validator");
const User = use("App/Models/User");
const Post = use('App/Models/Post');



class ProfileController {
async profile({request,params, view}) {
    const profile = await User.findBy(
'username', params.username
    );
const current_page = parseInt(request.input('p',1));
const user_posts = await Post.query()
.with('author')
.with('cat')
.where('uid', profile.id)
.orderBy('id','desc')
.paginate(current_page,6);


return view.render('author', {
 user: profile,
 posts: user_posts.toJSON()   
});
}




    async edit_page({view,auth}) {
const user_info = await auth.getUser();


return view.render('edit-profile', {
    user: user_info
});
    }

async update({auth,request}) {
    let output = {status:1};
    const profile_validation = await validate(request.all(),{
        'bio' : 'required|max:500|string',
        
        });
        
        if (profile_validation.fails()) {
        output.messages = comment_validation.messages();
        return output;
        
        }
const user = await auth.getUser();
user.bio = request.input('bio');

await user.save();
output.status = 2;
return output;
}

}

module.exports = ProfileController
