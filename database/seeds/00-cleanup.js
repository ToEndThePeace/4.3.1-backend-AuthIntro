const cleaner = require("knex-cleaner");

function cleanTables(knex) {
  return cleaner
    .clean(knex, {
      mode: "truncate",
      restartIdentity: true, //index reset for postgresql
      ignoreTables: ["knex_migrations", "knex_migrations_lock"],
    })
    .then(() => console.log(" == Tables truncated and ready to seed == "));
}

exports.seed = function (knex) {
  // Deletes ALL existing entries
  if (knex.client.config.client === "sqlite3") {
    return knex.raw("PRAGMA foreign_keys = OFF;").then(() => cleanTables(knex));
  } else {
    return cleanTables(knex);
  }
};
