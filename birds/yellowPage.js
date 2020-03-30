const Nest = require('../database/Nest')
const { mongo } = require('../config')
const database = {
  name: "Company",
  url: "http://b2b.huangye88.com/gongsi/company",
  collection: {
    name: String,
    setUpTime: Date,
    business: String,
    address: String,
    callNumber: Number,
    phone: String
  }
}


module.exports = {

  init() {
    this.initBirdNest()
  },
  async initBirdNest() {
    const bird = new Nest(mongo.url, database.name);
    await bird.connectDatabase()
    const schema = bird.createSchema(database.collection);
    const model = bird.createModel("huangye", schema);


  }
};
