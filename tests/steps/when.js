const dot = require('dot-object');
const faker = require('faker');
const fetch = require('node-fetch');

module.exports = function () {
  this.When('I setup a JSON API Request', function* () {
    this.request = {
      method: 'GET',
      url: '/',
      attributes: {},
      type: '',
    };
  });

  this.When('{method:stringInDoubleQuotes} to {url:stringInDoubleQuotes}', function* (method, url) {
    this.request = Object.assign({}, this.request, { method, url });
  });

  this.When('have type {type:stringInDoubleQuotes}', function* (type) {
    this.request = Object.assign({}, this.request, { type });
  });

  this.When('have faker attribute {key:stringInDoubleQuotes} from {fakerType:stringInDoubleQuotes}', function* (key, fakerType) {
    const fake = dot.pick(fakerType, faker);
    const value = fake();

    this.request.attributes[key] = value;
  });

  this.When('send request', function* () {
    // Write code here that turns the phrase above into concrete actions
    this.response = yield fetch(`${this.server.host}${this.request.url}`, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/json',
      },
      method: this.request.method,
      body: JSON.stringify({
        type: this.request.type,
        attributes: this.request.attributes,
      }),
    });

    this.responseJson = yield this.response.json();
  });
};
