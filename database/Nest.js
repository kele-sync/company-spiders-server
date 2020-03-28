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


// const db = mongoose.connect('mongodb://47.103.4.143:27017/egg', { useNewUrlParser: true });
// const con = mongoose.connection;
// con.on('error', err => {
//   logger.error('mongodb disconnect:' + err)
// })
// con.once('open', res => {
//   logger.info('mongodb already connect')
// })
// module.exports = { mongoose, db, con };
module.exports = Nest;