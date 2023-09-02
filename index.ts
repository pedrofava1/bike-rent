import { App } from "./src/app"
import { Bike } from "./src/bike"
import { Rent } from "./src/rent"
import { User } from "./src/user"

const app = new App()

// app.registerBike(bike)
// console.log(bike);

//DATES
const today = new Date()
const twoDaysLater = new Date()
twoDaysLater.setDate(twoDaysLater.getDate() + 2)
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const twoDaysAfterTomorrow = new Date()
twoDaysAfterTomorrow.setDate(tomorrow.getDate() + 2)

const user = new User('Joao', 'joao@mail.com', '1234')
app.registerUser(user)
// console.log(user)

const user1 = new User('Pedro', 'pedro@mail.com', '1234')
app.registerUser(user1)
// app.registerUser(user1)
// console.log(user1);

// console.log(app.findUser('pedro@mail.com'));
// app.removeUser('pedro@mail.com')
// console.log(app.users);

const bike = new Bike('bikel', 'bmx', 30, 100, 100.5, 'my desc', 5, [], '1')
app.registerBike(bike)
// const bike1 = new Bike('bikel', 'bmx', 30, 100, 100.5, 'my desc', 5, [], '2')
// app.registerBike(bike1)

app.rentBike(bike, 'pedro@mail.com', today, twoDaysLater)
// app.rentBike(bike, 'joao@mail.com', today, twoDaysLater)
// console.log(app.rents);

app.returnBike(bike, 'pedro@mail.com', twoDaysLater)
console.log(app.rents);
// console.log(JSON.stringify(app, undefined, 2));
