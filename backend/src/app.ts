import express, { type Application } from "express";
import cors from "cors";
import { config } from "./config/env";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import routes from "./routes";
import { pinoHttpLogger } from "./utils/logger";

const app: Application = express();

app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pinoHttpLogger);

app.use("/", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
