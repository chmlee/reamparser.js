const re = require('./grammar.js');

// Line Class
class Line {
  constructor(text) {
    this.fileText = text;
    this.arrayRaw = this.fileText.split(/\r?\n/);
    this.array = this.arrayRaw.slice(0, this.arrayRaw.length - 1);
    this.max = this.array.length - 1;
    this.level = 1;
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
    return this.raw(j).trim().slice(this.token().length + 1);
  }

  levelAdd() {
    this.level += 1;
  }

  levelMinus() {
    this.level -= 1;
  }
}

function parseMarkdata(fileText) {
  function parseMarkdataInner(line) {
    function parseString(valueRaw) {
      const content = valueRaw.trim();
      return { type: 'string', subtype: '', content };
    }

    function parseNumber(valueRaw) {
      if (valueRaw[0] === '$' && valueRaw[valueRaw.length - 1] === '$') {
        /* TODO: add number syntax checking
           return string type if false
        */
        const [, content] = valueRaw.match(/\$(.*)\$/);
        return { type: 'number', subtype: '', content };
      }
    }

    function parseList(valueRaw) {
      if (valueRaw === '' && line.token(line.i + 1) === '*') {
        const content = [];
        line.next();
        if (line.token() === '*') {
          while (line.i > 0 && line.token() === '*') {
            const item = parseValue(line.string());
            content.push(item);
            line.next();
          }
          return { type: 'list', subtype: '', content };
        }
      }
    }

    function parseComment() {
      line.next();
      let comment;
      if (line.i > 0 && line.token() === '>') {
        comment = line.string();
      } else {
        comment = '';
        line.back();
      }
      return comment;
    }

    function parseValue(valueRaw) {
      const value = parseList(valueRaw)
                 ?? parseNumber(valueRaw)
                 ?? parseString(valueRaw);
      const comment = parseComment();
      value.comment = comment;
      return value;
    }

    function parseVariable(string) {
      const [, key, valueRaw] = string.match(re.VARIABLE);
      const value = parseValue(valueRaw.trim());
      const variable = { type: 'variable', key, value };
      return variable;
    }

    function parseEntry() {
      if (line.token() === '#'.repeat(line.level)) {
        const entryName = line.string();

        /* check variable */
        line.next();
        const content = [];
        while (line.i > 0 && line.token() === '-') { // variable
          const variable = parseVariable(line.raw());
          content.push(variable);
          line.next();
        }

        /* check subEntry */
        line.levelAdd();
        while (line.i > 0 && line.token() === '#'.repeat(line.level)) {
          const subEntry = parseEntry();
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

  const line = new Line(fileText);
  return parseMarkdataInner(line);
}

exports.parseMarkdata = parseMarkdata;
