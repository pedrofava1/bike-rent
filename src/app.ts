import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

export class App {
  users: User[] = []
  bikes: Bike[] = []
  rents: Rent[] = []

  addUser(user: User) {
    for (const rUser of this.users) {
      if(rUser.email === user.email) {
        throw new Error ('User already registered')
      }
    }
    this.users.push(user)
  }
}