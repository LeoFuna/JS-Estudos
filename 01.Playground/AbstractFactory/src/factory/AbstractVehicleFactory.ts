import AbstractBus from "../entities/AbstractBus";
import AbstractCar from "../entities/AbstractCar";

export default interface AbstractVehicleFactory {
  createBus: (color: string) => AbstractBus
  createCar: (color: string) => AbstractCar
}