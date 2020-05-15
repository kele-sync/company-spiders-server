var Crawler = require("crawler");
const request = require("request");
const fs = require("fs");
const path = require("path");

function getExpoList(params) {
    return new Promise((resolve, reject) => {
        const c = new Crawler({
            rateLimit: 3000,
            callback: (err, res, done) => {
                if (err) {
                    reject(err)
                }
                let result = []
                let $ = res.$;
                $('#block-generic-collections > ol > li a').each((index, item) => {
                    result.push("https://www.hpcbristol.net" + $(item).attr("href"))
                })
                done()
                resolve(result)
            }
        })
        c.queue("https://www.hpcbristol.net/collections")
    });
}
const downloadImage = (src, dest, callback) => {
    return new Promise((resolve, reject) => {
        try {
            request.head(src, (err, res, body) => {
                if (err) { console.log(err, 123); return }
                src && request(src).pipe(fs.createWriteStream(dest)).on('close', () => {
                    resolve()
                    console.log("over");

                })
            })
        } catch (error) {
            reject()
            console.log(error);

        }
    });
}


function getPages(url) {
    return new Promise((resolve, reject) => {
        const getPageUrls = new Crawler({
            rateLimit: 3000,
            callback: (err, res, done) => {
                if (err) {
                    console.log(err);
                }
                const $ = res.$;
                let pages = []
                pages.push(res.request.uri.href)
                if ($("#block-system-main  ul > li.pager-last.last > a").length) {
                    let page = $("#block-system-main  ul > li.pager-last.last > a").attr('href').split('=')[1];
                    for (let index = 1; index <= page; index++) {
                        pages.push(res.request.uri.href + "?page=" + index);

                    }

                }
                getImageUrls(pages)
                done()
                    // console.log($("#block-system-main  ul > li.pager-last.last > a").attr('href').split('=')[1]);

            }
        })
        getPageUrls.queue(url)
    });
}

function getImageUrls(url) {
    return new Promise((resolve, reject) => {
        const c = new Crawler({
            rateLimit: 1000,
            callback: (err, res, done) => {
                if (err) {
                    reject(err)
                }
                const $ = res.$;
                let result = []
                $("#block-system-main > div > div:nth-child(1) > ul > li.views-row").each((index, value) => {
                    result.push("https://www.hpcbristol.net/sites/default/files/styles/original2/public/image-library/" + $(value).find('.overlay-link').attr('href').split('/')[2] + '.jpg')
                });
                console.log(result);
                result.forEach(img => {
                    downloadImage(img, path.resolve(__dirname, './static/', path.basename(img)))
                })
                done()

            }
        })
        c.queue(url)
    });
}
async function init(params) {
    const expoList = await getExpoList();
    console.log(expoList);

    await getPages(expoList);

    // expoList.forEach(async element => {

    //     page.forEach(async item => {
    //         console.log(item);
    //         const urls = await getImageUrls(item);
    //         urls.forEach(img => {
    //             console.log(img);

    //             downloadImage(img, path.resolve(__dirname, './static/', path.basename(img)))
    //         })

    //     })
    // });
}
init()