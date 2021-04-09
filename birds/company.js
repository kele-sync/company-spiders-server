'use strict'

// 爬虫工具库 MCrawler.js

const Crawler = require('crawler')



class MCrawler {
  constructor(newConfig, callback) {
    this.c = this.createCrawler(newConfig, callback)
  }

  /**
 * 初始化爬虫配置
 * @param {object} newConfig 可参考 github Crawer官方配置
 */
  createCrawler (newConfig, cb) {
    let config = Object.assign({
      headers: {   // 加入请求报头模拟浏览器请求防止被封IP
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.4295.400'
      },
      maxConnections: 5,
      jQuery: true
    }, newConfig)
    return new Crawler({
      headers: config.headers,
      jQuery: config.jQuery,
      maxConnections: config.maxConnections, // 并发数量
      // This will be called for each crawled page
      callback (error, res, done) {
        if (cb) {
          cb(error, res, done)
        }
        if (error) {
          console.log(error)
        }
        done()
      }
    })
  }
  /**
  * 开始爬取数据
  * @param {*} requestUrl
  * @returns {Promise}   返回一个promise
  */
  startCrawer (requestUrl) {
    return new Promise((resolve, reject) => {
      this.c.queue([
        {
          uri: requestUrl,
          jQuery: true,
          callback (error, res, done) {
            if (error) {
              console.log('爬虫错误', error)
              done()
              reject(error)
            } else {
              let $ = res.$
              done()
              resolve($)
            }
          }
        }
      ])
    })
  }
}
module.exports = MCrawler



