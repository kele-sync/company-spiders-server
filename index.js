const puppeteer = require('puppeteer')
const mongoose = require('mongoose')
const Nest = require('./database/Nest')
const logger = require('./utils/logger')

const company = new Nest("Company");
company.connection.once('open', err => {
  if (err) {
    logger.error("mongodb connect fail:" + err)
  }
  //建表
  const CompanySchema = new mongoose.Schema({
    name: { type: String },
    setup: { type: String },
    product: { type: String },
    address: { type: String },
    person: { type: String },
    phone: { type: String },
  })

  const CompanyData = mongoose.model("CompanyData", CompanySchema);
  const kele = {
    name: 'kele',
    age: 29
  }

  Users.create(kele, (err, small) => {
    if (err) {
      console.log(err);
    }

  })
})





