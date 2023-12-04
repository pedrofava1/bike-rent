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
exports.contentType = exports.cors = void 0;
const express_1 = __importDefault(require("express"));
const express_2 = __importDefault(require("express"));
const app_1 = require("./app");
const prisma_user_repo_1 = require("./external/database/prisma-user-repo");
const prisma_bike_repo_1 = require("./external/database/prisma-bike-repo");
const prisma_rent_repo_1 = require("./external/database/prisma-rent-repo");
const cors = (req, res, next) => {
    res.set('access-control-allow-origin', '*');
    res.set('access-control-allow-headers', '*');
    res.set('access-control-allow-methods', '*');
    next();
};
exports.cors = cors;
const contentType = (req, res, next) => {
    res.type('json');
    next();
};
exports.contentType = contentType;
const server = (0, express_1.default)();
const userRepo = new prisma_user_repo_1.PrismaUserRepo();
const bikeRepo = new prisma_bike_repo_1.PrismaBikeRepo();
const rentRepo = new prisma_rent_repo_1.PrismaRentRepo();
const app = new app_1.App(userRepo, bikeRepo, rentRepo);
server.use((0, express_2.default)());
server.use(exports.cors);
server.use(exports.contentType);
server.post('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield app.registerUser(req.body);
    res.status(201).json({ id });
}));
exports.default = server;
