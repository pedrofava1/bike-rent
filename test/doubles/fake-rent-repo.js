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
exports.FakeRentRepo = void 0;
const crypto_1 = __importDefault(require("crypto"));
class FakeRentRepo {
    constructor() {
        this.rents = [];
    }
    add(rent) {
        return __awaiter(this, void 0, void 0, function* () {
            const newId = crypto_1.default.randomUUID();
            rent.id = newId;
            this.rents.push(rent);
            return newId;
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rents.find(rent => rent.id === id);
        });
    }
    findOpen(bikeId, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rents.find(rent => rent.bike.id === bikeId &&
                rent.user.email === userEmail &&
                !rent.end);
        });
    }
    findOpenFor(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rents.filter(rent => rent.user.email === userEmail &&
                !rent.end);
        });
    }
    updateEnd(id, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const rentIndex = this.rents.findIndex(rent => rent.id === id);
            if (rentIndex !== -1)
                this.rents[rentIndex].end = end;
        });
    }
}
exports.FakeRentRepo = FakeRentRepo;
