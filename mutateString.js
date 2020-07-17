function mutateString(valueRaw) {
  const content = valueRaw.trim();
  return { type: 'string', subtype: '', content };
}

function mutateNumber(valueRaw) {
  if (valueRaw[0] === '$' && valueRaw[valueRaw.length - 1] === '$') {
    // TODO: add number syntax checking
    // return string type if false
    const [, content] = valueRaw.match(/\$(.*)\$/);
    return { type: 'number', subtype: '', content };
  }
  return null;
}

module.exports = {
  mutateString,
  mutateNumber,
};
