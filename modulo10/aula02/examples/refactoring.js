import axios from 'axios'
import { pipeline } from 'stream/promises'

const API_01 = 'http://localhost:3000'
const API_02 = 'http://localhost:4000'

async function* customReadable() {
  const response = await Promise.all([
    axios({
      method: 'get',
      url: API_01,
      responseType: 'stream'
    }),
    axios({
      method: 'get',
      url: API_02,
      responseType: 'stream'
    }),
    axios({
      method: 'get',
      url: API_01,
      responseType: 'stream'
    })
  ])

  yield response
}

async function* customWritable(stream) {
  for await(const apiResponses of stream) {
    for (const response of apiResponses) {
      const readable = response.data
      readable.setEncoding('utf8')
      for await(const chunk of readable) {
        console.log(chunk.trim())
      }
    }
  }
}

await pipeline(
  customReadable,
  customWritable
)
