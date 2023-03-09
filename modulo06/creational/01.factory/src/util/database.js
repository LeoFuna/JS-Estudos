// Aqui simulamos uma ORM que faz sua conexão com o Banco de Dados
class Database {
  constructor({ connectionString }) {
    this.connectionString = connectionString
  }

  async sleep(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms)
    })
  }

  async connect() {
    await this.sleep(100)
    return this
  }

  async find(query) {
    // para simular um BD
    await this.sleep(100)
    // if (query === 'Leonardo') {
      return [{ name: 'Leonardo' }]
    // }
    // return []
  }
}

module.exports = Database