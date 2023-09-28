import { Bike } from "../../bike";
import { BikeRepo } from "../../ports/bike-repo";
import { BikeNotFoundError } from "../../errors/BikeNotFoundError";
import crypto from 'crypto'


export class  FakeBikeRepo implements BikeRepo {
  bikes: Bike[] = []

  async find(id: string): Promise<Bike> {
    const bike = this.bikes.find(bike => bike.id === id);

    if (bike) {
        return Promise.resolve(bike);
    } 
      
    return Promise.reject(new BikeNotFoundError());
  }

  async add(bike: Bike): Promise<string> {
      const newId = crypto.randomUUID()
      bike.id = newId
      this.bikes.push(bike)
      return newId
  }

  async remove(id: string): Promise<void> {
      const bikeIndex = this.bikes.findIndex(bike => 
          bike.id === id)
      if (bikeIndex !== -1) this.bikes.splice(bikeIndex, 1)
  }

  async list(): Promise<Bike[]> {
      return this.bikes
  }

  async update(id: string, bike: Bike): Promise<void> {
      const bikeIndex = this.bikes.findIndex(bike => bike.id === id)
      if (bikeIndex !== -1) this.bikes[bikeIndex] = bike
  }
}