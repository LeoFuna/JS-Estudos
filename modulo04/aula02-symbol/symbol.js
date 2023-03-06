const assert = require('assert')

// --- keys
const uniqueKey = Symbol("userName")
const uniqueKey2 = Symbol("userName")
const user = {}

user["userName"] = 'data for normal Objects'
user[uniqueKey] = 'data for Symbol'
user[uniqueKey2] = 'data for Symbol brother'

// console.log('getting normal Objects', user.userName)
// // sempre unico em nivel de endereco de memoria
// console.log('get symbol', user[uniqueKey])
// console.log('get symbol 2', user[uniqueKey2])

assert.deepStrictEqual(user.userName, 'data for normal Objects')
// sempre unico em nivel de endereco de memoria
assert.deepStrictEqual(user[uniqueKey], 'data for Symbol')
assert.deepStrictEqual(user[uniqueKey2], 'data for Symbol brother')
assert.deepStrictEqual(user[Symbol("userName")], undefined)

// Mostra os Symbols do objeto
assert.deepStrictEqual(Object.getOwnPropertySymbols(user), new Array(uniqueKey, uniqueKey2))
// é dificil de pegar, mas nao é secreto!
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// Well known Symbols
const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return  {
        done: this.items.length === 0,
        // remove o ultimo e retorna
        value: this.items.pop()
      }
    }
  })
}

// for (const item of obj) {
//   console.log(item)
// }

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')

class MyDate {
  constructor(...args) {
    this[kItems] = args.map((dateInArray) => new Date(...dateInArray))
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError()

    const itens = this[kItems]
      .map(item => new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric', day: '2-digit' }).format(item))
    
    return itens
  }

  // Estamos sobrescrevendo metodo nativo de iterator colocando algo criado
  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms));
    for (const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }
}

const myDate = new MyDate(
  [2020, 03, 01],
  [2018, 02, 02]
)

const expectedDates = [
  new Date(2020, 03, 01),
  new Date(2018, 02, 02),
];

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object Object]')
// Esse caso verifica se quando tento fazer alguma coercao de tipo se ele estoura o erro setado la na classe
assert.throws(() => myDate + 1)

// coercao explicita para chamar o toPrimitive NÃO ESTA FUNCIONANDO AINDA NAO ENTENDI O MOTIVO
// assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')

assert.deepStrictEqual([...myDate], expectedDates)

// // ;(async () => {
// //   for await(const item of myDate) {
// //     console.log('asyncIterator', item)
// //   }
// // })()

;(async () => {
  const dates = await Promise.all([ ...myDate ])
  assert.deepStrictEqual(dates, expectedDates)
})()