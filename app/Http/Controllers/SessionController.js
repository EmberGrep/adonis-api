'use strict';

const User = use('App/Model/User');
const E = require('node-exceptions');
const Hash = use('Hash');

class SessionController {

  * store(request, response) {
    const { username: email, password } = request.all();

    try {
      const user = yield User.findBy('email', email);
      const passwordValid = yield Hash.verify(password, user.password);

      if (!passwordValid) {
        throw new E();
      }

      const token = yield request.auth.generate(user);
      response.json({ token });
    } catch (e) {
      response.status(401).json({
        errors: [
          {
            status: 401,
            title: 'User failed to log in.',
          },
        ],
      });
    }
  }
}

module.exports = SessionController;
