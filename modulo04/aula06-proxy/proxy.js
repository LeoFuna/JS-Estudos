'use-strict';

const Event = require('events')
const event = new Event()
const eventName = 'counter'

event.on(eventName, (msg) => console.log('counter updated', msg))

event.emit(eventName, 'olá')
event.emit(eventName, 'mundo')

const myCounter = {
  counter: 0
}

const myCounterProxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: Reflect.get(target, propertyKey) })
    return Reflect.set(target, propertyKey, newValue)
  },
  get: (object, prop) => {
    // console.log('chamou!', { object, prop })
    return Reflect.get(object, prop)
  }
})

setInterval(function() {
  myCounterProxy.counter += 1
  if (myCounterProxy.counter === 10) clearInterval(this)
}, 200)

setTimeout(() => {
  myCounterProxy.counter = 4
  console.log('[2]: timeout!!!')
}, 100)

// se eu quero que ele execute imediatamente temos uma funçao para isso
// Seria similar ao setTimeout com tempo ZERO
setImmediate(() => {
  console.log('[1]: Immediate!!', myCounterProxy.counter)
})

// executa agora, mas acaba com o ciclo de vida do node
process.nextTick(() => {
  myCounterProxy.counter = 2
  console.log('[0]: nextTick é sempre o Primeiro!!')
})