import request from 'supertest';
import server from '../src/server'
import prisma from "../src/external/database/db"

describe('Register User Route', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({})
        await prisma.bike.deleteMany({})
        await prisma.rent.deleteMany({})
    })

    afterAll(async () => {
        await prisma.user.deleteMany({})
        await prisma.bike.deleteMany({})
        await prisma.rent.deleteMany({})
    })
    it('should register a user', async () => {
        await request(server)
            .post('/api/users')
            .send({
                name: 'Joe Doe',
                email: 'joe@mail.com',
                password: '1validPassword'
            })
            .expect(201)
            .then((res) => { 
                expect(res.body.id).toBeDefined()
            })
    }, 30000)
})