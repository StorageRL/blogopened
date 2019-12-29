

'use strict'

const Model = use('Model')

class Post extends Model {
    static get table(){
        return 'posts';
    }

author() {

    return this.hasOne('App/Models/User','uid','id');

}

}

module.exports = Post