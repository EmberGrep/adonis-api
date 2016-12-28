const assert = require('chai').assert;
const dot = require('dot-object');
const numeral = require('numeral');

module.exports = function () {
  this.Then('I get JSON API Result', function* () {
    assert.ok(this.response,
      `No response was sent for url "${this.request.url}" for method "${this.request.method}".`);

    assert.ok(this.response.ok,
      `The response should send a success status, but sent "${this.response.status}".`);

    assert.property(this.responseJson, 'data',
      'The response should have a "data" key in the JSON body.');
  });

  this.Then('I get a JSON API Collection Result', function* () {
    assert.ok(this.response,
      `No response was sent for url "${this.request.url}" for method "${this.request.method}".`);

    assert.ok(this.response.ok,
      `The response should send a success status, but sent "${this.response.status}".`);

    assert.property(this.responseJson, 'data',
      'The response should have a "data" key in the JSON body.');

    assert.isArray(this.responseJson.data,
      'The response "data" key should contain a collection.');
  });

  this.Then('the {positionish:stringInDoubleQuotes} item has an attribute {key:stringInDoubleQuotes} with the value {value:stringInDoubleQuotes}', function* (positionish, key, value) {
    const position = numeral(positionish).value() - 1;

    assert.isObject(this.responseJson.data[position],
      `The response should have an object in the "${positionish}" place of the "data" collection.`);

    assert.deepPropertyVal(this.responseJson.data[position].attributes, key, value);
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
