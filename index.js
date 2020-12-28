const tableCleaner = require('./src/tablecleaner');

/**
 * These export configurations enable JS and TS developers
 * to consume tableCleaner in whatever way best suits their needs.
 * Some examples of supported import syntax includes:
 * - `const tableCleaner = require('knex-tablecleaner')`
 * - `const { tableCleaner } = require('knex-tablecleaner')`
 * - `import * as tableCleaner from 'knex-tablecleaner'`
 * - `import { tableCleaner } from 'knex-tablecleaner'`
 * - `import tableCleaner from 'knex-tablecleaner'`
 */
tableCleaner.tableCleaner = tableCleaner;
tableCleaner.default = tableCleaner;
module.exports = tableCleaner;
