const chai = require('chai');
const { expect } = chai;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const tableCleaner = require('../src/tablecleaner');
const dbInitializer = require('./utils/dbInitializer');

const { getAllDbs, getKnexForDb } = require('./utils/knexInstanceProvider');
const {
  isPostgreSQL,
  isMysql,
  isSQLite,
  isMssql,
} = require('./utils/dbHelpers');

describe('tablecleaner', () => {
  describe('cleanTables', () => {
    getAllDbs().forEach((db) => {
      describe(db, () => {
        let knex;
        before(() => {
          knex = getKnexForDb(db);
        });

        after(() => {
          return knex.destroy();
        });

        beforeEach(async () => {
          await dbInitializer.createDb(knex);
        });

        afterEach(async () => {
          await dbInitializer.dropDb(knex);
        });

        it('supports array of tables', async () => {
          await knex('models').insert({});
          await knex('models').insert({});
          const entriesBeforeClean = await knex('models').select();
          expect(entriesBeforeClean.length).to.equal(2);

          await tableCleaner.cleanTables(knex, ['models']);

          const entriesAfterClean = await knex('models').select();
          expect(entriesAfterClean.length).to.equal(0);
        });

        it('supports single table', async () => {
          await knex('models').insert({});
          await knex('models').insert({});
          const entriesBeforeClean = await knex('models').select();
          expect(entriesBeforeClean.length).to.equal(2);

          await tableCleaner.cleanTables(knex, 'models');

          const entriesAfterClean = await knex('models').select();
          expect(entriesAfterClean.length).to.equal(0);
        });

        it('handles error correctly', async () => {
          let errorRegex = getErrorRegexForDb(knex);
          await expect(
            tableCleaner.cleanTables(knex, ['models2'])
          ).to.be.rejectedWith(errorRegex);
        });
      });
    });
  });
});

function getErrorRegexForDb(knex) {
  if (isSQLite(knex)) {
    return /delete from `models2` - SQLITE_ERROR: no such table: models2/;
  }

  if (isPostgreSQL(knex)) {
    return /delete from "models2" - relation "models2" does not exist/;
  }

  if (isMssql(knex)) {
    return /Invalid object name/;
  }

  if (isMysql(knex)) {
    return /Table 'knex_test.models2' doesn't exist/;
  }
}
