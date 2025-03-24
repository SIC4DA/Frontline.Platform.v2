export class UnauthorizedError extends Error {
  status = 401;
  code = "UNAUTHORIZED";
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}
