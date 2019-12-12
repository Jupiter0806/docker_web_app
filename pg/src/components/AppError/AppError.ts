export class AppError extends Error {
  public readonly name: string;
  // public readonly httpCode: number;
  public readonly isOperational: boolean;

  constructor(description: string, isOperational?: boolean) {
    super(description);

    // restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype);

    // this.httpCode = httpCode;
    this.isOperational = isOperational;

  //   this.stack = new Error().stack;
  }
}