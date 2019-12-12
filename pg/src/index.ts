import app from './App';
import { ErrorHandler } from './components/ErrorHandler';

const port = process.env.PORT || 3000;

process.on('uncaughtException', (err: Error) => {
  ErrorHandler.handleError(err);
  if (!ErrorHandler.isTrustedError(err)) {
    console.error('Unknown error', err);
    process.exit(1);
  }
});

// app.listen(port, () => {
//   return console.log(`Running server on ${port}`);
// });