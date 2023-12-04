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
const app_1 = require("./app");
const bike_1 = require("./bike");
const prisma_bike_repo_1 = require("./external/database/prisma-bike-repo");
const prisma_rent_repo_1 = require("./external/database/prisma-rent-repo");
const prisma_user_repo_1 = require("./external/database/prisma-user-repo");
const user_1 = require("./user");
const sinon_1 = __importDefault(require("sinon"));
const db_1 = __importDefault(require("./external/database/db"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.user.deleteMany({});
        yield db_1.default.bike.deleteMany({});
        yield db_1.default.rent.deleteMany({});
        const clock = sinon_1.default.useFakeTimers();
        const userRepo = new prisma_user_repo_1.PrismaUserRepo();
        const bikeRepo = new prisma_bike_repo_1.PrismaBikeRepo();
        const rentRepo = new prisma_rent_repo_1.PrismaRentRepo();
        const app = new app_1.App(userRepo, bikeRepo, rentRepo);
        const user1 = new user_1.User('Jose', 'jose@mail.com', '1234');
        yield app.registerUser(user1);
        const bike = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
        const bikeId = yield app.registerBike(bike);
        let persistedBike = yield bikeRepo.find(bikeId);
        console.log('Bike disponível: ', persistedBike.available);
        yield app.rentBike(bikeId, user1.email);
        persistedBike = yield bikeRepo.find(bikeId);
        console.log('Bike disponível: ', persistedBike.available);
        clock.tick(1000 * 60 * 60);
        console.log(yield app.returnBike(bikeId, user1.email));
        console.log('Bike disponível: ', persistedBike.available);
    });
}
main();
