require("dotenv").config()
module.exports = {
  "development": {
    "username": process.env.DBUser,
    "password": process.env.DBpass,
    "database": process.env.DBname,
    "host": process.env.DBhost,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
