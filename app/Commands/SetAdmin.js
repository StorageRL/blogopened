'use strict'

const { Command } = require('@adonisjs/ace')
const User = use('App/Models/User')

class SetAdmin extends Command {
  static get signature () {
    return 'set:admin'
  }

  static get description () {
    return 'Give a selected user admin privileges'
  }

  async handle (args, options) {
    this.info('Please wait!')

    const username = await this.ask(
"What is the user's username?"

    );
    const user_info = await User.findBy('username',username);
    user_info.is_admin = 2;

    try {
      await user_info.save();
      this.success('Success!');
    }catch (err) {
      this.error(err);

    }
  }
}

module.exports = SetAdmin
