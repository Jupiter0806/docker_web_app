import { ErrorCode } from "./ErrorCode";

export interface AppErrorOptionals {
  isOperational?: boolean;
  code?: ErrorCode;
  logger?: string;
}

export interface ErrorResponse {
  status: {
    code: number;
    message: string;
  };
}

export class AppError extends Error {
  public readonly name: string;
  // public readonly httpCode: number;
  public readonly isOperational: boolean;
  public readonly code?: ErrorCode;
  public readonly logger?: string;

  constructor(
    description: string,
    { isOperational, code, logger }: AppErrorOptionals = {}
  ) {
    super(description);

    // restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype);

    // this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.code = code;
    this.logger = logger;

    //   this.stack = new Error().stack;
  }

  toResponse(): ErrorResponse {
    return {
      status: {
        code: this.code,
        message: this.message
      }
    };
  }
}
