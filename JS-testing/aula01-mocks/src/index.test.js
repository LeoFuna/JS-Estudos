const { error } = require('./constants');
const File = require('./file');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
  {
    const filePath = '../mocks/emptyFile-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = '../mocks/fourItems-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = '../mocks/threeItems-valid.csv'
    const result = await File.csvToJson(filePath)
    const expected = [
      {
        "name": "Leonardo Funabashi",
        "id": 123,
        "profession": "Desenvolvedor",
        "birthDay": 1989
      },
      {
        "name": "Maria",
        "id": 32,
        "profession": "Js Developer",
        "birthDay": 1992
      },
      {
        "name": "Joao Silva",
        "id": 41,
        "profession": "DevOps",
        "birthDay": 1981
      }
    ]
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()