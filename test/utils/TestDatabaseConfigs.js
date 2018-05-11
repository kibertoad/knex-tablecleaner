const os = require('os');
const path = require('path');

const SQLITE_CONFIG = Object.freeze({
	client: 'sqlite3',
	connection: {
		filename: path.join(os.tmpdir(), 'objection_utils_test.db')
	},
	useNullAsDefault: true
});

module.exports = {
	SQLITE_CONFIG
};