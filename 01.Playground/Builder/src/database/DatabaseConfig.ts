export interface DatabaseConfig {
  port: number;
  host: string;
  username: string;
  password: string;
  database: string;
  dialect: 'postgres' | 'mysql';
}