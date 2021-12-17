import * as path from 'path';
import * as dotenv from 'dotenv';

const isProduction = process.env.NODE_ENV === 'production';
const requiredEnvVariables = [
  'DB_TYPE',
  'POSTGRES_PASSWORD',
  'POSTGRES_USER',
  'POSTGRES_DB',
  'POSTGRES_HOST',
  'POSTGRES_PORT',

  'PORT',
  'API_PREFIX',
  'SWAGGER_PREFIX',

  'SUPERADMIN_FIRST_NAME',
  'SUPERADMIN_LAST_NAME',
  'SUPERADMIN_EMAIL',
  'SUPERADMIN_PASSWORD',
  'SUPERADMIN_ROLE_NAME',
  'SUPERADMIN_ROLE_DESCRIPTION',
  'SUPERADMIN_ROLE_PERMISSION_NAME',
  'SUPERADMIN_ROLE_PERMISSION_DESCRIPTION',
];

dotenv.config({
  path: !isProduction
    ? path.join(__dirname, `../.env-dev`)
    : path.join(__dirname, `../.env`),
});

dotenv.config({
  path: !isProduction
    ? path.join(__dirname, `../../.env-dev`)
    : path.join(__dirname, `../../.env`),
});

const missingEnvs = requiredEnvVariables.filter((env) => !process.env[env]);

if (missingEnvs.length) {
  throw Error(
    `Please set up necessary env variables: ${missingEnvs.join(', ')}`,
  );
}

const settings = {
  db: {
    type: process.env.DB_TYPE,
    port: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_PASSWORD,
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
  },
  server: {
    port: process.env.PORT,
    apiPrefix: process.env.API_PREFIX,
    swaggerPrefix: process.env.SWAGGER_PREFIX,
  },
  superadmin: {
    firstName: process.env.SUPERADMIN_FIRST_NAME,
    lastName: process.env.SUPERADMIN_LAST_NAME,
    email: process.env.SUPERADMIN_EMAIL,
    password: process.env.SUPERADMIN_PASSWORD,
    roleName: process.env.SUPERADMIN_ROLE_NAME,
    roleDescription: process.env.SUPERADMIN_ROLE_DESCRIPTION,
    permissionName: process.env.SUPERADMIN_ROLE_PERMISSION_NAME,
    permissionDescription: process.env.SUPERADMIN_ROLE_PERMISSION_DESCRIPTION,
  },
};

export default settings;
