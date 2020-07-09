/* eslint max-classes-per-file: ["error", 2] */
const fs = require('fs');
const util = require('util');

const filePath = './example/data.md';

class File {
  constructor(path) {
    this.path = path;
    this.text = fs.readFileSync(filePath, 'utf8');
    this.array_raw = this.text.split(/\r?\n/);
    this.array = this.array_raw.slice(0, this.array_raw.length - 1);
    this.max = this.array.length - 1;
    this.level = 1;
  }
}

class Line extends File {
  constructor(path) {
    super(path);
    this.i = 0;
  }

  next() {
    this.i += 1;
    while (this.raw() === '' && this.i < this.max) {
      this.i += 1;
    }
    if (this.i > this.max) {
      this.i = -1;
    }
  }

  back() {
    this.i -= 1;
  }

  raw(j = this.i) {
    return this.array[j];
  }

  token(j = this.i) {
    const [token] = this.raw(j).match(/[^\s]+/);
    return token;
  }

  tokenLevel() {
    return this.token().length;
  }

  string(j = this.i) {
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
console.log(line.string())
line.next()
console.log(line.i)
console.log(line.raw())
console.log(line.token())
console.log(line.string())
line.next()
console.log(line.i)
console.log(line.raw())
console.log(line.token())
console.log(line.string())
line.next()
console.log(line.i)
console.log('a')
console.log(line.raw())
console.log('b')
console.log(line.token())
console.log('c')
console.log(line.string())
line.next()
console.log(line.i)
console.log(line.raw())
console.log(line.token())
console.log(line.string())
*/

// const regexVariable = /^ *- *(\b[ *\w]+\b) *: *(\b[ *\w]+\b) *$/;
const regexVariable = /(\b[ *\w]+\b) *: *(\b[ *\w]+\b) *$/;

function parseMarkdata(line) {
  function parseVariable(string) {
    const [, key, value] = string.match(regexVariable);
    const variable = { type: 'variable', key, value };
    return variable;
  }

  function parseEntry() {
    if (line.token() === '#'.repeat(line.level)) {
      const entryName = line.string();

      line.next(); // check variable
      const content = [];
      while (line.i > 0 && line.token() === '-') { // variable
        const variable = parseVariable(line.string());
        content.push(variable);
        line.next();
      }

      line.levelAdd(); // check subEntry
      // console.log(line.level, (line.i + 1));
      while (line.i > 0 && line.token() === '#'.repeat(line.level)) {
        const subEntry = parseEntry();

        /* check if entry exist */
        /*
        let add = false;
        for (let i = 0; i < content.length; i += 1) {
          if (content[i].type === 'entry' && content[i].name === subEntry.name) {
            content[i].content.push(subEntry.content[0]);
            add = true;
            break;
          }
        }
        if (!add) {
          content.push(subEntry);
        }
        */
        content.push(subEntry);
        line.next();
      }
      line.back();
      line.levelMinus();

      const entry = { type: 'entry', name: entryName, content };
      return entry;
    }
  }

  return parseEntry();
}

const line = new Line(filePath);
const result = parseMarkdata(line);
console.log(util.inspect(result, false, null, true));
