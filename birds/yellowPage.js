const puppeteer = require('puppeteer')
const Nest = require('../database/Nest')
const { mongo } = require('../config')
const logger = require('../utils/logger')

const database = {
  name: "Company",
  collection: {
    name: String,
    setUpTime: Date,
    business: String,
    address: String,
    connectUser: String,
    callNumber: String,
  }
}


module.exports = {
  data: {
    model: null,
    url: "http://b2b.huangye88.com/gongsi/company",
    page: null
  },
  init() {
    return this.initBirdNest()
  },
  async initBirdNest() {
    const bird = new Nest(mongo.url, database.name);
    await bird.connectDatabase()
    const schema = bird.createSchema(database.collection);
    this.data.model = bird.createModel("huangye", schema);
  },
  createCompanyInfo(collection) {
    return new Promise((resolve, reject) => {
      this.data.model.create(collection, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    });
  },
  async searchPage(page) {
    const domMap = {
      name: "body > div.cont > div.c-left > div:nth-child(1) > div.l-content > ul:nth-child(1) > li",
      setUpTime: "body > div.cont > div.c-left > div:nth-child(1) > div.l-content > ul:nth-child(2) > li:nth-child(1)",
      business: "body > div.cont > div.c-left > div:nth-child(1) > div.l-content > ul:nth-child(2) > li.contro-num",
      address: "body > div.cont > div.c-left > div:nth-child(1) > div.l-content > ul:nth-child(2) > li:nth-child(3)",
      connectUser: "body > div.cont > div.c-left > div:nth-child(2) > div.l-content > ul > li:nth-child(1)",
      callNumber: "body > div.cont > div.c-left > div:nth-child(2) > div.l-content > ul > li:nth-child(3)",
    }
    const url = this.data.url + page + '/';
    await this.data.page.goto(url, { timeout: 5000 });
    await this.data.page.waitFor(10);
    const result = await this.data.page.evaluate((domMap) => {
      const information = {};
      for (const key in domMap) {
        const dom = document.querySelector(domMap[key]);
        if (dom) {
          let info = dom.innerHTML;
          switch (key) {
            case 'setUpTime':
              info = info.split("：")[1].split("-").join('/')
              break;
            case 'business':
              info = info.split("：")[1]
              break;
            case 'address':
              info = info.match(/公司地址：(.+)<a/)[1]
              break;
            case 'connectUser':
              info = info.split("label>")[2]
              break;
            case 'callNumber':
              info = info.split("label>")[2]
              break;
            default:
              break;
          }
          information[key] = info
        }
      }
      if (Object.keys(information).length) {

        return information
      } else {
        return false
      }

    }, domMap);
    return result

  },
  async startFind() {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    this.data.page = await browser.newPage();
    let page = 1
    while (true) {
      try {
        console.log(page);

        let info = await this.searchPage(page++)
        if (info) {
          console.log(info);

          this.createCompanyInfo(info)
        }
      } catch (error) {
        page++;
        logger.error(error)

      }
    }

  }

};
