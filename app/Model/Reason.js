'use strict'

const Lucid = use('Lucid')

class Reason extends Lucid {


  slides() {
    return this.hasMany('App/Model/Slide', 'id', 'reason_id');
  }
}

module.exports = Reason
