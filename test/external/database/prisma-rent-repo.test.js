"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bike_1 = require("../../../src/bike");
const prisma_bike_repo_1 = require("../../../src/external/database/prisma-bike-repo");
const prisma_rent_repo_1 = require("../../../src/external/database/prisma-rent-repo");
const prisma_user_repo_1 = require("../../../src/external/database/prisma-user-repo");
const rent_1 = require("../../../src/rent");
const user_1 = require("../../../src/user");
const db_1 = __importDefault(require("../../../src/external/database/db"));
describe('PrismaRentRepo', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.default.user.deleteMany({});
        yield db_1.default.bike.deleteMany({});
        yield db_1.default.rent.deleteMany({});
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.default.user.deleteMany({});
        yield db_1.default.bike.deleteMany({});
        yield db_1.default.rent.deleteMany({});
    }));
    it('adds a rent to the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const bike = yield createBike();
        const user = yield createUser();
        const rentToBePersisted = new rent_1.Rent(bike, user, new Date());
        const repo = new prisma_rent_repo_1.PrismaRentRepo();
        const rentId = yield repo.add(rentToBePersisted);
        expect(rentId).toBeDefined();
    }), 10000);
    it('finds open rent for given bike and user', () => __awaiter(void 0, void 0, void 0, function* () {
        const bike = yield createBike();
        const user = yield createUser();
        const rentToBePersisted = new rent_1.Rent(bike, user, new Date());
        const repo = new prisma_rent_repo_1.PrismaRentRepo();
        const rentId = yield repo.add(rentToBePersisted);
        const persistedRent = yield repo.findOpen(bike.id, user.email);
        expect(persistedRent.id).toEqual(rentId);
    }), 10000);
    it('finds open rents for a given user', () => __awaiter(void 0, void 0, void 0, function* () {
        const bike = yield createBike();
        const user = yield createUser();
        const rentToBePersisted = new rent_1.Rent(bike, user, new Date());
        const repo = new prisma_rent_repo_1.PrismaRentRepo();
        yield repo.add(rentToBePersisted);
        const openRents = yield repo.findOpenFor(user.email);
        expect(openRents.length).toEqual(1);
    }), 10000);
    it('updates the end date of a rent in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const bike = yield createBike();
        const user = yield createUser();
        const rentToBePersisted = new rent_1.Rent(bike, user, new Date());
        const repo = new prisma_rent_repo_1.PrismaRentRepo();
        const rentId = yield repo.add(rentToBePersisted);
        yield repo.updateEnd(rentId, new Date());
        const persistedRent = yield repo.find(rentId);
        expect(persistedRent.end).toBeDefined();
    }), 10000);
});
function createBike() {
    return __awaiter(this, void 0, void 0, function* () {
        const bike = new bike_1.Bike('mountain bike', 'mountain', 20, 100, 10, 'mountain bike', 5, ['http://image1.com', 'http://image2.com']);
        const bikeRepo = new prisma_bike_repo_1.PrismaBikeRepo();
        const bikeId = yield bikeRepo.add(bike);
        return yield bikeRepo.find(bikeId);
    });
}
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const userToBePersisted = new user_1.User('test user', 'test@mail.com', '1234');
        const userRepo = new prisma_user_repo_1.PrismaUserRepo();
        yield userRepo.add(userToBePersisted);
        return yield userRepo.find(userToBePersisted.email);
    });
}
