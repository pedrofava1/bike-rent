import express, {Request, Response, NextFunction } from 'express'
import json from 'express'
import { App } from './app'
import { PrismaUserRepo } from './external/database/prisma-user-repo'
import { PrismaBikeRepo } from './external/database/prisma-bike-repo'
import { PrismaRentRepo } from './external/database/prisma-rent-repo'

export const cors = (req: Request, res: Response, next: NextFunction): void => {
    res.set('access-control-allow-origin', '*')
    res.set('access-control-allow-headers', '*')
    res.set('access-control-allow-methods', '*')
    next()
}

export const contentType = (req: Request, res: Response, next: NextFunction): void => {
    res.type('json')
    next()
}

const server = express()
const userRepo = new PrismaUserRepo()
const bikeRepo = new PrismaBikeRepo()
const rentRepo = new PrismaRentRepo()
const app = new App(userRepo, bikeRepo, rentRepo)

server.use(json())
server.use(cors)
server.use(contentType)
server.post('/api/users', async (req: Request, res: Response) => {
    const id = await app.registerUser(req.body)
    res.status(201).json({ id })
})

server.post('api/create-bike', async (req: Request, res:Response) => {
    const bike = await app.registerBike(req.body)
    res.status(201).json({ bike })
})

export default server