import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"

describe('App', () => {
    it('should correctly calculate rent amount', async () => {
        const app = new App()
        const user = new User('Pedro', 'pedro@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('bikel', 'bmx', 30, 100, 100.0, 'my desc', 5, [], '1')
        app.registerBike(bike)
        const clock = sinon.useFakeTimers()
        app.rentBike(bike, user.email)
        const hour = 1000 * 60 * 60;
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike, user.email)
        expect(rentAmount).toEqual(200.0)
    })

    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        
        if(bike.id === undefined)
         throw new Error('Bike id is undefined')

        app.moveBikeTo(bike.id, newYork)
        expect(bike.position.latitude).toEqual(newYork.latitude)
        expect(bike.position.longitude).toEqual(newYork.longitude)
    })

    it('should raise exception when trying to move unregistered bike', () => {
        const app = new App()
        const location = new Location(40.753056, -73.983056)
        const bike = new Bike('bikel', 'bmx', 30, 100, 100.0, 'my desc', 5, [])
        app.registerBike(bike)
    
        expect(() => app.moveBikeTo('2131' , location)).toThrowError('Bike does not exist')
    })

    it('should verify if bike is registered by the id',() => {
        const app = new App()
        const bikeId = '1231'
        if(bikeId === undefined)
            throw new Error('Bike id is undefined')
    
        expect(() => app.findBikeById(bikeId)).toThrowError('Bike does not exist in data base')
    })
})