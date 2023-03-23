import BmwVehicleFactory from "./factory/BmwVehicleFactory";
import MercedezVehicleFactory from "./factory/MercedezVehicleFactory";


const vehicles = [
  { brand: 'Mercedez', color: 'blue', type: 'bus' },
  { brand: 'BMW', color: 'blue', type: 'bus' },
  { brand: 'Mercedez', color: 'green', type: 'car' },
  { brand: 'Mercedez', color: 'orange', type: 'car' },
]

abstract class VehicleFactory {
  private static getFactory(brand: string) {
    switch (brand) {
      case 'Mercedez':
        return new MercedezVehicleFactory();
      case 'BMW':
        return new BmwVehicleFactory();
      default:
        throw new Error('Não existe montadora para essa marca!')
    }
  }

  static createVehicle(vehicle: any) {
    const factory = this.getFactory(vehicle.brand)
    switch(vehicle.type) {
      case 'car':
        const car = factory.createCar(vehicle.color)
        console.log(`Criado um carro ${car.color} da ${car.brand}`)
        break;
      case 'bus':
        const bus = factory.createBus(vehicle.color)
        console.log(`Criado um onibus ${bus.color} da ${bus.brand}`)
    }
  }
}

vehicles.forEach((vehicle) => VehicleFactory.createVehicle(vehicle))