import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
  public end?: Date = undefined

  constructor(
    public bike: Bike,
    public user: User,
    public start: Date = new Date(),
    public value: number = 0
  ) {}
}