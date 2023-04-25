import Http from 'http'

async function handler(request, response) {
  for await(const data of request) {
    response.end()
  }
}

Http.createServer(handler)
  .listen(3000 , () => console.log('running at 3000'))