'use strict';

const Lucid = use('Lucid');
const _ = require('underscore');

class User extends Lucid {

  apiTokens() {
    return this.hasMany('App/Model/Token');
  }

  static get unguarded() {
    return false;
  }

  static get fillable() {
    return [
      'email',
      'password',
    ];
  }

  static get guarded() {
    return [];
  }

  isFillable(key) {
    return this.constructor.unguarded ||
      this.constructor.fillable.includes(key) ||
      (this.constructor.fillable.length === 0 && !this.constructor.guarded.includes(key));
  }

  setJSON(values) {
    _.each(values, (value, key) => {
      if (this.isFillable(key)) {
        this.attributes[key] = this.mutateProperty(key, value);
      }
    });
  }

}

module.exports = User;
