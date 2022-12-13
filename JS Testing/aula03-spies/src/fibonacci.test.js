const Fibonacci = require('./fibonacci');
const sinon = require('sinon');
const assert = require('assert');

(async () => {

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    // generators retornam iteradores, (.next)
    // existem 3 formas de ler os dados
    // usando as funcoes .next, for await e rest/spread
    for await(const i of fibonacci.execute(3)) {};
    // É esperado 4 chamadas à funçao pq na ultima quando ela sai dela tb é uma chamada
    const expectedCallCount = 4;
    assert.deepStrictEqual(spy.callCount, expectedCallCount);
  }

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    // Esse é o rest/spread !!
    const [...results] = fibonacci.execute(5);

    const { args } = spy.getCall(2);

    const expectedResult = [0,1,1,2,3];
    const expectedParams = Object.values({ 
      input: 3,
      current: 1,
      next: 2
    })

    assert.deepStrictEqual(args, expectedParams);
    assert.deepStrictEqual(results, expectedResult)
  }
})()