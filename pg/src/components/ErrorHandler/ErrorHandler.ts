import { AppError } from "../AppError";

export class ErrorHandler {
  public static async handleError(err: Error): Promise<void> {
    // await logger.error(err);
    // await sendMailToAdminIfCritical();
    // await saveInOpsQueueIfCritical();
    // await determineIfOperationalError();
  }

  static isTrustedError(err: Error): boolean {
    if (err instanceof AppError) {
      return err.isOperational;
    }

    return false;
  }
}