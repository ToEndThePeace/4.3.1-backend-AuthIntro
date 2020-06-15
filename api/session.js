const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const dbConnection = require("../database/connection");

module.exports = session({
  name: "myCookie123",
  secret: process.env.SESSION_SECRET || "my special secret, don't tell a soul!",
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: process.env.COOKIE_SECURE || false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 6000,
  }),
});
