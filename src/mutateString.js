function mutateString(valueRaw) {
  const content = valueRaw.trim();
  return { type: 'string', subtype: '', content };
}

module.exports = {
  mutateString,
};
