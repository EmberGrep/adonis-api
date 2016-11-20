const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Reason extends JsonApiView {
  get attributes() {
    return ['title', 'number'];
  }

  slides() {
    return this.hasMany('App/Http/JsonApiViews/Slide', {
      included: true,
      excludeRelation: 'reason',
    });
  }

}

module.exports = Reason;
