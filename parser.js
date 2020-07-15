const re = require('./grammar.js');

// Line Class
class MdFile {
  constructor(text) {
    this.fileText = text;
    this.fileArray = [''].concat(this.fileText.split(/\r?\n/));
    this.level = 0;
    this.lineIndex = 1;
    this.fileMaxIndex = this.fileArray.length - 1;
  }

  placeholder() {
    this.lineIndex += 0;
  }

  lineRaw(j = this.lineIndex) {
    return this.fileArray[j];
  }

  lineToken(j = this.lineIndex) {
    if (this.lineRaw(j) === '' || j > this.fileMaxIndex) return 'x';
    const [token] = this.lineRaw(j).match(/[^\s]+/);
    return token;
  }

  nextLine() {
    this.lineIndex += 1;
    while (!/\S/.test(this.lineRaw())) {
      this.lineIndex += 1;
      if (this.lineIndex > this.fileMaxIndex) {
        break;
      }
    }
  }

  undoNextLine() {
    this.lineIndex -= 1;
    while (!/\S/.test(this.lineRaw())) {
      this.lineIndex -= 1;
      if (this.lineIndex > this.fileMaxIndex) {
        break;
      }
    }
  }

  parseEntry() {
    // check if Entry
    if (this.lineToken() === '#'.repeat(this.level + 1)) {
      if (!/\w/.test(this.lineRaw())) throw Error('Entry must have name!');
      const entryName = this.lineRaw().match(/ *#+ *([\w+ ]+[^ ])/)[1];
      this.nextLine();

      // check variable
      const variables = [];
      while (this.lineToken() === '-') {
        const variable = this.parseVariable(this.lineRaw());
        variables.push(variable);
        this.nextLine();
      }

      // check subEntry
      const subEntries = [];
      this.level += 1;
      while (this.lineToken() === '#'.repeat(this.level + 1)) {
        const subEntry = this.parseEntry();
        subEntries.push(subEntry);
        // this.nextLine();
      }
      this.level -= 1;
      return {
        type: 'entry',
        name: entryName,
        variables,
        subEntries,
      };
    }
    return null;
  }

  parseVariable(string) {
    const [, key, valueRaw] = string.match(re.VARIABLE);
    const value = this.parseValue(valueRaw.trim());
    const variable = { type: 'variable', key, value };
    this.placeholder();
    return variable;
  }

  parseValue(valueRaw) {
    const value = this.parseList(valueRaw)
               ?? this.parseNumber(valueRaw)
               ?? this.parseString(valueRaw);
    const comment = this.parseComment();
    value.comment = comment;
    return value;
  }

  parseList(valueRaw) {
    if (valueRaw === '') {
      // check token for the fist non-trivial line
      let j = this.lineIndex + 1;
      while (this.lineRaw(j).trim() === '') {
        j += 1;
      }
      if (this.lineToken(j) !== '*') throw Error('Variable must have value!');
      // loop throuh all list item
      this.lineIndex = j;
      const content = [];
      while (this.lineToken() === '*') {
        const item = this.parseValue(this.lineRaw().match(/ *\* *([\S+ ]+[^ ])/)[1]);
        content.push(item);
        this.nextLine();
      }
      this.undoNextLine();
      return { type: 'list', subtype: '', content };
    }
    return null;
  }

  parseNumber(valueRaw) {
    this.placeholder();
    if (valueRaw[0] === '$' && valueRaw[valueRaw.length - 1] === '$') {
      // TODO: add number syntax checking
      // return string type if false
      const [, content] = valueRaw.match(/\$(.*)\$/);
      return { type: 'number', subtype: '', content };
    }
    return null;
  }

  parseString(valueRaw) {
    this.placeholder();
    const content = valueRaw.trim();
    return { type: 'string', subtype: '', content };
  }

  parseComment() {
    // check token for the fist non-trivial line
    let j = this.lineIndex + 1;
    while (j < this.fileMaxIndex && this.lineRaw(j).trim() === '') {
      j += 1;
    }
    if (this.lineToken(j) !== '>') return '';
    this.lineIndex = j;
    const comment = this.lineRaw().match(/ *> *([\S+ ]+[^ ])/)[1];
    return comment;
  }
}

function parseMarkdata(fileText) {
  const md = new MdFile(fileText);
  return md.parseEntry();
}

exports.parseMarkdata = parseMarkdata;
exports.MdFile = MdFile;
