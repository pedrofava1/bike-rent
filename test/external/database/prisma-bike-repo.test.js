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
const db_1 = __importDefault(require("../../../src/external/database/db"));
const prisma_bike_repo_1 = require("../../../src/external/database/prisma-bike-repo");
describe('PrismaBikeRepo', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.default.bike.deleteMany({});
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.default.bike.deleteMany({});
    }));
    it('adds a bike in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const bikeToBePersisted = new bike_1.Bike('mountain bike', 'mountain', 20, 100, 10, 'mountain bike', 5, ['http://image1.com', 'http://image2.com']);
        const repo = new prisma_bike_repo_1.PrismaBikeRepo();
        const bikeId = yield repo.add(bikeToBePersisted);
        expect(bikeId).toBeDefined();
        const persistedBike = yield repo.find(bikeId);
        expect(persistedBike.name).toEqual(bikeToBePersisted.name);
        expect(persistedBike.imageUrls.length).toEqual(2);
    }));
    it('removes a bike from the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const bikeToBePersisted = new bike_1.Bike('mountain bike', 'mountain', 20, 100, 10, 'mountain bike', 5, ['http://image1.com', 'http://image2.com']);
        const repo = new prisma_bike_repo_1.PrismaBikeRepo();
        const bikeId = yield repo.add(bikeToBePersisted);
        yield repo.remove(bikeId);
        const removedBike = yield repo.find(bikeId);
        expect(removedBike).toBeNull();
    }));
    it('lists bikes in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const bike1 = new bike_1.Bike('mountain bike', 'mountain', 20, 100, 10, 'mountain bike', 5, ['http://image1.com', 'http://image2.com']);
        const bike2 = new bike_1.Bike('mountain bike', 'mountain', 20, 100, 10, 'mountain bike', 5, ['http://image1.com', 'http://image2.com']);
        const repo = new prisma_bike_repo_1.PrismaBikeRepo();
        yield repo.add(bike1);
        yield repo.add(bike2);
        const bikeList = yield repo.list();
        expect(bikeList.length).toEqual(2);
    }));
    it('should update bike availability in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const bikeToBePersisted = new bike_1.Bike('mountain bike', 'mountain', 20, 100, 10, 'mountain bike', 5, ['http://image1.com', 'http://image2.com']);
        const repo = new prisma_bike_repo_1.PrismaBikeRepo();
        const bikeId = yield repo.add(bikeToBePersisted);
        yield repo.updateAvailability(bikeId, false);
        const updatedBike = yield repo.find(bikeId);
        expect(updatedBike.available).toBeFalsy();
    }));
    it('should update bike location in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const bikeToBePersisted = new bike_1.Bike('mountain bike', 'mountain', 20, 100, 10, 'mountain bike', 5, ['http://image1.com', 'http://image2.com']);
        const repo = new prisma_bike_repo_1.PrismaBikeRepo();
        const bikeId = yield repo.add(bikeToBePersisted);
        yield repo.updateLocation(bikeId, 10.5, 20.5);
        const updatedBike = yield repo.find(bikeId);
        expect(updatedBike.location.latitude).toEqual(10.5);
        expect(updatedBike.location.longitude).toEqual(20.5);
    }));
});
