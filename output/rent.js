"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rent = void 0;
class Rent {
    constructor(bike, user, dateFrom, dateTo, dateReturned) {
        this.bike = bike;
        this.user = user;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.dateReturned = dateReturned;
    }
    static create(rents, bike, user, startDate, endDate) {
        const canCreate = Rent.canRent(rents, startDate, endDate);
        if (canCreate) {
            return new Rent(bike, user, startDate, endDate);
        }
        throw new Error('Overlapping dates for this rent.');
    }
    static canRent(rents, startDate, endDate) {
        return !rents.some(rent => {
            return startDate <= rent.dateTo &&
                endDate >= rent.dateFrom;
        });
    }
}
exports.Rent = Rent;
