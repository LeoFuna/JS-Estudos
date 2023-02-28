import database from './../database.json'
import Person from './person.js'
import { save } from './repository.js'
import TerminalController from './terminalController.js'

const STOP_TERM = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, 'pt-BR')

async function mainLoop() {
  try {
    const answer = await terminalController.question('Digite ID VEICULOS(Separado por ,) KM_VIAJADOS DE PARA\n')

    if (answer === STOP_TERM) {
      terminalController.closeTerminal()
      console.log('process finished!')
      return
    }
    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted('pt-BR'))
    await save(person)

    return mainLoop()
  } catch(error) {
    console.error('Deu ruim**', error)
    return mainLoop()
  }
}

// O await sem um async funciona por conta do TOP LEVEL AWAIT liberado desde a v14.8 do NODE
await mainLoop();