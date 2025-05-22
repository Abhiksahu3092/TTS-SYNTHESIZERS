const fs = require('fs');

const webregex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
const phoneregex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9,12}$/g;
const streetregex = /\d{1,3}\s+\w+\s+(road|street|lane|marg|nagar|sector|block)/gi;
const noiseSymbolsRegex = /[_\-\.]{3,}/g;

const raw_data = fs.readFileSync('../data/raw/tech.txt', 'utf8');

const all_sentences = raw_data
  .split('।')
  .map(sentence => sentence.trim())
  .filter(sentence => sentence.length > 0);

const cleaned = [];
const junk = [];

for (let sentence of all_sentences) {
  sentence = sentence.replace(webregex, 'website');
  sentence = sentence.replace(noiseSymbolsRegex, '');
  sentence = sentence.trim();

  const isjunk = phoneregex.test(sentence) || streetregex.test(sentence);

  if (isjunk) {
    junk.push(sentence);
  } else {
    cleaned.push(sentence);
  }
}

fs.writeFileSync('../data/cleaned/tech_clean.txt', cleaned.join('।\n'), 'utf8');
fs.writeFileSync('../data/junk/tech_junk.txt', junk.join('।\n'), 'utf8');
