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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/server"));
const db_1 = __importDefault(require("../src/external/database/db"));
describe('Register User Route', () => {
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
    it('should register a user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server_1.default)
            .post('/api/users')
            .send({
            name: 'Joe Doe',
            email: 'joe@mail.com',
            password: '1validPassword'
        })
            .expect(201)
            .then((res) => {
            expect(res.body.id).toBeDefined();
        });
    }), 30000);
});
