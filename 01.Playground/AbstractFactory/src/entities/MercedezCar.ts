import AbstractCar from "./AbstractCar";

export default class MercedezCar implements AbstractCar {
  brand: string
  color: string
  constructor({ color }) {
    this.brand = 'Mercedez'
    this.color = color
  }

  turnOn() {
    console.log(`${'MERCEDEZ'} is ON!`)
  }
}