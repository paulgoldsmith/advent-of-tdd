import { EngineSchematic } from "./EngineSchematic.js";
import minimist from 'minimist';
import fsSync from "fs";
import { promisify } from "util";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const fs = {
    readdir: promisify(fsSync.readdir),
    readFile: promisify(fsSync.readFile),
    // etc
  };

const __dirname = dirname(fileURLToPath(import.meta.url));

let schematicDocumentFileInput;
try {
    schematicDocumentFileInput = minimist(process.argv.slice(2))['_'][0];
    if (schematicDocumentFileInput.length < 1) {
        throw 'Filename is invalid';
    }
} catch (e) {
    console.error(e);
    process.exit(1);
}

const schematicInput = await fs.readFile(path.join(__dirname, '..', '..', schematicDocumentFileInput), 'utf-8');

const engineSchematic = new EngineSchematic(schematicInput);
console.log(`The schematic sum value is ${engineSchematic.sum()}`);