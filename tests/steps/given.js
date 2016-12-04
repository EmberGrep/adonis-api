const bootstrap = require('./support/bootstrap');

module.exports = function () {
  this.Given(/^A Fresh App$/, function* () {
    yield this.ace.call('migration:refresh', [], {});

    this.server.listen(process.env.HOST, process.env.PORT);
    this.server.host = `http://${process.env.HOST}:${process.env.PORT}`;
  });

  this.Given('Seed the {table:stringInDoubleQuotes} table with data', function* (table, data) {
    const Database = use('Database');

    yield Database.table(table).insert(data.hashes());
  });

  this.Before(function* () {
    const { server, ace, Database, Event, Helpers, app } = yield bootstrap();

    this.app = app;
    this.server = server;
    this.ace = ace;
    this.Database = Database;
    this.Event = Event;
    this.Helpers = Helpers;
  });

  this.After(function () {
    if (this.server) {
      this.server.getInstance().close();
    }
  });
};
