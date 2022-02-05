const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = 8000;

const app = express();

const url = 'https://www.theguardian.com/uk';

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        const article = []

        $('.fc-item__title', html).each(function() {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            article.push({
                title,
                url
            })
        })
        console.log(article);
    }).catch(err => console.log(err));

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
