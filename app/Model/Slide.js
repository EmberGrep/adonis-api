'use strict'

const Lucid = use('Lucid')

class Slide extends Lucid {


  reason() {
    return this.belongsTo('App/Model/Reason', 'id', 'reason_id');
  }
}

module.exports = Slide
