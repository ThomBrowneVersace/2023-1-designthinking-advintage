const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async (keyword) => {
    try {
        return await axios.get('https://jinjja-seoul.com/mytheme/68');
    } catch(err) {
        console.log(err);
    }
}

const parsing = async (keyword) => {
    const html = await getHTML();
    const $ = cheerio.load(html.data);
    const shopList = $(".list_item");

    shopList.each((idx, node) => {
        const title = $(node).find('.place_address').text();
        console.log(title);
    })
    console.log(shopList.text());
}

parsing();