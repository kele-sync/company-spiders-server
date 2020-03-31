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
  data: {
    model: null
  },
  async init() {
    await this.initBirdNest()
  },
  async initBirdNest() {
    const bird = new Nest(mongo.url, database.name);
    await bird.connectDatabase()
    const schema = bird.createSchema(database.collection);
    this.data.model = bird.createModel("huangye", schema);
    console.log(this.data.model);

  },
  createCompanyInfo(collection) {
    console.log(this.data.model);

    return new Promise((resolve, reject) => {
      this.data.model.create(collection, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    });
  },

};
