import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import  crypto from 'crypto'
import bcrypt from 'bcrypt'

export class App {
  users: User[] = []
  bikes: Bike[] = []
  rents: Rent[] = []

  listUsers() {
    console.log(this.users);
  }

  listBikes() {
    console.log(this.bikes);
  }

  listRents() {
    console.log(this.rents);
  }

  async userAuthenticate(userEmail: string, userPassword: string ): Promise<User> {
    const rUser = this.users.find(u => u.email === userEmail)
    if(rUser === undefined)
      throw new Error('User does not exist')
    const hashedPassword = rUser.password

    const passMatched = await bcrypt.compare(userPassword, hashedPassword)
    if(!passMatched)
      throw new Error('Password does not match')

    return rUser
  }

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
}