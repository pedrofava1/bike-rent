import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import { Location } from "./location";

import crypto from 'crypto'
import bcrypt from 'bcrypt'

import { BikeNotFoundError } from "./errors/BikeNotFoundError";
import { UnavailableBikeError } from "./errors/UnavailableBikeError";
import { UserNotFoundError } from "./errors/UserNotFoundError";
import { UserAlreadyExists } from "./errors/UserAlreadyExists";
import { AuthenticationFailed } from "./errors/AuthenticationFailed";
import { RentDoesNotExist } from "./errors/RentDoesNotExist";
import { EmailDoesNotExist } from "./errors/EmailDoesNotExist";

export class App {
  users: User[] = []
  bikes: Bike[] = []
  rents: Rent[] = []

  listUsers() {
   return this.users.slice()
  }

  listBikes() {
    return this.bikes.slice()
  }

  listRents() {
    return this.rents.slice()
  }

  async registerUser(user: User): Promise<User> { //TEST DONE
    for (const rUser of this.users) {
      if(rUser.email === user.email) {
        throw new UserAlreadyExists()
      }
    }

    user.password = await bcrypt.hash(user.password, 10)
    user.id = crypto.randomUUID()
    this.users.push(user)

    return user
  }

  async userAuthenticate(userEmail: string, userPassword: string ): Promise<User> { //TEST DONE
    const user = this.findUserByEmail(userEmail)

    const passMatched = await bcrypt.compare(userPassword, user.password)
    if(!passMatched) 
      throw new AuthenticationFailed()
    
    return user
  }

  rentBike(bikeId: string | undefined, userEmail: string): Rent { //TEST DONE
    if (!bikeId) 
      throw new BikeNotFoundError()
    const bike = this.findBikeById(bikeId)
    if(!bike.isAvailable)
      throw new UnavailableBikeError()

    const user = this.findUserByEmail(userEmail)
    bike.isAvailable = false
    const newRent = new Rent(bike, user, new Date()) 
    this.rents.push(newRent)

    return newRent
  }
  
  returnBike(bikeId: string | undefined, userEmail: string): Number{ //TEST DONE
    const now = new Date()
        const rent = this.rents.find(rent => rent.bike.id === bikeId && rent.user.email === userEmail && !rent.end)
        if (!rent) throw new RentDoesNotExist()
        rent.end = now
        rent.bike.isAvailable = true
        const hours = diffHours(rent.end, rent.start)
        return hours * rent.bike.rate
  }

  removeUser(email: String): void { //TEST DONE
    let iU = this.users.findIndex(u => u.email === email)
    if(iU == -1)
      throw new EmailDoesNotExist()
    
    this.users.splice(iU, 1)
  }
  
  registerBike(bike: Bike): string { // DO NOT NEED TEST
    const newId = crypto.randomUUID()
    bike.id = newId
    this.bikes.push(bike)
    return newId
  }

  findUserByEmail(userEmail: string): User { // TEST DONE
    const user = this.users.find(u => u.email === userEmail)
    if(!user) throw new UserNotFoundError()
    
    return user
  }
  
  findBikeById(bikeId: String): Bike { // TEST DONE
    const bike = this.bikes.find(b => b.id === bikeId)
    if(!bike) throw new BikeNotFoundError()
    
    return bike
  }

  moveBikeTo(bikeId: string, location: Location): Location { //TEST DONE
    const bike = this.findBikeById(bikeId)
    
    bike.position.latitude = location.latitude
    bike.position.longitude = location.longitude

    return bike.position
  }
}

function diffHours(dt2: Date, dt1: Date) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(diff);
}