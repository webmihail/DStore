export const enumTypeMatchExpression = (enumTypes) => {
  return `^${Object.values(enumTypes)
    .filter((value) => typeof value !== 'number')
    .join('|')}$`;
};
