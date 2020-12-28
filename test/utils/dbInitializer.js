const { tableCleaner } = require('../../');

const DEFAULT_TABLES = ['models'];

function dropDb(knex) {
  return knex.schema.dropTableIfExists('models');
}

function createDb(knex) {
  return knex.schema.createTableIfNotExists(`models`, function (table) {
    table.increments('id');
    table.string('name');
    table.string('surname');
    table.string('description');
  });
}

function cleanDb(knex) {
  return _cleanTables(knex);
}

function _cleanTables(knex, tables = DEFAULT_TABLES) {
  return dbCleaner.cleanTables(knex, tables);
}

module.exports = {
  cleanDb,
  createDb,
  dropDb,
};
