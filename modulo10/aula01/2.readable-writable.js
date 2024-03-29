import { Readable, Writable } from 'stream'

//fonte de dados
const readable = Readable({
  read() {
    this.push('Hello World 1')
    this.push('Hello World 2')
    this.push('Hello World 3')

    // informa que os dados acabaram
    this.push(null)
  }
})

// saida de dados

const writable = Writable({
  write(chunk, encoding, callback) {
    console.log('msg', chunk.toString())

    callback()
  }
})

readable
  //writable sera sempre a saída
  .pipe(writable)