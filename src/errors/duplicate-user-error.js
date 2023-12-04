"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateUserError = void 0;
class DuplicateUserError extends Error {
    constructor() {
        super('Duplicate user.');
        this.name = 'DuplicateUserError';
    }
}
exports.DuplicateUserError = DuplicateUserError;
