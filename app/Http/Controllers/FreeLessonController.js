'use strict';

class FreeLessonController {

  * index(request, response) {
    const data = [
      {
        type: 'free-lessons',
        attributes: {
          title: 'Foo',
        },
      },
    ];

    response.json({ data });
  }

}

module.exports = FreeLessonController;
