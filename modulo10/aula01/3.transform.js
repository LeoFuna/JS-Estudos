import { Readable, Transform, Writable } from 'stream'
import { createWriteStream } from 'fs'
//fonte de dados
const readable = Readable({
  read() {
    for(let index = 0; index < 1e4; index++) {
      const person = { id: Date.now() + index, name: `Leo-${index}` }
      // Como o node JS streams trabalham com buffers, é preciso transofrmar em string
      // pois internamente string seriam Buffers
      const data = JSON.stringify(person)
      this.push(data)
    }

    // informa que os dados acabaram
    this.push(null)
  }
})

// processamento dos dados

const mapFields = Transform({
  transform(chunk, encoding, callback) {
    const data = JSON.parse(chunk)
    const result = `${data.id},${data.name.toUpperCase()}\n`
    callback(null, result)
  }
})

const mapHeaders = Transform({
  transform(chunk, encoding, callback) {
    this.counter = this.counter ?? 0;
    // A primeira vez ele sera 0 pois nao existe ainda, entao ele criara os Headers
    // depois ja existira o counter como 1 entao ele segue o processo
    if(this.counter) {
      return callback(null, chunk)
    }
    this.counter += 1
    callback(null, "id,name\n".concat(chunk))
  }
})

// saida de dados
const writable = Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString())

    callback()
  }
})

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  // Esse caso seria pra printar na tela usando o writable acima
  // .pipe(writable)
  // Esse caso seria para enviar os dados num arquivo
  .pipe(createWriteStream('my.csv'))

pipeline
  .on('end', () => console.log('Acabou!'))