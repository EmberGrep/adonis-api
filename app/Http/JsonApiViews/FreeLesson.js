const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class FreeLesson extends JsonApiView {
  get attributes() {
    return ['title', 'description', 'lesson_notes', 'slug', 'position', 'released_at'];
  }

  // Course() {
  //   return this.belongsTo('App/Http/JsonApiViews/Course', {
  //     included: true,
  //     excludeRelation: 'freeLessons'
  //   });
  // }

}

module.exports = FreeLesson;
