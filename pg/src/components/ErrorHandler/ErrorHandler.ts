import { getLogger } from "ta-common";

import { AppError } from "../AppError";

const logger = getLogger("ErrorHandler");

export class ErrorHandler {
  public static async handleError(err: Error): Promise<void> {
    if (err instanceof AppError) {
      if (this.isTrustedError(err)) {
        if (err.logger) {
          getLogger(err.logger).info(err);
        } else {
          logger.info(err);
        }
      } else {
        if (err.logger) {
          getLogger(err.logger).error(err);
        } else {
          logger.error(err);
        }
      }
      return;
    }

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
