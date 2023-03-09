const http = require("http");

const cache = new Map();

const proxiedGet = new Proxy(http.get, {
  apply(target, thisArg, args) {
    const url = args[0];
    if (cache.has(url)) {
      console.log(`Returning cached response for ${url}`);
      return Promise.resolve(cache.get(url));
    } else {
      console.log(`Making new request for ${url}`);
      return new Promise((resolve, reject) => {
        target.apply(thisArg, args)
          .on("response", response => {
            let data = "";
            response.on("data", chunk => {
              // É um Buffer!! que vai somando até ter todo o dado, depois disso vai para o 'end'
              data += chunk;
            });
            response.on("end", () => {
              cache.set(url, data);
              resolve(data);
            });
          })
          .on("error", (error) => reject(error));
      });
    }
  }
});

(async () => {
  await proxiedGet("http://jsonplaceholder.typicode.com/posts/1").then(response => {
    console.log(response);
  });

  await proxiedGet("http://jsonplaceholder.typicode.com/posts/1").then(response => {
    console.log(response);
  });
})()

function minhaFuncao(parametro) {
  console.log(`Chamando minhaFuncao com o parametro: ${parametro}`);
  console.log('Esse é o this:', this.prop);

}
minhaFuncao.prototype = { sum: (a, b) => a + b }

const meuProxy = new Proxy(minhaFuncao, {
  apply: function(target, thisArg, args) {
    console.log(`Antes de chamar a função`);
    console.log('thisArgs', thisArg)
    console.log('args', args)
    console.log('Sou o prototype da Func:', target.prototype.sum(1, 3))
    const result = target.apply(thisArg, args);
    console.log(`Depois de chamar a função`);
    return result;
  }
});

meuProxy.call({ prop: 'Sou a prop' }, ['Hello World']);