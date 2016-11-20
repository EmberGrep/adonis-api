'use strict';

const Schema = use('Schema');

class SlideSchema extends Schema {

  up() {
    this.create('slides', (table) => {
      table.increments();
      table.text('content');
      table.integer('reason_id').references('reasons.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('slides');
  }

}

module.exports = SlideSchema;
