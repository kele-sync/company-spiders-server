const mongoose = require('mongoose')
const logger = require('../utils/logger')

class Nest {
  constructor(mongoUrl, collection) {
    this.collection = collection;
    this.mongoUrl = mongoUrl;
  };
  connectDatabase() {
    return new Promise((resolve, reject) => {
      mongoose.connect(this.mongoUrl + this.collection, { useNewUrlParser: true, useUnifiedTopology: true });
      const connection = mongoose.connection;
      connection.once('open', () => {
        resolve(connection)
      });
      connection.on('error', err => {
        logger.error("mongodb err:" + err);
        reject()
      })
    });
  };
  createSchema(schema) {
    return mongoose.Schema(schema)
  };
  createModel(name, schema) {
    return mongoose.model(name, schema)
  }
}

module.exports = Nest;