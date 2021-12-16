exports.up = async function (knex) {
  await knex.schema.createTable("stuff", (table) => {
    table.increments("stuff_id");
    table.string("name").notNullable();
    table.boolean("keeping").defaultTo(true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("stuff");
};
