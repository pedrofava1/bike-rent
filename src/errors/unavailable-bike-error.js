"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnavailableBikeError = void 0;
class UnavailableBikeError extends Error {
    constructor() {
        super('Unavailable bike.');
        this.name = 'UnavailableBikeError';
    }
}
exports.UnavailableBikeError = UnavailableBikeError;
