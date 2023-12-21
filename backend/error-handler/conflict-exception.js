export class ConflictException extends Error {
  constructor() {
    super();
    this.message = "Email already exist";
    this.status = 409;
  }
}
