'use strict'

const Post                  =   use( 'App/Models/Post' );

class HomeController {
    async index({ view, request, antl }){
        const current_page  =   parseInt( request.input( 'p', 1 ) );
        const posts         =   await Post.query()
        .with('author')
        .with('cat')
            .orderBy( 'id', 'desc' )
            .paginate( current_page, 4 );

        // return posts;
        // console.log( posts );

        return view.render( 'home', {
            posts:              posts.toJSON(),
            messages : {
                newer: antl.get('messages.newer', 'Newer1'),
                older: antl.get('messages.older' , 'Older1')
            }
        });
    }
}

module.exports = HomeController
