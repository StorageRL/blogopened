'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.integer('is_admin').defaultTo(1);
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('is_admin');
    })
  }
}

module.exports = UsersSchema
