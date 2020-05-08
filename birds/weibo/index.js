const login = require('./login')

const config = {
    username: "15151317576",
    password: 'chj993220'
}


module.exports = async function init() {
    await login(config)
    console.log("已经转到页面");

};