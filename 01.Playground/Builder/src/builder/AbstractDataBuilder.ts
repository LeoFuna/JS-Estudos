import { DatabaseConfig } from './../database/DatabaseConfig';

export default abstract class DatabaseBuilder {
  protected configs: DatabaseConfig;

  constructor() {
    this.configs = {
      host: 'localhost',
      database: '',
      port: 3000,
      dialect: 'postgres',
      username: '',
      password: '',
    }
  }

  protected setPort(port: number) {
    this.configs.port = port;
    return this;
  };

  protected setDatabase(database: string): this {
    this.configs.database = database
    return this
  }

  protected setHost(host: string): this {
    this.configs.host = host
    return this
  }

  protected setPassword(password: string): this {
    this.configs.password = password
    return this
  }

  protected setUsername(username: string): this {
    this.configs.username = username
    return this
  }

  abstract build(): void
}
