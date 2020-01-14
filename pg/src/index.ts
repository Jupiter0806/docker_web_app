import app from "./App";
// import { AppError } from "./components/AppError";
import { ErrorHandler } from "./components/ErrorHandler";

import { getLogger } from "ta-common";

const port = process.env.PORT || 3000;
const logger = getLogger("index");

process.on("uncaughtException", (err: Error) => {
  ErrorHandler.handleError(err);
  if (!ErrorHandler.isTrustedError(err)) {
    logger.error("Unknown error", err);
    process.exit(1);
  }
});

process.on("unhandledRejection", (err: Error) => {
  ErrorHandler.handleError(err);
  if (!ErrorHandler.isTrustedError(err)) {
    logger.error("Unknown error", err);
    process.exit(1);
  }
});

app.listen(port, () => {
  return logger.info(`Running server on ${port}`);
});
