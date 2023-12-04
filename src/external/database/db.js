"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
if (!global.prisma) {
    global.prisma = new client_1.PrismaClient();
}
exports.default = global.prisma;
