import AbstractBus from "./AbstractBus";

export default class BmwBus implements AbstractBus {
  brand: string
  color: string
  constructor({ color }) {
    this.brand = 'BMW'
    this.color = color
  }

  turnOn() {
    console.log(`${'BmwBus'} is ON!`)
  }
}