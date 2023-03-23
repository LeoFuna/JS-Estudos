import DatabaseBuilder from "./AbstractDataBuilder";

export default class MysqlBuilder extends DatabaseBuilder {
  constructor() {
    super();
    this.configs.dialect = 'mysql';
  }

  build(): void {
    console.log('Conectando ao banco MySQL...');
    this.setDatabase('mystore')
    this.setHost('localhost')
    this.setPassword('secret')
    this.setPort(3000)
    this.setUsername('leofuna')
    console.log(this.configs)
  }
}