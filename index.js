
const logger = require('./utils/logger')
const yellowPage = require('./birds/yellowPage')

yellowPage.init()

yellowPage.createCompanyInfo({
  name: 'String',
  setUpTime: Date.now(),
  business: 'String',
  address: 'String',
  callNumber: 123,
  phone: 'String'
})
