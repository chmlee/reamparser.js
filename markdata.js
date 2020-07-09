/* eslint max-classes-per-file: ["error", 2] */
const fs = require('fs');

const filePath = './example/data.md';

class File {
  constructor(path) {
    this.path = path;
    this.text = fs.readFileSync(filePath, 'utf8');
    this.array = this.text.split(/\r?\n/);
    this.max = this.array.length;
  }
}

class Line extends File {
  constructor(path) {
    super(path);
    this.i = 0;
  }

  next() {
    this.i += 1;
  }

  raw(j = this.i) {
    return this.array[j];
  }

  token(j = this.i) {
    let token;
    try {
      [token] = this.raw(j).match(/[^\s]+/);
    } catch (err) {
      this.i = -1;
    }
    return token;
  }

  content(j = this.i) {
    return this.raw(j).slice(this.token().length + 1).trim();
  }
}

/*
const line = new Line(filePath);
console.log(line.raw())
console.log(line.token())
console.log(line.content())
line.next()
console.log(line.raw())
console.log(line.token())
console.log(line.content())
line.next()
console.log(line.raw())
console.log(line.token())
console.log(line.content())
line.next()
*/

// const regexVariable = /^ *- *(\b[ *\w]+\b) *: *(\b[ *\w]+\b) *$/;
const regexVariable = /(\b[ *\w]+\b) *: *(\b[ *\w]+\b) *$/;

function parseWrapper(line) {
  function parseVariable() {
    const [, key, value] = line.content().match(regexVariable);
    return { type: 'variable', key, value };
  }

  function parseEntry() {
    if (line.token()[0] === '#') { // check entry header
      const entry = { type: 'entry', name: line.content(), content: [] };
      line.next();
      while (line.token() === '-') {
        const result = parseVariable();
        entry.content.push(result);
        line.next();
      }
      return entry;
    }
    return null;
  }

  function parse() {
    const result = parseEntry();
    return result;
  }

  return parse();
}

const line = new Line(filePath);
const result = parseWrapper(line);
console.log(result);
