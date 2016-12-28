'use strict';

const Schema = use('Schema');

class LessonSchema extends Schema {

  up() {
    this.create('lessons', (table) => {
      table.increments();
      table.string('title');
      table.text('description');
      table.text('lesson_notes');
      table.string('slug');
      // table.integer('course_id')
      //   .references('courses.id');
      table.integer('position');
      table.timestamp('released_at');
      table.boolean('free');
      table.timestamps();
    });
  }

  down() {
    this.drop('lessons');
  }

}

module.exports = LessonSchema;
