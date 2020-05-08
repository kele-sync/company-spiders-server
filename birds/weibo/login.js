const puppeteer = require('puppeteer')
const { readSyncByRl } = require('../../utils/terminal')


async function startRelease(config) {
    const browser = await puppeteer.launch({ headless: false, slowMo: 25 });
    const page = (await browser.pages())[0];
    await page.setViewport({
        width: 1280,
        height: 800
    });
    await page.goto("https://weibo.com/");
    await page.waitForNavigation();
    await page.type("#loginname", config.username);
    await page.type("#pl_login_form > div > div:nth-child(3) > div.info_list.password > div > input", config.password);
    await page.click("#pl_login_form > div > div:nth-child(3) > div:nth-child(6)");
    //已经点了登录
    await page.waitForNavigation({ timeout: 10 }).then((result) => {
        console.log("already login");

    }).catch(async(err) => {
        await page.waitForSelector("#pl_login_form > div > div:nth-child(3) > div.info_list.verify.clearfix > a > img")
        page.screenshot({
            path: 'public/code.png',
            type: 'png',
            x: 800,
            y: 200,
            width: 100,
            height: 100
        });
        return new Promise((resolve) => {

            readSyncByRl("请输入微博验证码").then(async(code) => {
                await page.type("#pl_login_form > div > div:nth-child(3) > div.info_list.verify.clearfix > div > input", code);
                await page.click("#pl_login_form > div > div:nth-child(3) > div:nth-child(6)");

                await page.waitForNavigation()
                console.log("login");
                // await page.click("#v6_pl_content_publishertop > div > div.func_area.clearfix > div.kind > a:nth-child(2)")
                const btn = await page.waitForSelector("input[type=file]")

                await btn.uploadFile("C:\\Users\\kele\\Desktop\\linshi\\1.jpg");
                await page.type("#v6_pl_content_publishertop > div > div.input > textarea", "hello world");
                await page.click("#v6_pl_content_publishertop > div > div.func_area.clearfix > div.func > a");
            })
        });


    });

}



module.exports = startRelease