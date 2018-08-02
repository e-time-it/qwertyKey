var mongoose = require('mongoose');
var dbConfig = require('./database-local');

class Database {
  constructor() {
    this._connect()
  }
  _connect() {
    mongoose.connect(`mongodb://${dbConfig.dbuser}:${dbConfig.dbpass}@${dbConfig.server}/${dbConfig.database}`, { useNewUrlParser: true })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error('Database connection error;', err);
      });
  }
}
module.exports = new Database();
