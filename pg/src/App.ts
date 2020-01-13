import * as express from "express";
import * as helmet from "helmet";

import { AppError } from "./components/AppError";
import { initialiseDB, parseDBType, getDB } from "./components/DB";

const db = {
  type: "mongoose",
  options: {
    url: "mongodb://localhost/ta"
  }
};

class App {
  public app: express.Express;

  constructor() {
    this.initDB();

    this.app = express();

    this.init();

    this.mountRoutes();
  }

  private init(): void {
    this.app.use(helmet());
  }

  private initDB(): void {
    initialiseDB(parseDBType(db.type), db.options);
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

    router.get("/db", async (req, res) => {
      const db = getDB();
      const user = await db.users.set({
        firstname: "firstname_2"
      });

      res.json(user);
    });

    this.app.use("/", router);
  }
}

export default new App().app;
