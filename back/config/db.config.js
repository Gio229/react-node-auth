const mysql = require("mysql");

//setting mysql connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", //<--your user password for the database here
  database: "SimpleAuth"
});

//connect to the database
db.connect((err) => {
    if(err) {
        throw err;
    }else {
        console.log('Database Connected Successfully !');
    }
});

module.exports = db;
