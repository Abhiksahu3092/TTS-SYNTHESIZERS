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

## 📌 Project Workflow

### 1. 📰 Data Mining

- **Source:** Scraped Hindi newspaper (Dainik Bhaskar) for three major categories:
  - Sports
  - Technology
  - Opinion articles
- **Storage:** Saved raw data in the subdirectory `data/raw/`:
  - `sports_raw.txt`
  - `tech_raw.txt`
  - `opinion_raw.txt`

---

### 2. 🧹 Data Cleaning

- **Sentence Splitting:** 
  - Used `।` (Poorna-Viram) as the delimiter to split sentences.
- **Punctuation Handling:** 
  - Preserved other punctuation like commas, exclamation marks, semi-colons, etc.
- **Regex Filters Applied:**
  - Replaced web URLs with the word **`website`**
  - Removed sentences with:
    - Long phone numbers
    - Junk data (e.g., street addresses)
- **Storage:**
  - Cleaned data → `data/cleaned/`
  - Junk sentences → `data/junk/`

---

### 3. 🔤 Transliteration (Roman → Devanagari)

- **Model Used:** Free LLaMA model via **OpenRouter API**
- **Script:** `open_router.js`
- **Functionality:** 
  - Transliterates Roman-script Hindi to Devanagari
  - Outputs saved to `data/transliterate/`

---

### 4. 🔎 Code-Mixing Estimation

- **Approach:**
  - Before transliteration, calculated the percentage of Roman-script (code-mixed) words per sentence.
- **Analytics Output:**
  - Percentage of code-mixed words
  - Total vs unique vocabulary size
  - Total code-mixed words
- **Visibility:** 
  - Displayed in terminal during script execution


## 🚀 How to Run the Pipeline

### 1. Clone this repository into your local machine

### 2. 📦 Install Dependencies

```bash
npm install axios dotenv
```

### 3. Create a .env file in the root directory
```bash
OPENROUTER_API_KEY=your_api_key_here
```

### 4. 📰 Scrape Data
```bash
cd scrapper
node opinion_scrapper.js
node sports_scrapper.js
node tech_scrapper.js
cd ..
```

### 5. 🧹 Clean the Data
```bash
cd cleaner
node opinion_cleaner.js
node sports_cleaner.js
node tech_cleaner.js
cd ..
```

### 6. 🔤 Transliterate Using LLaMA via OpenRouter
```bash
node open_router.js
```