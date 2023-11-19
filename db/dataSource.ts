import { DataSource, DataSourceOptions } from 'typeorm';

console.log('node', process.env.NODE_ENV);

import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  logging: process.env.DATABASE_LOGGING === 'true',
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
