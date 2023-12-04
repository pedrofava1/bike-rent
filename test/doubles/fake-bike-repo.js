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
exports.FakeBikeRepo = void 0;
const crypto_1 = __importDefault(require("crypto"));
class FakeBikeRepo {
    constructor() {
        this.bikes = [];
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bikes.find(bike => bike.id === id);
        });
    }
    add(bike) {
        return __awaiter(this, void 0, void 0, function* () {
            const newId = crypto_1.default.randomUUID();
            bike.id = newId;
            this.bikes.push(bike);
            return newId;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const bikeIndex = this.bikes.findIndex(bike => bike.id === id);
            if (bikeIndex !== -1)
                this.bikes.splice(bikeIndex, 1);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bikes;
        });
    }
    updateAvailability(id, available) {
        return __awaiter(this, void 0, void 0, function* () {
            const bikeIndex = this.bikes.findIndex(bike => bike.id === id);
            if (bikeIndex !== -1)
                this.bikes[bikeIndex].available = available;
        });
    }
    updateLocation(id, latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            const bikeIndex = this.bikes.findIndex(bike => bike.id === id);
            if (bikeIndex !== -1) {
                this.bikes[bikeIndex].location.latitude = latitude;
                this.bikes[bikeIndex].location.longitude = longitude;
            }
        });
    }
}
exports.FakeBikeRepo = FakeBikeRepo;
