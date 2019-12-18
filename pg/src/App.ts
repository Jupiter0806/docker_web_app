import * as express from "express";
import { AppError } from "./components/AppError";
import * as helmet from "helmet";

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.init();

    this.mountRoutes();
  }

  private init(): void {
    this.app.use(helmet());
  }

  private mountRoutes(): void {
    const router = express.Router();
    router.get("/", (req, res) => {
      res.json({
        message: "Hello 2"
      });
    });

    router.get("/unknown_error", (/* req, res */) => {
      // this throw won't be caught by uncaughtException and unhandledRejection
      throw new AppError("unknown error", true);
    });

    this.app.use("/", router);
  }
}

export default new App().app;
