"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
class App {
    constructor() {
        this.users = [];
        this.bikes = [];
        this.rents = [];
    }
    addUser(user) {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('User already registered');
            }
        }
        this.users.push(user);
    }
}
exports.App = App;
