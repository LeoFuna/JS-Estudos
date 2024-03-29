import { pipeline } from 'stream/promises'
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

async function* output(stream) {
  for await(const chunk of stream) {
    const data = chunk.replace(/\n/, "")
    // ?=- ele faz procurar a partir do - e olhar para traz
    // :"(?<name>.*) procura pelo conteudo dentro das aspas apos os : e extrai somente o name
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${data}`)
  }
}

async function* merge(streams) {
  for (const readable of streams) {
    // faz trabalhar com objectMode
    readable.setEncoding('utf8')
    for await (const chunk of readable) {
      for (const line of chunk.trim().split('\n')) {
        yield line
      }
    }
  }
}

await pipeline(
  merge(results),
  output
)