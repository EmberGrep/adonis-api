'use strict';

const User = use('App/Model/User');

const Hash = use('Hash');
const attributes = ['email', 'password', 'password-confirmation'];

class UserController {

  get createRules() {
    return {
      email: 'required|email|unique:users',
      password: 'required|confirmed',
    };
  }

  get createMessages() {
    return {
      'email.unique': 'That email has already been used by another account',
    };
  }

  * index(request, response) {
    const users = yield User.with().fetch();

    response.jsonApi('User', users);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);

    yield request.jsonApi.assertValid(input, this.createRules, this.createMessages);

    input.password = yield Hash.make(input.password);
    const foreignKeys = {
    };
    const user = yield User.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('User', user);
  }

  * show(request, response) {
    const id = request.param('id');
    const user = yield User.with().where({ id }).firstOrFail();

    response.jsonApi('User', user);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const user = yield User.with().where({ id }).firstOrFail();
    user.fill(Object.assign({}, input, foreignKeys));
    yield user.save();

    response.jsonApi('User', user);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const user = yield User.query().where({ id }).firstOrFail();
    yield user.delete();

    response.status(204).send();
  }

}

module.exports = UserController;
