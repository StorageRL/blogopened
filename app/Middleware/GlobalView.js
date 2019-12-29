'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Category = use('App/Models/Category');


class GlobalView {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle (context, next) {
const categories = await Category.all();
context.view.share({
  categories: categories.toJSON()
});
    // call next to advance the request
    await next()
  }
}

module.exports = GlobalView
