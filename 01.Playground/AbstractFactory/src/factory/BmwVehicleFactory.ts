import BmwBus from "../entities/BmwBus";
import BmwCar from "../entities/BmwCar";
import AbstractVehicleFactory from "./AbstractVehicleFactory";

export default class BmwVehicleFactory implements AbstractVehicleFactory {
  createCar (color: string) {
    const car = new BmwCar({ color });
    return car
  };

  createBus (color: string) {
    const bus = new BmwBus({ color });
    return bus
  };
}