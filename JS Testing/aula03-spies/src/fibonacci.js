class Fibonacci {
  *execute (input, current = 0, next = 1) {
    if(input === 0) {
      return 0;
    }
    // Retorna o valor
    yield current;
    // Aqui ele vai delegar uma execuçao, nao vai retornar valor!
    yield* this.execute(input - 1, next, current + next)
  }
}

module.exports = Fibonacci;
