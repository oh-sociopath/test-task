export class WrongInputException extends Error {
  constructor() {
    super();
    this.message = "Wrong input";
    this.status = 400;
  }
}
