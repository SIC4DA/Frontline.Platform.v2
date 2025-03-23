export class BadRequestError extends Error {
  status = 400;
  code = "BAD_REQUEST";
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}
