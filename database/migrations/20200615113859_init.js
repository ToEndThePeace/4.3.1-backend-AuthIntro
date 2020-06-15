exports.up = function (knex) {
  return knex.schema.createTable("users", (t) => {
    t.increments();
    t.string("username", 256).notNullable().unique().index();
    t.string("password", 256).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
