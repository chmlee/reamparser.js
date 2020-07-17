import fs from 'fs';
import util from 'util';
import { MdFile } from './src/markdata.js';

const filePath = './example/eu.md';
const fileText = fs.readFileSync(filePath, 'utf8');

const mdFile = new MdFile(fileText);
const tree = mdFile.toTree();
console.log(mdFile.toCSV());
