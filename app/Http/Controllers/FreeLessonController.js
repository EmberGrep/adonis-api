'use strict';

const Lesson = use('App/Model/Lesson');

class FreeLessonController {

  * index(request, response) {
    const data = yield Lesson.all();

    response.jsonApi('FreeLesson', data);
  }

}

module.exports = FreeLessonController;
