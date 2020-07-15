const fs = require('fs');
const { MdFile, parseMarkdata } = require('./parser.js');
const util = require('util');

const filePath = './example/test.md';
const fileText = fs.readFileSync(filePath, 'utf8');

const mdFile = new MdFile(fileText);

console.log(mdFile.fileArray)
result = parseMarkdata(fileText);
console.log(util.inspect(result, false, null, true));
