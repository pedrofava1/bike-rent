"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const user_1 = require("./user");
// const bike = new Bike('bikel', 'mountain', 30, 100, 100.5, 'my desc', 5, [])
// const user = new User ('teste', 'teste@mail.com', '1234')
// const today = new Date()
// const twoDaysLater = new Date()
// twoDaysLater.setDate(twoDaysLater.getDate() + 2)
// const tomorrow = new Date()
// tomorrow.setDate(tomorrow.getDate() + 1)
// const twoDaysAfterTomorrow = new Date()
// twoDaysAfterTomorrow.setDate(tomorrow.getDate() + 2)
// const rent1 = Rent.create([], bike, user, today, twoDaysLater)
// const rent2 = Rent.create([rent1], bike, user, tomorrow, twoDaysAfterTomorrow)
// console.log(rent2);
const app = new app_1.App();
const ul = new user_1.User('Joao', 'joao@email.com', '1234');
app.addUser(ul);
console.log(ul);
app.addUser(ul);
