import { ConnectionOptions } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

const isProduction = process.env.NODE_ENV === 'production';
const requiredEnvVariables = [
  'POSTGRES_PASSWORD',
  'POSTGRES_USER',
  'POSTGRES_DB',
  'POSTGRES_HOST',
  'POSTGRES_PORT',
];

dotenv.config({
  path: !isProduction
    ? path.join(__dirname, `../../.${process.env.NODE_ENV}.env`)
    : path.join(__dirname, `../../.env`),
});

const missingEnvs = requiredEnvVariables.filter((env) => !process.env[env]);

if (missingEnvs.length) {
  throw Error(
    `Please set up necessary env variables: ${missingEnvs.join(', ')}`,
  );
}

const typeOrmConfig: ConnectionOptions = {
  type: 'postgres',
  port: Number(process.env.POSTGRES_PORT),
  password: process.env.POSTGRES_PASSWORD,
  username: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [path.join(__dirname, './src/dbMigrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/dbMigrations',
  },
  synchronize: true,
};

export = typeOrmConfig;
