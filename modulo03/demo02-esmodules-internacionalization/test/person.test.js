import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
import Person from '../src/person.js'

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Carro 20000 2020-01-01 2020-02-02'
    )

    const expect = {
      from: '2020-01-01',
      to: '2020-02-02',
      id: '1',
      vehicles: ['Bike', 'Carro'],
      kmTraveled: '20000',
    }

    chai.expect(person).to.be.deep.equal(expect)
  })
  it('should format values', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Carro 20000 2020-01-01 2020-02-02'
    )
    const formattedResult = person.formatted('pt-BR')
    const expect = {
      from: '01 de janeiro de 2020',
      to: '02 de fevereiro de 2020',
      id: 1,
      vehicles: 'Bike e Carro',
      kmTraveled: '20.000 km',
    }

    chai.expect(formattedResult).to.be.deep.equal(expect)
  })
})