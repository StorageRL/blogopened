'use strict'

const Post                  =   use( 'App/Models/Post' );

class HomeController {
    async index({ view, request }){
        const current_page  =   parseInt( request.input( 'p', 1 ) );
        const posts         =   await Post.query()
        .with('author')
            .orderBy( 'id', 'desc' )
            .paginate( current_page, 4 );

        // return posts;
        // console.log( posts );

        return view.render( 'home', {
            posts:              posts.toJSON()
        });
    }
}

module.exports = HomeController
