const fs = require('fs');
const util = require('util');

const { parseMarkdata } = require('./parser.js');

const filePath = './example/data.md';
const fileText = fs.readFileSync(filePath, 'utf8');

const result = parseMarkdata(fileText);
console.log(util.inspect(result, false, null, true));
console.log(result);
