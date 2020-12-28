# knex-tablecleaner

Simple library for deleting all rows from a given list of DB tables.
Tables are cleaned sequentially in a given order, to avoid foreign key constraint violations.

Example usage:

```js
const tableCleaner = require('knex-tablecleaner');
const knex = require('../db'); // pre-initialized instance of knex

const defaultTablesToClean = [
  'orders',
  'users'
];

function cleanDb(tablesToClean = defaultTablesToClean) {
  return tableCleaner.cleanTables(knex, tablesToClean);
}

module.exports = {
  cleanDb,
};
```

## Parameters

`function cleanTables(knex, tableNames, verboseLog = false)` accepts following parameters:
* `knex` - pre-initialized knex instance that will be used for accessing the database;
* `tableNames` - either a string with a table name, or an array of strings with table names;
* `verboseLog` - if set to true, will log a list of cleaned tables and a completion log message.

