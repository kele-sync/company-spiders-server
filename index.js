const logger = require('./utils/logger')
const yellowPage = require('./birds/yellowPage')
const weibo = require('./birds/weibo')



async function birdFly(params) {
    // 黄页爬虫
    // await yellowPage.init();
    // await yellowPage.startFind()
    weibo()
}

birdFly()