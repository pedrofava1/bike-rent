import { User } from "./user";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { Location } from "./location";
import { Crypt } from "./crypt";

import { BikeNotFoundError } from "./errors/BikeNotFoundError";
import { UnavailableBikeError } from "./errors/UnavailableBikeError";
import { UserNotFoundError } from "./errors/UserNotFoundError";
import { UserAlreadyExists } from "./errors/UserAlreadyExists";
import { AuthenticationFailed } from "./errors/AuthenticationFailed";
import { RentNotFoundError } from "./errors/RentNotFoundError";
import { EmailDoesNotExist } from "./errors/EmailDoesNotExist";
import { BikeAlreadyExists } from "./errors/BikeAlreadyExists";
import { UserRepo } from "./ports/user-repo";
import { BikeRepo } from "./ports/bike-repo";
import { RentRepo } from "./ports/rent-repo";

export class App {
  crypt: Crypt = new Crypt()
  constructor(
    readonly userRepo: UserRepo,
    readonly bikeRepo: BikeRepo,
    readonly rentRepo: RentRepo
  ) {}

  async listUsers(): Promise<User[]> {
    return await this.userRepo.list()
  }

  async listBikes(): Promise<Bike[]> {
    return await this.bikeRepo.list()
  }

  async registerUser(user: User): Promise<string> {
    if (await this.userRepo.find(user.email)) {
      throw new UserAlreadyExists()
    }
    const encryptedPassword = await this.crypt.encrypt(user.password)
    user.password = encryptedPassword
    return await this.userRepo.add(user)
}

  async authenticate(userEmail: string, password: string): Promise<boolean> {
    const user = await this.findUser(userEmail)
    return await this.crypt.compare(password, user.password)
  }

  async rentBike(bikeId: string, userEmail: string): Promise<string> {
    const bike = await this.findBike(bikeId)
    if (!bike.isAvailable) {
        throw new UnavailableBikeError()
    }
    const user = await this.findUser(userEmail)
    bike.isAvailable = false
    await this.bikeRepo.update(bikeId, bike)
    const newRent = new Rent(bike, user, new Date())
    return await this.rentRepo.add(newRent)
  }
  
  async returnBike(bikeId: string, userEmail: string): Promise<number> {
    const now = new Date()
    const rent = await this.rentRepo.findOpen(bikeId, userEmail)

    if (!rent.id) throw new RentNotFoundError()
    if(!rent.bike.id) throw new BikeNotFoundError()
    
    rent.end = now
    await this.rentRepo.update(rent.id, rent)
    rent.bike.isAvailable = true
    await this.bikeRepo.update(rent.bike.id, rent.bike)
    const hours = diffHours(rent.end, rent.start)
    return hours * rent.bike.rate
} 

  async removeUser(email: string): Promise<void> {
    await this.findUser(email)
    await this.userRepo.remove(email)
  }
  
  async registerBike(bike: Bike): Promise<string> {
    return await this.bikeRepo.add(bike)
  }

  async findUser(email: string): Promise<User> {
    const user = await this.userRepo.find(email)
    if (!user) throw new UserNotFoundError()
    return user
  }
  
  async findBike(bikeId: string): Promise<Bike> {
    const bike = await this.bikeRepo.find(bikeId)
    if (!bike) throw new BikeNotFoundError()
    return bike
  }

  async moveBikeTo(bikeId: string, location: Location) {
    const bike = await this.findBike(bikeId)
    bike.position.latitude = location.latitude
    bike.position.longitude = location.longitude
    await this.bikeRepo.update(bikeId, bike)
  }
}

function diffHours(dt2: Date, dt1: Date) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(diff);
}