const async = require('async');

function cleanTables (knex, tableNames) {
	return new Promise((resolve, reject) => {
		let commands = [];
		for (tableName of tableNames) {
			commands.push(_makeCleanTableCommand(knex, tableName));
		}

		async.series(commands, (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results);
			}
		});

	});
}

function _makeCleanTableCommand(knex, tableName) {
	return function (callback) {
		console.log('Deleting all rows from table ' + tableName);
		return knex(tableName).del()
			.then(function (result) {
				console.log('Done deleting. Deleted: ' + result);
				callback(null, result);
			})
			.catch((err) => {
				callback(err);
			});
	}
}

module.exports = {
	cleanTables
};
