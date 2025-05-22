📰 Hindi Newspaper Data Mining and Code-Mixing Analysis

This project involves mining and analyzing Hindi-language newspaper content across three categories: sports, technology, and opinion. It focuses on sentence extraction, basic text cleaning, transliteration, and estimating code-mixing levels.

## Project Structure
```bash
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
```

## Tasks Completed
1. Data mining - <br>
    (i). Scraping hindi newspaper( Bhaskar) for 3 major category i.e Sports, technology and opinion articles.<br>
    (ii). Saved the raw data in subdirectory "raw" inside the parent directory "data"<br>
<br>
2. Data cleaning -<br>
    (i). Split sentences using । (poorna-viram) as a delimiter.<br>
    (ii). Preserved all other punctuation (commas, exclamations, etc.)<br>
    (iii). Applied regex filters to:<br>
        (a). Replace web URLs with the word "website"<br>
        (b). Remove sentences with phone numbers or junk (e.g., street addresses)<br>
        (c). Saved the cleaned data in subdirectory "cleaned" and junk data in subidirectory "junk" inside the parent directory "data"<br>
<br>
3. Transliteration (Roman → Devanagari) - <br>
    (i). Used OpenRouter API with a free LLaMA model<br>
    (ii). Transliterated roman sentences into Devanagari script<br>
4. Code-Mixing Estimation -<br>
    (i). After transliteration, we calculated the percentage of Roman-script (code-mixed) words in each sentence before conversion.<br>
    (ii). Various analytics such as percentage of code-mixing, no. of unique words and code-mixed words will be available in terminal while running the script<br>