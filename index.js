const logger = require('./utils/logger')
const yellowPage = require('./birds/yellowPage')
const MCrawler = require('./birds/company')




async function birdFly(params) {
    // 黄页爬虫
    await yellowPage.init();
    await yellowPage.startByCrawler()
}
birdFly()