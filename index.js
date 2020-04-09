
const logger = require('./utils/logger')
const yellowPage = require('./birds/yellowPage')

yellowPage.init().then(() => {
  yellowPage.startFind()
}).catch((err) => {

});

