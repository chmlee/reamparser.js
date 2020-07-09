/* eslint max-classes-per-file: ["error", 2] */
const fs = require('fs');

const filePath = './example/data.md';

class File {
  constructor(path) {
    this.path = path;
    this.text = fs.readFileSync(filePath, 'utf8');
    this.array_raw = this.text.split(/\r?\n/);
    this.array = this.array_raw.slice(0, this.array_raw.length - 1);
    this.max = this.array.length;
    this.level = 0;
  }
}

class Line extends File {
  constructor(path) {
    super(path);
    this.i = 0;
  }

  next() {
    this.i += 1;
    while (this.raw === '') {
      this.i += 1;
    }
  }

  raw(j = this.i) {
    return this.array[j];
  }

  token(j = this.i) {
    const [token] = this.raw(j).match(/[^\s]+/);
    return token;
  }

  content(j = this.i) {
    return this.raw(j).slice(this.token().length + 1).trim();
  }

  levelAdd() {
    this.level += 1;
  }

  levelMinus() {
    this.level -= 1;
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
  const parent = { type: 'entry', name: '__top__', content: [] };

  function parseEntry() {
  }

  function parseVariable() {
    if (line.token() === '-') {
      const [, key, value] = line.content().match(regexVariable);
      const result = { type: 'variable', key, value };
      return result;
    }
  }

  function parseLine() {
    while (line.i < line.max) {
      const child = parseEntry() ?? parseVariable();
      parent.content.push(child);
      line.next();
    }
    return parent;
  }

  return parseLine();
}

const line = new Line(filePath);
const result = parseWrapper(line);
console.log(result);
