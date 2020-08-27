const fs = require('fs');
const util = require('util');

const libPath = `${__dirname}/../src/markdata.js`;
const { MdFile } = require(libPath);

const filePath = '../benchmark/input/b1.md';
const fileText = fs.readFileSync(filePath, 'utf8');

const mdFile = new MdFile(fileText);
const tree = mdFile.toTree();
console.log(mdFile.toCSV());
console.log(console.log(util.inspect(mdFile.toCSV(), false, null, true /* enable colors */)))
