const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = `https://www.bhaskar.com/tech-auto`

async function scrape() {
    try {
        const { data } = await axios.get(url);
        const scrape_data = cheerio.load(data);

        const articles = [];

        scrape_data('a').each((_, element) => {
            const link = scrape_data(element).attr('href');
            if (link && link.includes('/tech-auto/')) {
                articles.push(`https://www.bhaskar.com${link}`);
            }
        });

        const uniquearticles = [...new Set(articles)].slice(0, 10);
        //console.log(uniquearticles);

        for (let i = 0; i < uniquearticles.length; i++) {
            const { data:article_data } = await axios.get(uniquearticles[i]);
            const scrape_article_data = cheerio.load(article_data);

            //console.log(article_data);

            const content = scrape_article_data('article p')
                .map((_, element) => scrape_article_data(element).text().trim())
                .get()
                .join('\n');

            fs.appendFileSync('../data/raw/tech_raw.txt', content + '\n');
        }

    } catch (err) {
        console.log(err);
    }
}

scrape();