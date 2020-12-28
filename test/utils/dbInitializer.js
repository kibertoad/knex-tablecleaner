async function dropDb(knex) {
  await knex.schema.dropTable('models');
  await knex.schema.dropTable('models2');
}

async function createDb(knex) {
  await knex.schema.createTable(`models`, function (table) {
    table.increments('id');
    table.string('name');
    table.string('surname');
    table.string('description');
  });

  await knex.schema.createTable(`models2`, function (table) {
    table.increments('id');
    table.string('name');
    table.string('surname');
    table.string('description');
  });
}

module.exports = {
  createDb,
  dropDb,
};
