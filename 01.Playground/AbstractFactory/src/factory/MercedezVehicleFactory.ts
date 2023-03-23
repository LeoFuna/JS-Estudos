import MercedezBus from "../entities/MercedezBus";
import MercedezCar from "../entities/MercedezCar";
import AbstractVehicleFactory from "./AbstractVehicleFactory";

export default class MercedezVehicleFactory implements AbstractVehicleFactory {
  createCar (color: string) {
    const car = new MercedezCar({ color });
    return car
  };

  createBus (color: string) {
    const bus = new MercedezBus({ color });
    return bus
  };
}