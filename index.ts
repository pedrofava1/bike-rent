// import { App } from './src/app'
// import { Bike } from './src/bike'
// import { User } from './src/user'
// import sinon from 'sinon'


// async function run() {
//   const clock = sinon.useFakeTimers();
//     const app = new App()
//     const user1 = new User('Pedro', 'pedro@mail.com', '1234')
//     await app.registerUser(user1)
//     const bike = new Bike('caloi mountainbike', 'mountain bike', 30, 100, 100.5, 'my desc', 5, [], '1')
//     app.registerBike(bike)
//     console.log('Bike disponível: ', bike.isAvailable)
//     app.rentBike(bike, user1.email)
//     console.log('Bike disponível: ', bike.isAvailable)
//     clock.tick(1000 * 60 * 120)
//     console.log(app.returnBike(bike, user1.email))
//     console.log('Bike disponível: ', bike.isAvailable)

  //TEST
  // console.log(JSON.stringify(app, undefined, 2));
// }

// run();