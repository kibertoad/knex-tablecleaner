const chai = require('chai');
const { assert, expect } = chai;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const tableCleaner = require('../src/tablecleaner');

const dbConfig = require('./utils/TestDatabaseConfigs').SQLITE_CONFIG;
const dbInitializer = require('./utils/db.initializer');

describe('tablecleaner', () => {
	let knex;
	before(() => {
		knex = dbInitializer.initialize(dbConfig);
		return dbInitializer.createDb(knex);
	});
	beforeEach(() => {
		return dbInitializer.cleanDb(knex);
	});
	after(async () => {
		await dbInitializer.dropDb(knex);
		await knex.destroy();
	});

	it('happy path', async () => {
		await tableCleaner.cleanTables(knex, ['models']);
	});

	it('handles error correctly', async () => {
		await expect(tableCleaner.cleanTables(knex, ['models2'])).to.be.rejectedWith(/delete from `models2` - SQLITE_ERROR: no such table: models2/);
	});
});