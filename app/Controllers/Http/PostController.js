'use strict'

const Post = use('App/Models/Post');


class PostController {
async page({params , view}) {
    const single_post = await Post.find(params.id);

    await single_post.load('author');

  return view.render('single_post', {
 post : single_post.toJSON()

  });
}
}
module.exports = PostController
