"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHasOpenRentError = void 0;
class UserHasOpenRentError extends Error {
    constructor() {
        super('User has open rent.');
        this.name = 'UserHasOpenRentError';
    }
}
exports.UserHasOpenRentError = UserHasOpenRentError;
