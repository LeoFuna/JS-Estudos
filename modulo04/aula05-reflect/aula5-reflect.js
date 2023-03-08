'use-strict'

const assert = require('assert')

// garantir semantica e segurança em objetos

// --- apply

const myObject = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

assert.deepStrictEqual(myObject.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// um problema que pode acontecer (raro), alguem subsituir o método princpial no global
// Function.prototype.apply = () => { throw new TypeError('Eita!') }

// esse aqui pode acontecer!
myObject.add.apply = () => { throw new TypeError('Vixi!') }

assert.throws(
  () => myObject.add.apply({}, []),
  { name: 'TypeError', message: 'Vixi!' }
)

// usando reflect: 
const result = Reflect.apply(myObject.add, { arg1: 40, arg2: 20 }, [200])
assert.deepStrictEqual(result, 260)

// ----- apply

// ----- defineProperty

// questoes semanticas
function MyDate() {}

// feito demais, tudo é Object, mas Object adicionando prop para uma function?
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey dude', enumerable: true, configurable: true })
// agora faz mais sentido
Reflect.defineProperty(MyDate, 'withReflect', { value: () => 'Hello' })

assert.deepStrictEqual(MyDate.withObject(), 'Hey dude')
assert.deepStrictEqual(MyDate.withReflect(), 'Hello')

// ---- deleteProperty
const withDelete = { user: 'Leonardo' }
// imperformático, evitar ao máximo
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'Funabashi' }
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)

// --- get

// Deveriamos fazer um get somente em instancias de referencia
assert.deepStrictEqual(1['userName'], undefined) // Isso é estranho!! Deveria dar erro, nao?
// com reflection, uma exceçao é lançada!
assert.throws(() => Reflect.get(1, 'userName'), TypeError)

// --- has
assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ batman: '' }, 'batman'))

// --- ownKeys
const user = Symbol('user')
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'leonardo'
}

// Com os metodos de Object, temos que fazer 2 requisiçoes
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
]

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])
// Com Reflection
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user])