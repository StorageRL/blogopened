'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class GuestOnly {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request,auth,response }, next) {

try {
await auth.check()

}catch{
console.log('Mode: Guest');
await next()
return null;
}

response.redirect('/');
    // call next to advance the request
    
  }
}

module.exports = GuestOnly
