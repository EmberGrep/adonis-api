const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Slide extends JsonApiView {
  get attributes() {
    return ['content'];
  }

  reason() {
    return this.belongsTo('App/Http/JsonApiViews/Reason', {
      included: true,
      excludeRelation: 'slides'
    });
  }

}

module.exports = Slide;
