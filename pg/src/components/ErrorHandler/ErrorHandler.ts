import { AppError } from "../AppError";
import { Logger } from "ta-common";

const logger = Logger.getLogger("ErrorHandler");

export class ErrorHandler {
  public static async handleError(err: Error): Promise<void> {
    logger.info(err);
    // await logger.error(err);
    // await sendMailToAdminIfCritical();
    // await saveInOpsQueueIfCritical();
    // await determineIfOperationalError();
  }

  public static isTrustedError(err: Error): boolean {
    if (err instanceof AppError) {
      return err.isOperational;
    }

    return false;
  }
}
