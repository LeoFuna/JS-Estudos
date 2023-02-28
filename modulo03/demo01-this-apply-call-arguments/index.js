'use strict';

const { watch, promises: { readFile } } = require('fs')

class File {
  watch(event, filename) {
    console.log('this', this)
    console.log('arguments', Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}

// watch(__filename, async (event, filename) => {
//   console.log((await readFile(filename)).toString())
// })

const file = new File()
// dessa forma, ele ignora o 'this' da classe File e herda o this do watch! Não seria o que queremos!
// watch(__filename, file.watch);

// alternativa para nao herdar o this da funcao, mas fica feio!
// watch(__filename, (event, filename) => file.watch(event, filename))

// podemos deixar explicito qual é o contexto que a funcao deve seguir
// o bind retorna uma funcao com o 'this' que se mantem de file, ignorando o watch
// watch(__filename, file.watch.bind(file))

// a diferenca entre um e outro é basicamente que um vc passa os argumentos como array e o outro uma lista de argumentos
file.watch.call({ showContent: () => console.log('call: hello dude!') }, null, __filename )
file.watch.apply({ showContent: () => console.log('apply: hey dude!') }, [null, __filename])
