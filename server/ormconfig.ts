import { ConnectionOptions } from 'typeorm';
import * as path from 'path';
import settings from 'settings';

const typeOrmConfig: ConnectionOptions = {
  type: settings.db.type as any,
  port: Number(settings.db.port),
  password: settings.db.password,
  username: settings.db.username,
  database: settings.db.database,
  host: settings.db.host,
  entities: [path.join(__dirname, './src/**/entity/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, './src/dbMigrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/dbMigrations',
  },
  synchronize: true,
};

module.exports = typeOrmConfig;
