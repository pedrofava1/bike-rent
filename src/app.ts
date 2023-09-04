import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import  crypto from 'crypto'

export class App {
  users: User[] = []
  bikes: Bike[] = []
  rents: Rent[] = []

  returnBike(bike: Bike, userEmail: string, dateReturn: Date ): void{
    const today = new Date()
    let rUser = this.users.find(u =>u.email === userEmail)
      if(rUser == undefined)
        throw new Error('User is not registered')
      
    let rBike = this.rents.find(b =>b.bike === bike && b.dateFrom < today)
    if(rBike != undefined) {
      if(rBike.user.email != userEmail)
        throw new Error('User different from who rent')

    rBike.dateReturned = dateReturn
    }
    
    if(rBike = undefined)
      throw new Error('Bike is not rent')
  }

  rentBike(bike: Bike, userEmail: string, startDate: Date, endDate: Date): Rent {
    if(bike == undefined)
      throw new Error('Bike is not registered')

    let rUser = this.users.find(u =>u.email === userEmail)
      if(rUser == undefined)
        throw new Error('User is not registered')
    
    let bikeVet = this.rents.filter(t => t.bike === bike && !t.dateReturned)
    let newRent = Rent.create(bikeVet, bike, rUser, startDate, endDate) 
    this.rents.push(newRent)

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

  registerUser(user: User) {
    for (const rUser of this.users) {
      if(rUser.email === user.email) {
        throw new Error ('User already registered')
      }
    }
    user.id = crypto.randomUUID()
    this.users.push(user)
  }
}