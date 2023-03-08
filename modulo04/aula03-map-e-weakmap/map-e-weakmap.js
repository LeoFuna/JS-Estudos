const assert = require('assert');
const myMap = new Map();

// podem ter qqr coisa como chave
myMap
  .set(1, 'one')
  .set('Erick', { text: 'two' })
  .set(true, () => 'hello')

//usando um construtor
const myMapWithConstructot = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1']
])

// console.log('myMap', myMap)
// console.log('myMap.get(1)', myMap.get(1))

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// Em Objects a chave só pode ser string ou sumbol ( number é coergido a string )
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'Leonardo' })

// console.log('get', myMap.get({ id: 1 }))
// console.log('get', myMap.get(onlyReferenceWorks))
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Leonardo' })

// utilitários
// - No Object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4)

// Para verificar se um item existe no objeto
// item.key = se nao existe - undefined
// if() = coerçao implicita para boolean e retorna false
// O jeito certo em Object é ({ name: 'Leo' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks))

// para remover um item do objeto
// delete item.id
// imperformatico para o JS
assert.ok(myMap.delete(onlyReferenceWorks))

// Não dá para iterar em Objects diretamente
// tem que transformar com Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1,"one"],["Erick",{"text":"two"}],[true, ()=> 'hello']]))

// for (const [key, value] of myMap) {
//   console.log({ key, value })
// }

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrao
// ({  }).toString() === '[object Object]'
// ({ toString: () => 'Hey' }).toString() === 'Hey'

// qualquer chave pode colidir, com as propriedades herdadas do objeto, como
// construtor, toString, valueOf e etc

const actor = {
  name: 'Xuxa',
  toString: 'Queen: Xuxa'
}

// nao tem restricao de nome de chave
myMap.set(actor)

assert.ok(actor)
assert.throws(() => myMap.get(actor).toString, TypeError)

// Nao da pra limpar um Obj sem reassina-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// --- WeakMap

// Pode ser coletado apos perder as referencias

let key1 = {name: 'John'};
let key2 = {name: 'Jane'};

let weakMapReferenceLoseTest = new WeakMap();
weakMapReferenceLoseTest.set(key1, 42);
weakMapReferenceLoseTest.set(key2, 'Hello');

key1 = null;
key2 = null;

// console.log(weakMapReferenceLoseTest.get(key1)); // undefined
// console.log(weakMapReferenceLoseTest.get(key2)); // undefined
// console.log(weakMapReferenceLoseTest.size); // undefined
assert.deepStrictEqual(weakMapReferenceLoseTest.get(key1), undefined)
assert.deepStrictEqual(weakMapReferenceLoseTest.get(key2), undefined)
assert.deepStrictEqual(weakMapReferenceLoseTest.size, undefined)

// usado em casos beeeem específicos

// tem a maioria dos beneficios do Map mas não são iteráveis
// Só chaves de referencia e que voce ja conheça
// mais leve e preve leak de memoria, pq depois que as intancias saem da memoria, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)