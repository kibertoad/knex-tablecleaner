# knex-tablecleaner

Simple library for deleting all rows from a given list of DB tables.

Example usage:

gulp.task('cleanDb', function (cb) {
  var knex = knexHelper.initKnexInstance();
  tableCleaner.cleanTables (knex, ['INBOX', 'MESSAGE', 'MESSAGE_INFO', 'CONTENT'], cb);
});

<...>


var config = require('../config/config');

exports.initKnexInstance = function () {
  console.log('Init db: ' + config.get('DB_USER') + '/<Password omitted>' + '@' + config.get('DB_HOSTNAME') + '/' +
    config.get('DB_DATABASE'));

  return require('knex')({
    client: 'oracledb',
    connection: {
      host: config.get('DB_HOSTNAME'),
      user: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_DATABASE')
    },
    pool: {
      min: 1,
      max: 1
    }
  });
}
