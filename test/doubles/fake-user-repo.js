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
exports.FakeUserRepo = void 0;
const crypto_1 = __importDefault(require("crypto"));
class FakeUserRepo {
    constructor() {
        this.users = [];
    }
    find(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find(user => user.email === email);
        });
    }
    add(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newId = crypto_1.default.randomUUID();
            user.id = newId;
            this.users.push(user);
            return newId;
        });
    }
    remove(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userIndex = this.users.findIndex(user => user.email === email);
            if (userIndex !== -1)
                this.users.splice(userIndex, 1);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
}
exports.FakeUserRepo = FakeUserRepo;
