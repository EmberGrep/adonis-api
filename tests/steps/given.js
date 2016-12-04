const bootstrap = require('./support/bootstrap');


module.exports = function () {
  this.Given(/^A Fresh App$/, function (callback) {
    bootstrap((server) => {
      server.listen(process.env.HOST, process.env.PORT);

      this.server = server;
      this.server.host = `http://${process.env.HOST}:${process.env.PORT}`;

      callback();
    });
  });

  this.Given('Seed the {table:stringInDoubleQuotes} table with data', function* (table, data) {
    const Database = use('Database');

    yield Database.table(table).insert(data.hashes());
  });

  this.After(function () {
    if (this.server) {
      this.server.getInstance().close();
      use('Database').close();
    }
  });
};
