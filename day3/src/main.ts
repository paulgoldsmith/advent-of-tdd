import { EngineSchematic } from "./EngineSchematic.js";
import minimist from 'minimist';
import fs from "fs";
import path from "path";
import readline from "readline";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

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

const readInterface = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, '..', '..', schematicDocumentFileInput))
});

let schematicInput = '';
for await (const line of readInterface){
     schematicInput += line;
}

const engineSchematic = new EngineSchematic(schematicInput);
console.log(`The schematic sum value is ${engineSchematic.sum()}`);