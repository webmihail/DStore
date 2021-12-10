import { RolesTypes } from '../constants';

export const roleTypeMatchExpression = (roleTypes: typeof RolesTypes) => {
  return `^${Object.values(roleTypes)
    .filter((v) => typeof v !== 'number')
    .join('|')}$`;
};
