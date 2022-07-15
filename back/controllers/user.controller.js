const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

//create user
exports.createUser = (req, res) => {
    console.log('creating user');
    console.log(req.body);
    const userData = new UserModel(req.body);
    if(userData != undefined) {
        if (
          req.body.constructor === Object &&
          Object.keys(req.body).length === 0
        ) {
          res
            .send(400)
            .send({ success: false, message: "Please fill all fields" });
        }else {
          //----
          //check if username exist
          UserModel.getUser(userData.username, (err, user) => {
            if (err) {
              res.json({ auth: false, message: err });
            }else if(user.length === 0) {// username is not used
              UserModel.createUser(userData, (err, user) => {
                if (err) res.json({ auth: false, message: err });
                if (user) {
                  res.json({
                    status: true,
                    message: "You are successfully registred!",
                    user: user,
                  });
                }
              });
            }else {
              res.json({
                status: false,
                message: "This username is already used. Try with another",
              });
            }
          });
          //----
          
        }
    }
};

//login
exports.toLogin = (req, res) => {
  UserModel.getUserByMailPwd(req.body.username, req.body.userPassword, (err, user) => {
    if (err) {
      res.json({ auth: false, message: err });
    }else if(user) {

      const token = jwt.sign({
        username: user[0].username,
        idUser: user[0].idUser
      }, "jwtSecret", {expiresIn: '1h'});

      res.json({auth: true, token: token, user: user})
    }
  });
};

//is user authenticate
exports.isUserAuth = (req, res) => {
  UserModel.getUser(req.username, (err, user) => {
    if (err) res.json({ auth: false, message: err });
    if (user.length === 1) {
      console.log("single user", user);
      res.json({ auth: true, user: user });
    }
  });
};