// Coerçao de Tipo é o ato do JS tentar de alguma maneira ajustar/converter o tipo para aquele elemento

// Coerçao explicita
// Quando explicitamente se coloca o tipo, ex: Number(), String(), etc

// Coerçao Implicita
// Aquele geralmente usada com operadores, exemplos seriam operaçoes de string com numero, validaçóes com elementos nao booleanos
// Lembrar do === que quando usado faz com que ele não faça esse tipo de Coerçao

9999999999999999 // 16 noves
// 10000000000000000
true + 2
// 3
'21' + true
// '21true'
'21' - true
// 20
'21' - - 1
// 22
0.1 + 0.2 === 0.3
// false  ( dá um resultado 0.30000000000004 )

// ----------------

console.assert(String(123) === '123', 'explicit convertion to string')
console.assert(123 + '' === '123', 'implicit convertion to string')

