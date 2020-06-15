const db = require("../database/connection");

function find() {
  return db("users").select("id", "username").orderBy("id");
}
function findById(id) {
  return db("users").where({ id }).first();
}
function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}
async function add(newUser) {
  try {
    //This is cool
    const [id] = await db("users").insert(newUser, "id");
    return findById(id);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  find,
  findBy,
  findById,
  add,
};
