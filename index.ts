import { App } from './src/app'
import { Bike } from './src/bike'
import { User } from './src/user'
import sinon from 'sinon'


async function run() {
  const app = new App()
 
  //DATES
  const today = new Date()
  const twoDaysLater = new Date()
  twoDaysLater.setDate(twoDaysLater.getDate() + 2)
  const clock = sinon.useFakeTimers();

  
  //USER
  const user1 = new User('Pedro', 'pedro@mail.com', '12345')
  await app.registerUser(user1)
  await app.userAuthenticate('pedro@mail.com', '12345')

  //BIKE
  const bike = new Bike('bikel', 'bmx', 30, 100, 100.5, 'my desc', 5, [], '1')
  app.registerBike(bike)
  
  //RENT
  app.rentBike(bike, 'pedro@mail.com')
  
  //RETURN
  app.returnBike(bike, 'pedro@mail.com', twoDaysLater) //criar lib fake timer
  
  //LIST ARRAYS
  // console.log(app.listBikes());
  // console.log(app.listRents());
  // console.log(app.listUsers());

  //TEST
  // console.log(JSON.stringify(app, undefined, 2));

}
run();