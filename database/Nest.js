const mongoose = require('mongoose')
const logger = require('../utils/logger')

class Nest {
  constructor(table) {
    this.db = mongoose.connect('mongodb://47.103.4.143:27017/' + table, { useNewUrlParser: true });
    this.connection = mongoose.connection;
    this.mongoose = mongoose;
    this.connection.on('error', err => {
      logger.error('mongodb err:' + err)
    })
  }
}

module.exports = Nest;