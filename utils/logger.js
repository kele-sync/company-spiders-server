const log4js = require('log4js')

log4js.configure({
  appenders: {
    cheese: {
      type: 'dateFile',
      filename: 'logs/alice',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: { default: { appenders: ['cheese'], level: 'info' } },
});
const logger = log4js.getLogger();
//将console.log绑定到logger
// console.log = logger.info.bind(log4js.getLogger('console'));

module.exports = logger
