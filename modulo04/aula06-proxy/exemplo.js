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

