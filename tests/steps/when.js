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
    this.request.method = method;
    this.request.url = url;
  });

  this.When('have type {type:stringInDoubleQuotes}', function* (type) {
    this.request.type = type;
  });

  this.When('have attribute {key:stringInDoubleQuotes} with value {value:stringInDoubleQuotes}', function* (key, value) {
    this.request.attributes[key] = value;
  });

  this.When('have attribute {key:stringInDoubleQuotes} clone value of attribute {cloneKey:stringInDoubleQuotes}', function* (key, cloneKey) {
    this.request.attributes[key] = this.request.attributes[cloneKey];
  });

  this.When('have faker attribute {key:stringInDoubleQuotes} from {fakerType:stringInDoubleQuotes}', function* (key, fakerType) {
    const fake = dot.pick(fakerType, faker);
    const value = fake();

    this.request.attributes[key] = value;
  });

  this.When('send request', function* () {
    try {
      console.log(`SENDING: ${this.request.method} - ${this.server.host}${this.request.url}`);

      const options = {
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/json',
        },
        method: this.request.method,
        body: JSON.stringify({
          data: {
            type: this.request.type,
            attributes: this.request.attributes,
          },
        }),
      };

      if (this.request.method === 'GET') {
        delete options.body;
      }

      this.response = yield fetch(`${this.server.host}${this.request.url}`, options);
      const extra = this.response.clone();

      this.responseText = yield extra.text();
      this.responseJson = yield this.response.json();
    } catch (e) {
      console.log(e);

      this.responseError = e;
    }
  });
};
