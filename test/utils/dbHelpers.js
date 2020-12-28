function isPostgreSQL(knex) {
  return knex.client.driverName === 'pg';
}

function isMssql(knex) {
  return knex.client.driverName === 'mssql';
}

function isMysql(knex) {
  return /mysql/i.test(knex.client.driverName);
}

function isSQLite(knex) {
  return knex.client.driverName === 'sqlite3';
}

module.exports = {
  isMssql,
  isMysql,
  isPostgreSQL,
  isSQLite,
};
