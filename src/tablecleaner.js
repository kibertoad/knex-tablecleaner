/**
 * Created by IgorSavin on 8/25/2016.
 */

let async = require('async');

function Tablecleaner() {
}

/**
 *
 * @param knex - instance of a knex
 * @param tableNames - array of strings
 */
Tablecleaner.prototype.cleanTables = function (knex, tableNames) {
  return new Promise((resolve, reject) => {
    let commands = [];
    for (x in tableNames) {
      tableName = tableNames[x];
      commands.push(makeCleanTableCommand(knex, tableName));
    }

    async.series(commands, function (err, results) {
      resolve();
    });

  });
};

function makeCleanTableCommand(knex, tableName) {
  return function (callback) {
    console.log('Deleting all rows from table ' + tableName);
    return knex(tableName).del().then(function (result) {
      console.log('Done deleting. Deleted: ' + result);
      callback(null, result);
    });
  }
}

module.exports = Tablecleaner;