// import { Name } from "./Name.js";
// import minimist from 'minimist';
// import fs from "fs";
// import path from "path";
// import readline from "readline";
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// let calibrationDocumentFileInput;
// try {
//     calibrationDocumentFileInput = minimist(process.argv.slice(2))['_'][0];
//     if (calibrationDocumentFileInput.length < 1) {
//         throw 'Filename is invalid';
//     }
// } catch (e) {
//     console.error(e);
//     process.exit(1);
// }

// const readInterface = readline.createInterface({
//   input: fs.createReadStream(path.join(__dirname, '..', '..', calibrationDocumentFileInput))
// });

// const document = new Name();
// for await (const line of readInterface){
//     document.addLine(line);
// }

// console.log(`The calibrated document value is ${document.sum()}`);