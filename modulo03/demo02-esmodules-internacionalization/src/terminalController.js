import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readline from 'readline'
import Person from './person.js'

export default class TerminalController {
  constructor() {
    this.print = {}
    this.data = {}
    this.terminal = {}
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin)
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    this.initializeTable(database, language)
  }

  initializeTable(database, language) {
    const data = database.map(item => new Person(item).formatted(language))

    const table = chalkTable(this.getTableOptions(), data)
    // Esse draft que está dentro console só existe pois na linha 7 nós instanciamos o Draftlog no console
    this.print = console.draft(table)
    this.data = data
  }

  updateTable(item) {
    this.data.push(item)
    this.print(chalkTable(this.getTableOptions(), this.data))
  }

  question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, resolve))
  }

  closeTerminal() {
    this.terminal.close()
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan("ID") },
        { field: 'vehicles', name: chalk.red('Vehicles') },
        { field: 'kmTraveled', name: chalk.cyan("Km Traveled") },
        { field: 'from', name: chalk.red("From") },
        { field: 'to', name: chalk.cyan("To") }
      ]
    }
  }
}