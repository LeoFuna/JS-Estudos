import AbstractBus from "./AbstractBus";

export default class MercedezBus implements AbstractBus {
  brand: string
  color: string
  constructor({ color }) {
    this.brand = 'Mercedez'
    this.color = color
  }

  turnOn() {
    console.log(`${'Mercedez Bus'} is ON!`)
  }
}