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
exports.PrismaBikeRepo = void 0;
const location_1 = require("../../location");
const db_1 = __importDefault(require("./db"));
class PrismaBikeRepo {
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const persistedBike = yield db_1.default.bike.findUnique({
                where: {
                    id
                },
                include: {
                    imageUrls: true,
                }
            });
            if (!persistedBike)
                return null;
            return Object.assign(Object.assign({}, persistedBike), { location: new location_1.Location(persistedBike.latitude, persistedBike.longitude) });
        });
    }
    add(bike) {
        return __awaiter(this, void 0, void 0, function* () {
            const addedBike = yield db_1.default.bike.create({
                data: {
                    name: bike.name,
                    type: bike.type,
                    bodySize: bike.bodySize,
                    maxLoad: bike.maxLoad,
                    rate: bike.rate,
                    description: bike.description,
                    ratings: bike.ratings,
                    imageUrls: {
                        create: [
                            ...bike.imageUrls.map((url) => ({ url }))
                        ]
                    },
                    available: bike.available,
                    latitude: bike.location.latitude,
                    longitude: bike.location.longitude,
                }
            });
            return addedBike.id;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.bike.delete({
                where: {
                    id
                }
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.bike.findMany({
                include: {
                    imageUrls: true,
                }
            });
        });
    }
    updateAvailability(id, available) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.bike.update({
                where: { id },
                data: { available }
            });
        });
    }
    updateLocation(id, latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.bike.update({
                where: { id },
                data: {
                    latitude,
                    longitude
                }
            });
        });
    }
}
exports.PrismaBikeRepo = PrismaBikeRepo;
