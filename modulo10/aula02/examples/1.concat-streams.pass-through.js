import { Writable, PassThrough } from 'stream'

import axios from "axios";
const API_01 = 'http://localhost:3000'
const API_02 = 'http://localhost:4000'

const requests = await Promise.all([
  axios({
    method: 'get',
    url: API_01,
    responseType: 'stream'
  }),
  axios({
    method: 'get',
    url: API_02,
    responseType: 'stream'
  })
])

const results = requests.map(({data}) => data)


const output = Writable({
  write(chunk, encoding, callback) {
    const data = chunk.toString().replace(/\n/, "")
    // ?=- ele faz procurar a partir do - e olhar para traz
    // :"(?<name>.*) procura pelo conteudo dentro das aspas apos os : e extrai somente o name
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${data}`)
    callback()
  }
})

function merge(streams) {
  return streams.reduce((prev, curr, index, items) => {
    // o end false impoede que a stream se feche sozinha
    curr.pipe(prev, { end: false })

    // como colocamos end: false, vamos manipular manualmente quando o nosso curr
    // terminar. Quando ele terminar, vamos verificar se todos no pipeline se encerraram
    // ele vai entao forcar a cadeia do anterior a se fechar
    curr.on('end', () => items.every(stream => stream.ended) && prev.end())
    return prev
 
  }, new PassThrough())
}

merge(results)
  .pipe(output)
// result[0].pipe(output)
// result[1].pipe(output)