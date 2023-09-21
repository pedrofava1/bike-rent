import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"

import { BikeNotFoundError } from "./errors/BikeNotFoundError"
import { UnavailableBikeError } from "./errors/UnavailableBikeError"
import { AuthenticationFailed } from "./errors/AuthenticationFailed"
import { UserNotFoundError } from "./errors/UserNotFoundError"
import { UserAlreadyExists } from "./errors/UserAlreadyExists"
import { RentDoesNotExist } from "./errors/RentDoesNotExist"

import sinon from "sinon"
import { EmailDoesNotExist } from "./errors/EmailDoesNotExist"

describe('App', () => {
    it('should correctly calculate rent amount', async () => {
        const app = new App()
        const user = new User('Pedro', 'pedro@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('bikel', 'bmx', 30, 100, 100.0, 'my desc', 5, [], '1')
        app.registerBike(bike)
        const clock = sinon.useFakeTimers()
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60;
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)
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

    it('should throw bike not found error when trying to move unregistered bike', () => {
        const app = new App()
        const newYork = new Location(40.753056, -73.983056)
    
        expect(() => app.moveBikeTo('fake-id' , newYork)).toThrow(BikeNotFoundError)
    })

    it('should verify if bike is registered by the id',() => {
        const app = new App()
        const bikeId = '1231'
    
        expect(() => app.findBikeById(bikeId)).toThrow(BikeNotFoundError)
    })

    it('should correctly handle bike rent', async () => {
        const app = new App()
        const user = new User('Pedro', 'pedro@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('bikel', 'bmx', 30, 100, 100.0, 'my desc', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(app.rents.length).toEqual(1)
        expect(app.rents[0].bike.id).toEqual(bike.id)
        expect(app.rents[0].user.id).toEqual(user.id)
    })

    it('should throw unavailable bike when trying to rent unavailable bike', async () => {
        const app = new App()
        const user = new User('Pedro', 'pedro@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('bikel', 'bmx', 30, 100, 100.0, 'my desc', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)

        expect(() => app.rentBike(bike.id, user.email)).toThrow(UnavailableBikeError)
    })

    it('should throw authencication error when the user authentication fails', async () => {
        const app = new App()
        const user = new User('Pedro', 'pedro@mail.com', '1234')
        await app.registerUser(user)
       
       await expect(() => app.userAuthenticate('giulinha@mail.com', '1234')).rejects.toThrow(UserNotFoundError)
       await expect(() => app.userAuthenticate('pedro@mail.com', '12345')).rejects.toThrow(AuthenticationFailed)
    })

    it('should throw user already exists when trying to register another user with the same email', async () => {
        const app = new App()
        const user = new User('Giulia', 'giulia@mail.com', '12345678')
        await app.registerUser(user)

        await expect(() => app.registerUser(user)).rejects.toThrow(UserAlreadyExists)
    })

    it('should throw rent does not exist error when trying to return a bike that was not rented', async () => {
        const app = new App()
        const bike = new Bike('bikel', 'bmx', 30, 100, 100.0, 'my desc', 5, [])
        app.registerBike(bike)
        const user = new User('Pedro', 'pedro@mail.com', '1234')
        await app.registerUser(user)
        app.rentBike(bike.id, user.email)

        expect(() => app.returnBike('fake-id', user.email)).toThrow(RentDoesNotExist)
    })

    it('should throw email does not exist error when trying to remove an user that is not registered', async () => {
        const app = new App()

        expect(() => app.removeUser('giulia@mail.com')).toThrow(EmailDoesNotExist)
    })

    it('should throw bike not found error when trying to find a bike that is not registered', () => {
        const app = new App()

        expect(() => app.findBikeById('fake-id')).toThrow(BikeNotFoundError)
    })

    it('should throw user not found error when trying to find an user that is not registered', () => {
        const app = new App()

        expect(() => app.findUserByEmail('fake-email')).toThrow(UserNotFoundError)
    })
})
