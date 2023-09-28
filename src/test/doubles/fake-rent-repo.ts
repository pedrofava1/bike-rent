import { RentDoesNotExist } from "../../errors/RentDoesNotExist";
import { RentRepo } from "../../ports/rent-repo";
import { Rent } from "../../rent";
import crypto from 'crypto'

export class FakeRentRepo implements RentRepo {
    rents: Rent[] = []

    async add(rent: Rent): Promise<string> {
        const newId = crypto.randomUUID()
        rent.id = newId
        this.rents.push(rent)
        return newId
    }

    async findOpen(bikeId: string, userEmail: string): Promise<Rent> {
        const rent = this.rents.find(rent => rent.bike.id === bikeId && rent.user.email === userEmail &&!rent.end)
        if(!rent) throw new RentDoesNotExist()
        return rent
    }

    async update(id: string, rent: Rent): Promise<void> {
        const rentIndex = this.rents.findIndex(rent => rent.id === id)
        if (rentIndex !== -1) this.rents[rentIndex] = rent
    }
    
}