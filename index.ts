import { App } from './src/app'
import { Bike } from './src/bike'
import { User } from './src/user'
import { Rent } from './src/rent'
import sinon from 'sinon'


async function run() {
  const app = new App()

  // app.registerBike(bike)
  // console.log(bike);
  
  //DATES
  const today = new Date()
  const twoDaysLater = new Date()
  twoDaysLater.setDate(twoDaysLater.getDate() + 2)
  // const tomorrow = new Date()
  // tomorrow.setDate(tomorrow.getDate() + 1)
  // const twoDaysAfterTomorrow = new Date()
  // twoDaysAfterTomorrow.setDate(tomorrow.getDate() + 2)

  const clock = sinon.useFakeTimers();
  
  // const user = new User('Joao', 'joao@mail.com', '1234')
  // app.registerUser(user)
  const user1 = new User('Pedro', 'pedro@mail.com', '12345')
  await app.registerUser(user1)
  await app.userAuthenticate('pedro@mail.com', '12345')
  // console.log(app.users);
  // console.log(user1);
  
  // console.log(app.findUser('pedro@mail.com'));
  // app.removeUser('pedro@mail.com')
  // console.log(app.users);
  
  const bike = new Bike('bikel', 'bmx', 30, 100, 100.5, 'my desc', 5, [], '1')
  app.registerBike(bike)
  // const bike1 = new Bike('bikel', 'bmx', 30, 100, 100.5, 'my desc', 5, [], '2')
  // app.registerBike(bike1)
  
  app.rentBike(bike, 'pedro@mail.com')
  // app.rentBike(bike, 'joao@mail.com')
  console.log(app.listBikes());
  
  app.returnBike(bike, 'pedro@mail.com', twoDaysLater) //criar lib fake timer
  // console.log(JSON.stringify(app, undefined, 2));
  
  
  console.log(app.listRents());
  // console.log(app.listUsers());

}
run();