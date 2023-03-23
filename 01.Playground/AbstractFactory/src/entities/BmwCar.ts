import AbstractCar from "./AbstractCar";

export default class BmwCar implements AbstractCar {
  brand: string
  color: string
  constructor({ color }) {
    this.brand = 'BMW'
    this.color = color
  }

  turnOn() {
    console.log(`${'BMW'} is ON!`)
  }
}