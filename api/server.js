// Bring in dependencies
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// Initialize Server
const server = express();

// Bring in helpers
const session = require("./session");

server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(session);

// Routers
const usersRouter = require("../users/usersRouter");
const authRouter = require("../auth/authRouter");
const requiresAuth = require("../auth/requiresAuth");
server.use("/api/users", requiresAuth, usersRouter);
server.use("/auth", authRouter);

// Test Endpoint
server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

// Server Export
module.exports = server;
