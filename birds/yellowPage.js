const Nest = require('../database/Nest')
const { mongo } = require('../config')
const database = {
  name: "Company",
  url: "http://b2b.huangye88.com/gongsi/company"
}


module.exports = {
  init() {
    this.initBirdNest()
  },
  async initBirdNest() {
    const bird = new Nest(mongo.url, database.name);
    await bird.connectDatabase()
    const schema = bird.createSchema({
      name: String,
      age: Number
    });
    const model = bird.createModel("huangye", schema);
    model.create({ name: "kele", age: 28 }, (err, row) => {
      if (err) {
        console.log(err);

      }
      console.log(row);


    })

  }
};
