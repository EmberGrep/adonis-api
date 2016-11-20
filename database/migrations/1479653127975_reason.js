'use strict';

const Schema = use('Schema');

class ReasonSchema extends Schema {

  up() {
    this.create('reasons', (table) => {
      table.increments();
      table.integer('number');
      table.string('title');

      table.timestamps();
    });
  }

  down() {
    this.drop('reasons');
  }

}

module.exports = ReasonSchema;
