import express from "express";
import config from "config";
import dotenv from "dotenv";
import logger from "./utils/logger";
import connect from "./utils/connect";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = config.get<number>("port");

app.use(
  cors({
    origin: config.get("origin"),
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json()); //bodyparser
app.use(deserializeUser);

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);

  await connect();
  routes(app);
});
