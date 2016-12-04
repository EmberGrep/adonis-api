const http = require('../../bootstrap/http');

module.exports = function () {
  this.Given(/^A Fresh App$/, function* () {
    this.server = {
      host: 'http://localhost:3333',
    };
  });
};
