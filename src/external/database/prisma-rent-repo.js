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
exports.PrismaRentRepo = void 0;
const db_1 = __importDefault(require("./db"));
class PrismaRentRepo {
    add(rent) {
        return __awaiter(this, void 0, void 0, function* () {
            const persistedRent = yield db_1.default.rent.create({
                data: {
                    start: rent.start,
                    bike: {
                        connect: {
                            id: rent.bike.id
                        }
                    },
                    user: {
                        connect: {
                            id: rent.user.id
                        }
                    }
                }
            });
            return persistedRent.id;
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.rent.findUnique({
                where: { id },
                include: {
                    bike: true,
                    user: true
                }
            });
        });
    }
    findOpen(bikeId, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.rent.findFirst({
                where: {
                    AND: [
                        { bikeId },
                        { user: {
                                is: { email: userEmail }
                            } },
                        { end: null }
                    ]
                },
                include: {
                    bike: true,
                    user: true
                }
            });
        });
    }
    findOpenFor(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.rent.findMany({
                where: {
                    user: {
                        is: { email: userEmail }
                    }
                },
                include: {
                    bike: true,
                    user: true
                }
            });
        });
    }
    updateEnd(id, end) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.rent.update({
                where: { id },
                data: { end }
            });
        });
    }
}
exports.PrismaRentRepo = PrismaRentRepo;
