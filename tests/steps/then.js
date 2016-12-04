const assert = require('chai').assert;
const dot = require('dot-object');

module.exports = function () {
  this.Then('I get JSON API Result', function* () {
    assert.ok(this.response.ok,
      `The response should send a success status, but sent "${this.response.status}"`);

    assert.property(this.responseJson, 'data',
      'The response should have a "data" key in the JSON body.');
  });

  this.Then('I get JSON API Error', function* () {
    assert.notOk(this.response.ok,
      `The response should send an error status, but sent "${this.response.status}"`);

    assert.property(this.responseJson, 'errors',
      'The response should have a "errors" key in the JSON body.');
  });

  this.Then('with attribute {key:stringInDoubleQuotes} matching request attribute {requestKey:stringInDoubleQuotes}', function* (key, requestKey) {
    const value = dot.pick(requestKey, this.request.attributes);

    assert.deepPropertyVal(this.responseJson.data.attributes, key, value);
  });

  this.Then('with error title {message:stringInDoubleQuotes}', function* (message) {
    assert.propertyVal(this.responseJson.errors[0], 'title', message,
        `Expected the error title to say "${message}", but got "${this.responseJson.errors[0].title}"`);
  });

  this.Then('with error detail {message:stringInDoubleQuotes}', function* (message) {
    assert.propertyVal(this.responseJson.errors[0], 'detail', message,
        `Expected the error detail to say "${message}", but got "${this.responseJson.errors[0].detail}"`);
  });
};
