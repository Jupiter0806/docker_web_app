import * as express from "express";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";

import { AppError } from "./components/AppError";
import { initialiseDB, parseDBType } from "./components/DB";
import { register } from "./components/Register";
import { login } from "./components/Login";

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

    this.init();

    this.mountRoutes();
  }

  private init(): void {
    this.app = express();

    this.app.use(helmet());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
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
      throw new AppError("unknown error", { isOperational: true });
    });

    router.post("/register", async (req, res) =>
      res.json(await register(req.body))
    );

    router.post("/login", async (req, res) => res.json(await login(req.body)));

    this.app.use("/", router);
  }
}

export default new App().app;
