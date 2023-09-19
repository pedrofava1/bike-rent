import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import { Location } from "./location";
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import sinon from 'sinon'

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

  async userAuthenticate(userEmail: string, userPassword: string ): Promise<boolean> {
    const rUser = this.users.find(u => u.email === userEmail)
    if(rUser === undefined)
      throw new Error('User does not exist')
    const hashedPassword = rUser.password

    const passMatched = await bcrypt.compare(userPassword, hashedPassword)
    if(!passMatched){
      console.log("Login has failed")
      return false
    }

    console.log("Login has been successful");
    return true
  }

  rentBike(bike: Bike, userEmail: string): void {
    if(bike == undefined)
      throw new Error('Bike is not registered')
    if(bike.isAvailable === false)
      throw new Error('Unavailable bike')

    const rUser = this.users.find(u =>u.email === userEmail)
      if(rUser == undefined)
        throw new Error('Rent Error: User is not registered')
      
    bike.isAvailable = false
    const newRent = new Rent(bike, rUser, new Date()) 
    this.rents.push(newRent)
    console.log("The rent was successful");
  }
  
  returnBike(bike: Bike, userEmail: string): Number{
    const now = new Date()

    if(bike == undefined)
      throw new Error('Bike is not registered')
    if(bike.isAvailable === true)
      throw new Error('Bike is not rented')
    const rUser = this.users.find(u =>u.email === userEmail)
    if(rUser == undefined)
      throw new Error('Rent Error: User is not registered')

    const rent = this.rents.find(r => r.bike.id === bike.id && r.user.email === userEmail && r.end === undefined)
    if(rent == undefined)
      throw new Error('Rent Error: Rent does not exist')
    
    rent.end = now
    rent.bike.isAvailable = true
    const hours = diffHours(rent.end, rent.start)
    
    this.rents.push(rent)

    return rent.bike.rate * hours
  }

  removeUser(email: String): void {
    let iU = this.users.findIndex(u => u.email === email)
    if(iU == -1)
      throw new Error('Email does not exist in database')
    
    this.users.splice(iU, 1)
  }
  
  registerBike(bike: Bike): string {
    const newId = crypto.randomUUID()
    bike.id = newId
    this.bikes.push(bike)
    return newId
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => {return user.email === email})
  }
  
  findBikeById(bikeId: String): Bike | undefined {
    const rBike = this.bikes.find(b => b.id === bikeId)
    if(rBike === undefined) 
      throw new Error('Bike does not exist in data base')
    
    return rBike
  }

  async registerUser(user: User): Promise<User> {
    const saltRounds = 10
    for (const rUser of this.users) {
      if(rUser.email === user.email) {
        throw new Error ('User already registered')
      }
    }

    user.id = crypto.randomUUID()
    user.password = await bcrypt.hash(user.password, 10)
    this.users.push(user)

    return user
  }

  moveBikeTo(bikeId: string, location: Location): void {
    const bike = this.bikes.find(b => b.id === bikeId)
    if(bike === undefined) {
      throw new Error('Bike does not exist')
    }
    
    bike.position.latitude = location.latitude
    bike.position.longitude = location.longitude
}
  
}

function diffHours(dt2: Date, dt1: Date) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(diff);
}