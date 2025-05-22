📰 Hindi Newspaper Data Mining and Code-Mixing Analysis

This project involves mining and analyzing Hindi-language newspaper content across three categories: sports, technology, and opinion. It focuses on sentence extraction, basic text cleaning, transliteration, and estimating code-mixing levels.

## Project Structure
├── cleaner/
│   ├── opinion_cleaner.js       
│   ├── sports_cleaner.js        
│   └── tech_cleaner.js         
├── data/
│   ├── raw/
│   │   └── opinion_raw.txt
│   │   └── sports_raw.txt
│   │   └── tech_raw.txt
│   ├── cleaned/
│   │   └── opinion_clean.txt
│   │   └── sports_clean.txt
│   │   └── tech_clean.txt
│   ├── junk/
│   │   └── opinion_junk.txt
│   │   └── sports_junk.txt
│   │   └── tech_junk.txt
│   └── transliterate/
│       └── opinion_dev.txt
│       └── sports_dev.txt
│       └── tech_dev.txt
├── scrapper/
│   ├── opinion_scrapper.js       
│   ├── sports_scrapper.js        
│   └── tech_scrapper.js         
├── .gitignore
├── open_router.js
├── data.zip 
└── README.md
