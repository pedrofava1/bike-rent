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
const prisma_user_repo_1 = require("../../../src/external/database/prisma-user-repo");
const user_1 = require("../../../src/user");
const db_1 = __importDefault(require("../../../src/external/database/db"));
describe('PrismaUserRepo', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.default.user.deleteMany({});
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.default.user.deleteMany({});
    }));
    it('adds a user in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const userToBePersisted = new user_1.User('test user', 'test@mail.com', '1234');
        const repo = new prisma_user_repo_1.PrismaUserRepo();
        const userId = yield repo.add(userToBePersisted);
        expect(userId).toBeDefined();
        const persistedUser = yield repo.find(userToBePersisted.email);
        expect(persistedUser.name).toEqual(userToBePersisted.name);
    }));
    it('removes a user from the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const userToBePersisted = new user_1.User('test user', 'test@mail.com', '1234');
        const repo = new prisma_user_repo_1.PrismaUserRepo();
        yield repo.add(userToBePersisted);
        yield repo.remove('test@mail.com');
        const removedUser = yield repo.find('test@mail.com');
        expect(removedUser).toBeNull();
    }));
    it('lists users in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = new user_1.User('user1', 'user1@mail.com', '1234');
        const user2 = new user_1.User('user2', 'user2@mail.com', '1234');
        const repo = new prisma_user_repo_1.PrismaUserRepo();
        yield repo.add(user1);
        yield repo.add(user2);
        const userList = yield repo.list();
        expect(userList.length).toEqual(2);
    }));
});
