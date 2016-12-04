const isGenerator = require('is-generator');
const co = require('co');

module.exports = function () {
  this.setDefinitionFunctionWrapper((fn) => {
    if (isGenerator.fn(fn)) {
      return co.wrap(fn);
    } else {
      return fn;
    }
  });
};
