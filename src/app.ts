import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
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

  getBikeLocation(bikeId: String, lat: number, lon: number) {
    let rBike = this.bikes.find(b => b.id === bikeId)
    if(rBike === undefined){
      throw new Error('Bike does not exist')
    }
    rBike.coords.push(lat, lon)
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

  returnBike(bike: Bike, userEmail: string, dateReturn: Date): Number{
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
    rent.end = dateReturn
    
    let diffTime = Math.abs(rent.end.getTime() - rent.start.getTime()) / (1000 * 60) // diffTime in minutes
    diffTime = Math.round(diffTime * 100) / 100 // round to 2 decimal places

    rent.value = (diffTime * 0.5) // 0.5 reais per minute
    rent.value = Math.round(rent.value * 100) / 100 // round to 2 decimal places

    console.log("The value of the rent is: " + rent.value + " reais");

    bike.isAvailable = true
    this.rents.push(rent)

    return rent.value
  }

  rentBike(bike: Bike, userEmail: string): Rent {
    if(bike == undefined)
      throw new Error('Bike is not registered')
    if(bike.isAvailable === false)
      throw new Error('Bike is not available')

    let rUser = this.users.find(u =>u.email === userEmail)
      if(rUser == undefined)
        throw new Error('Rent Error: User is not registered')
      
    let newRent = new Rent(bike, rUser) 
    bike.isAvailable = false
    this.rents.push(newRent)
    console.log("The rent was successful");

    return newRent
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

  findUser(email: string): User | undefined {
    return this.users.find(user => {return user.email === email})
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
    // console.log(this.listUsers());

    return user
  }
}