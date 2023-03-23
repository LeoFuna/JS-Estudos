import DatabaseBuilder from "./AbstractDataBuilder";

export default class PostgresBuilder extends DatabaseBuilder {
  constructor() {
    super();
    this.configs.dialect = 'postgres';
  }

  build(): void {
    console.log('Conectando ao banco Postgress...');
    this.setDatabase('db2')
    this.setHost('localhost')
    this.setPassword('newsecret')
    this.setPort(3001)
    this.setUsername('leofuna')
    console.log(this.configs)
  }
}