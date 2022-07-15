const db = require("../config/db.config");
const bcrypt = require("bcrypt");
const { response } = require("express");

const User = function (user) {
  this.username = user.username;
  this.userPassword = user.userPassword;
};

//search user by username
User.getUser = (username, result) => {
  db.query("SELECT * FROM Users WHERE username=?", username, (err, res) => {
    if (err) {
      console.log("Error while fetching data");
      result(err, null);
    } else if (res) {
      console.log("User fetching successfully");
      result(null, res);
    }
  });
};

//create user
User.createUser = (userData, result) => {
  //hashing password
  bcrypt.hash(userData.userPassword, 8, (err, hash) => {
    if (err) {
      console.log(err);
    } else if (hash) {
      db.query(
        "INSERT INTO Users SET ?",
        { ...userData, userPassword: hash },
        (err, res) => {
          if (err) {
            console.log("Error while inserting data");
            result(err, null);
          } else {
            console.log("User created successfully");
            result(null, res);
          }
        }
      );
    }
  });
};

//for login
User.getUserByMailPwd = (username, pwd, result) => {
  db.query("SELECT * FROM Users where username=?", username, (err, res) => {
    if(err) {
        result("Error while fetching user by username", null);
    }else if(res) {
      if(res.length > 0) {
        bcrypt.compare(pwd, res[0].userPassword, (err, resp) => {
          if(resp) {
            result(null, res);
          }else {
            result("Your username or password don't match", null);
          }
        });
      }else {
            result("User doesn't exist", null);
      }
    }
  });
};

module.exports = User;
