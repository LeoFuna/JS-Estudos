const rewiremock = require('./../src/rewiremock.cjs.js')
const assert = require('assert')

// poderia estar em outro arquivo
const dbData = [{ name: 'Joao' }, { name: 'Maria' }]
class MockDatabase {
  connect = () => this
  find = async (query) => dbData
}
// poderia estar em outro arquivo

rewiremock(() => require('./../src/util/database')).with(MockDatabase)

;(async () => {
  {
    // AQUI ESTAMOS MOCKANDO E PORTANTO NAO ESTAMOS BATENDO NO "BD"
    const expected = [{ name: 'JOAO' }, { name: 'MARIA' }]
    rewiremock.enable()
    const UserFactory = require('../src/factory/userFactory.js')   
    const userService = await UserFactory.createInstance()
    const result = await userService.find()
    assert.deepStrictEqual(result, expected)
    rewiremock.disable()
  }
  {
    // AQUI NAO ESTAMOS MOCKANDO, ENTAO ESTAMOS BATENDO NO "BANCO DE DADOS"
    const expected = [{ name: 'LEONARDO' }]
    const UserFactory = require('../src/factory/userFactory.js')   
    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()
    assert.deepStrictEqual(result, expected)
  }
})()