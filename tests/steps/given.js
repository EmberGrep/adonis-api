const http = require('../../bootstrap/http');
// const Database =  use('Database');

module.exports = function () {
  this.Given(/^A Fresh App$/, function* () {
    this.server = {
      host: 'http://localhost:3333',
    };
  });

  this.Given('Seed the {table:stringInDoubleQuotes} table with data', function* (table, data) {
    // yield Database.table(table).insert(data.hashes());
  });
};
