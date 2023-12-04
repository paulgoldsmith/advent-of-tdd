import minimist from 'minimist';
import fsSync from "fs";
import { promisify } from "util";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { sumScratchcardWins } from './scratchcard.js';

const fs = {
    readdir: promisify(fsSync.readdir),
    readFile: promisify(fsSync.readFile),
    // etc
  };

const __dirname = dirname(fileURLToPath(import.meta.url));

let scratchcardDocumentFileInput;
try {
    scratchcardDocumentFileInput = minimist(process.argv.slice(2))['_'][0];
    if (scratchcardDocumentFileInput.length < 1) {
        throw 'Filename is invalid';
    }
} catch (e) {
    console.error(e);
    process.exit(1);
}

const scratchcardInput = await fs.readFile(path.join(__dirname, '..', '..', scratchcardDocumentFileInput), 'utf-8');

console.log(`The scratchcard sum value for points is ${sumScratchcardWins(scratchcardInput)}`);
console.log(`The scratchcard sum value for extra cards is ${sumScratchcardWins(scratchcardInput, true)}`);