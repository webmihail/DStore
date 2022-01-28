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
  'SWAGGER_ON',

  'SUPERADMIN_FIRST_NAME',
  'SUPERADMIN_LAST_NAME',
  'SUPERADMIN_EMAIL',
  'SUPERADMIN_PASSWORD',
  'SUPERADMIN_PHONE',
  'SUPERADMIN_ROLE_NAME',
  'SUPERADMIN_ROLE_DESCRIPTION',
  'SUPERADMIN_ROLE_PERMISSION_NAME',
  'SUPERADMIN_ROLE_PERMISSION_DESCRIPTION',

  'JWT_ACCESS_SECRET',
  'JWT_ACCESS_EXPIRATION_TIME',
  'JWT_REFRESH_SECRET',
  'JWT_REFRESH_EXPIRATION_TIME',
  'JWT_VERIFICATION_TOKEN_SECRET',
  'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',

  'EMAIL_CONFIRMATION_URL',
  'EMAIL_SERVICE',
  'EMAIL_USER',
  'EMAIL_PASSWORD',

  'TELEGRAM_BOT_ID',
  'TELEGRAM_CHAT_ID',

  'AWS_REGION',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_PUBLIC_BUCKET_NAME',
  'AWS_BUKET_ACL',
  'AWS_BUKET_FOLDER',
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
    isSwaggerOn: process.env.SWAGGER_ON === 'true',
  },
  superadmin: {
    firstName: process.env.SUPERADMIN_FIRST_NAME,
    lastName: process.env.SUPERADMIN_LAST_NAME,
    email: process.env.SUPERADMIN_EMAIL,
    password: process.env.SUPERADMIN_PASSWORD,
    phone: process.env.SUPERADMIN_PHONE,
    roleName: process.env.SUPERADMIN_ROLE_NAME,
    roleDescription: process.env.SUPERADMIN_ROLE_DESCRIPTION,
    permissionName: process.env.SUPERADMIN_ROLE_PERMISSION_NAME,
    permissionDescription: process.env.SUPERADMIN_ROLE_PERMISSION_DESCRIPTION,
  },
  jwtProps: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpirationTime: process.env.JWT_ACCESS_EXPIRATION_TIME,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpirationTime: process.env.JWT_REFRESH_EXPIRATION_TIME,
    verificationSecret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
    verificationExpirationTime:
      process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME,
  },
  email: {
    confirmationUrl: process.env.EMAIL_CONFIRMATION_URL,
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
  telegram: {
    botId: process.env.TELEGRAM_BOT_ID,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
  awsStoreS3: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    publicBucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
    acl: process.env.AWS_BUKET_ACL,
    folder: process.env.AWS_BUKET_FOLDER,
  },
};

export default settings;
