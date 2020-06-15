const router = require("express").Router();
const cryp = require("bcryptjs");
const Users = require("../users/usersModel");

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = cryp.hashSync(password, rounds);
  Users.add({ username, password: hash })
    .then((user) => {
      res.status(201).json({ message: `Welcome, ${user.username}!` });
    })
    .catch((err) => {
      res.status(500).json({ message: "Unable to complete registration." });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  Users.findBy({ username })
    .then(([user]) => {
      if (user && cryp.compareSync(password, user.password)) {
        req.session.user = { id: user.id, username: user.username };
        res.status(204).end();
      } else res.status(401).json({ message: "Invalid password" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Invalid username" });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) res.status(500).json({ message: "Could not log out." });
      else res.status(204).end();
    });
  } else {
    res.status(204).end();
  }
});

module.exports = router;
