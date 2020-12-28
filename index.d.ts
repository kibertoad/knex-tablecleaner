import Knex = require('knex');

declare const tableCleaner: {
  cleanTables: (
    knex: Knex,
    tableNames: string | string[],
    verboseLog?: boolean
  ) => Promise<void>;
};

export default tableCleaner;
export { tableCleaner };
