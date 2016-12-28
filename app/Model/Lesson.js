'use strict'

const Lucid = use('Lucid')

class Lesson extends Lucid {


  Course() {
    return this.belongsTo('App/Model/Course', 'id', 'course_id');
  }
}

module.exports = Lesson
