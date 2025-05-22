const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY;
const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "meta-llama/llama-3.3-8b-instruct:free";


async function transliterate(text) {
    const prompt = `${text}`;

    try {
        const response = await axios.post(
            OPENROUTER_ENDPOINT,
            {
                model: MODEL,
                messages: [{ role: "user", content: prompt }]
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost",
                    "X-Title": "Transliteration Script"
                }
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (err) {
        console.error("Error during API call:", err.response?.data || err.message);
        return null;
    }
}

async function process_file(category) {
    const inputPath = path.join(__dirname, `./data/cleaned/${category}.txt`);
    const outputPath = path.join(__dirname, `./data/transliterate/${category}.txt`);

    try {
        const data = await fs.readFile(inputPath, { encoding: 'utf-8' });

        const sentences = data
            .split(/(?<=।)\s*/)
            .map(s => s.trim())
            .filter(s => s.length > 0);

        const romanSentences = [];
        const sentenceIndexes = [];

        for (let i = 0; i < sentences.length; i++) {
            if (/[a-zA-Z]/.test(sentences[i])) {
                romanSentences.push(sentences[i]);
                sentenceIndexes.push(i);
            }
        }

        if (romanSentences.length === 0) {
            await fs.writeFile(outputPath, sentences.join('\n'), { encoding: 'utf-8' });
            return;
        }

        const batchSize = 30;
        let transliteratedLines = [];

        for (let i = 0; i < romanSentences.length; i += batchSize) {
            const batch = romanSentences.slice(i, i + batchSize);
            const batchPrompt = `Transliterate the following sentences to Hindi. Return only the transliterated Hindi sentences in the same order. Do not number or bullet the sentences. Do not include any explanation or extra text. Only return the final Hindi sentences, each on a new line.\n\n${batch.join('\n')}`;
            const result = await transliterate(batchPrompt);

            if (result) {
                transliteratedLines.push(...result.split('\n').filter(Boolean));
            } else {
                transliteratedLines.push(...batch);
            }
        }

        if (transliteratedLines.length !== romanSentences.length) {
            console.warn(`⚠️ Mismatch in sentence counts for ${category}.`);
        }

        sentenceIndexes.forEach((index, i) => {
            let updated = transliteratedLines[i] || romanSentences[i];
            if (!updated.trim().endsWith("।")) updated += "।";
            sentences[index] = updated;
        });

        const finalText = sentences.map(s => s.trim()).join('\n');
        await fs.writeFile(outputPath, finalText, { encoding: 'utf-8' });
    } catch (err) {
        console.error(`Error processing ${category}:`, err.message);
    }
}


function is_Roman(word) {
    return /^[a-zA-Z]+$/.test(word);
}

async function code_mix(category) {
    const input_path = path.join(__dirname, `./data/cleaned/${category}.txt`);

    try {
        const data = await fs.readFile(input_path, 'utf-8');
        const words = data.split(/\s+/).map(w => w.replace(/[.,!?;:()"'-]/g, '').toLowerCase());
        const unique_words = new Set(words.filter(Boolean));

        let mix_count = 0;

        for (const word of unique_words) {
            if (is_Roman(word)) mix_count++;
        }

        const percentage = ((mix_count / unique_words.size) * 100).toFixed(2);

        console.log(`analytics      [${category}]`);
        console.log(`   Total Vocabulary: ${unique_words.size}`);
        console.log(`   Code-Mixed Words: ${mix_count}`);
        console.log(`   Code-Mixed %     : ${percentage}%\n`);
    } catch (err) {
        console.error(`Error analyzing ${category}:`, err.message);
    }
}


async function main() {
    const docs = ['sports','tech','opinion'];

    for (const doc of docs) {
        await process_file(doc);
        await code_mix(doc);
    }
}

main();
