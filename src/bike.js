"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
const location_1 = require("./location");
class Bike {
    constructor(name, type, bodySize, maxLoad, rate, description, ratings, imageUrls, available = true, location = new location_1.Location(0.0, 0.0), id) {
        this.name = name;
        this.type = type;
        this.bodySize = bodySize;
        this.maxLoad = maxLoad;
        this.rate = rate;
        this.description = description;
        this.ratings = ratings;
        this.imageUrls = imageUrls;
        this.available = available;
        this.location = location;
        this.id = id;
    }
}
exports.Bike = Bike;
