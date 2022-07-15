const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const UserController = require('../controllers/user.controller');

//route to create user
router.post('/create', UserController.createUser);

//route to login
router.post('/login', UserController.toLogin);

//decode the token
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.json({ auth: false, message: "Yo we need token" });
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "you failed to authenticate jwt" });
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
};

//route to verify authentication
router.get("/isUserAuth", verifyJWT, UserController.isUserAuth);

module.exports = router;