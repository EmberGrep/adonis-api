const isGenerator = require('is-generator');
const Promise = require('bluebird');

module.exports = function () {
  this.setDefinitionFunctionWrapper((fn) => {
    if (isGenerator.fn(fn)) {
      return Promise.coroutine(fn);
    } else {
      return fn;
    }
  });
};
