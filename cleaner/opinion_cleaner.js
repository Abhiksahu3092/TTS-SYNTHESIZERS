const fs = require('fs');

const webregex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

const phoneregex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9,12}$/g;
const streetregex = /\d{1,3}\s+\w+\s+(road|street|lane|marg|nagar|sector|block)/gi;

const raw_data = fs.readFileSync('../data/raw/opinion.txt', 'utf8');

const all_sentences = raw_data
    .split('।')
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 0);

const cleaned = [];
const junk = [];

for (const sentence of all_sentences) {
    const changed = sentence.replace(webregex, 'website');

    const isjunk = phoneregex.test(changed) || streetregex.test(changed);
    if(isjunk){
        junk.push(changed);
    }
    else{
        cleaned.push(changed);
    }
}


fs.writeFileSync('../data/cleaned/opinion.txt', cleaned.join('।\n'));
fs.writeFileSync('../data/junk/opinion.txt', junk.join('।\n'));