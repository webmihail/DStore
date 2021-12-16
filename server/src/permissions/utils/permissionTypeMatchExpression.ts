import { Permissions } from '../constants';

export const permissionTypeMatchExpression = (
  roleTypes: typeof Permissions,
) => {
  return `^${Object.values(roleTypes)
    .filter((v) => typeof v !== 'number')
    .join('|')}$`;
};
